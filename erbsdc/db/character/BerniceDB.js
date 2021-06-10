'use strict';
const Bernice = {
     Attack_Power: 25
    ,Attack_Power_Growth: 2.4
    ,Health: 700
    ,Health_Growth: 77
    ,Health_Regen: 0.5
    ,Health_Regen_Growth: 0.06
    ,Stamina: 410
    ,Stamina_Growth: 15
    ,Stamina_Regen: 1.8
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 25
    ,Defense_Growth: 1.8
    ,Atk_Speed: 0.24
    ,Movement_Speed: 3.2
    ,Sight_Range: 9
    ,Attack_Range: -3.2
    ,weapons: [SniperRifle]
    ,correction: {
        SniperRifle: [
            [0, -6, -10],
            [0, 0, 0]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            const damage = baseAttackDamage(character, enemy, 0, 0.7 + t * 0.15, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 0.7 + t * 0.15, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 0.7 + t * 0.15, 100, 1);
            const damage2 = baseAttackDamage(character, enemy, 0, t === 0 ? 0.91 : t === 1 ? 1.15 : 1.33, character.critical_strike_chance, 2 + t);
            const min2 = baseAttackDamage(character, enemy, 0, t === 0 ? 0.91 : t === 1 ? 1.15 : 1.33, 0, 2 + t);
            const max2 = baseAttackDamage(character, enemy, 0, t === 0 ? 0.91 : t === 1 ? 1.15 : 1.33, 100, 2 + t);
            return "<b class='damage'>" + damage + ' ~ ' + damage2 + '</b> ( ' + min + ' - ' + max + ' ~ ' + min2 + ' - ' + max2 + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            const reload = Math.max(1.8 - t * 0.5, 1 / character.attack_speed);
            const as = character.weapon.Ammo / ((character.weapon.Ammo - 1) / character.attack_speed + reload);
            const shot = baseAttackDamage(character, enemy, 0, 0.7 + t * 0.15, character.critical_strike_chance, 1);
            const shot2 = baseAttackDamage(character, enemy, 0, t === 0 ? 0.91 : t === 1 ? 1.15 : 1.33, character.critical_strike_chance, 2 + t);
            const damage1 = round(shot * as * 100) / 100;
            const damage2 = round(shot2 * as * 100) / 100;
            const life1 = calcHeal(shot * (character.life_steal / 100), as, enemy);
            const life2 = calcHeal(shot2 * (character.life_steal / 100), as, enemy);
            if (enemy.attack_range && enemy.attack_range >= 3) {
                return "<b class='damage'>" + damage1 + '</b> ~ ' + damage2 + "<b> _h/s: </b><b class='heal'>" + life1 + '</b> ~ ' + life2;
            }
            return damage1 + " ~ <b class='damage'>" + damage2 + "</b><b> _h/s: </b><b class='heal'>" + life1 + '</b> ~ ' + life2;
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
            const min = calcSkillDamage(character, enemy, 70 + q * 40, 0.6, 1);
            const max = calcSkillDamage(character, enemy, 100 + q * 40, 0.6, 1);
            const cool = 10000 / ((8 - q * 0.5) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + min + ' - ' + max + "</b><b> _sd/s: </b><b class='damage'>" + round(min * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const damage = calcSkillDamage(character, enemy, 20 + w * 10, 0.1, 1);
            const ea = floor(3 + w * 0.5);
            return "<b class='damage'>" + damage + '</b> ( ' + damage + ' x ' + ea + ' )';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        return '-';
    }
    ,E_Option: "<b> _use</b><input type='checkbox' class='bernice_e' onchange='updateDisplay()'>"
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const damage1 = calcSkillDamage(character, enemy, 150 + r * 50, 0.7, 1);
            const damage2 = calcSkillDamage(character, enemy, 100 + r * 50, 0.3, 1);
            return "<b class='damage'>" + damage1 + '</b> ( [ ' + damage1 + ', ' + damage2 + ' ] x 4 )';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Pistol') {
                return '-';
            }
            if (type === 'AssaultRifle') {
                const t = character.T_LEVEL.selectedIndex;
                const as2 = calcAttackSpeed(character, wm < 13 ? 40 : 60);
                const as1 = 10 / (9.5 / as2 + 2);
                const shot = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1) * 2 +
                    baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
                const damage1 = round(shot * as1 * 100) / 100;
                const damage2 = round(shot * as2 * 100) / 100;
                const life1 = calcHeal(shot * (character.life_steal / 100), as1, enemy);
                const life2 = calcHeal(shot * (character.life_steal / 100), as2, enemy);
                const cool = 30 * (100 - character.cooldown_reduction) / 100;
                const shield = floor(100 + t * 50 + character.attack_power * 0.3);
                return "<b> _d/s: </b><b class='damage'>" + damage1 + '</b> - ' + damage2 + "<b> _h/s: </b><b class='heal'>" + life1 + '</b> - ' + life2 +
                    "<b> _s/s: </b><b class='shield'>" + floor(shield * (1 + as1 * 6) / cool, 2) + '</b> - ' + floor(shield * (1 + as2 * 6) / cool, 2);
            }
            if (type === 'SniperRifle') {
                const damage = calcSkillDamage(character, enemy, 0, wm < 13 ? 2.2 : 3, 1);
                return "<b class='damage'>" + damage + ' ~ ' + damage * 3 + '</b> ( ' + damage + ' x 3 )';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
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
            weapon === 'SniperRifle' ? '저격총' :
            '';
        const skill =
            weapon === 'SniperRifle' ? '"1발당 데미지"' :
            '';
        return '버니스 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "최소 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "최소 데미지" - "최대 데미지"\n' +
            'W: "스킬 데미지" ( "스킬 데미지" x "장전 수" )\n' +
            'E: _use "스킬 사용"\n' +
            'R: "속박 데미지" ( [ "속박 데미지", "폭발 데미지" ] x 전이 수 )\n' +
            'D: ' + skill + '\n' +
            'T: "데미지 없음"\n';
    }
    ,COMBO_VARS: '{\"cc\":false}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const t = character.T_LEVEL.selectedIndex;
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
        let cc = data.vars.cc;
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
                    if (enemy.attack_range && enemy.attack_range >= 3) {
                        ba = baseAttackDamage(character, enemy, 0, 0.7 + t * 0.15, auto_cri ? character.critical_strike_chance : 0, 1);
                    } else {
                        ba = baseAttackDamage(character, enemy, 0, t === 0 ? 0.91 : t === 1 ? 1.15 : 1.33, auto_cri ? character.critical_strike_chance : 0, 1.5 + t * 0.5);
                    }
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'A') {
                    if (enemy.attack_range && enemy.attack_range >= 3) {
                        ba = baseAttackDamage(character, enemy, 0, 0.7 + t * 0.15, auto_cri ? character.critical_strike_chance : 100, 1);
                    } else {
                        ba = baseAttackDamage(character, enemy, 0, t === 0 ? 0.91 : t === 1 ? 1.15 : 1.33, auto_cri ? character.critical_strike_chance : 100, 1.5 + t * 0.5);
                    }
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        if (cc) {
                            cc = false;
                            damage += calcSkillDamage(character, enemy, 100 + q * 40, 0.6, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 70 + q * 40, 0.6, 1);
                        }
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 20 + w * 10, 0.1, 1);
                        cc = true;
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 150 + r * 50, 0.7, 1);
                        cc = true;
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'SniperRifle') {
                            damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 2.2 : 3, 1);
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
                cc: cc
            }
        };
    }
    ,COMBO_Option: 'raAqwaAaAaAq'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'SniperRifle' ? 'd & D: 무스 1회 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q & Q: Q스킬 데미지\n' +
            'w & W: W스킬 데미지\n' +
            'e & E: 데미지 없음\n' +
            'r & R: R스킬 데미지\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};
