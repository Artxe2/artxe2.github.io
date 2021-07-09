'use strict';
const Hyunwoo = {
     Attack_Power: 34
    ,Attack_Power_Growth: 3.4
    ,Health: 670
    ,Health_Growth: 71
    ,Health_Regen: 0.8
    ,Health_Regen_Growth: 0.04
    ,Stamina: 350
    ,Stamina_Growth: 16
    ,Stamina_Regen: 1.8
    ,Stamina_Regen_Growth: 0.04
    ,Defense: 23
    ,Defense_Growth: 2.2
    ,Atk_Speed: 0.12
    ,Movement_Speed: 3.15
    ,Sight_Range: 8
    ,Attack_Range: 0.45
    ,weapons: [Glove, Tonfa]
    ,correction: {
        Glove: [
            [0, -5, -7],
            [0, -2, -5]
        ],
        Tonfa: [
            [0, -7, -12],
            [0, 0, 3]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            const ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const damage = round(ba * character.attack_speed * 100) / 100;
            const life = calcHeal(ba * (character.life_steal / 100), character.attack_speed, enemy);
            return "<b class='damage'>" + damage + "</b><b> _h/s: </b><b class='heal'>" + life + '</b>';
        }
        return '-';
    }
    ,DPS_Option: ''
    ,HPS: (character, enemy) => {
        return "<b class='heal'>" + calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 2, enemy) + '</b>';
    }
    ,Q_Skill: (character, enemy) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        if (character.weapon && q >= 0) {
            const damage = calcSkillDamage(character, enemy, 100 + q * 50, 0.3, 1);
            const cool = 10000 / ((8.5 - q * 1) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const damage = baseAttackDamage(character, enemy, character.defense * 0.15, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, character.defense * 0.15, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, character.defense * 0.15, 1, 100, 1);
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,W_Option: "<b> _use</b><input type='checkbox' class='hyunwoo_w' onchange='updateDisplay()'>"
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const min = calcSkillDamage(character, enemy, character.defense * 0.8, 0, 1);
            const max = calcSkillDamage(character, enemy, (enemy.max_hp ? enemy.max_hp * (0.05 + e * 0.03) : 0) + character.defense * 0.8, 0, 1);
            const bonus = calcSkillDamage(character, enemy, 60 + e * 35, 0, 1);
            const cool = 10000 / ((17 - e * 1) * 0.75 * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + (max + bonus) + '</b> ( ' + min + ' ~ ' + max + ', ' + bonus + " )<b> _sd/s: </b><b class='damage'>" + round((min + max + bonus) / 2 * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: "<b> _use</b><input type='checkbox' class='hyunwoo_e' onchange='updateDisplay()'>"
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const min = calcSkillDamage(character, enemy, 200 + r * 100, 0.6, 1);
            const max = calcSkillDamage(character, enemy, 600 + r * 300, 1.8, 1);
            return "<b class='damage'>" + min + ' ~ ' + max + '</b>';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Glove') {
                const coe = wm < 13 ? 1.4 : 2;
                const bonus = calcTrueDamage(character, enemy, wm < 13 ? 50 : 100);
                const min = baseAttackDamage(character, enemy, 0, 1 + coe, 0, 1) + bonus;
                const life = calcHeal(min * (character.life_steal / 100), 1, enemy);
                return "<b class='damage'>" + min + "</b><b> _h: </b><b class='heal'>" + life + '</b>';
            }
            if (type === 'Tonfa') {
                return "<b class='damage'>" + (wm < 13 ? 60 : 80) + '%</b>';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            return "<b> _h: </b><b class='heal'>" + calcHeal(character.max_hp * (0.04 + t * 0.04), 1, enemy) + '</b>';
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
            weapon === 'Glove' ? '글러브' :
            weapon === 'Tonfa' ? '톤파' :
            '';
        const skill =
            weapon === 'Glove' ? '"스킬 데미지"  _h: "평균 흡혈량"' :
            weapon === 'Tonfa' ? '"반사 데미지"' :
            '';
        return '현우 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "스킬 데미지"\n' +
            'W: "평균 데미지" ( "평타 데미지" - "치명타 데미지" ) _use "스킬 사용"\n' +
            'E: "합산 데미지" ( "최소 데미지" ~ "최대 데미지", "벽꿍 데미지" )\n' +
            'R: "최소 데미지" ~ "최대 데미지"\n' +
            'D: ' + skill + '\n' +
            'T: _h: "회복량"\n';
    }
    ,COMBO_VARS: '{\"ww\":false, \"tt\":50}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const t = character.T_LEVEL.selectedIndex;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        const auto_cri = character.AUTO_CRI.checked;
        let damage = 0;
        let heal = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let ww = data.vars.ww, tt = data.vars.tt;

        let fi = character.weapon && character.weapon.Focused_Impact ? data.vars.fi || character.weapon.Focused_Impact * 2 : 0;
        let sm = data.vars.sm || 0;
        let sms = data.vars.sms || 0;
        let sws = character.accessory && character.accessory.Swift_Strides ? data.vars.sws || character.accessory.Swift_Strides[1] : 0;
        if (character.weapon) {
            let ficri = character.weapon.Focused_Impact * 2 === fi;
            if (fi < character.weapon.Focused_Impact * 2) {
                fi--;
            }
            if (sws) {
                sws += character.movement_speed / 2;
                if (sws > character.accessory.Swift_Strides[1] ) {
                    sws = character.accessory.Swift_Strides[1];
                }
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
                    ba = baseAttackDamage(character, enemy, ww ? character.defense * 0.15 : 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    if (tt >= 50) {
                        heal += calcHeal(character.max_hp * (0.04 + t * 0.04), 1, enemy);
                        tt = 0;
                    } else {
                        tt += 5;
                    }
                    ww = false;
                } else if (c === 'A') {
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, ww ? character.defense * 0.15 : 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 100, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    if (tt >= 50) {
                        heal += calcHeal(character.max_hp * (0.04 + t * 0.04), 1, enemy);
                        tt = 0;
                    } else {
                        tt += 5;
                    }
                    ww = false;
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 100 + q * 50, 0.3, 1);
                        tt += 5;
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        const db = 6 + w * 14 + character.defense * 0.1;
                        for (let x = index; x <= index + 5 && x < de_bonus.length; x++) {
                            de_bonus[x] = db;
                        }
                        ww = true;
                    }
                } else if (c === 'e') {
                    if (e >= 0) {
                        const dm = -0.04 - e * 0.02;
                        for (let x = index + 1; x <= index + 12 && x < defense_minus.length; x++) {
                            defense_minus[x] = dm;
                        }
                        let currHp = enemy.max_hp ? data.hp - damage + heal + shield : 0;
                        if (currHp > enemy.max_hp) {
                            currHp = enemy.max_hp;
                        } else if (currHp < 0) {
                            currHp = 0;
                        }
                        damage += calcSkillDamage(character, enemy, (enemy.max_hp ? currHp * (0.05 + e * 0.03) : 0) + character.defense * 0.8, 0, 1);
                        tt += 5;
                    }
                } else if (c === 'E') {
                    if (e >= 0) {
                        const dm = -0.04 - e * 0.02;
                        for (let x = index + 1; x <= index + 12 && x < defense_minus.length; x++) {
                            defense_minus[x] = dm;
                        }
                        let currHp = enemy.max_hp ? data.hp - damage + heal + shield : 0;
                        if (currHp > enemy.max_hp) {
                            currHp = enemy.max_hp;
                        } else if (currHp < 0) {
                            currHp = 0;
                        }
                        damage += calcSkillDamage(character, enemy, (enemy.max_hp ? currHp * (0.05 + e * 0.03) : 0) + character.defense * 0.8, 0, 1);
                        tt += 5;
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
                        damage += calcSkillDamage(character, enemy, 60 + e * 35, 0, 1);
                        tt += 5;
                    }
                } else if (c === 'r') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 200 + r * 100, 0.6, 1);
                        tt += 5;
                    }
                } else if (c === 'R') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 600 + r * 300, 1.8, 1);
                        tt += 5;
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Glove') {
                            if (character.weapon.Smolder && sm < 4) {
                                sm++;
                                sms = 8;
                            }
                            if (fi === character.weapon.Focused_Impact * 2) {
                                fi--;
                            }
                            const coe = wm < 13 ? 1.4 : 2;
                            const bonus = calcTrueDamage(character, enemy, wm < 13 ? 50 : 100);
                            ba = baseAttackDamage(character, enemy, 0, 1 + coe, 0, 1) + bonus;
                            heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                            if (tt >= 50) {
                                heal += calcHeal(character.max_hp * (0.07 + t * 0.04), 1, enemy);
                                tt = 0;
                            } else {
                                tt += 5;
                            }
                            damage += ba;
                        } else if (type === 'Tonfa') {
                            damage += 0;
                        }
                    }
                } else if (c === 'p' || c === 'P') {
                    if (character.trap) {
                        damage += floor(character.trap.Trap_Damage * (1.04 + character.TRAP_MASTERY.selectedIndex * 0.04));
                    }
                }
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
                ww: ww,
                tt: tt
            }
        };
    }
    ,COMBO_Option: 'Eadqaaawaaqr'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Glove' ? 'd & D: 무스 데미지\n' :
            weapon === 'Tonfa' ? 'd & D: 데미지 없음\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q & Q: Q스킬 데미지\n' +
            'w & W: 방어력 버프, 다음 평타 강화\n' +
            'e: E스킬 데미지(현재 체력 비례)\n' +
            'E: E스킬 벽꿍 데미지(현재 체력 비례)\n' +
            'r: R스킬 즉발 데미지\n' +
            'R: R스킬 최대 데미지\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};