const Nadine = {
     Attack_Power: 32
    ,Attack_Power_Growth: 2.2
    ,Health: 520
    ,Health_Growth: 60
    ,Health_Regen: 0.4
    ,Health_Regen_Growth: 0.03
    ,Stamina: 350
    ,Stamina_Growth: 13
    ,Stamina_Regen: 1.9
    ,Stamina_Regen_Growth: 0.05
    ,Defense: 21
    ,Defense_Growth: 1.5
    ,Atk_Speed: 0.12
    ,Crit_Rate: 0
    ,Move_Speed: 3
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Bow, Crossbow]
    ,correction: {
        Bow: [
            [0, -11, -17],
            [0, 0, 0]
        ],
        Crossbow: [
            [0, -9, -17],
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
            const life = calcHeal(ba * (character.life_steal / 100), character.attack_speed, enemy);
            let damage;
            if (character.DIV.querySelector('.nadine_r').checked) {
                const bonus = calcSkillDamage(character, enemy, 50 + character.R_LEVEL.selectedIndex * 50 + parseInt(character.DIV.querySelector('.nadine_t').value), 0.5, 1) / 3;
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
            const stack = parseInt(character.DIV.querySelector('.nadine_t').value);
            const min = calcSkillDamage(character, enemy, 70 + q * 45 + stack, 0.6, 1);
            const max = calcSkillDamage(character, enemy, 140 + q * 90 + stack, 1.2, 1);
            return "<b class='damage'>" + min + ' ~ ' + max + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex;
            const damage1 = calcSkillDamage(character, enemy, 100 + w * 70, 0.6, 1);
            const damage2 = calcSkillDamage(character, enemy, 100 + w * 40, 0.6, 1);
            return "<b class='damage'>" + (damage1 * 2 + damage2) + '</b> ( ' + damage1 + ', ' + damage1 + ", <b class='damage'>" +  + damage2 + '</b> )';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        return '';
    }
    ,E_Option: "<b> _use</b><input type='checkbox' class='nadine_e' onchange='updateDisplay()'>"
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 50 + character.R_LEVEL.selectedIndex * 50 + parseInt(character.DIV.querySelector('.nadine_t').value), 0.5, 1) + '</b>';
        }
        return '-';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='nadine_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Bow') {
                const min = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 150 : 250, 1, 1);
                const max = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 300 : 500, 2, 1);
                return "<b class='damage'>" + min + ' - ' + max + '</b>';
            }
            if (type === 'Crossbow') {
                const damage = calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 0.6 : 1, 1);
                return "<b class='damage'>" + damage * 2 + '</b> ( ' + damage + ', ' + damage + ' )';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        return '';
    }
    ,T_Option: "<input type='number' class='stack nadine_t' value='0' onchange='fixLimitNum(this, 999)'><b>Stack"
};