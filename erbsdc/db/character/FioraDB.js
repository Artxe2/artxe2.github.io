const Fiora = {
     Attack_Power: 37
    ,Attack_Power_Growth: 2.5
    ,Health: 550
    ,Health_Growth: 87
    ,Health_Regen: 0.8
    ,Health_Regen_Growth: 0.06
    ,Stamina: 430
    ,Stamina_Growth: 13
    ,Stamina_Regen: 2.2
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 25
    ,Defense_Growth: 2.2
    ,Atk_Speed: 0.22
    ,Crit_Rate: 0
    ,Move_Speed: 3.15
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [TwoHandedSword, Rapier, Spear]
    ,correction: {
        TwoHandedSword: [
            [0, -2, -3],
            [0, 3, 6]
        ],
        Rapier: [
            [0, -2, -3],
            [0, 3, 6]
        ],
        Spear: [
            [0, -2, -3],
            [0, 3, 6]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            if (character.DIV.querySelector('.fiora_r').checked) {
                const r = character.R_LEVEL.selectedIndex;
                const bonus = calcSkillDamage(character, enemy, 30 + r * 5, 0.06 + r * 0.12, 1)
                return "<b class='damage'>" + (damage + bonus) + '</b> ( ' +  min + ', ' + bonus + ' - ' + max + ', ' + bonus + ' ) ';
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            const ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const life = calcHeal(ba * (character.life_steal / 100), character.attack_speed, enemy);
            let damage;
            if (character.DIV.querySelector('.fiora_r').checked) {
                const r = character.R_LEVEL.selectedIndex;
                const bonus = calcSkillDamage(character, enemy, 30 + r * 5, 0.06 + r * 0.12, 1)
                damage = Math.round((ba + bonus) * character.attack_speed * 100) / 100;
            } else {
                damage = Math.round(ba * character.attack_speed * 100) / 100;
            }
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
            const min = calcSkillDamage(character, enemy, 60 + q * 60, 0.25, 1);
            const max = calcSkillDamage(character, enemy, (60 + q * 60) * (1.2 +character.critical_strike_damage / 100), 0.25 * (1.2 + character.critical_strike_damage / 100), 1);
            return min + " - <b class='damage'>" + max + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex;
            const r = character.R_LEVEL.selectedIndex;
            const damage1 = baseAttackDamage(character, enemy, 0, 0.6 + w * 0.1, character.critical_strike_chance, 1);
            const damage2 = baseAttackDamage(character, enemy, 0, 0.2 + w * 0.1, character.critical_strike_chance, 1);
            const min1 = baseAttackDamage(character, enemy, 0, 0.6 + w * 0.1, 0, 1);
            const min2 = baseAttackDamage(character, enemy, 0, 0.2 + w * 0.1, 0, 1);
            const max1 = baseAttackDamage(character, enemy, 0, 0.6 + w * 0.1, 100, 1);
            const max2 = baseAttackDamage(character, enemy, 0, 0.2 + w * 0.1, 100, 1);
            if (character.DIV.querySelector('.fiora_r').checked) {
                const bonus = calcSkillDamage(character, enemy, 30 + r * 5, 0.06 + r * 0.12, 1);
                return "<b class='damage'>" + (damage1 + damage2 + bonus * 2) + '</b> ( ' +  min1 + ', ' + min2 + ', ' + bonus + ' - ' + max1 + ', ' + max2 + ', ' + bonus + ' ) ';
            }
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' +  min1 + ', ' + min2 + ' - ' + max1 + ', ' + max2 + ' ) ';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            const e = character.E_LEVEL.selectedIndex;
            const min = calcSkillDamage(character, enemy, 90 + e * 40, 0.4, 1);
            const max = calcSkillDamage(character, enemy, (90 + e * 40) * (1.2 +character.critical_strike_damage / 100), 0.4 * (1.2 + character.critical_strike_damage / 100), 1);
            return "<b class='damage'>" + min + '</b> - ' + max;
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex;
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 30 + r * 5, 0.06 + r * 0.12, 1) + '</b>';
        }
        return '-';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='fiora_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'TwoHandedSword') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 2 : 2.5, 1) + '</b>';
            }
            if (type === 'Rapier') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, (2 + character.critical_strike_damage / 100), 1) + '</b>';
            }
            if (type === 'Spear') {
                const damage = calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 1 : 1.5, 1);
                return "<b class='damage'>" + damage * 2 + '</b> ( ' + damage + ', ' + damage + ' )';
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
};