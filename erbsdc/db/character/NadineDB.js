'use strict';
const Nadine = {
     Attack_Power: 26//
    ,Attack_Power_Growth: 2.0//
    ,Health: 635
    ,Health_Growth: 57
    ,Health_Regen: 0.4
    ,Health_Regen_Growth: 0.03
    ,Stamina: 350
    ,Stamina_Growth: 13
    ,Stamina_Regen: 1.9
    ,Stamina_Regen_Growth: 0.05
    ,Defense: 23
    ,Defense_Growth: 1.5
    ,Atk_Speed: 0.12
    ,Movement_Speed: 3.05
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Bow, Crossbow]
    ,correction: {
        Bow: [
            [0, -11, -17],
            [0, 0, 0]
        ],
        Crossbow: [
            [0, -11, -13],
            [0, 0, 0]
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
            const life = calcHeal(ba * (character.life_steal / 100), character.attack_speed, enemy);
            let damage;
            if (character.DIV.querySelector('.nadine_r').checked) {
                const bonus = calcSkillDamage(character, enemy, 50 + character.R_LEVEL.selectedIndex * 50 + parseInt(character.DIV.querySelector('.nadine_t').value), 0.5, 1) / 3;
                damage = round((ba + bonus) * character.attack_speed * 100) / 100;
            } else {
                damage = round(ba * character.attack_speed * 100) / 100;
            }
            return "<b class='damage'>" + damage + "</b><b> __h/s: </b><b class='heal'>" + life + '</b>';
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
            const stack = parseInt(character.DIV.querySelector('.nadine_t').value);
            const min = calcSkillDamage(character, enemy, 70 + q * 45 + stack, 0.6, 1);
            const max = calcSkillDamage(character, enemy, 140 + q * 90 + stack, 1.2, 1);
            const cool = 10000 / (7 * (100 - character.cooldown_reduction) + 200);
            return "<b class='damage'>" + min + ' ~ ' + max + "</b><b> __sd/s: </b><b class='damage'>" + round(max * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const damage1 = calcSkillDamage(character, enemy, 100 + w * 70, 0.6, 1);
            const damage2 = calcSkillDamage(character, enemy, 100 + w * 40, 0.6, 1);
            return "<b class='damage'>" + (damage1 * 2 + damage2) + '</b> ( ' + damage1 + ', ' + damage1 + ", <b class='damage'>" +  + damage2 + '</b> )';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        return '';
    }
    ,E_Option: "<b> _use</b><input type='checkbox' class='nadine_e' onchange='updateDisplay()'>"
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const stack = parseInt(character.DIV.querySelector('.nadine_t').value);
            const damage = calcSkillDamage(character, enemy, 50 + r * 50 + stack, 0.5, 1);
            return "<b class='damage'>" + damage + '</b>';
        }
        return '-';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='nadine_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Bow') {
                const min = calcSkillDamage(character, enemy, wm < 13 ? 150 : 250, 1, 1);
                const max = calcSkillDamage(character, enemy, wm < 13 ? 300 : 500, 2, 1);
                return "<b class='damage'>" + min + ' - ' + max + '</b>';
            }
            if (type === 'Crossbow') {
                const damage = calcSkillDamage(character, enemy, 0, wm < 13 ? 0.8 : 1.2, 1);
                return "<b class='damage'>" + damage * 2 + '</b> ( ' + damage + ', ' + damage + ' )';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        return '';
    }
    ,T_Option: "<input type='number' class='stack nadine_t' value='0' onchange='fixLimitNum(this, 999)'><b>Stack"
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type =
            weapon === 'Bow' ? '활' :
            weapon === 'Crossbow' ? '석궁' :
            '';
        const skill =
            weapon === 'Bow' ? '"최소 데미지" - "최대 데미지"' :
            weapon === 'Crossbow' ? '"합산 데미지" ( "스킬 데미지", "벽꿍 데미지" )' :
            '';
        return '나딘 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "최소 데미지" ~ "최대 데미지"\n' +
            'W: "합산 데미지" ( "1타 데미지", "2타 데미지", "덫 데미지" )\n' +
            'E: _use "스킬 사용"\n' +
            'R: "스킬 데미지" _use "스킬 사용"\n' +
            'D: ' + skill + '\n' +
            'T: "스택"\n';
    }
    ,COMBO_VARS: '{\"rr\":0,\"rt\":0}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        const auto_cri = character.AUTO_CRI.checked;
        let damage = 0;
        let heal = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let rr = data.vars.rr, rt = data.vars.rt;
        if (character.weapon) {
            const type = character.weapon.Type;
            const stack = parseInt(character.DIV.querySelector('.nadine_t').value);
            if (rt) {
                rt--;
            }
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
                    ba = baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : 0, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    if (r >= 0) {
                        if (rt && rr === 3) {
                            rr = 1;
                            damage += calcSkillDamage(character, enemy, 50 + r * 50 + stack, 0.5, 1);
                        } else if (rt) {
                            rr++;
                        }
                    }
                } else if (c === 'A') {
                    ba = baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : 100, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    if (r >= 0) {
                        if (rt && rr === 3) {
                            rr = 1;
                            damage += calcSkillDamage(character, enemy, 50 + r * 50 + stack, 0.5, 1);
                        } else if (rt) {
                            rr++;
                        }
                    }
                } else if (c === 'q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 70 + q * 45 + stack, 0.6, 1)
                    }
                } else if (c === 'Q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 140 + q * 90 + stack, 1.2, 1);
                    }
                } else if (c === 'w') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 100 + w * 40, 0.6, 1);
                    }
                } else if (c === 'W') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 100 + w * 70, 0.6, 1);
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        rr = 3;
                        rt = 17 + r * 2;
                    }
                } else if (c === 'd') {
                    if (wm > 5) {
                        if (type === 'Bow') {
                            damage += calcSkillDamage(character, enemy, wm < 13 ? 150 : 250, 1, 1);
                        } else if (type === 'Crossbow') {
                            damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 0.8 : 1.2, 1);
                        }
                    }
                } else if (c === 'D') {
                    if (wm > 5) {
                        if (type === 'Bow') {
                            damage += calcSkillDamage(character, enemy, wm < 13 ? 300 : 500, 2, 1);
                        } else if (type === 'Crossbow') {
                            damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 0.8 : 1.2, 1) * 2;
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
                rr: rr,
                rt: rt
            }
        };
    }
    ,COMBO_Option: 'raWaWwaaQ'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Bow' ? 'd: 무스 외곽 데미지\n' + 'D: 무스 중앙 데미지\n' :
            weapon === 'Crossbow' ? 'd: 무스 데미지 x 5\n' + 'D: 무스 데미지 x 10\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q: Q스킬 즉발 데미지\n' +
            'Q: Q스킬 최대 데미지\n' +
            'w: W스킬 설치 데미지\n' +
            'W: W스킬 덫 데미지\n' +
            'e & E: 데미지 없음\n' +
            'r & R: R스킬 On / Off\n' +
            't && T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};