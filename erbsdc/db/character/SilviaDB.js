'use strict';
const Silvia = {
     Attack_Power: 22
    ,Attack_Power_Growth: 2
    ,Health: 600
    ,Health_Growth: 58
    ,Health_Regen: 0.4
    ,Health_Regen_Growth: 0.03
    ,Stamina: 440
    ,Stamina_Growth: 22
    ,Stamina_Regen: 2.1
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 24
    ,Defense_Growth: 1.5
    ,Atk_Speed: 0.05
    ,Movement_Speed: 3.05
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Pistol]
    ,correction: {
        Pistol: [
            [0, -16, -17],
            [0, 0, 0],
            [0, -10, -10]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon && !character.DIV.querySelector('.silvia_r').checked) {
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon && !character.DIV.querySelector('.silvia_r').checked) {
            const as = 10 / (9.5 / character.attack_speed + 2);
            const shot = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1) * 2 +
                baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
            const damage1 = round(shot * as * 100) / 100;
            const damage2 = round(shot * character.attack_speed * 100) / 100;
            const life1 = calcHeal(shot * (character.life_steal / 100), as, enemy);
            const life2 = calcHeal(shot * (character.life_steal / 100), character.attack_speed, enemy);
            return "<b class='damage'>" + damage1 + '</b> - ' + damage2 + "<b> __h/s: </b><b class='heal'>" + life1 + '</b> - ' + life2;
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
            let damage, cool;
            if (character.DIV.querySelector('.silvia_r').checked) {
                damage = calcSkillDamage(character, enemy, 60 + q * 35, 0.6, 1);
                cool = 10000 / ((3.5 - q * 0.5) * (100 - character.cooldown_reduction));
                return "<b class='damage'>" + damage + "</b><b> __sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
            }
            damage = calcSkillDamage(character, enemy, 30 + q * 35, 0.4, 1);
            let heal = calcHeal((40 + q * 20 + character.attack_power * 0.5) *
                (100 + character.character.correction[character.weapon.Type][2][character.MODE.selectedIndex]) / 100, 1, enemy);
            cool = 10000 / ((7.5 - q * 0.75) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> __h: </b><b class='heal'>" + heal + "</b><b> __sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            let damage, cool;
            if (character.DIV.querySelector('.silvia_r').checked) {
                damage = calcSkillDamage(character, enemy, 90 + w * 40, 0.6, 1);
                cool = 10000 / ((10 - w * 1) * (100 - character.cooldown_reduction));
                return "<b class='damage'>" + damage + "</b><b> __sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
            }
            damage = calcSkillDamage(character, enemy, 40 + w * 20, 0.3, 1);
            cool = 10000 / ((16 - w * 1) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> __sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            let min, max, cool;
            if (character.DIV.querySelector('.silvia_r').checked) {
                const move = character.movement_speed + character.movement_speed_while_not_in_combat;
                min = calcSkillDamage(character, enemy, 40 + e * 25 + move / 17 * 2 * (6 + e * 4), 0.6, 1);
                max = calcSkillDamage(character, enemy, 40 + e * 25 + move * (6 + e * 4), 0.6, 1);
                cool = 10000 / ((14 - e * 1) * (100 - character.cooldown_reduction));
                return "<b class='damage'>" + min + ' ~ ' + max + "</b><b> __sd/s: </b><b class='damage'>" + round((min + max) / 2 * cool) / 100 + '</b>';
            }
            min = calcSkillDamage(character, enemy, 80 + e * 20, 0.5, 1);
            max = calcSkillDamage(character, enemy, 154 + e * 33, 1.32, 1);
            cool = 10000 / ((13 - e * 1) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + min + ' ~ ' + max + "</b><b> __sd/s: </b><b class='damage'>" + round((min + max) / 2 * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            if (character.DIV.querySelector('.silvia_r').checked) {
                const damage = baseAttackDamage(character, enemy, 0, 1 + r * 0.25, character.critical_strike_chance, 1);
                const min = baseAttackDamage(character, enemy, 0, 1 + r * 0.25, 0, 1);
                const max = baseAttackDamage(character, enemy, 0, 1 + r * 0.25, 100, 1);
                return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
            }
            return '-';
        }
        return '-';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='silvia_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Pistol') {
                return '-';
            }
        }
        return '- ';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        return '';
    }
    ,T_Option: "<input type='number' class='stack silvia_t' value='0' onchange='fixLimitNum(this, 15)'><b>Stack"
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type =
            weapon === 'Pistol' ? '권총' :
            '';
        const skill =
            weapon === 'Pistol' ? '"데미지 없음"' :
            '';
        if (character.DIV.querySelector('.silvia_r').checked) {
            return '실비아 ( ' + type + ' )\n' +
                'A: "평타 불가"\n' +
                'DPS: "평타 불가"\n' +
                'HPS: "초당 회복량"\n' +
                'Q: "스킬 데미지"\n' +
                'W: "스킬 데미지"\n' +
                'E: "최소 데미지" ~ "최대 데미지"\n' +
                'R: "평균 데미지" ( "평타 데미지" - "치명타 데미지" ) _use "스킬 사용"\n' +
                'D: ' + skill + '\n' +
                'T: "스택"\n';
        }
        return '실비아 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "스킬 데미지" __h: "회복량"\n' +
            'W: "스킬 데미지"\n' +
            'E: "최소 데미지" ~ "최대 데미지"\n' +
            'R: _use "스킬 사용"\n' +
            'D: ' + skill + '\n' +
            'T: "스택"\n';
    }
    ,COMBO_VARS: '{\"rr\":1}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const et = enemy.T_LEVEL.selectedIndex;
        let damage = 0;
        let heal = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let rr = data.vars.rr;
        if (character.weapon) {
            for (let i = 0; i < combo.length; i++) {
                c = combo.charAt(i);
                if (enemy.defense) {
                    if (enemy.character === Magnus) {
                        let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                        if (lost < 0) {
                            lost = 0;
                        }
                        enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.002)) * (1 + defense_minus[index]));
                    } else {
                        enemy.defense = floor((enemy.pure_defense + defense_bonus[index]) * (1 + defense_percent[index]) * (1 + defense_minus[index]));
                    }
                }
                if (c === 'a') {
                    if (rr === 2) {
                        rr--;
                        ba = baseAttackDamage(character, enemy, 0, 1 + r * 0.25, 0, 1);
                        damage += ba;
                        heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    } else if (rr) {
                        ba = baseAttackDamage(character, enemy, 0, 1, 0, 1);
                        damage += ba;
                        heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    }
                } else if (c === 'A') {
                    if (rr === 2) {
                        rr--;
                        ba = baseAttackDamage(character, enemy, 0, 1 + r * 0.25, 100, 1);
                        damage += ba;
                        heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    } else if (rr) {
                        ba = baseAttackDamage(character, enemy, 0, 1, 100, 1);
                        damage += ba;
                        heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    }
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        if (rr) {
                            damage += calcSkillDamage(character, enemy, 30 + q * 35, 0.4, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 60 + q * 35, 0.6, 1);
                        }
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        if (rr) {
                            damage += calcSkillDamage(character, enemy, 40 + w * 20, 0.3, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 90 + w * 40, 0.6, 1);
                        }
                    }
                } else if (c === 'e') {
                    if (e >= 0) {
                        if (rr) {
                            damage += calcSkillDamage(character, enemy, 80 + e * 20, 0.5, 1);
                        } else {
                            const move = character.pure_movement_speed + 0.3 + r * 0.075;
                            damage += calcSkillDamage(character, enemy, 40 + e * 25 + move / 17 * 2 * (6 + e * 4), 0.6, 1);
                        }
                    }
                } else if (c === 'E') {
                    if (e >= 0) {
                        if (rr) {
                            damage += calcSkillDamage(character, enemy, 154 + e * 33, 1.32, 1);
                        } else {
                            const move = character.pure_movement_speed + 0.3 + r * 0.075 + character.movement_speed_while_not_in_combat;
                            damage += calcSkillDamage(character, enemy, 40 + e * 25 + move * (6 + e * 4), 0.6, 1);
                        }
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        if (rr) {
                            rr = 0;
                        } else {
                            rr = 2;
                        }
                    }
                } else if (c === 'p' || c === 'P') {
                    if (character.trap) {
                        damage += floor(character.trap.Trap_Damage * (1.04 + character.TRAP_MASTERY.selectedIndex * 0.04));
                    }
                }
            }
        }
        return {
            hp: data.hp - damage,
            damage: damage,
            heal: heal,
            shield: shield,
            vars: {
                rr: rr
            }
        };
    }
    ,COMBO_Option: 'wereqwqraqdqerqweq'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Pistol' ? 'd & D: 데미지 없음\n' :
            '';
        return 'a: 기본공격 데미지 (오토바이 탑승시 데미지 없음)\n' +
            'A: 치명타 데미지 (오토바이 탑승시 데미지 없음)\n' +
            'q & Q: Q스킬 데미지\n' +
            'w & W: W스킬 데미지\n' +
            'e: E스킬 최소 데미지\n' +
            'E: E스킬 최대 데미지\n' +
            'r & R: R스킬 On / Off\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};