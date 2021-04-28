'use strict';
const Emma = {
     Attack_Power: 37
    ,Attack_Power_Growth: 2.2
    ,Health: 570
    ,Health_Growth: 60
    ,Health_Regen: 0.4
    ,Health_Regen_Growth: 0.02
    ,Stamina: 450
    ,Stamina_Growth: 22
    ,Stamina_Regen: 1.1
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 31
    ,Defense_Growth: 1.3
    ,Atk_Speed: 0.12
    ,Movement_Speed: 3
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Shuriken]
    ,correction: {
        Shuriken: [
            [0, -4, -8],
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
            const e = character.E_LEVEL.selectedIndex;
            const damage = calcSkillDamage(character, enemy, 40 + q * 40, 0.5, 1);
            const heal = calcHeal((60 + q * 10) * (0.12 + e * 0.02), 1, enemy);
            const cool = 10000 / (5.5 * (100 - character.cooldown_reduction) + 13);
            return "<b class='damage'>" + damage + ' - ' + damage * 2 + '</b> ( ' + damage + " x 2 ) <b> __h: </b><b class='heal'>" + heal + "</b><b> __sd/s: </b><b class='damage'>" + round(damage * 2 * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const e = character.E_LEVEL.selectedIndex;
            const damage = calcSkillDamage(character, enemy, 60 + w * 60, 0.75, 1);
            const heal = calcHeal((60 + w * 10) * (0.12 + e * 0.02), 1, enemy);
            const cool = 10000 / ((11 - w * 1) * (100 - character.cooldown_reduction) - 279);
            return "<b class='damage'>" + damage + "</b><b> __h: </b><b class='heal'>" + heal + "</b><b> __sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const heal = calcHeal((70 + e * 10) * (0.12 + e * 0.02), 1, enemy);
            return "<b> _h: </b><b class='heal'>" + heal + '</b>'
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const e = character.E_LEVEL.selectedIndex;
            const min = calcSkillDamage(character, enemy, 125 + r * 25, 0.45, 1);
            const max = calcSkillDamage(character, enemy, 200 + r * 25, 0.75, 1);
            const heal = calcHeal(100 * (0.12 + e * 0.02), 1, enemy);
            const cool = 10000 / ((24 - r * 3) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + min + "</b><b> / </b><b class='damage'>" + max + ' - ' + max * 2 + '</b> ( ' + max + " x 2 )<b> __h: </b><b class='heal'>" + heal + ' ~ ' + heal * 2 + "</b><b> __sd/s: </b><b class='damage'>" + round(max * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Shuriken') {
                const damage = calcSkillDamage(character, enemy, wm < 13 ? 80 : 160, 0.3, 1);
                const add = calcSkillDamage(character, enemy, (wm < 13 ? 80 : 160) * 0.3, 0.3 * 0.3, 1);
                return "<b class='damage'>" + damage + ' ~ ' + (damage + add * 11) + '</b> ( ' + damage + ', ' + add + ' x 11 )';
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
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const bonus = calcSkillDamage(character, enemy, character.max_sp * (0.03 + t * 0.005), 0, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            const shield = floor(100 + t * 25 + character.max_sp * (0.03 + t * 0.03));
            return "<b class='damage'>" + (damage + bonus) + '</b> ( ' +  min + ', ' + bonus + ' - ' + max + ', ' + bonus + " ) <b> __s: </b><b class='shield'>" + shield + '</b>';
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
            weapon === 'Shuriken' ? '암기' :
            '';
        const skill =
            weapon === 'Shuriken' ? '"1타 데미지" ~ "합산 데미지" ( "1타 데미지", "추가 데미지" x "타수" )' :
            '';
        return '엠마 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "스킬 데미지" - "합산 데미지" ( "1발당 데미지" x "타수" ) __h: "회복량"\n' +
            'W: "스킬 데미지" _h: "회복량"\n' +
            'E: _h: "회복량"\n' +
            'R: "비둘기 데미지" / "모자 데미지" - "2회 사용시 데미지" ( "스킬 데미지" x "타수" ) __h: "회복량"\n' +
            'D: ' + skill + '\n' +
            'T: "패시브 데미지" ( "평타 데미지", "추가 데미지" - "치명타 데미지", "추가 데미지" ) __s: "쉴드량"\n';
    }
    ,COMBO_VARS: '{}'
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

        const cool = (15 - t * 2) * (100 - character.cooldown_reduction) / 100;
        if (index === 0 || floor(index / 2 / cool) > floor((index - 1) / 2 / cool)) {
            shield += floor(100 + t * 25 + character.max_sp * (0.03 + t * 0.03));
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
                        damage += calcSkillDamage(character, enemy, 40 + q * 40, 0.5, 1);
                        heal += calcHeal((60 + q * 10) * (0.12 + e * 0.02), 1, enemy);
                    }
                } else if (c === 'Q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 40 + q * 40, 0.5, 1);
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.002)) * (1 + defense_minus[index]));
                        }
                        damage += calcSkillDamage(character, enemy, 40 + q * 40, 0.5, 1);
                        heal += calcHeal((60 + q * 10) * (0.12 + e * 0.02), 1, enemy);
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 60 + w * 60, 0.75, 1);
                        heal += calcHeal((60 + w * 10) * (0.12 + e * 0.02), 1, enemy);
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        heal += calcHeal((70 + e * 10) * (0.12 + e * 0.02), 1, enemy);
                    }
                } else if (c === 'r') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 125 + r * 25, 0.45, 1);
                        heal += calcHeal(100 * (0.12 + e * 0.02), 1, enemy);
                    }
                } else if (c === 'R') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 200 + r * 25, 0.75, 1);
                        heal += calcHeal(100 * (0.12 + e * 0.02), 1, enemy);
                    }
                } else if (c === 'd') {
                    if (wm > 5) {
                        if (type === 'Shuriken') {
                            damage += calcSkillDamage(character, enemy, (wm < 13 ? 80 : 160) * 0.3, 0.3 * 0.3, 1);
                        }
                    }
                } else if (c === 'D') {
                    if (wm > 5) {
                        if (type === 'Shuriken') {
                            damage += calcSkillDamage(character, enemy, wm < 13 ? 80 : 160, 0.3, 1);
                        }
                    }
                } else if (c === 't') {
                    ba = baseAttackDamage(character, enemy, 0, 1, 0, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    damage += calcSkillDamage(character, enemy, character.max_sp * (0.03 + t * 0.005), 0, 1);
                } else if (c === 'T') {
                    ba = baseAttackDamage(character, enemy, 0, 1, 100, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    damage += calcSkillDamage(character, enemy, character.max_sp * (0.03 + t * 0.005), 0, 1);
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
            vars: {}
        };
    }
    ,COMBO_Option: 'qwaeDddRaaQrwa'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Shuriken' ? 'd: 무스 추가타 데미지\n' + 'D: 무스 첫타 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q: Q스킬 데미지\n' +
            'Q: Q스킬 2히트 데미지\n' +
            'w & W: W스킬 데미지\n' +
            'e & E: 데미지 없음\n' +
            'r: R스킬 비둘기 데미지\n' +
            'R: R스킬 모자 데미지\n' +
            't: 패시브 데미지\n' +
            'T: 패시브 치명타 데미지\n' +
            d +
            'p & P: 트랩 데미지';
    }
}