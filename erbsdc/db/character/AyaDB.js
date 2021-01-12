const Aya = {
     Attack_Power: 28
    ,Attack_Power_Growth: 2.6
    ,Health: 480
    ,Health_Growth: 63
    ,Health_Regen: 0.5
    ,Health_Regen_Growth: 0.05
    ,Stamina: 440
    ,Stamina_Growth: 22
    ,Stamina_Regen: 2.3
    ,Stamina_Regen_Growth: 0.07
    ,Defense: 14
    ,Defense_Growth: 1.4
    ,Atk_Speed: 0.12
    ,Crit_Rate: 0
    ,Move_Speed: 3.0
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Pistol, AssaultRifle, SniperRifle]
    ,correction: {
        Pistol: [
            [0, -15, -11],
            [0, 0, 0]
        ],
        AssaultRifle: [
            [0, -12, -13],
            [0, 0, 0]
        ],
        SniperRifle: [
            [0, -15, -15],
            [-3, 0, 0]
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
            const damage1 = Math.round(shot * as * 100) / 100;
            const damage2 = Math.round(shot * character.attack_speed * 100) / 100;
            const life1 = calcHeal(shot * (character.life_steal / 100), as, enemy);
            const life2 = calcHeal(shot * (character.life_steal / 100), character.attack_speed, enemy);
            return "<b class='damage'>" + damage1 + '</b> - ' + damage2 + "<b> __h/s: </b><b class='heal'>" + life1 + '</b> - ' + life2;
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
            const damage1 = calcSkillDamage(character, enemy, 0, 1, 1);
            const damage2 = calcSkillDamage(character, enemy, 20 + character.Q_LEVEL.selectedIndex * 40, 0.5, 1);
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' + damage1 + ', ' + damage2 + ' )';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            const damage = calcSkillDamage(character, enemy, 22 + character.W_LEVEL.selectedIndex * 22, 0.3 + character.W_LEVEL.selectedIndex * 0.05, 1);
            return "<b class='damage'>" + damage * 10 + '</b> ( ' + damage + ' x 10 )';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 200 + character.R_LEVEL.selectedIndex * 150, 0.7, 1) + "</b>";
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Pistol') {
                return '-';
            }
            if (type === 'AssaultRifle') {
                const as2 = calcAttackSpeed(character, character.WEAPON_MASTERY.selectedIndex < 13 ? 40 : 60);
                const as1 = 10 / (9.5 / as2 + 2);
                const shot = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1) * 2 + 
                    baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
                const damage1 = Math.round(shot * as1 * 100) / 100;
                const damage2 = Math.round(shot * as2 * 100) / 100;
                const life1 = calcHeal(shot * (character.life_steal / 100), as1, enemy);
                const life2 = calcHeal(shot * (character.life_steal / 100), as2, enemy);
                const shield = 100 + character.T_LEVEL.selectedIndex * 50 + character.attack_power * 0.3 | 0;
                return "<b> _d/s: </b><b class='damage'>" + damage1 + '</b> - ' + damage2 + "<b> __h/s: </b><b class='heal'>" + life1 + '</b> - ' + life2 + 
                    "<b> __s/s: </b><b class='shield'>" + (shield * (1 + as1 * 6) / 0.3 | 0) / 100 + '</b> - ' + (shield * (1 + as2 * 6) / 0.3 | 0) / 100;
            }
            if (type === 'SniperRifle') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 2.5 : 3, 1) + '</b>';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            const shield = 100 + character.T_LEVEL.selectedIndex * 50 + character.attack_power * 0.3 | 0;
            let as;
            if (character.weapon.Type === 'AssaultRifle') {
                as = 10 / (9.5 / character.attack_speed + 2) * 6;
            } else {
                as = character.weapon.Ammo / ((character.weapon.Ammo - 1) / character.attack_speed + 2) * 2;
            }
            return "<b> _s: </b><b class='shield'>" + shield + "</b><b> __s/s: </b><b class='shield'>" + (shield * (1 + as) / 0.3 | 0) / 100 + '</b>';
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
            weapon === 'AssaultRifle' ? '_d/s: "초당 데미지" - "장전 배제 데미지" __h/s: "초당 흡혈량" - "장전 배제 흡혈량" __s/s: "초당 쉴드량" - "장전 배제 쉴드량"' : 
            weapon === 'SniperRifle' ? '"1발당 데미지"' : 
            '';
        return '아야 ( ' + type + ' )\n' + 
            'A: "평균 데미지" ( "최소 데미지" - "치명타 데미지" )\n' + 
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
            'HPS: "초당 회복량"\n' + 
            'Q: "합산 데미지" ( "1타 데미지", "2타 데미지" )\n' + 
            'W: "합산 데미지" ( "1발당 데미지" x "타수" )\n' + 
            'E: "데미지 없음"\n' + 
            'R: "스킬 데미지"\n' + 
            'D: ' + skill + '\n' + 
            'T: _s: "쉴드량" __s/s: "초당 쉴드량"\n';
    }
};
