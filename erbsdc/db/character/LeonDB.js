'use strict';
const Leon = {
     Attack_Power: 33
    ,Attack_Power_Growth: 2.5
    ,Health: 710
    ,Health_Growth: 79
    ,Health_Regen: 1.1
    ,Health_Regen_Growth: 0.07
    ,Stamina: 420
    ,Stamina_Growth: 16
    ,Stamina_Regen: 2.2
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 22
    ,Defense_Growth: 2.2
    ,Atk_Speed: 0.05
    ,Movement_Speed: 3.1 //
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Glove]
    ,correction: {
        Glove: [
            [0, -6, -10],
            [0, 0, -3]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            if (character.DIV.querySelector('.leon_t').checked) {
                const tBonus = calcSkillDamage(character, enemy, 5 + t * 5, 0.2, 1);
                return "<b class='damage'>" + (damage + tBonus) + '</b> ( ' +  min + ', ' + tBonus + ' - ' + max + ', ' + tBonus + ' )';
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
            if (character.DIV.querySelector('.leon_t').checked) {
                const tBonus = calcSkillDamage(character, enemy, 5 + t * 5, 0.2, 1);
                damage = round((ba + tBonus) * character.attack_speed * 100) / 100;
            } else {
                damage = round(ba * character.attack_speed * 100) / 100;
            }
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
            const damage = calcSkillDamage(character, enemy, 40 + q * 40, 0.4, 1);
            const cool = 10000 / ((10 - q * 0.5) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const t = character.T_LEVEL.selectedIndex;
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            const shield = floor(60 + w * 35 + character.attack_power * 0.3);
            const wBonus = calcSkillDamage(character, enemy, 10 + w * 5, 0.3, 1);
            if (character.DIV.querySelector('.leon_t').checked) {
                const tBonus = calcSkillDamage(character, enemy, 5 + t * 5, 0.2, 1);
                return "<b class='damage'>" + (damage + wBonus + tBonus) + '</b> ( ' +  min + ', ' + wBonus + ', ' + tBonus + ' - ' + max + ', ' + wBonus + ', ' + tBonus + ' )';
            }
            return "<b class='damage'>" + (damage + wBonus) + '</b> ( ' +  min + ', ' + wBonus + ' - ' + max + ', ' + wBonus + " )</b><b> _s: </b><b class='shield'>" + shield + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const damage = calcSkillDamage(character, enemy, 60 + e * 30, 0.35, 1);
            const cool = 10000 / ((20 - e) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const damage = calcSkillDamage(character, enemy, 150 + r * 80, 0.5, 1);
            const bonus = calcSkillDamage(character, enemy, enemy.max_hp ? enemy.max_hp * ((0.15 + r * 0.05) / (1.15 + r * 0.05)) : 0, 0, 1);
            return "<b class='damage'>" + damage + ' ~ ' + (damage + bonus) + '</b>';
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
            const damage = calcSkillDamage(character, enemy, 5 + t * 5, 0.2, 1);
            return "<b class='damage'>" + damage + '</b>';
        }
        return '-';
    }
    ,T_Option: "<b> _use</b><input type='checkbox' class='leon_t' onchange='updateDisplay()'>"
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
            weapon === 'Glove' ? '"스킬 데미지"  _h: "평균 흡혈량"' :
            '';
        return '레온 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "스킬 데미지"\n' +
            'W: "평균 데미지" ( "평타 데미지", "보너스 데미지" - "치명타 데미지", "보너스 데미지" ) _s: 쉴드량\n' +
            'E: "스킬 데미지"\n' +
            'R: "최소 데미지" ~ "최대 데미지"\n' +
            'D: ' + skill + '\n' +
            'T: "추가 데미지" _use "스킬 사용"\n';
    }
    ,COMBO_VARS: '{\"ww\":0}'
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
        let ww = data.vars.ww;

        const cool = (18 - w) * (100 - character.cooldown_reduction) / 100;
        if (index === 0 || floor(index / 2 / cool) > floor((index - 1) / 2 / cool)) {
            shield += floor(60 + w * 35 + character.attack_power * 0.3);
        }

        let fi = character.weapon && character.weapon.Focused_Impact ? data.vars.fi || character.weapon.Focused_Impact * 2 : 0 ;
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
                        enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                    } else {
                        enemy.defense = floor((enemy.pure_defense + defense_bonus[index]) * (1 + defense_percent[index]) * (1 + defense_minus[index]));
                    }
                }
                if (c === 'a') {
                    ba = baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : 0, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    if (ww > 0) {
                        ww--;
                        damage += calcSkillDamage(character, enemy, 10 + w * 5, 0.3, 1);
                    }
                } else if (c === 'A') {
                    ba = baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : 100, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    if (ww > 0) {
                        ww--;
                        damage += calcSkillDamage(character, enemy, 10 + w * 5, 0.3, 1);
                    }
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 40 + q * 40, 0.4, 1);
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        ww = 3;
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        damage += calcSkillDamage(character, enemy, 60 + e * 30, 0.35, 1);
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        if (enemy.max_hp) {
                            let lost = enemy.max_hp - (data.hp - damage + heal + shield);
                            if (lost < 0) {
                                lost = 0;
                            } else if (lost > enemy.max_hp) {
                                lost = enemy.max_hp * (0.15 + r * 0.05);
                            } else {
                                lost *= (0.15 + r * 0.05);
                            }
                            damage += calcSkillDamage(character, enemy, lost, 0, 1);
                        }
                        damage += calcSkillDamage(character, enemy, 150 + r * 80, 0.5, 1);
                    }
                } else if (c === 'd') {
                    if (wm > 5) {
                        if (type === 'Glove') {
                            const coe = wm < 13 ? 1.4 : 2;
                            const bonus = calcTrueDamage(character, enemy, wm < 13 ? 50 : 100);
                            ba = baseAttackDamage(character, enemy, 0, 1 + coe, 0, 1) + bonus;
                            damage += ba;
                            heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                            if (ww > 0) {
                                ww--;
                                damage += calcSkillDamage(character, enemy, 10 + w * 5, 0.3, 1);
                            }
                        }
                    }
                } else if (c === 'D') {
                    if (wm > 5) {
                        if (type === 'Glove') {
                            const coe = wm < 13 ? 1.4 : 2;
                            const bonus = calcTrueDamage(character, enemy, wm < 13 ? 50 : 100);
                            ba = baseAttackDamage(character, enemy, 0, 1 + coe, 0, 1) + bonus;
                            damage += ba;
                            heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                            damage += calcSkillDamage(character, enemy, 5 + t * 5, 0.2, 1);
                            if (ww > 0) {
                                ww--;
                                damage += calcSkillDamage(character, enemy, 10 + w * 5, 0.3, 1);
                            }
                        }
                    }
                } else if (c === 't') {
                    ba = baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : 0, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    damage += calcSkillDamage(character, enemy, 5 + t * 5, 0.2, 1);
                    if (ww > 0) {
                        ww--;
                        damage += calcSkillDamage(character, enemy, 10 + w * 5, 0.3, 1);
                    }
                } else if (c === 'T') {
                    ba = baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : 100, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    damage += calcSkillDamage(character, enemy, 5 + t * 5, 0.2, 1);
                    if (ww > 0) {
                        ww--;
                        damage += calcSkillDamage(character, enemy, 10 + w * 5, 0.3, 1);
                    }
                } else if (c === 'p' || c === 'P') {
                    if (character.trap) {
                        damage += floor(character.trap.Trap_Damage * (1.04 + character.TRAP_MASTERY.selectedIndex * 0.04));
                    }
                }
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
                ww: ww
            }
        };
    }
    ,COMBO_Option: 'qewtDttttrt'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Glove' ? 'd: 무스 데미지\nD: 무스 데미지 패시브 추뎀\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q & Q: Q스킬 데미지\n' +
            'w & W: W스킬 사용 (추뎀 3회)\n' +
            'e & E: E스킬 데미지\n' +
            'r & R: R스킬 데미지 (잃은 체력 추뎀)\n' +
            't: 패시브 데미지\n' +
            'T: 패시브 치명타 데미지\n' +
            d +
            'p & P: 트랩 데미지';
    }
};