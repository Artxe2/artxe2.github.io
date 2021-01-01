const Shoichi = {
     Attack_Power: 30
    ,Attack_Power_Growth: 2.9
    ,Health: 550
    ,Health_Growth: 78
    ,Health_Regen: 0.8
    ,Health_Regen_Growth: 0.04
    ,Stamina: 370
    ,Stamina_Growth: 13
    ,Stamina_Regen: 1.6
    ,Stamina_Regen_Growth: 0.04
    ,Defense: 27
    ,Defense_Growth: 2.2
    ,Atk_Speed: 0.12
    ,Crit_Rate: 0
    ,Move_Speed: 3.1
    ,Sight_Range: 8
    ,Attack_Range: 0.43
    ,weapons: [Dagger]
    ,correction: {
        Dagger: [
            [0, -5, -6],
            [0, 0, 0]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            let damage, min, max;
            if (character.DIV.querySelector('.shoichi_t').value == 5) {
                const t = character.T_LEVEL.selectedIndex;
                damage = baseAttackDamage(character, enemy, 0, 1 + 0.1 + 0.05 * t, character.critical_strike_chance, 1);
                min = baseAttackDamage(character, enemy, 0, 1 + 0.1 + 0.05 * t, 0, 1);
                max = baseAttackDamage(character, enemy, 0, 1 + 0.1 + 0.05 * t, 100, 1);
            } else {
                damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
                min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
                max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            let ba;
            if (character.DIV.querySelector('.shoichi_t').value == 5) {
                const t = character.T_LEVEL.selectedIndex;
                ba = baseAttackDamage(character, enemy, 0, 1 + 0.1 + 0.05 * t, character.critical_strike_chance, 1);
            } else {
                ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            }
            const damage = (ba * character.attack_speed * 100 | 0) / 100;
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
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 10 + character.Q_LEVEL.selectedIndex * 50, 0.45, 1) + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 10 + character.W_LEVEL.selectedIndex * 30, 0.3, 1) + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 20 + character.E_LEVEL.selectedIndex * 40, 0.3, 1) + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex;
            const damage1 = calcSkillDamage(character, enemy, 50 + r * 100, 0.3, 1);
            const damage2 = calcSkillDamage(character, enemy, 25 + r * 35, 0.3, 1);
            const t = calcSkillDamage(character, enemy, 25 + character.T_LEVEL.selectedIndex * 35, 0.3, 1);
            const w = calcSkillDamage(character, enemy, 10 + character.W_LEVEL.selectedIndex * 30, 0.3, 1);
            return "<b class='damage'>" + (damage1 + damage2 + t * 4 + w) + '</b> ( ' + damage1 + ', ' + damage2 + ', ' + t + ' x 4, ' + w + ' )';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Dagger') {
                const damage = baseAttackDamage(character, enemy, 0, 1, 100, 1);
                return "<b class='damage'>" + damage + ' ~ ' + ((damage + (enemy.max_hp ? enemy.max_hp / 10 : 0)) | 0) + '</b>';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 25 + character.T_LEVEL.selectedIndex * 35, 0.3, 1) + '</b>';
        }
        return '-';
    }
    ,T_Option: "_ <input type='number' class='stack shoichi_t' value='0' onchange='fixLimitNum(this, 5)'><b>Stack</b>"
};