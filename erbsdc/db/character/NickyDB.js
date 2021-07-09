'use strict';
const Nicky = {
     Attack_Power: 24
    ,Attack_Power_Growth: 2.2
    ,Health: 660
    ,Health_Growth: 67
    ,Health_Regen: 0.7
    ,Health_Regen_Growth: 0.06 //
    ,Stamina: 410
    ,Stamina_Growth: 22
    ,Stamina_Regen: 1.9
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 20
    ,Defense_Growth: 2
    ,Atk_Speed: 0.11
    ,Movement_Speed: 3.1 //
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Glove]
    ,correction: {
        Glove: [
            [0, 0, 0],
            [0, 0, 0]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            if (character.DIV.querySelector('.nicky_t').checked) {
                const bonus = calcTrueDamage(character, enemy, 10 + t * 20);
                return "<b class='damage'>" + (damage + bonus) + '</b> ( ' +  min + ', ' + bonus + ' - ' + max + ', ' + bonus + ' )';
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            const ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            let damage;
            const life = calcHeal(character, ba * (character.life_steal / 100), character.attack_speed, enemy);
            if (character.DIV.querySelector('.nicky_t').checked) {
                const bonus = calcTrueDamage(character, enemy, 10 + t * 20);
                damage = round((ba + bonus) * character.attack_speed * 100) / 100;
            } else {
                damage = round(ba * character.attack_speed * 100) / 100;
            }
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
            const min = calcSkillDamage(character, enemy, 30 + q * 25, 0.4, 1);
            const max = calcSkillDamage(character, enemy, 60 + q * 50, 0.8, 1);
            const damage = calcSkillDamage(character, enemy, 25 + q * 25, 1, 1);
            const cool = 10000 / ((9 - q) * (100 - character.cooldown_reduction) + 100);
            return "<b class='damage'>" + (max + damage) + '</b> ( ' + min + ', ' + damage + ' ~ ' + max + ', ' + damage  + " )<b> _sd/s: </b><b class='damage'>" + round((max + damage) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const damage = calcSkillDamage(character, enemy, 20 + w * 20, 0.2, 1);
            const cool = 10000 / ((9 - w * 0.5) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const min = calcSkillDamage(character, enemy, 60 + e * 50, 0.4, 1);
            const max = calcSkillDamage(character, enemy, 90 + e * 75, 0.4, 1);
            const cool = 10000 / ((14 - e * 1.5) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + min + ', ' + max + "</b><b> _sd/s: </b><b class='damage'>" + round(min * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const damage = calcSkillDamage(character, enemy, 150 + r * 100, 0.7, 1);
            return "<b class='damage'>" + damage + '</b>';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Glove') {
                const t = character.T_LEVEL.selectedIndex;
                const coe = wm < 13 ? 1.4 : 2;
                const bonus = calcTrueDamage(character, enemy, wm < 13 ? 50 : 100);
                const bonus2 = character.DIV.querySelector('.nicky_t').checked ?
                    calcTrueDamage(character, enemy, 10 + t * 20) : 0;
                const damage = baseAttackDamage(character, enemy, 0, 1 + coe, 0, 1) + bonus + bonus2;
                const life = calcHeal(character, damage * (character.life_steal / 100), 1, enemy);
                return "<b class='damage'>" + damage + "</b><b> _h: </b><b class='heal'>" + life + '</b>';
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
            const damage = calcTrueDamage(character, enemy, 10 + t * 20);
            return "<b class='damage'>" + damage + '</b>';
        }
        return '-';
    }
    ,T_Option: "<b> _use</b><input type='checkbox' class='nicky_t' onchange='updateDisplay()'>"
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
            '';
        const skill =
            weapon === 'Glove' ? '"스킬 데미지" _h: "스킬 흡혈량"' :
            '';
        return '니키 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "합산 데미지" ( "최소 데미지", "2타 데미지" ~ "최대 데미지", "2타 데미지" )\n' +
            'W: "스킬 데미지"\n' +
            'E: "스킬 데미지" - "분노 데미지"\n' +
            'R: "스킬 데미지"\n' +
            'D: ' + skill + '\n' +
            'T: "추가 데미지" _use "스킬 사용"\n';
    }
    ,COMBO_VARS: '{\"qq\":false}'
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
        let throns = 0;
        let heal = calcHeal(character, character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let qq = data.vars.qq;

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
                if (c === 'a' || c === 'A') {
                    const crit = ficri ? 100 : auto_cri ? character.critical_strike_chance : c === 'a' ? 0 : 100;
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, crit, 1);
                    if (sws) {
                        damage += calcItemDamage(character, enemy, character.accessory.Swift_Strides[0] * round(sws / character.accessory.Swift_Strides[1], 2));
                        sws = 0.0001;
                    }
                    damage += ba;
                    if (enemy.head && enemy.head.Throns) {
                        throns += floor(ba * 0.07);
                    }
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        if (qq) {
                            damage += calcSkillDamage(character, enemy, 25 + q * 25, 1, 1);
                        } else if (c == 'q') {
                            damage += calcSkillDamage(character, enemy, 30 + q * 25, 0.4, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 60 + q * 50, 0.8, 1);
                        }
                        qq = !qq;
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 20 + w * 20, 0.2, 1);
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        damage += calcSkillDamage(character, enemy, c == 'e' ? 60 + e * 50 : 90 + e * 75, 0.4, 1);
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 150 + r * 100, 0.7, 1);
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
                            if (sws) {
                                damage += calcItemDamage(character, enemy, character.accessory.Swift_Strides[0] * round(sws / character.accessory.Swift_Strides[1], 2));
                                sws = 0.0001;
                            }
                            damage += ba;
                            if (enemy.head && enemy.head.Throns) {
                                throns += floor(ba * 0.07);
                            }
                            heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                        }
                    }
                } else if (c === 't' || c === 'T') {
                    const crit = ficri ? 100 : auto_cri ? character.critical_strike_chance : c === 't' ? 0 : 100;
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, crit, 1);
                    if (sws) {
                        damage += calcItemDamage(character, enemy, character.accessory.Swift_Strides[0] * round(sws / character.accessory.Swift_Strides[1], 2));
                        sws = 0.0001;
                    }
                    damage += ba + calcTrueDamage(character, 10 + t * 20);
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
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
            throns: throns,
            heal: heal,
            shield: shield,
            vars: {
                fi: fi,
                sm: sm,
                sms: sms,
                sws: sws,
                qq: qq
            }
        };
    }
    ,COMBO_Option: 'QadqwEeaaEqaq'
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
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q: Q스킬 최소 데미지 / 2타 데미지\n' +
            'q: Q스킬 최대 데미지 / 2타 데미지\n' +
            'w & W: W스킬 데미지\n' +
            'e: E스킬 데미지\n' +
            'E: E스킬 강화 데미지\n' +
            'r & R: R스킬 데미지\n' +
            't: 패시브 데미지\n' +
            'T: 패시브 치명타 데미지\n' +
            d +
            'p & P: 트랩 데미지';
    }
};
