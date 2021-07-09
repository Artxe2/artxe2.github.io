'use strict';
const Eleven = {
     Attack_Power: 33
    ,Attack_Power_Growth: 2.5
    ,Health: 760
    ,Health_Growth: 77
    ,Health_Regen: 1.3
    ,Health_Regen_Growth: 0.07
    ,Stamina: 420
    ,Stamina_Growth: 16
    ,Stamina_Regen: 2
    ,Stamina_Regen_Growth: 0.07 //
    ,Defense: 29 //
    ,Defense_Growth: 3
    ,Atk_Speed: 0.11
    ,Movement_Speed: 3.2
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Hammer]
    ,correction: {
        Hammer: [
            [0, -4, -7],
            [0, 0, 0]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex - 1;
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            if (character.DIV.querySelector('.eleven_r').checked && r > 0) {
                return "<b class='damage'>" + damage * 2 + '</b> ( ' +  min + ', ' + min + ' - ' + max + ',' + max + ' )';
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex - 1;
            let ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            if (character.DIV.querySelector('.eleven_r').checked && r > 0) {
                ba *= 2;
            }
            const damage = round(ba * character.attack_speed * 100) / 100;
            const life = calcHeal(character, ba * (character.life_steal / 100), character.attack_speed, enemy);
            return "<b class='damage'>" + damage + "</b><b> _h/s: </b><b class='heal'>" + life + '</b>';
        }
        return '-';
    }
    ,DPS_Option: ''
    ,HPS: (character, enemy) => {
        return "<b class='heal'>" + calcHeal(character, character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 2, enemy) + '</b>';
    }
    ,Q_Skill: (character, enemy) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        if (character.weapon && q >= 0) {
            const min = calcSkillDamage(character, enemy, 100 + q * 50, 0.5, 1);
            const max = calcSkillDamage(character, enemy, (100 + q * 50) * (1.48 + q * 0.06), 0.5 * (1.48 + q * 0.06), 1);
            const cool = 10000 / ((6.5 - q * 0.5) * (100 - character.cooldown_reduction) - 150);
            return "<b class='damage'>" + min + ' - ' + max + "</b><b> _sd/s: </b><b class='damage'>" + round((min + max) / 2 * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const min = calcSkillDamage(character, enemy, 110 + e * 20, 0.35, 1);
            const max = calcSkillDamage(character, enemy, (110 + e * 20) * (1.22 + e * 0.02), 0.35 * (1.22 + e * 0.02), 1);
            const bonus = calcSkillDamage(character, enemy, enemy.max_hp ? enemy.max_hp * ((0.1 + e * 0.02) / (1.1 + e * 0.02)) : 0, 0, 1);
            const cool = 10000 / ((22 - e * 2) * (100 - character.cooldown_reduction) - 150);
            return "<b class='damage'>" + min + ' - ' + (max + bonus) + "</b><b> _sd/s: </b><b class='damage'>" + round((min + max) / 2 * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const damage = calcSkillDamage(character, enemy, 50 + r * 30, 0, 1);
            return "<b class='damage'>" + damage * 6 + '</b> ( ' + damage + ' x 6 )';
        }
        return '-';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='eleven_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Hammer') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 150 + character.defense : 300 + character.defense * 2, 0, 1) + '</b>';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return !character.weapon || character.weapon.Type !== 'Hammer' ? '' :
            "<b> _use</b><input type='checkbox' class='hammer_d' onchange='updateDisplay()'>";
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            const heal = calcHeal(character, 50 + t * 100, 1, enemy);
            const tick = calcHeal(character, 35, 1, enemy);
            return "<b> _h: </b><b class='heal'>" + (heal + tick * 3) + '</b> ( ' + heal + ', ' + tick + ' x 3 )';
        }
        return '-';
    }
    ,T_Option: ''
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type =
            weapon === 'Hammer' ? '망치' :
            '';
        const skill =
            weapon === 'Hammer' ? '"스킬 데미지" _use "스킬 사용"' :
            '';
        return '일레븐 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "스킬 데미지" - "최대 데미지"\n' +
            'W: "데미지 없음"\n' +
            'E: "스킬 데미지" - "최대 데미지"\n' +
            'R: "합산 데미지" ( "틱당 데미지" x "타수" )\n' +
            'D: ' + skill + '\n' +
            'T: "회복량" ( "틱당 회복량" x "회복 횟수" )\n';
    }
    ,COMBO_VARS: '{\"rr\":0,\"tt\":0}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const t = character.T_LEVEL.selectedIndex;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        const auto_cri = character.AUTO_CRI.checked;
        let damage = 0;
        let heal = calcHeal(character, character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let rr = data.vars.rr, tt = data.vars.tt;

        let fi = character.weapon && character.weapon.Focused_Impact ? data.vars.fi || character.weapon.Focused_Impact * 2 : 0;
        let sm = data.vars.sm || 0;
        let sms = data.vars.sms || 0;
        let sws = character.accessory && character.accessory.Swift_Strides[1] ? data.vars.sws || character.accessory.Swift_Strides[1] : 0;
        if (character.weapon) {
            let ficri = character.weapon.Focused_Impact * 2 === fi;
            if (fi < character.weapon.Focused_Impact * 2) {
                fi--;
            }
            const type = character.weapon.Type;
            for (let i = 0; i < combo.length; i++) {
                c = combo.charAt(i);
                if (enemy.defense) {
                    if (enemy.character === Magnus) {
                        let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                        if (lost < 0) {
                            lost = 0;
                        }
                        enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                    } else {
                        enemy.defense = floor((enemy.pure_defense + defense_bonus[index]) * (1 + defense_percent[index]) * (1 + defense_minus[index]));
                    }
                }
                if (c === 'a') {
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                    damage += ba;
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                    if (rr) {
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                        }
                        if (character.weapon.Smolder && sm < 4) {
                            sm++;
                        }
                        ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                        damage += ba;
                        heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                    }
                } else if (c === 'A') {
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 100, 1);
                    damage += ba;
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                    if (rr) {
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                        }
                        if (character.weapon.Smolder && sm < 4) {
                            sm++;
                        }
                        ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 100, 1);
                        damage += ba;
                        heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                    }
                } else if (c === 'q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 100 + q * 50, 0.5, 1);
                    }
                } else if (c === 'Q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, (100 + q * 50) * (1.48 + q * 0.06), 0.5 * (1.48 + q * 0.06), 1);
                    }
                } else if (c === 'e') {
                    if (e >= 0) {
                        let lost = 0;
                        if (enemy.max_hp) {
                            lost = enemy.max_hp - (data.hp - damage + heal + shield);
                            if (lost < 0) {
                                lost = 0;
                            } else if (lost > enemy.max_hp * ((0.1 + e * 0.02) / (1.1 + e * 0.02))) {
                                lost = enemy.max_hp * ((0.1 + e * 0.02) / (1.1 + e * 0.02));
                            } else {
                                lost *= (0.1 + e * 0.02);
                            }
                        }
                        damage += calcSkillDamage(character, enemy, lost + 110 + e * 20, 0.35, 1);
                    }
                } else if (c === 'E') {
                    if (e >= 0) {
                        let lost = 0;
                        if (enemy.max_hp) {
                            lost = enemy.max_hp - (data.hp - damage + heal + shield);
                            if (lost < 0) {
                                lost = 0;
                            } else if (lost > enemy.max_hp * ((0.1 + e * 0.02) / (1.1 + e * 0.02))) {
                                lost = enemy.max_hp * ((0.1 + e * 0.02) / (1.1 + e * 0.02));
                            } else {
                                lost *= (0.1 + e * 0.02);
                            }
                        }
                        damage += calcSkillDamage(character, enemy,
                            lost * (1.22 + e * 0.02) + (110 + e * 20) * (1.22 + e * 0.02), 0.35 * (1.22 + e * 0.02), 1);
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        rr = 13;
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Hammer') {
                            const dm = wm < 13 ? -0.2 : -0.35;
                            for (let x = index + 1; x <= index + (wm < 13 ? 10 : 14) && x < defense_minus.length; x++) {
                                defense_minus[x] = dm;
                            }
                            damage +=  calcSkillDamage(character, enemy, wm < 13 ? 150 + character.defense : 300 + character.defense * 2, 0, 1);
                        }
                    }
                } else if (c === 't' || c === 'T') {
                    tt += 6;
                } else if (c === 'p' || c === 'P') {
                    if (character.trap) {
                        damage += floor(character.trap.Trap_Damage * (1.04 + character.TRAP_MASTERY.selectedIndex * 0.04));
                    }
                }
            }
            if (tt === 6) {
                heal += calcHeal(character, 50 + t * 100, 1, enemy);
            } else if (tt) {
                tt--;
            }
            if (tt % 2) {
                heal += calcHeal(character, 35, 1, enemy);
            }
            if (rr) {
                rr--;
            }
            if (rr % 2) {
                damage += calcSkillDamage(character, enemy, 50 + r * 30, 0, 1);
            }
            if (index % 2) {
                let currHp = enemy.max_hp ? data.hp- damage + heal + shield : 0;
                if (currHp > enemy.max_hp) {
                    currHp = enemy.max_hp;
                } else if (currHp < 0) {
                    currHp = 0;
                }
                damage += calcTrueDamage(character, enemy, currHp * 0.03 * sm);
            }
            if (sms) {
                sms--;
            } else {
                sm = 0;
            }
        }
        damage += checkItemDamage(character, enemy, index);
        return {
            hp: data.hp - damage,
            damage: damage,
            heal: heal,
            shield: shield,
            vars: {
                fi: fi,
                sm: sm,
                sms: sms,
                sws: sws,
                rr: rr,
                tt: tt
            }
        };
    }
    ,COMBO_Option: 'ErwaqataatQ'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Hammer' ? 'd & D: 무스 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q: Q스킬 데미지\n' +
            'Q: Q스킬 최대 데미지\n' +
            'w & W: 데미지 없음\n' +
            'e: E스킬 데미지\n' +
            'E: E스킬 최대 데미지\n' +
            'r & R: R스킬 On\n' +
            't & T: 햄버거 먹방\n' +
            d +
            'p & P: 트랩 데미지';
    }
};