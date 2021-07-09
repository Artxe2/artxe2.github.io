'use strict';
const Aya = {
     Attack_Power: 22
    ,Attack_Power_Growth: 3.6
    ,Health: 665 //
    ,Health_Growth: 57
    ,Health_Regen: 0.5
    ,Health_Regen_Growth: 0.07
    ,Stamina: 440
    ,Stamina_Growth: 22
    ,Stamina_Regen: 2.3
    ,Stamina_Regen_Growth: 0.07
    ,Defense: 25
    ,Defense_Growth: 1.4
    ,Atk_Speed: 0.16 //
    ,Movement_Speed: 3.05
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Pistol, AssaultRifle, SniperRifle]
    ,correction: {
        Pistol: [
            [0, -12, -11],
            [0, 0, -5]
        ],
        AssaultRifle: [
            [0, -13, -11],
            [0, 0, -3]
        ],
        SniperRifle: [
            [0, -15, -18],
            [0, 0, -3]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            if (character.weapon.Type === 'AssaultRifle') {
                const damage1 = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1);
                const damage2 = baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
                const min1 = baseAttackDamage(character, enemy, 0, 0.32, 0, 1);
                const min2 = baseAttackDamage(character, enemy, 0, 0.48, 0, 1);
                const max1 = baseAttackDamage(character, enemy, 0, 0.32, 100, 1);
                const max2 = baseAttackDamage(character, enemy, 0, 0.48, 100, 1);
                return "<b class='damage'>" + (damage1 + damage1 + damage2) + '</b> ( ' + min1 + ', ' + min1 + ', ' + min2 + ' - ' + max1 + ', ' + max1 + ', ' + max2 + ' )';
            }
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
            let as, shot;
            if (character.weapon.Type === 'AssaultRifle') {
                as = 10 / (9.5 / character.attack_speed + 2);
                shot = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1) * 2 +
                    baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
            } else {
                as = character.weapon.Ammo / ((character.weapon.Ammo - 1) / character.attack_speed + 2);
                shot = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            }
            const damage1 = round(shot * as * 100) / 100;
            const damage2 = round(shot * character.attack_speed * 100) / 100;
            const life1 = calcHeal(character, shot * (character.life_steal / 100), as, enemy);
            const life2 = calcHeal(character, shot * (character.life_steal / 100), character.attack_speed, enemy);
            return "<b class='damage'>" + damage1 + '</b> - ' + damage2 + "<b> _h/s: </b><b class='heal'>" + life1 + '</b> - ' + life2;
        }
        return '-';
    }
    ,DPS_Option: ''
    ,HPS: (character, enemy) => {
        return "<b class='heal'>" + calcHeal(character, character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 2, enemy) + '</b>';
    }
    ,Q_Skill: (character, enemy) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        if (character.weapon && q >= 0) {
            const damage1 = calcSkillDamage(character, enemy, 0, 1, 1);
            const damage2 = calcSkillDamage(character, enemy, 35 + q * 55, 0.2, 1);
            const cool = 10000 / ((7 - q * 0.5) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' + damage1 + ', ' + damage2 + " )<b> _sd/s: </b><b class='damage'>" + round((damage1 + damage2) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const damage = calcSkillDamage(character, enemy, 25 + w * 20, 0.3 + w * 0.05, 1);
            const cool = 10000 / ((18 - w * 1.5) * (100 - character.cooldown_reduction) + 317);
            let acc = 0;
            for (let i = 0; i < 10; i++) {
                acc += calcSkillDamage(character, enemy, (25 + w * 20) * (1 - i * 0.05), (0.3 + w * 0.05) * (1 - i * 0.05), 1);
            }
            return "<b class='damage'>" + acc + '</b> ( ' + damage + " x 10 )<b> _sd/s: </b><b class='damage'>" + round(acc * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const min = calcSkillDamage(character, enemy, 175 + r * 75, 0.5, 1);
            const max = calcSkillDamage(character, enemy, 350 + r * 150, 1, 1);
            return "<b class='damage'>" + min + ' ~ ' + max + "</b>";
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
                    baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1) + (wm < 13 ? 6 : 9);
                const damage1 = round(shot * as1 * 100) / 100;
                const damage2 = round(shot * as2 * 100) / 100;
                const life1 = calcHeal(character, shot * (character.life_steal / 100), as1, enemy);
                const life2 = calcHeal(character, shot * (character.life_steal / 100), as2, enemy);
                const cool = 30 * (100 - character.cooldown_reduction) / 100;
                const shield = floor(150 + t * 25 + character.attack_power * 0.3);
                return "<b> _d/s: </b><b class='damage'>" + damage1 + '</b> - ' + damage2 + "<b> _h/s: </b><b class='heal'>" + life1 + '</b> - ' + life2 +
                    "<b> _s/s: </b><b class='shield'>" + floor(shield * (1 + as1 * 4.5) / cool, 2) + '</b> - ' + floor(shield * (1 + as2 * 4.5) / cool, 2);
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
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            const shield = floor(150 + t * 25 + character.attack_power * 0.3);
            const cool = 30 * (100 - character.cooldown_reduction) / 100;
            let as;
            if (character.weapon.Type === 'AssaultRifle') {
                as = 10 / (9.5 / character.attack_speed + 2) * 4.5;
            } else {
                as = character.weapon.Ammo / ((character.weapon.Ammo - 1) / character.attack_speed + 2) * 1.5;
            }
            return "<b> _s: </b><b class='shield'>" + shield + "</b><b> _s/s: </b><b class='shield'>" + floor(shield * (1 + as) / cool, 2) + '</b>';
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
            weapon === 'Pistol' ? '권총' :
            weapon === 'AssaultRifle' ? '돌격소총' :
            weapon === 'SniperRifle' ? '저격총' :
            '';
        const skill =
            weapon === 'Pistol' ? '"데미지 없음"' :
            weapon === 'AssaultRifle' ? '_d/s: "초당 데미지" - "장전 배제 데미지" _h/s: "초당 흡혈량" - "장전 배제 흡혈량" _s/s: "초당 쉴드량" - "장전 배제 쉴드량"' :
            weapon === 'SniperRifle' ? '"1발당 데미지"' :
            '';
        return '아야 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "최소 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "합산 데미지" ( "1타 데미지", "2타 데미지" )\n' +
            'W: "합산 데미지" ( "1발당 데미지" x "타수" )\n' +
            'E: "데미지 없음"\n' +
            'R: "최소 데미지" ~ "최대 데미지"\n' +
            'D: ' + skill + '\n' +
            'T: _s: "쉴드량" _s/s: "초당 쉴드량"\n';
    }
    ,COMBO_VARS: '{\"dd\":0}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const t = character.T_LEVEL.selectedIndex;
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        const auto_cri = character.AUTO_CRI.checked;
        let damage = 0;
        let heal = calcHeal(character, character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;

        const cool = 30 * (100 - character.cooldown_reduction) / 100;
        let as;
        let dd = data.vars.dd;
        if (character.weapon) {
            if (character.weapon.Type === 'AssaultRifle') {
                as = 10 / (9.5 / character.attack_speed + 2) * 4.5 + 1;
            } else {
                as = character.weapon.Ammo / ((character.weapon.Ammo - 1) / character.attack_speed + 2) * 1.5 + 1;
            }
        } else {
            as = 1;
        }
        if (index === 0 || floor(as * index / 2 / cool) > floor(as * (index - 1) / 2 / cool)) {
            shield += floor(150 + t * 25 + character.attack_power * 0.3);
        }

        let fi = character.weapon && character.weapon.Focused_Impact ? data.vars.fi || character.weapon.Focused_Impact * 2 : 0;
        let sm = data.vars.sm || 0;
        let sms = data.vars.sms || 0;
        let sws = character.accessory && character.accessory.Swift_Strides ? data.vars.sws || character.accessory.Swift_Strides[1] : 0;
        if (character.weapon) {
            let ficri = character.weapon.Focused_Impact * 2 === fi;
            if (fi < character.weapon.Focused_Impact * 2) {
                fi--;
            }
            if (sws) {
                sws += character.movement_speed / 2;
                if (sws > character.accessory.Swift_Strides[1] ) {
                    sws = character.accessory.Swift_Strides[1];
                }
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
                        enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                    } else {
                        enemy.defense = floor((enemy.pure_defense + defense_bonus[index]) * (1 + defense_percent[index]) * (1 + defense_minus[index]));
                    }
                }
                if (c === 'a' || c === 'A') {
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    if (type === 'AssaultRifle') {
                        ba = baseAttackDamage(character, enemy, 0, 0.32, ficri ? 100 : auto_cri ? character.critical_strike_chance : c === 'a' ? 0 : 100, 1) + (dd ? wm < 13 ? 6 : 9 : 0);
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                        }
                        if (character.weapon.Smolder && sm < 4) {
                            sm++;
                        }
                        ba += baseAttackDamage(character, enemy, 0, 0.32, auto_cri ? character.critical_strike_chance : c === 'a' ? 0 : 100, 1) + (dd ? wm < 13 ? 6 : 9 : 0);
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                        }
                        if (character.weapon.Smolder && sm < 4) {
                            sm++;
                        }
                        ba += baseAttackDamage(character, enemy, 0, 0.48, auto_cri ? character.critical_strike_chance : c === 'a' ? 0 : 100, 1) + (dd ? wm < 13 ? 6 : 9 : 0);
                    } else {
                        ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : c === 'a' ? 0 : 100, 1);
                    }
                    if (sws) {
                        damage += calcItemDamage(character, enemy, character.accessory.Swift_Strides[0] * round(sws / character.accessory.Swift_Strides[1], 2));
                        sws = 0.0001;
                    }
                    damage += ba;
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 0, 1, 1);
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                        }
                        damage += calcSkillDamage(character, enemy, 35 + q * 55, 0.2, 1);
                    }
                } else if (c === 'w') {
                    if (w >= 0) {
                        for (let x = 0; x < 5; x++) {
                            damage += calcSkillDamage(character, enemy, (25 + w * 20) * (1 - x * 0.06), (0.3 + w * 0.05) * (1 - x * 0.05), 1);
                            if (enemy.character === Magnus) {
                                let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                if (lost < 0) {
                                    lost = 0;
                                }
                                enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                            }
                        }
                    }
                } else if (c === 'W') {
                    if (w >= 0) {
                        for (let x = 0; x < 10; x++) {
                            damage += calcSkillDamage(character, enemy, (25 + w * 20) * (1 - x * 0.06), (0.3 + w * 0.05) * (1 - x * 0.05), 1);
                            if (enemy.character === Magnus) {
                                let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                if (lost < 0) {
                                    lost = 0;
                                }
                                enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                            }
                        }
                    }
                } else if (c === 'r') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 175 + r * 75, 0.5, 1);
                    }
                } else if (c === 'R') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 350 + r * 150, 1, 1);
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'AssaultRifle') {
                            dd = !dd;
                        }
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
            if (index % 2) {
                let currHp = enemy.max_hp ? data.hp- damage + heal + shield : 0;
                if (currHp > enemy.max_hp) {
                    currHp = enemy.max_hp;
                } else if (currHp < 0) {
                    currHp = 0;
                }
                damage += calcTrueDamage(character, enemy, currHp * 0.03 * sm);
            }
            if (sms) {
                sms--;
            } else {
                sm = 0;
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
                sm: sm,
                sms: sms,
                sws: sws,
                dd: dd
            }
        };
    }
    ,COMBO_Option: 'aqrwaaaq'
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
            weapon === 'AssaultRifle' ? 'd & D: 데미지 없음\n' :
            weapon === 'SniperRifle' ? 'd & D: 무스 1회 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q & Q: Q스킬 데미지\n' +
            'w: W스킬 1.5초간 데미지\n' +
            'W: W스킬 3초간 데미지\n' +
            'e & E: 데미지 없음\n' +
            'r: R스킬 즉발 데미지\n' +
            'R: R스킬 최대 데미지\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};
