'use strict';
const Hyunwoo = {
     Attack_Power: 34
    ,Attack_Power_Growth: 3.1
    ,Health: 530
    ,Health_Growth: 85
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
            [0, 0, -3],
            [0, -2, -5]
        ],
        Tonfa: [
            [0, -5, -7],
            [0, -2, -5]
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
            const damage = calcSkillDamage(character, enemy, 100 + q * 50, 0.3, 1);
            const cool = 10000 / ((9 - q * 1) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> __sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        return '';
    }
    ,W_Option: "<b> _use</b><input type='checkbox' class='hyunwoo_w' onchange='updateDisplay()'>"
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const min = calcSkillDamage(character, enemy, character.defense * 0.8, 0, 1);
            const max = calcSkillDamage(character, enemy, (enemy.max_hp ? enemy.max_hp * (0.05 + e * 0.03) : 0) + character.defense * 0.8, 0, 1);
            const bonus = calcSkillDamage(character, enemy, 60 + e * 35 + character.defense * 0.15, 0, 1);
            const cool = 10000 / ((18 - e * 1) * 0.8 * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + (max + bonus) + '</b> ( ' + min + ' ~ ' + max + ', ' + bonus + " )<b> __sd/s: </b><b class='damage'>" + round((min + max + bonus) / 2 * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: "<b> __use</b><input type='checkbox' class='hyunwoo_e' onchange='updateDisplay()'>"
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const min = calcSkillDamage(character, enemy, 200 + r * 100, 0.7, 1);
            const max = calcSkillDamage(character, enemy, 600 + r * 300, 2.1, 1);
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
                return "<b class='damage'>" + min + "</b><b> __h: </b><b class='heal'>" + life + '</b>';
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
            weapon === 'Glove' ? '"스킬 데미지"  __h: "평균 흡혈량"' :
            weapon === 'Tonfa' ? '"반사 데미지"' :
            '';
        return '현우 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "스킬 데미지"\n' +
            'W: _use "스킬 사용"\n' +
            'E: "합산 데미지" ( "최소 데미지" ~ "최대 데미지", "벽꿍 데미지" )\n' +
            'R: "최소 데미지" ~ "최대 데미지"\n' +
            'D: ' + skill + '\n' +
            'T: _h: "회복량"\n';
    }
    ,COMBO_VARS: '{\"tt\":55}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const t = character.T_LEVEL.selectedIndex;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        let damage = 0;
        let heal = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let tt = data.vars.tt;
        if (character.weapon) {
            const type = character.weapon.Type;
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
                    ba = baseAttackDamage(character, enemy, 0, 1, 0, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    if (tt >= 55) {
                        heal += calcHeal(character.max_hp * (0.04 + t * 0.04), 1, enemy);
                        tt = 0;
                    } else {
                        tt += 5;
                    }
                } else if (c === 'A') {
                    ba = baseAttackDamage(character, enemy, 0, 1, 100, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    if (tt >= 55) {
                        heal += calcHeal(character.max_hp * (0.04 + t * 0.04), 1, enemy);
                        tt = 0;
                    } else {
                        tt += 5;
                    }
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
                    }
                } else if (c === 'e') {
                    if (e >= 0) {
                        const dm = -0.07 - e * 0.02;
                        for (let x = index + 1; x <= index + 10 && x < defense_minus.length; x++) {
                            defense_minus[x] = dm;
                        }
                        let currHp = enemy.max_hp ? data.hp - damage + heal + shield : 0;
                        if (currHp > enemy.max_hp) {
                            currHp = enemy.max_hp;
                        }
                        damage += calcSkillDamage(character, enemy, (enemy.max_hp ? currHp * (0.05 + e * 0.03) : 0) + character.defense * 0.8, 0, 1);
                        tt += 5;
                    }
                } else if (c === 'E') {
                    if (e >= 0) {
                        const dm = -0.07 - e * 0.02;
                        for (let x = index + 1; x <= index + 10 && x < defense_minus.length; x++) {
                            defense_minus[x] = dm;
                        }
                        let currHp = enemy.max_hp ? data.hp - damage + heal + shield : 0;
                        if (currHp > enemy.max_hp) {
                            currHp = enemy.max_hp;
                        }
                        damage += calcSkillDamage(character, enemy, (enemy.max_hp ? currHp * (0.05 + e * 0.03) : 0) + character.defense * 0.8, 0, 1);
                        tt += 5;
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
                        damage += calcSkillDamage(character, enemy, 60 + e * 35 + character.defense * 0.15, 0, 1);
                        tt += 5;
                    }
                } else if (c === 'r') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 200 + r * 100, 0.7, 1);
                        tt += 5;
                    }
                } else if (c === 'R') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 600 + r * 300, 2.1, 1);
                        tt += 5;
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Glove') {
                            const coe = wm < 13 ? 1.4 : 2;
                            const bonus = calcTrueDamage(character, enemy, wm < 13 ? 50 : 100);
                            ba = baseAttackDamage(character, enemy, 0, 1 + coe, 0, 1) + bonus;
                            heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                            if (tt >= 55) {
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
        }
        return {
            hp: data.hp - damage,
            damage: damage,
            heal: heal,
            shield: shield,
            vars: {
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
            'w & W: 다음 E스킬 방어력 증가\n' +
            'e: E스킬 데미지(현재 체력 비례)\n' +
            'E: E스킬 벽꿍 데미지(현재 체력 비례)\n' +
            'r: R스킬 즉발 데미지\n' +
            'R: R스킬 최대 데미지\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};