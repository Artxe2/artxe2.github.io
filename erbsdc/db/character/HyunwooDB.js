const Hyunwoo = {
     Attack_Power: 40
    ,Attack_Power_Growth: 3.1
    ,Health: 500
    ,Health_Growth: 85
    ,Health_Regen: 0.8
    ,Health_Regen_Growth: 0.04
    ,Stamina: 350
    ,Stamina_Growth: 16
    ,Stamina_Regen: 1.8
    ,Stamina_Regen_Growth: 0.04
    ,Defense: 26
    ,Defense_Growth: 2.2
    ,Atk_Speed: 0.12
    ,Crit_Rate: 0
    ,Move_Speed: 3.15
    ,Sight_Range: 8
    ,Attack_Range: 0.45
    ,weapons: [Glove, Tonfa]
    ,correction: {
        Glove: [
            [0, -3, -3],
            [0, -2, -5]
        ],
        Tonfa: [
            [0, -3, -3],
            [0, -2, -5]
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
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 100 + character.Q_LEVEL.selectedIndex * 50, 0.4, 1) + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        return '';
    }
    ,W_Option: "<b> _use</b><input type='checkbox' class='hyunwoo_w' onchange='updateDisplay()'>"
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            const e = character.E_LEVEL.selectedIndex;
            const min = calcSkillDamage(character, enemy, character.defense, 0, 1);
            const max = calcSkillDamage(character, enemy, (enemy.max_hp ? enemy.max_hp * (0.05 + e * 0.03) : 0) + character.defense, 0, 1);
            const bonus = calcSkillDamage(character, enemy, 60 + e * 35, 0, 1);
            return "<b class='damage'>" + (max + bonus) + '</b> ( ' + min + ' ~ ' + max + ', ' + bonus + ' )';
        }
        return '-';
    }
    ,E_Option: "<b> __use</b><input type='checkbox' class='hyunwoo_e' onchange='updateDisplay()'>"
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex;
            const min = calcSkillDamage(character, enemy, 200 + r * 100, 0.7, 1);
            const max = calcSkillDamage(character, enemy, 600 + r * 300, 2.1, 1);
            return "<b class='damage'>" + min + ' ~ ' + max + '</b>';
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
                return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' / ' + over + ' )<b> __h: </b>' + life;
            }
            if (type === 'Tonfa') {
                const percent = calcSkillDamage(character, enemy, (character.WEAPON_MASTERY.selectedIndex < 13 ? 5000 : 7000) | 0, 0, 0) / 100;
                const bonus = calcSkillDamage(character, enemy, 0, 0, 1);
                return "<b class='damage'>" + percent + "%</b><b> + </b><b class='damage'>" + bonus + '</b>';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            return "<b> _h: </b><b class='heal'>" + calcHeal(character.max_hp * (0.07 + character.T_LEVEL.selectedIndex * 0.04), 1, enemy) + '</b>';
        }
        return '-';
    }
    ,T_Option: ''
};