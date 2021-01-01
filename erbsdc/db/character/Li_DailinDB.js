const Li_Dailin = {
     Attack_Power: 33
    ,Attack_Power_Growth: 1.9
    ,Health: 550
    ,Health_Growth: 89
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
            [3, 3, 0],
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
    ,W_Option: "<b> _use</b><input type='checkbox' class='lida_w' onchange='updateDisplay()'>"
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
            const max = calcSkillDamage(character, enemy, 120 + r * 90, 0.6, 1);
            const over = calcSkillDamage(character, enemy, 132 + r * 99, 0.66, 1);
            return min * 4 + " - <b class='damage'>" + max * 4 + '</b> / ' + over * 4 + ' ( [ ' + min + ' x 4 ] - [ ' + max + ' x 4 ] / [ ' + over + ' x 4 ] )';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Glove') {
                const coe = character.WEAPON_MASTERY.selectedIndex < 13 ? 1 : 2;
                const bonus = character.WEAPON_MASTERY.selectedIndex < 13 ? 50 : 100;
                const damage = gloveAttackDamage(character, enemy, coe, character.critical_strike_chance, bonus);
                const min = gloveAttackDamage(character, enemy, coe, 0, bonus);
                const max = gloveAttackDamage(character, enemy, coe, 100, bonus);
                const over = gloveAttackDamage(character, enemy, coe * 1.1, 100, bonus);
                const life = calcHeal(damage * (character.life_steal / 100), 1, enemy);
                return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' / ' + over + " )<b> __h: </b><b class='heal'>" + life + '</b>';
            }
            if (type === 'Nunchaku') {
                const min = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 125 : 250, 0.5, 1);
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
};