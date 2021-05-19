'use strict';
const Lenox = {
     Attack_Power: 36
    ,Attack_Power_Growth: 2.4
    ,Health: 610
    ,Health_Growth: 77
    ,Health_Regen: 0.8
    ,Health_Regen_Growth: 0.05
    ,Stamina: 380
    ,Stamina_Growth: 16
    ,Stamina_Regen: 1.8
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 26
    ,Defense_Growth: 2
    ,Atk_Speed: 0.12
    ,Movement_Speed: 3.15
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Whip]
    ,correction: {
        Whip: [
            [0, -10, -13],
            [0, 0, 0]
        ],
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
            const min = calcSkillDamage(character, enemy, 20 + q * 30, 0.3, 1);
            const max = calcSkillDamage(character, enemy, 20 + q * 30 + character.max_hp * (0.07 + q * 0.005), 0.3, 1);
            const cool = 10000 / (2 * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + min + ' - ' + max  + "</b><b> __sd/s: </b><b class='damage'>" + round(max * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const damage1 = calcSkillDamage(character, enemy, 20 + w * 10, 0.3, 1);
            const damage2 = calcSkillDamage(character, enemy, 50 + w * 35, 0.6, 1);
            const cool = 10000 / ((12 - w * 1) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage1 + ' - ' + (damage1 + damage2)  + '</b> ( ' + damage1 + ', ' + damage2 + " )<b> __sd/s: </b><b class='damage'>" + round((damage1 + damage2) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const damage = calcSkillDamage(character, enemy, 20 + e * 60, 0.3, 1);
            const cool = 10000 / (9 * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> __sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const damage = calcSkillDamage(character, enemy, 50 + r * 50, 0.8, 1);
            const add = calcTrueDamage(character, enemy, 30 + r * 5);
            const hit = enemy.movement_speed ? floor(enemy.movement_speed * (4 + r * 0.5)) : 0;
            return "<b class='damage'>" + (damage * 2) + ' ~ ' + (damage * 2 + add * hit) + '</b> ( ' + damage + ' x 2, ' + add + ' x ' + hit + ' )';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Whip') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 100 + character.defense : 150, 0.3, 1) + '</b>';
            }
        }
        return '- ';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            return "<b> _s: </b><b class='shield'>" + floor(character.max_hp * 0.1) + '</b>';
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
            weapon === 'Whip' ? '채찍' :
            '';
        const skill =
            weapon === 'Whip' ? '"스킬 데미지"' :
            '';
        return '레녹스 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "최소 데미지" - "최대 데미지"\n' +
            'W: "1타 데미지" - "합산 데미지" ( "1타 데미지", "2타 데미지" )\n' +
            'E: "스킬 데미지"\n' +
            'R: "합산 데미지" - "출혈 데미지" ( "스킬 데미지" x 2,  "틱당 데미지" x "타수" )\n' +
            'D: ' + skill + '\n' +
            'T: _s: "쉴드량"\n';
    }
    ,COMBO_VARS: '{\"bleeding\":[]}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const t = character.R_LEVEL.selectedIndex;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        let damage = 0;
        let heal = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        const bleeding = data.vars.bleeding;

        const cool = (20 - t * 4) * (100 - character.cooldown_reduction) / 100;
        if (index === 0 || floor(index / 2 / cool) > floor((index - 1) / 2 / cool)) {
            shield += floor(character.max_hp * 0.1);
        }

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
                } else if (c === 'A') {
                    ba = baseAttackDamage(character, enemy, 0, 1, 100, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 20 + q * 30, 0.3, 1);
                    }
                } else if (c === 'Q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 20 + q * 30 + character.max_hp * (0.07 + q * 0.005), 0.3, 1);
                    }
                } else if (c === 'w') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 40 + w * 35, 0.6, 1);
                    }
                } else if (c === 'W') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 20 + w * 10, 0.3, 1) +
                            calcSkillDamage(character, enemy, 50 + w * 35, 0.6, 1);
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        damage += calcSkillDamage(character, enemy, 20 + e * 60, 0.3, 1);
                    }
                } else if (c === 'r') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 50 + r * 50, 0.8, 1);
                        let move = 0;
                        if (enemy.movement_speed) {
                            const bleed = calcTrueDamage(character, enemy, 15 + r * 5);
                            for (let x = index; x < index + 8 + r; x++) {
                                move += enemy.movement_speed / 2;
                                while (move >= 1) {
                                    move--;
                                    if (bleeding[x]) {
                                        bleeding[x] += bleed;
                                    } else {
                                        bleeding[x] = bleed;
                                    }
                                }
                            }
                        }
                    }
                } else if (c === 'R') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 50 + r * 50, 0.8, 1) * 2;
                        let move = 0;
                        if (enemy.movement_speed) {
                            const bleed = calcTrueDamage(character, enemy, 30 + r * 5);
                            for (let x = index; x < index + 8 + r; x++) {
                                move += enemy.movement_speed / 2;
                                while (move >= 1) {
                                    move--;
                                    if (bleeding[x]) {
                                        bleeding[x] += bleed;
                                    } else {
                                        bleeding[x] = bleed;
                                    }
                                }
                            }
                        }
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Whip') {
                            damage += calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 100 + character.defense : 150, 0.3, 1);
                        }
                    }
                } else if (c === 'p' || c === 'P') {
                    if (character.trap) {
                        damage += floor(character.trap.Trap_Damage * (1.04 + character.TRAP_MASTERY.selectedIndex * 0.04));
                    }
                }
            }
            if (bleeding[index]) {
                damage += floor(bleeding[index]);
            }
        }
        return {
            hp: data.hp - damage,
            damage: damage,
            heal: heal,
            shield: shield,
            vars: {
                bleeding: bleeding
            }
        };
    }
    ,COMBO_Option: 'QeWadRaQa'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Whip' ? 'd & D: 무스 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q: Q스킬 최소 데미지\n' +
            'Q: Q스킬 최대 데미지\n' +
            'w: W스킬 2타 데미지\n' +
            'W: W스킬 최대 데미지\n' +
            'e & E: E스킬 데미지\n' +
            'r: R스킬 1타 데미지\n' +
            'R: R스킬 최대 데미지\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};
