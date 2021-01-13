const Li_Dailin = {
     Attack_Power: 33
    ,Attack_Power_Growth: 1.9
    ,Health: 550
    ,Health_Growth: 84
    ,Health_Regen: 1.1
    ,Health_Regen_Growth: 0.07
    ,Stamina: 420
    ,Stamina_Growth: 16
    ,Stamina_Regen: 0.2
    ,Stamina_Regen_Growth: 0.01
    ,Defense: 20
    ,Defense_Growth: 2.5
    ,Atk_Speed: 0.07
    ,Crit_Rate: 0
    ,Move_Speed: 3.1
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Glove, Nunchaku]
    ,correction: {
        Glove: [
            [0, 0, 0],
            [0, 0, 0]
        ],
        Nunchaku: [
            [3, 3, 3],
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
            const damage = Math.round(ba * character.attack_speed * 100) / 100;
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
        if (character.weapon) {
            const q = character.Q_LEVEL.selectedIndex;
            const min = calcSkillDamage(character, enemy, 20 + q * 20, 0.5, 1);
            const max = calcSkillDamage(character, enemy, 28 + q * 28, 0.7, 1);
            return "<b class='damage'>" + max * 3 + '</b> ( ' + min + ', ' + min + ', ' + min + ' - ' + max + ', ' + max + ', ' + max + ' )';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            const damage1 = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const damage2 = baseAttackDamage(character, enemy, 0, 0.5 + character.T_LEVEL.selectedIndex * 0.25, character.critical_strike_chance, 1);
            const dps = Math.round((damage1 + damage2) * character.attack_speed * 100) / 100;
            const life = calcHeal((damage1 + damage2) * (character.life_steal / 100), character.attack_speed, enemy);	
            return "<b> _d/s: </b><b class='damage'>" + dps + "</b><b> __h/s: </b><b class='heal'>" + life + '</b>';
        }
        return '-';
    }
    ,W_Option: "<b> __use</b><input type='checkbox' class='lida_w' onchange='updateDisplay()'>"
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 80 + character.E_LEVEL.selectedIndex * 55, 0.5, 1) + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex;
            const min = calcSkillDamage(character, enemy, 40 + r * 30, 0.2, 1);
            let max, over;
            if (enemy.max_hp) {
                const hp = enemy.max_hp;
                const heal = calcHeal(enemy.hp_regen * (enemy.hp_regen_percent + 100) / 100 + 
                    (enemy.food ? enemy.food.HP_Regen / 30 : 0), 2, character);
                let start = 0, mid, end = Math.ceil(hp * 0.77), coe;
                while (start < end) {
                    mid = (start + end + 1) / 2;
                    coe = 2 * (mid * 100.0 / hp > 77 ? 77 : mid * 100.0 / hp) / 77 + 1;
                    max = calcSkillDamage(character, enemy, (40 + r * 30) * coe, 0.2 * coe, 1);
                    if (max * 4 + mid > hp + heal) {
                        end = mid - 1;
                    } else {
                        start = mid;
                    }
                }
                start = 0;
                end = Math.ceil(hp * 0.77);
                while (start < end) {
                    mid = (start + end + 1) / 2;
                    coe = 2 * (mid * 100.0 / hp > 77 ? 77 : mid * 100.0 / hp) / 77 + 1;
                    over = calcSkillDamage(character, enemy, (40 + r * 30) * coe * 1.19, 0.2 * coe * 1.19, 1);
                    if (max * 4 + mid > hp + heal) {
                        end = mid - 1;
                    } else {
                        start = mid;
                    }
                }
            } else {
                max = calcSkillDamage(character, enemy, 120 + r * 90, 0.6, 1);
                over = calcSkillDamage(character, enemy, 120 + r * 90 * 1.19, 0.6 * 1.19, 1);
            }
            return "<b class='damage'>" + min * 4 + ' ~ ' + max * 4 + '</b> / ' + over * 4 + ' ( [ ' + min + ' x 4 ] - [ ' + max + ' x 4 ] / [ ' + over + ' x 4 ] )';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Glove') {
                const coe = character.WEAPON_MASTERY.selectedIndex < 13 ? 1 : 2;
                const bonus = calcTrueDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 50 : 100);
                const damage = baseAttackDamage(character, enemy, 0, 1 + coe, character.critical_strike_chance, 1) + bonus;
                const min = baseAttackDamage(character, enemy, 0, 1 + coe, 0, 1) + bonus;
                const max = baseAttackDamage(character, enemy, 0, 1 + coe, 100, 1) + bonus;
                const over = baseAttackDamage(character, enemy, 0, (1 + coe) * 1.19, 100, 1) + bonus;
                const life = calcHeal(damage * (character.life_steal / 100), 1, enemy);
                return "<b class='damage'>" + damage + '</b> ( ' +  min + " - <b class='damage'>" + max + '</b> / ' + over + " )<b> __h: </b><b class='heal'>" + life + '</b>';
            }
            if (type === 'Nunchaku') {
                const min = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 150 : 300, 0.5, 1);
                const max = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 300 : 600, 1.5, 1);
                return "<b class='damage'>" + min + ' ~ ' + max + '</b>';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            const coe = 0.5 + character.T_LEVEL.selectedIndex * 0.25;
            const damage1 = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const damage2 = baseAttackDamage(character, enemy, 0, coe, character.critical_strike_chance, 1);
            const min1 = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const min2 = baseAttackDamage(character, enemy, 0, coe, 0, 1);
            const max1 = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            const max2 = baseAttackDamage(character, enemy, 0, coe, 100, 1);
            const over1 = baseAttackDamage(character, enemy, 0, 1.1, 100, 1);
            const over2 = baseAttackDamage(character, enemy, 0, coe * 1.1, 100, 1);
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' +  min1 + ', ' + min2 + ' - ' + max1 + ', ' + max2 + ' / ' + over1 + ', ' + over2 + ' ) ';
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
            weapon === 'Nunchaku' ? '쌍절곤' : 
            '';
        const skill = 
            weapon === 'Glove' ? '"평균 데미지" ( "평타 데미지" - "치명타 데미지" / "최대 강화 데미지" ) __h: "평균 흡혈량"' : 
            weapon === 'Nunchaku' ? '"최소 데미지" ~ "최대 데미지"' : 
            '';
        return '리 다이린 ( ' + type + ' )\n' + 
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' + 
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
            'HPS: "초당 회복량"\n' + 
            'Q: "합산 강화 데미지" ( "1타 데미지", "2타 데미지", "3타 데미지" - "1타 강화", "2타 강화", "3타 강화" )\n' + 
            'W: _d/s: "만취 초당 데미지" __h/s: "만취 초당 흡혈량" __use "스킬 사용"\n' + 
            'E: "스킬 데미지"\n' + 
            'R: "최소 합산 데미지" ~ "최대 막타 데미지" / "최대 강화 데미지" ( [ "최소 데미지" x "타수" ] - [ "최대 데미지" x "타수" ] / [ "최대 강화 데미지" x "타수" ] )\n' + 
            'D: ' + skill + '\n' + 
            'T: "평균 데미지" ( "1타 데미지", "2타 데미지" - "1타 치명타", "2타 치명타" / "1타 최대 강화", "2타 최대 강화" )\n';
    }
    ,COMBO: (character, enemy) => {
        if (character.weapon) {
            const type = character.weapon.Type;
            let damage = 0, c;
            let bac = 0, liquid = false, qq = 0, wq = 0;
            const combo = character.COMBO_OPTION.value;
            for (let i = 0; i < combo.length; i++) {
                c = combo.charAt(i);
                if (c === 'a') {
                    if (liquid) {
                        liquid = false;
                        damage += baseAttackDamage(character, enemy, 0, 1 * (1 + liquid * 0.002), 0, 1);
                    } else {
                        damage += baseAttackDamage(character, enemy, 0, 1, 0, 1);
                    }
                } else if (c === 'A') {
                    if (liquid) {
                        liquid = false;
                        damage += baseAttackDamage(character, enemy, 0, 1 * (1 + liquid * 0.002), 100, 1);
                    } else {
                        damage += baseAttackDamage(character, enemy, 0, 1, 100, 1);
                    }
                } else if (c === 'q' || c === 'Q') {
                    const q = character.Q_LEVEL.selectedIndex;
                    if (qq > 0) {
                        qq--;
                        damage += calcSkillDamage(character, enemy, 20 + q * 20, 0.5, 1);
                    } else if (wq > 0) {
                        wq--;
                        damage += calcSkillDamage(character, enemy, 28 + q * 28, 0.7, 1);
                    } else if (bac >= 40) {
                        wq = 2;
                        damage += calcSkillDamage(character, enemy, 28 + q * 28, 0.7, 1);
                        bac -= 40;
                    } else {
                        qq = 2;
                        damage += calcSkillDamage(character, enemy, 20 + q * 20, 0.5, 1);
                    }
                } else if (c === 'w' || c === 'W') {
                    liquid = true;
                    if (bac < 55) {
                        bac += 45;
                    } else {
                        bac = 95;
                    }
                } else if (c === 'e' || c === 'E') {
                    if (bac >= 40) {
                        bac -= 40;
                    }
                    damage += calcSkillDamage(character, enemy, 80 + character.E_LEVEL.selectedIndex * 55, 0.5, 1)
                } else if (c === 'r' || c === 'R') {
                    const r = character.R_LEVEL.selectedIndex;
                    const coe = enemy.max_hp ? 2 * (damage * 100.0 / enemy.max_hp > 77 ? 77 : damage * 100.0 / enemy.max_hp) / 77 + 1 : 3;
                    if (bac >= 40) {
                        if (liquid) {
                            liquid = false;
                            damage += calcSkillDamage(character, enemy, (40 + r * 30) * coe * (1 + liquid * 0.002), 0.2 * coe * (1 + liquid * 0.002), 1) * 4;
                        } else {
                            damage += calcSkillDamage(character, enemy, (40 + r * 30) * coe, 0.2 * coe, 1) * 4;
                        }
                        bac -= 40;
                    } else {
                        damage += calcSkillDamage(character, enemy, (40 + r * 30) * coe, 0.2 * coe, 1) * 2;
                    }
                } else if (c === 'd') {
                    if (character.WEAPON_MASTERY.selectedIndex > 5) {
                        if (type === 'Glove') {
                            const coe = character.WEAPON_MASTERY.selectedIndex < 13 ? 1 : 2;
                            const bonus = calcTrueDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 50 : 100);
                            if (liquid) {
                                liquid = false;
                                damage += baseAttackDamage(character, enemy, 0, (1 + coe) * (1 + liquid * 0.002), 0, 1) + bonus;
                            } else {
                                damage += baseAttackDamage(character, enemy, 0, 1 + coe, 0, 1) + bonus;
                            }
                        } else if (type === 'Nunchaku') {
                            damage += calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 150 : 300, 0.5, 1);
                        }
                    }
                } else if (c === 'D') {
                    if (character.WEAPON_MASTERY.selectedIndex > 5) {
                        if (type === 'Glove') {
                            const coe = character.WEAPON_MASTERY.selectedIndex < 13 ? 1 : 2;
                            const bonus = calcTrueDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 50 : 100);
                            if (liquid) {
                                liquid = false;
                                damage += baseAttackDamage(character, enemy, 0, (1 + coe) * (1 + liquid * 0.002), 100, 1) + bonus;
                            } else {
                                damage += baseAttackDamage(character, enemy, 0, 1 + coe, 100, 1) + bonus;
                            }
                        } else if (type === 'Nunchaku') {
                            damage += calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 300 : 600, 1.5, 1);
                        }
                    }
                } else if (c === 't') {
                    if (liquid) {
                        liquid = false;
                        damage += baseAttackDamage(character, enemy, 0, 1 * (1 + liquid * 0.002), 0, 1) + 
                            baseAttackDamage(character, enemy, 0, (0.5 + character.T_LEVEL.selectedIndex * 0.25) * (1 + liquid * 0.002), 0, 1);
                    } else {
                        damage += baseAttackDamage(character, enemy, 0, 1, 100, 1);
                    }
                } else if (c === 'T') {
                    if (liquid) {
                        liquid = false;
                        damage += baseAttackDamage(character, enemy, 0, 1 * (1 + liquid * 0.002), 100, 1) + 
                            baseAttackDamage(character, enemy, 0, (0.5 + character.T_LEVEL.selectedIndex * 0.25) * (1 + liquid * 0.002), 100, 1);
                    } else {
                        damage += baseAttackDamage(character, enemy, 0, 1, 100, 1);
                    }
                }
            }
            return "<b class='damage'>" + damage + '</b><b> _ : ' + (enemy.max_hp ? (damage / enemy.max_hp * 10000 | 0) / 100 : '-') + '%</b>';
        }
        return '-';
    }
};
