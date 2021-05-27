'use strict';
const Alex = {
     Attack_Power: 19
    ,Attack_Power_Growth: 2.4
    ,Health: 600
    ,Health_Growth: 74
    ,Health_Regen: 0.5
    ,Health_Regen_Growth: 0.04
    ,Stamina: 450
    ,Stamina_Growth: 22
    ,Stamina_Regen: 1.8
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 23
    ,Defense_Growth: 2.1
    ,Atk_Speed: 0.18
    ,Movement_Speed: 3.1
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [TwoHandedSword, Pistol, Shuriken, Tonfa]
    ,correction: {
        TwoHandedSword: [
            [0, -6, -8],
            [0, 0, 0]
        ],
        Pistol: [
            [0, -6, -8],
            [0, 0, 0]
        ],
        Shuriken: [
            [0, -6, -8],
            [0, 0, 0]
        ],
        Tonfa: [
            [0, -6, -8],
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
            if (character.weapon.Type === 'Pistol') {
                const as = character.weapon.Ammo / ((character.weapon.Ammo - 1) / character.attack_speed + 2);
                const shot = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
                const damage1 = round(shot * as * 100) / 100;
                const damage2 = round(shot * character.attack_speed * 100) / 100;
                const life1 = calcHeal(shot * (character.life_steal / 100), as, enemy);
                const life2 = calcHeal(shot * (character.life_steal / 100), character.attack_speed, enemy);
                return "<b class='damage'>" + damage1 + '</b> - ' + damage2 + "<b> __h/s: </b><b class='heal'>" + life1 + '</b> - ' + life2;
            }
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
            let damage, cool;
            if (character.isMelee) {
                damage = calcSkillDamage(character, enemy, 30 + q * 35, 0.4, 1);
                cool = 10000 / ((8.5 - q) * (100 - character.cooldown_reduction));
            } else {
                damage = calcSkillDamage(character, enemy, 50 + q * 40, 0.3, 1);
                cool = 10000 / ((7 - q * 0.5) * (100 - character.cooldown_reduction));
            }
            return "<b class='damage'>" + damage + "</b><b> __sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: "_ <input type='number' class='stack alex_q' value='0' onchange='fixLimitNum(this, 3)'><b>Stack</b>"
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            let damage, cool;
            if (character.isMelee) {
                damage = calcSkillDamage(character, enemy, 60 + w * 30, 0.4, 1);
                cool = 10000 / (10 * (100 - character.cooldown_reduction));
            } else {
                damage = calcSkillDamage(character, enemy, 40 + w * 20, 0.4, 1);
                cool = 10000 / (13 * (100 - character.cooldown_reduction));
            }
            return "<b class='damage'>" + damage + "</b><b> __sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0 && !character.isMelee) {
            const damage = calcSkillDamage(character, enemy, 60 + e * 30, 0.4, 1);
            const cool = 10000 / ((22 - e * 2) * (100 - character.cooldown_reduction) + 50);
            return "<b class='damage'>" + damage + "</b><b> __sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const min1 = calcSkillDamage(character, enemy, 60 + r * 30, 0.4, 1);
            const max1 = calcSkillDamage(character, enemy, 100 + r * 25, 0.5, 1);
            const min2 = calcSkillDamage(character, enemy, 40 + r * 20, 0.3, 1);
            const max2 = calcSkillDamage(character, enemy, 60 + r * 20, 0.4, 1);
            return "<b class='damage'>" + min1 + ' ~ ' + (max1 + max2 * 8) + '</b> ( [ ' + min1 + ' - ' + max1 + ' ], [' + min2 + ' - ' + max2+ ' ] x 8 )';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'TwoHandedSword') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, wm < 13 ? 1.75 : 2.25, 1) + '</b>';
            }
            if (type === 'Pistol') {
                return '-';
            }
            if (type === 'Shuriken') {
                const damage = calcSkillDamage(character, enemy, wm < 13 ? 80 : 160, 0.3, 1);
                const add = calcSkillDamage(character, enemy, (wm < 13 ? 80 : 160) * 0.3, 0.3 * 0.3, 1);
                return "<b class='damage'>" + damage + ' ~ ' + (damage + add * 11) + '</b> ( ' + damage + ', ' + add + ' x 11 )';
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
            weapon === 'TwoHandedSword' ? '양손검' :
            weapon === 'Pistol' ? '권총' :
            weapon === 'Shuriken' ? '암기' :
            weapon === 'Tonfa' ? '톤파' :
            '';
        const skill =
            weapon === 'TwoHandedSword' ? '"스킬 데미지"' :
            weapon === 'Pistol' ? '"데미지 없음"' :
            weapon === 'Shuriken' ? '"1타 데미지" ~ "합산 데미지" ( "1타 데미지", "추가 데미지" x "타수" )' :
            weapon === 'Tonfa' ? '"반사 데미지"' :
            '';
        return '알렉스 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "스킬 데미지"\n' +
            'W: "스킬데미지"\n' +
            'E: "스킬데미지"\n' +
            'R: "최소 데미지 ~ 최대 데미지" ( [ "최소 타격 데미지" - "최대 타격 데미지" ], [ "최소 틱당 데미지" - "최대 틱당 데미지" ] x "타수" )\n' +
            'D: ' + skill + '\n' +
            'T: "데미지 없음"\n';
    }
    ,COMBO_VARS: '{\"qq\":0,\"rr\":false}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        let damage = 0;
        let heal = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let qq = data.vars.qq, rr = data.vars.rr;
        if (character.weapon) {
            const type = character.weapon.Type;
            for (let i = 0; i < combo.length; i++) {
                c = combo.charAt(i);
                character.attack_power = floor(character.pure_attack_power * (1 + qq * 0.04));
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
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        if (character.isMelee) {
                            damage += calcSkillDamage(character, enemy, 30 + q * 35, 0.4, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 50 + q * 40, 0.3, 1);
                        }
                        if (qq <= 3) {
                            qq++;
                        }
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        if (character.isMelee) {
                            damage += calcSkillDamage(character, enemy, 60 + w * 30, 0.4, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 40 + w * 20, 0.4, 1);
                        }
                    }
                } else if (c === 'e') {
                    if (e >= 0) {
                        if (!character.isMelee) {
                            damage += calcSkillDamage(character, enemy, 60 + e * 30, 0.4, 1);
                        }
                    }
                } else if (c === 'E') {
                    if (e >= 0) {
                        if (!character.isMelee) {
                            damage += calcSkillDamage(character, enemy, 60 + e * 30, 0.4, 1);
                        }
                        if (character.subWeapon) {
                            swapWeapon(character);
                        }
                    }
                } else if (c === 'r') {
                    if (r >= 0) {
                        if (rr) {
                            damage += calcSkillDamage(character, enemy, 40 + r * 20, 0.3, 1);
                        } else {
                            rr = true;
                            damage += calcSkillDamage(character, enemy, 60 + r * 30, 0.4, 1);
                        }
                    }
                } else if (c === 'R') {
                    if (r >= 0) {
                        if (rr) {
                            damage += calcSkillDamage(character, enemy, 60 + r * 20, 0.4, 1);
                        } else {
                            rr = true;
                            damage += calcSkillDamage(character, enemy, 100 + r * 25, 0.5, 1);
                        }
                    }
                } else if (c === 'd') {
                    if (wm > 5) {
                        if (type === 'TwoHandedSword') {
                            damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 1.75 : 2.25, 1);
                        } else if (type === 'Shuriken') {
                            damage += calcSkillDamage(character, enemy, (wm < 13 ? 80 : 160) * 0.3, 0.3 * 0.3, 1);
                        }
                    }
                } else if (c === 'D') {
                    if (wm > 5) {
                        if (type === 'TwoHandedSword') {
                            damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 1.75 : 2.25, 1);
                        } else if (type === 'Shuriken') {
                            damage += calcSkillDamage(character, enemy, wm < 13 ? 80 : 160, 0.3, 1);
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
                qq: qq,
                rr: rr
            }
        };
    }
    ,COMBO_Option: 'qaAeRaRwARaRArqAr'
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
            weapon === 'Bow' ? 'd: 무스 외곽 데미지\n' + 'D: 무스 중앙 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q & Q: Q스킬 데미지\n' +
            'w & W: W스킬 데미지\n' +
            'w: W스킬 최대 데미지\n' +
            'e: E스킬 데미지\n' +
            'e: E스킬 데미지, 무기 스왑\n' +
            'r: R스킬 외곽 데미지, 재사용시 틱당 데미지\n' +
            'R: R스킬 중심 데미지, 재사용시 틱당 데미지\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};
