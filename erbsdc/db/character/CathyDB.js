'use strict';
const Cathy = {
     Attack_Power: 26
    ,Attack_Power_Growth: 2.7
    ,Health: 700
    ,Health_Growth: 79
    ,Health_Regen: 0.8
    ,Health_Regen_Growth: 0.06
    ,Stamina: 440
    ,Stamina_Growth: 16
    ,Stamina_Regen: 2
    ,Stamina_Regen_Growth: 0.08
    ,Defense: 24
    ,Defense_Growth: 2.3
    ,Atk_Speed: 0.12
    ,Movement_Speed: 3.15
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Dagger]
    ,correction: {
        Dagger: [
            [0, -9, -12],
            [0, 0, -3],
            [0, -6, 0]
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
            const life = calcHeal(character, ba * (character.life_steal / 100), character.attack_speed, enemy);
            return "<b class='damage'>" + damage + "</b><b> _h/s: </b><b class='heal'>" + life + '</b>';
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
            const crid = (1.3 + (character.critical_damage - (!enemy.critical_damage_reduction ? 0 : enemy.critical_damage_reduction)) / 100);
            const min = calcSkillDamage(character, enemy, 20 + q * 30, 0.4, 1);
            const max = calcSkillDamage(character, enemy, (20 + q * 30) * crid, 0.4 * crid, 1);
            const cool = 10000 / ((12 - q * 0.5) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + min + ' - ' + max  + "</b><b> _sd/s: </b><b class='damage'>" + round(max * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const min = calcSkillDamage(character, enemy, 35 + w * 35, 0.2, 1);
            const max = calcSkillDamage(character, enemy, 80 + w * 35, 0.55, 1);
            const cool = 10000 / ((16 - w * 1) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + min + ' - ' + max + "</b><b> _sd/s: </b><b class='damage'>" + round(max * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const damage1 = calcSkillDamage(character, enemy, 30 + e * 10, 0.3, 1);
            const damage2 = calcSkillDamage(character, enemy, 10 + e * 10, 0.2, 1);
            const cool = 10000 / ((24 - e * 2) * (100 - character.cooldown_reduction) + 20);
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' + damage1 + ', ' + damage2 + " )<b> _sd/s: </b><b class='damage'>" + round((damage1 + damage2) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const min = calcSkillDamage(character, enemy, 120 + r * 80, 0.6, 1);
            const minHeal = calcHeal(character, (120 + r * 80 + character.attack_power * 0.4) *
                (100 + character.character.correction[character.weapon.Type][2][character.MODE.selectedIndex]) / 100, 1, enemy);
            const maxHeal = calcHeal(character, (180 + r * 120 + character.attack_power * 0.6) *
                (100 + character.character.correction[character.weapon.Type][2][character.MODE.selectedIndex]) / 100, 1, enemy);
            let max;
            if (enemy.max_hp) {
                const hp = enemy.max_hp;
                let start = 0, mid, end = floor(hp * 0.7) + 1, coe;
                while (start < end) {
                    mid = (start + end + 1) / 2;
                    coe = (mid * 100.0 / hp > 70 ? 70 : mid * 100.0 / hp) / 70 + 1;
                    max = calcSkillDamage(character, enemy, (120 + r * 80) * coe, 0.6 * coe, 1);
                    if (max + mid > hp) {
                        end = mid - 1;
                    } else {
                        start = mid;
                    }
                }
            } else {
                max = calcSkillDamage(character, enemy, 240 + r * 160, 1.2, 1);
            }
            return "<b class='damage'>" + min + ' ~ ' + max + "</b><b> _emergency h: </b><b class='heal'>" + minHeal + ' - ' + maxHeal + '</b>';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Dagger') {
                const damage = baseAttackDamage(character, enemy, 0, 1, 0, 1);
                const bonus = calcTrueDamage(character, enemy, enemy.max_hp ? enemy.max_hp * 0.08 : 0);
                const heal = calcHeal(character, floor(damage + bonus) * (character.life_steal / 100), 1, enemy);
                return "<b class='damage'>" + damage + ' ~ ' + floor(damage + bonus) + "</b><b> _h: </b><b class='heal'>" + heal + '</b>';
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
            const max = character.DIV.querySelector('.cathy_t').checked;
            const damage = calcTrueDamage(character, enemy, character.attack_power * 0.2 + (max ? character.max_hp * 0.0075 : 0));
            const shield = floor(100 + t * 25 + character.attack_power * 0.25);
            const cool = (20 - t * 2) * (100 - character.cooldown_reduction) / 100;
            const as = character.attack_speed * character.critical_strike_chance / 100;
            return "<b class='damage'>" + damage * (max ? 4 : 3) + "</b> ( <b class='damage'>" + damage + '</b> x ' + (max ? 4 : 3) + ")<b> _s: </b><b class='shield'>" + shield + "</b><b> _s/s: </b><b class='shield'>" + floor(shield * (1 + as) / cool, 2) + '</b>';
        }
        return '-';
    }
    ,T_Option: "<b> _full</b><input type='checkbox' class='cathy_t' onchange='updateDisplay()'>"
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type =
            weapon === 'Dagger' ? '단검' :
            '';
        const skill =
            weapon === 'Dagger' ? '"최소 데미지" ~ "최대 데미지" _h: "흡혈량"' :
            '';
        return '캐시 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "최소 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "최소 데미지" - "최대 데미지"\n' +
            'W: "최소 데미지" - "최대 데미지"\n' +
            'E: "합산데미지" ( "1타 데미지", "2타 데미지" )\n' +
            'R: "최소 데미지" ~ "최대 막타 데미지"\n' +
            'D: ' + skill + '\n' +
            'T: "합산 데미지" ( "틱당 데미지" x "타수" ) _s: "쉴드량" _s/s: "초당 쉴드량" _full "최대스택"\n';
    }
    ,COMBO_VARS: '{\"bleeding\":[]}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus, myHp) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.W_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const t = character.T_LEVEL.selectedIndex;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        const auto_cri = character.AUTO_CRI.checked;
        let damage = 0;
        let heal = calcHeal(character, character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        const bleeding = data.vars.bleeding;

        const cool = (20 - t * 2) * (100 - character.cooldown_reduction) / 100;
        const as = character.attack_speed * character.critical_strike_chance / 100 + 1 +
            (1 / (12 - q * 0.5) * (100 - character.cooldown_reduction) / 100);
        if (index === 0 || floor(as * index / 2 / cool) > floor(as * (index - 1) / 2 / cool)) {
            shield += floor(100 + t * 25 + character.attack_power * 0.25);
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
            const tra = calcTrueDamage(character, enemy, character.attack_power * 0.2);
            const ftra = calcTrueDamage(character, enemy, character.attack_power * 0.2 + character.max_hp * 0.0075);
            let crid;
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
                if (c === 'a') {
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    if (bleeding[index] === 5) {
                        character.critical_damage += 10 + t * 10;
                        ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                        character.critical_damage -= 10 + t * 10;
                    } else {
                        ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                    }
                    damage += ba;
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);

                    if (bleeding[index]) {
                        if (bleeding[index] >= 3) {
                            if (bleeding[index] < 4) {
                                for (let x = index; x < index + 8; x++) {
                                    bleeding[x] = 4;
                                }
                            }
                        } else {
                            bleeding[index]++;
                            for (let x = index + 1; x < index + 6; x++) {
                                bleeding[x] = bleeding[index];
                            }
                        }
                    } else {
                        bleeding[index] = 1;
                        for (let x = index + 1; x < index + 6; x++) {
                            bleeding[x] = bleeding[index];
                        }
                    }
                } else if (c === 'A') {
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    if (bleeding[index] === 5) {
                        character.critical_damage += 10 + t * 10;
                        ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 100, 1);
                        character.critical_damage -= 10 + t * 10;
                    } else {
                        ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 100, 1);
                    }
                    damage += ba;
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);

                    if (bleeding[index]) {
                        if (bleeding[index] >= 3) {
                            if (bleeding[index] < 4) {
                                for (let x = index; x < index + 8; x++) {
                                    bleeding[x] = 4;
                                }
                            }
                        } else {
                            bleeding[index]++;
                            for (let x = index + 1; x < index + 6; x++) {
                                bleeding[x] = bleeding[index];
                            }
                        }
                    } else {
                        bleeding[index] = 1;
                        for (let x = index + 1; x < index + 6; x++) {
                            bleeding[x] = bleeding[index];
                        }
                    }
                } else if (c === 'q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 20 + q * 30, 0.4, 1);

                        if (bleeding[index]) {
                            if (bleeding[index] >= 2) {
                                if (bleeding[index] < 4) {
                                    for (let x = index; x < index + 8; x++) {
                                        bleeding[x] = 4;
                                    }
                                }
                            } else {
                                bleeding[index] += 2;
                                for (let x = index + 1; x < index + 6; x++) {
                                    bleeding[x] = bleeding[index];
                                }
                            }
                        } else {
                            bleeding[index] = 2;
                            for (let x = index + 1; x < index + 6; x++) {
                                bleeding[x] = bleeding[index];
                            }
                        }
                    }
                } else if (c === 'Q') {
                    if (q >= 0) {
                        if (bleeding[index] === 5) {
                            character.critical_damage += 10 + t * 10;
                            crid = (1.3 + (character.critical_damage - (!enemy.critical_damage_reduction ? 0 : enemy.critical_damage_reduction)) / 100);
                            character.critical_damage -= 10 + t * 10;
                        } else {
                            crid = (1.3 + (character.critical_damage - (!enemy.critical_damage_reduction ? 0 : enemy.critical_damage_reduction)) / 100);
                        }
                        damage += calcSkillDamage(character, enemy, (20 + q * 30) * crid, 0.4 * crid, 1);

                        if (bleeding[index]) {
                            if (bleeding[index] >= 2) {
                                if (bleeding[index] < 4) {
                                    for (let x = index; x < index + 8; x++) {
                                        bleeding[x] = 4;
                                    }
                                }
                            } else {
                                bleeding[index] += 2;
                                for (let x = index + 1; x < index + 6; x++) {
                                    bleeding[x] = bleeding[index];
                                }
                            }
                        } else {
                            bleeding[index] = 2;
                            for (let x = index + 1; x < index + 6; x++) {
                                bleeding[x] = bleeding[index];
                            }
                        }
                    }
                } else if (c === 'w') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 35 + w * 35, 0.2, 1);

                        if (bleeding[index]) {
                            if (bleeding[index] >= 2) {
                                if (bleeding[index] < 4) {
                                    for (let x = index; x < index + 8; x++) {
                                        bleeding[x] = 4;
                                    }
                                }
                            } else {
                                bleeding[index] += 2;
                                for (let x = index + 1; x < index + 6; x++) {
                                    bleeding[x] = bleeding[index];
                                }
                            }
                        } else {
                            bleeding[index] = 2;
                            for (let x = index + 1; x < index + 6; x++) {
                                bleeding[x] = bleeding[index];
                            }
                        }
                    }
                } else if (c === 'W') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 80 + w * 35, 0.55, 1);

                        if (bleeding[index]) {
                            if (bleeding[index] >= 2) {
                                if (bleeding[index] < 4) {
                                    for (let x = index; x < index + 8; x++) {
                                        bleeding[x] = 4;
                                    }
                                }
                            } else {
                                bleeding[index] += 2;
                                for (let x = index + 1; x < index + 6; x++) {
                                    bleeding[x] = bleeding[index];
                                }
                            }
                        } else {
                            bleeding[index] = 2;
                            for (let x = index + 1; x < index + 6; x++) {
                                bleeding[x] = bleeding[index];
                            }
                        }
                    }
                } else if (c === 'e') {
                    if (e >= 0) {
                        damage += calcSkillDamage(character, enemy, 30 + e * 10, 0.3, 1);

                        if (bleeding[index]) {
                            if (bleeding[index] >= 2) {
                                if (bleeding[index] < 4) {
                                    for (let x = index; x < index + 8; x++) {
                                        bleeding[x] = 4;
                                    }
                                }
                            } else {
                                bleeding[index] += 2;
                                for (let x = index + 1; x < index + 6; x++) {
                                    bleeding[x] = bleeding[index];
                                }
                            }
                        } else {
                            bleeding[index] = 2;
                            for (let x = index + 1; x < index + 6; x++) {
                                bleeding[x] = bleeding[index];
                            }
                        }
                    }
                } else if (c === 'E') {
                    if (e >= 0) {
                        damage += calcSkillDamage(character, enemy, 30 + e * 10, 0.3, 1);
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                        }
                        damage += calcSkillDamage(character, enemy, 10 + e * 10, 0.2, 1);

                        if (bleeding[index]) {
                            if (bleeding[index] >= 2) {
                                if (bleeding[index] < 4) {
                                    for (let x = index; x < index + 8; x++) {
                                        bleeding[x] = 4;
                                    }
                                }
                            } else {
                                bleeding[index] += 2;
                                for (let x = index + 1; x < index + 6; x++) {
                                    bleeding[x] = bleeding[index];
                                }
                            }
                        } else {
                            bleeding[index] = 2;
                            for (let x = index + 1; x < index + 6; x++) {
                                bleeding[x] = bleeding[index];
                            }
                        }
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        let lost = enemy.max_hp ? damage - heal - shield : 0;
                        if (lost < 0) {
                            lost = 0;
                        }
                        const coe = enemy.max_hp ? (lost * 100.0 / enemy.max_hp > 70 ? 70 : lost * 100.0 / enemy.max_hp) / 70 + 1 : 2;
                        damage += calcSkillDamage(character, enemy, (120 + r * 80) * coe, 0.6 * coe, 1);
                        lost = floor((character.max_hp - (myHp + heal)) * 100.0 / character.max_hp);
                        if (lost < 80) {
                            heal += calcHeal(character, (120 + r * 80 + character.attack_power * 0.4) *
                                (100 + character.character.correction[character.weapon.Type][2][character.MODE.selectedIndex]) / 100, 1, enemy);
                        } else {
                            heal = calcHeal(character, (180 + r * 120 + character.attack_power * 0.6) *
                                (100 + character.character.correction[character.weapon.Type][2][character.MODE.selectedIndex]) / 100, 1, enemy);
                        }

                        for (let x = index; x < index + 8; x++) {
                            bleeding[x] = 4;
                        }
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Dagger') {

                            if (character.weapon.Smolder && sm < 4) {
                                sm++;
                                sms = 8;
                            }
                            if (fi === character.weapon.Focused_Impact * 2) {
                                fi--;
                            }
                            let currHp = enemy.max_hp ? data.hp - damage + heal + shield : 0;
                            if (currHp > enemy.max_hp) {
                                currHp = enemy.max_hp;
                            } else if (currHp < 0) {
                                currHp = 0;
                            }
                            if (bleeding[index] === 5) {
                                character.critical_damage += 10 + t * 10;
                                ba = floor(baseAttackDamage(character, enemy, 0, 1, 0, 1) + calcTrueDamage(character, enemy, enemy.max_hp ? currHp * 0.08 : 0));
                                character.critical_damage -= 10 + t * 10;
                            } else {
                                ba = floor(baseAttackDamage(character, enemy, 0, 1, 0, 1) + calcTrueDamage(character, enemy, enemy.max_hp ? currHp * 0.08 : 0));
                            }
                            damage += ba;
                            heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);

                            if (bleeding[index]) {
                                if (bleeding[index] >= 4) {
                                    if (bleeding[index] < 5) {
                                        for (let x = index; x < index + 10; x++) {
                                            bleeding[x] = 5;
                                        }
                                    }
                                } else {
                                    bleeding[index]++;
                                    for (let x = index + 1; x < index + 6; x++) {
                                        bleeding[x] = bleeding[index];
                                    }
                                }
                            } else {
                                bleeding[index] = 1;
                                for (let x = index + 1; x < index + 6; x++) {
                                    bleeding[x] = bleeding[index];
                                }
                            }
                        }
                    }
                } else if (c === 'p' || c === 'P') {
                    if (character.trap) {
                        damage += floor(character.trap.Trap_Damage * (1.04 + character.TRAP_MASTERY.selectedIndex * 0.04));
                    }
                }
            }
            damage += index % 2 === 0 && bleeding[index] ? bleeding[index] === 5 ? ftra : tra : 0;
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
                bleeding: bleeding
            }
        };
    }
    ,COMBO_Option: 'wqadqaaara'
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
            'q: Q스킬 돌진 데미지\n' +
            'Q: Q스킬 근접 데미지\n' +
            'w: W스킬 근접 데미지\n' +
            'W: W스킬 칼날 데미지\n' +
            'e: E스킬 데미지\n' +
            'E: E스킬 벽꿍 데미지\n' +
            'r & R: R스킬 데미지( 잃은 체력 비례 Max 75% )\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};
