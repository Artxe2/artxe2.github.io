'use strict';
const Chiara = {
     Attack_Power: 34
    ,Attack_Power_Growth: 2.3
    ,Health: 670
    ,Health_Growth: 54
    ,Health_Regen: 0.5
    ,Health_Regen_Growth: 0.02
    ,Stamina: 410
    ,Stamina_Growth: 13
    ,Stamina_Regen: 2.1
    ,Stamina_Regen_Growth: 0.03
    ,Defense: 25
    ,Defense_Growth: 1.3
    ,Atk_Speed: 0.13
    ,Movement_Speed: 3.2
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Rapier]
    ,correction: {
        Rapier: [
            [0, -14, -12],
            [0, 0, -3]
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
            const damage = calcSkillDamage(character, enemy, 60 + q * 40, 0.75, 1);
            const cool = 10000 / ((10 - q * 1) * (100 - character.cooldown_reduction) + 12);
            return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const damage = calcSkillDamage(character, enemy, 60 + w * 40, 0.6, 1);
            const shield = floor(60 + w * 40 + character.attack_power * 0.85);
            const cool = 10000 / ((18 - w * 2) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> _s: </b><b class='shield'>" + shield + "</b><b> _s/s: </b><b class='shield'>" + round(shield * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const damage1 = calcSkillDamage(character, enemy, 40 + e * 20, 0.3, 1);
            const damage2 = calcSkillDamage(character, enemy, 100 + e * 25, 0.7, 1);
            const cool = 10000 / ((14 - e) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' + damage1 + ', ' + damage2 + " )<b> _sd/s: </b><b class='damage'>" + round((damage1 + damage2) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const damage1 = calcSkillDamage(character, enemy, 5 + r * 10, 0.2, 1);
            const damage2 = floor(200 + r * 100 + character.attack_power * 1);
            const heal = calcHeal(damage1 * 0.2, 1, enemy);
            return "<b class='damage'>" + (damage1 * 12 + damage2) + '</b> ( ' + damage1 + " x 12, <b class='damage'>" + damage2 + "</b> ) <b> _h/s: </b><b class='heal'>" + heal + '</b>';
        }
        return ' - ';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='chiara_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Rapier') {
                const damage = calcSkillDamage(character, enemy, 0,
                    1.75 + (character.critical_damage - (!enemy.critical_damage_reduction ? 0 : enemy.critical_damage_reduction)) / 100, 1);
                const cool = 10000 / ((wm < 13 ? 30 : 18) * (100 - character.cooldown_reduction));
                return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
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
    ,T_Option: "<input type='number' class='stack chiara_t' value='0' onchange='fixLimitNum(this, 4)'><b>Stack"
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type =
            weapon === 'Rapier' ? '레이피어' :
            '';
        const skill =
            weapon === 'Rapier' ? '"스킬 데미지"' :
            '';
        return '키아라 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "최소 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "스킬 데미지"\n' +
            'W: "스킬 데미지" _s: 쉴드량\n' +
            'E: "합산 데미지" ( "1타 데미지", "2타 데미지" )\n' +
            'R: "합산 데미지" ( "초당 데미지" x "타수", "징벌 데미지" ) _h/s: "초당 흡혈량" _use "스킬 사용"\n' +
            'D: ' + skill + '\n' +
            'T: "패시브 스택"\n';
    }
    ,COMBO_VARS: '{\"stack\":0,\"rr\":false}'
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
        let stack = data.vars.stack, rr = data.vars.rr;

        const cool = (16 - w * 1) * (100 - character.cooldown_reduction) / 100;
        if (index === 0 || floor(index / 2 / cool) > floor((index - 1) / 2 / cool)) {
            shield += floor(60 + w * 40 + character.attack_power * 0.85);
        }

        if (character.weapon) {
            const type = character.weapon.Type;
            let dm;
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
                } else if (c === 'A') {
                    ba = baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : 100, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        if (stack < 4) {
                            stack++;
                        }
                        dm = -stack * (0.03 + t * 0.02);
                        for (let x = index; x <= index + 5 && x < defense_minus.length; x++) {
                            defense_minus[x] = dm;
                        }
                        damage += calcSkillDamage(character, enemy, 60 + q * 40, 0.75, 1);
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        if (stack < 4) {
                            stack++;
                        }
                        dm = -stack * (0.03 + t * 0.02);
                        for (let x = index; x <= index + 5 && x < defense_minus.length; x++) {
                            defense_minus[x] = dm;
                        }
                        damage += calcSkillDamage(character, enemy, 60 + w * 40, 0.6, 1);
                    }
                } else if (c === 'e') {
                    if (e >= 0) {
                        if (stack < 4) {
                            stack++;
                        }
                        dm = -stack * (0.03 + t * 0.02);
                        for (let x = index; x <= index + 5 && x < defense_minus.length; x++) {
                            defense_minus[x] = dm;
                        }
                        damage += calcSkillDamage(character, enemy, 40 + e * 20, 0.3, 1);
                    }
                } else if (c === 'E') {
                    if (e >= 0) {
                        if (stack < 4) {
                            stack++;
                        }
                        dm = -stack * (0.03 + t * 0.02);
                        for (let x = index; x <= index + 5 && x < defense_minus.length; x++) {
                            defense_minus[x] = dm;
                        }
                        damage += calcSkillDamage(character, enemy, 40 + e * 20, 0.3, 1);
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
                        if (stack < 4) {
                            stack++;
                        }
                        dm = -stack * (0.03 + t * 0.02);
                        for (let x = index; x <= index + 5 && x < defense_minus.length; x++) {
                            defense_minus[x] = dm;
                        }
                        damage += calcSkillDamage(character, enemy, 100 + e * 25, 0.7, 1);
                    }
                } else if (c === 'r') {
                    if (r >= 0) {
                        if (!rr) {
                            rr = true;
                            heal += (150 + r * 75) * (1 + (1 + character.HEALTH_MASTERY.selectedIndex) * 0.01);
                        }
                        for (let j = 0; j < 3; j++) {
                            if (stack < 4) {
                                stack++;
                            }
                            dm = -stack * (0.03 + t * 0.02);
                            for (let x = index; x <= index + 5 && x < defense_minus.length; x++) {
                                defense_minus[x] = dm;
                            }
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
                            ba = calcSkillDamage(character, enemy, 5 + r * 10, 0.2, 1);
                            damage += ba;
                            heal += calcHeal(ba * 0.2, 1, enemy);
                        }
                    }
                } else if (c === 'R') {
                    if (r >= 0) {
                        if (stack < 4) {
                            stack++;
                        }
                        dm = -stack * (0.03 + t * 0.02);
                        for (let x = index; x <= index + 5 && x < defense_minus.length; x++) {
                            defense_minus[x] = dm;
                        }
                        damage += floor(200 + r * 100 + character.attack_power * 1);
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Rapier') {
                            if (stack < 4) {
                                stack++;
                            }
                            dm = -stack * (0.03 + t * 0.02);
                            for (let x = index; x <= index + 5 && x < defense_minus.length; x++) {
                                defense_minus[x] = dm;
                            }
                            damage += calcSkillDamage(character, enemy, 0,
                                1.75 + (character.critical_damage - (!enemy.critical_damage_reduction ? 0 : enemy.critical_damage_reduction)) / 100, 1);
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
                stack: stack,
                rr: rr
            }
        };
    }
    ,COMBO_Option: 'EqaraaaraR'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Rapier' ? 'd & D: 무스 데미지, 패시브 1스택\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q & Q: Q스킬 데미지, 패시브 1스택\n' +
            'w & W: W스킬 데미지, 패시브 1스택\n' +
            'e: E스킬 데미지, 패시브 1스택\n' +
            'E: E스킬 연결 및 속박 데미지, 패시브 2스택\n' +
            'r: R스킬 초당 데미지 3회, 패시브 3스택\n' +
            'R: R스킬 심판 데미지, 패시브 1스택\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};