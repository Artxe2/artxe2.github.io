'use strict';
const Hart = {
     Attack_Power: 22
    ,Attack_Power_Growth: 3.3
    ,Health: 660
    ,Health_Growth: 60
    ,Health_Regen: 0.8
    ,Health_Regen_Growth: 0.04
    ,Stamina: 420
    ,Stamina_Growth: 16
    ,Stamina_Regen: 1.7
    ,Stamina_Regen_Growth: 0.04
    ,Defense: 25
    ,Defense_Growth: 1.9
    ,Atk_Speed: 0.09
    ,Movement_Speed: 3.05
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Guitar]
    ,correction: {
        Guitar: [
            [0, -7, -9],
            [0, 0, -3]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            if (character.DIV.querySelector('.hart_t').checked) {
                const damage2 = baseAttackDamage(character, enemy, 0, 0.15, character.critical_strike_chance, 1);
                const min2 = baseAttackDamage(character, enemy, 0, 0.15, 0, 1);
                const max2 = baseAttackDamage(character, enemy, 0, 0.15, 100, 1);
                if (character.DIV.querySelector('.hart_tt').checked) {
                    return "<b class='damage'>" + (damage + damage2 + damage2) + '</b> ( ' +  min + ', ' + min2 + ', ' + min2 + ' - ' + max + ', ' + max2 + ', ' + max2 + ' )';
                }
                return "<b class='damage'>" + (damage + damage2) + '</b> ( ' +  min + ', ' + min2 + ' - ' + max + ', ' + max2 + ' )';
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            const ba1 = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            let damage, life;
            if (character.DIV.querySelector('.hart_t').checked) {
                const ba2 = baseAttackDamage(character, enemy, 0, 0.15, character.critical_strike_chance, 1);
                if (character.DIV.querySelector('.hart_tt').checked) {
                    damage = round((ba1 + ba2 + ba2) * character.attack_speed * 100) / 100;
                    life = calcHeal((ba1 + ba2 + ba2) * (character.life_steal / 100), character.attack_speed, enemy);
                } else {
                    damage = round((ba1 + ba2) * character.attack_speed * 100) / 100;
                    life = calcHeal((ba1 + ba2) * (character.life_steal / 100), character.attack_speed, enemy);
                }
            } else {
                damage = round(ba1 * character.attack_speed * 100) / 100;
                life = calcHeal(ba1 * (character.life_steal / 100), character.attack_speed, enemy);
            }
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
            const min = calcSkillDamage(character, enemy, 80 + q * 20, 0.3, 1);
            const max = calcSkillDamage(character, enemy, 160 + q * 40, 0.6, 1);
            const cool = 10000 / (4 * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + min + ' ~ ' + max + "</b><b> _sd/s: </b><b class='damage'>" + round(min * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option:  "<b> _up</b><input type='checkbox' class='hart_q' onchange='hartUp(0, 0)'/><input type='checkbox' class='hart_qq' onchange='hartUp(0, 1)'/>"
    ,W_Skill: (character, enemy) => {
        return '';
    }
    ,W_Option:  "<b> _up</b><input type='checkbox' class='hart_w' onchange='hartUp(1, 0)'/><input type='checkbox' class='hart_ww' onchange='hartUp(1, 1)'/>" +
        "<b> _use</b><input type='checkbox' class='hart_w_u' onchange='updateDisplay()'>"
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {

            const skill_amplification = character.skill_amplification;
            character.skill_amplification = round(character.pure_skill_amplification);

            const sap = character.DIV.querySelector('.hart_ee').checked ? 23 : character.DIV.querySelector('.hart_e').checked ? 16 : 0;
            character.skill_amplification += sap;
            const damage1 = calcSkillDamage(character, enemy, 20 + e * 10, 0.4, 1);
            character.skill_amplification += sap;
            const damage2 = calcSkillDamage(character, enemy, 20 + e * 10, 0.4, 1);
            character.skill_amplification += sap;
            const damage3 = calcSkillDamage(character, enemy, 20 + e * 10, 0.4, 1);
            const cool = 10000 / ((18 - e) * (100 - character.cooldown_reduction) + 46);

            character.skill_amplification = skill_amplification;

            return "<b class='damage'>" + (damage1 + damage2 + damage3) + '</b> ( ' + damage1 + ', ' + damage2 + ', ' + damage3 + " )<b> _sd/s: </b><b class='damage'>" + round((damage1 + damage2 + damage3) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option:  "<b> _up</b><input type='checkbox' class='hart_e' onchange='hartUp(2, 0)'/><input type='checkbox' class='hart_ee' onchange='hartUp(2, 1)'/>" +
        "_ <input type='number' class='stack hart_e_s' value='0' onchange='fixLimitNum(this, 3)'><b>Stack</b>"
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const regen = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
                (character.food ? character.food.HP_Regen / 30 : 0), 2, enemy);
            const heal = calcHeal(20 + r * 10 + (character.max_hp * (0.02 + r * 0.01)), 1, enemy);
            const total = round((heal + regen) * 5 * 100) / 100
            return "<b> _h: </b><b class='heal'>" + total + "</b> ( [ <b class='heal'>" + heal + '</b>, ' + regen + ' ] x 5s )';
        }
        return '-';
    }
    ,R_Option: "<b> _up</b><input type='checkbox' class='hart_r' onchange='hartUp(3, 0)'/><input type='checkbox' class='hart_rr' onchange='hartUp(3, 1)'/>"
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Guitar') {
                const wm = character.WEAPON_MASTERY.selectedIndex;
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, wm < 13 ? 1 : 1.8, 1) + '</b>';
            }
        }
        return '-'
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        return '';
    }
    ,T_Option: "<b> _up</b><input type='checkbox' class='hart_t' onchange='hartUp(4, 0)'/><input type='checkbox' class='hart_tt' onchange='hartUp(4, 1)'/>"
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type =
            weapon === 'Guitar' ? '기타' :
            '';
        const skill =
            weapon === 'Guitar' ? '"스킬 데미지"' :
            '';
        if (character.DIV.querySelector('.hart_tt').checked) {
            return '하트 ( ' + type + ' )\n' +
                'A: "평균 데미지" ( "1타 데미지", "2타 데미지", "3타 데미지" - "1타 치명타", "2타 치명타", "3타 치명타" )\n' +
                'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
                'HPS: "초당 회복량"\n' +
                'Q: "최소 데미지" ~ "최대 데미지" _up "스킬 강화"\n' +
                'W: "데미지 없음" _up "스킬 강화"\n' +
                'E: "합산 데미지" ( "1타 데미지", "2타 데미지", "3타 데미지" ) _up "스킬 강화"\n' +
                'R: _h: "총 회복량(체젠 및 음식 효과 포함)" ( ["초당 회복량", "초당 체젠"]) _up "스킬 강화"\n' +
                'D: ' + skill + '\n' +
                'T: "데미지 없음" _up "스킬 강화"\n';
        }
        if (character.DIV.querySelector('.hart_t').checked) {
            return '하트 ( ' + type + ' )\n' +
                'A: "평균 데미지" ( "1타 데미지", "2타 데미지" - "1타 치명타", "2타 치명타" )\n' +
                'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
                'HPS: "초당 회복량"\n' +
                'Q: "최소 데미지" ~ "최대 데미지" _up "스킬 강화"\n' +
                'W: "데미지 없음" _up "스킬 강화"\n' +
                'E: "합산 데미지" ( "1타 데미지", "2타 데미지", "3타 데미지" ) _up "스킬 강화"\n' +
                'R: _h: "총 회복량(체젠 및 음식 효과 포함)" ( ["초당 회복량", "초당 체젠"]) _up "스킬 강화"\n' +
                'D: ' + skill + '\n' +
                'T: "데미지 없음" _up "스킬 강화"\n';
        }
        return '하트 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "최소 데미지" ~ "최대 데미지" _up "스킬 강화"\n' +
            'W: _up "스킬 강화"\n' +
            'E: "합산 데미지" ( "1타 데미지", "2타 데미지", "3타 데미지" ) _up "스킬 강화"\n' +
            'R: _h: "총 회복량(체젠 및 음식 효과 포함)" ( ["초당 회복량", "초당 체젠"]) _up "스킬 강화"\n' +
            'D: ' + skill + '\n' +
            'T: _up "스킬 강화"\n';
    }
    ,COMBO_VARS: '{\"ww\":[],\"ee\":[]}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        const auto_cri = character.AUTO_CRI.checked;
        let damage = 0;
        let heal = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        const sap = character.DIV.querySelector('.hart_ee').checked ? 23 : character.DIV.querySelector('.hart_e').checked ? 16 : 0;
        let ww = data.vars.ww, ee = data.vars.ee;

        let fi = character.weapon && character.weapon.Focused_Impact ? data.vars.fi || character.weapon.Focused_Impact * 2 : 0 ;
        if (character.weapon) {
            let ficri = character.weapon.Focused_Impact * 2 === fi;
            if (fi < character.weapon.Focused_Impact * 2) {
                fi--;
            }
            const type = character.weapon.Type;
            const hart_w = character.DIV.querySelector('.hart_w');
            const hart_ww = character.DIV.querySelector('.hart_ww');
            for (let i = 0; i < combo.length; i++) {
                c = combo.charAt(i);
                character.attack_power = floor(character.pure_attack_power * (1 + (ww[index] ? 0.12 + w * 0.07 : 0)));
                character.skill_amplification =
                    round(character.pure_skill_amplification + (ee[index] ? ee[index] * sap : 0));
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
                    if (character.DIV.querySelector('.hart_t').checked) {
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                        }
                        ba += baseAttackDamage(character, enemy, 0, 0.15, auto_cri ? character.critical_strike_chance : 0, 1);
                        if (character.DIV.querySelector('.hart_tt').checked) {
                            if (enemy.character === Magnus) {
                                let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                if (lost < 0) {
                                    lost = 0;
                                }
                                enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                            }
                            ba += baseAttackDamage(character, enemy, 0, 0.15, auto_cri ? character.critical_strike_chance : 0, 1);
                        }
                    }
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);

                    if (ww[index] && ww[index] === 1) {
                        for (let x = index; ww[x]; x++) {
                            ww[x] = 2;
                        }
                        const dm = hart_ww.checked ? -0.45 : hart_w.checked ? -0.3 : 0;
                        if (dm) {
                            for (let x = index + 1; x <= index + 10 && x < defense_minus.length; x++) {
                                defense_minus[x] = dm;
                            }
                        }
                    }
                } else if (c === 'A') {
                    ba = baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : 100, 1);
                    if (character.DIV.querySelector('.hart_t').checked) {
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                        }
                        ba += baseAttackDamage(character, enemy, 0, 0.15, auto_cri ? character.critical_strike_chance : 100, 1);
                        if (character.DIV.querySelector('.hart_tt').checked) {
                            if (enemy.character === Magnus) {
                                let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                if (lost < 0) {
                                    lost = 0;
                                }
                                enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                            }
                            ba += baseAttackDamage(character, enemy, 0, 0.15, auto_cri ? character.critical_strike_chance : 100, 1);
                        }
                    }
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);

                    if (ww[index] && ww[index] === 1) {
                        for (let x = index; ww[x]; x++) {
                            ww[x] = 2;
                        }
                        const dm = hart_ww.checked ? -0.45 : hart_w.checked ? -0.3 : 0;
                        if (dm) {
                            for (let x = index + 1; x <= index + 10 && x < defense_minus.length; x++) {
                                defense_minus[x] = dm;
                            }
                        }
                    }
                } else if (c === 'q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 80 + q * 20, 0.3, 1);

                        if (ww[index] && ww[index] === 1) {
                            for (let x = index; ww[x]; x++) {
                                ww[x] = 2;
                            }
                            const dm = hart_ww.checked ? -0.45 : hart_w.checked ? -0.3 : 0;
                            if (dm) {
                                for (let x = index + 1; x <= index + 10 && x < defense_minus.length; x++) {
                                    defense_minus[x] = dm;
                                }
                            }
                        }
                    }
                } else if (c === 'Q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 160 + q * 40, 0.6, 1);

                        if (ww[index] && ww[index] === 1) {
                            for (let x = index; ww[x]; x++) {
                                ww[x] = 2;
                            }
                            const dm = hart_ww.checked ? -0.45 : hart_w.checked ? -0.3 : 0;
                            if (dm) {
                                for (let x = index + 1; x <= index + 10 && x < defense_minus.length; x++) {
                                    defense_minus[x] = dm;
                                }
                            }
                        }
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        for (let x = index; x <= index + 14; x++) {
                            ww[x] = 1;
                        }
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        if (ee[index] && ee[index] < 3) {
                            ee[index]++;
                            for (let x = index + 1; x < index + 10; x++) {
                                ee[x] = ee[index];
                            }
                        } else {
                            ee[index] = 1;
                            for (let x = index + 1; x < index + 10; x++) {
                                ee[x] = ee[index];
                            }
                        }
                        character.skill_amplification =
                            round(character.pure_skill_amplification + (ee[index] ? ee[index] * sap : 0));
                        damage += calcSkillDamage(character, enemy, 20 + e * 10, 0.4, 1);

                        if (ww[index] && ww[index] === 1) {
                            for (let x = index; ww[x]; x++) {
                                ww[x] = 2;
                            }
                            const dm = hart_ww.checked ? -0.45 : hart_w.checked ? -0.3 : 0;
                            if (dm) {
                                for (let x = index + 1; x <= index + 10 && x < defense_minus.length; x++) {
                                    defense_minus[x] = dm;
                                }
                            }
                        }
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        heal += calcHeal(20 + r * 10 + (character.max_hp * (0.02 + r * 0.01)), 1, enemy) * 5;
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Guitar') {
                            damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 1 : 1.8, 1)
                        }
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
                ww: ww,
                ee: ee
            }
        };
    }
    ,COMBO_Option: 'wadeaeaeadQa'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Guitar' ? 'd & D: D스킬 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q: Q스킬 즉발 데미지\n' +
            'Q: Q스킬 최대 데미지\n' +
            'w & W: W스킬 On\n' +
            'e & E: E스킬 데미지\n' +
            'r & R: 체력 회복\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};