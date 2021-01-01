const Xiukai = {
     Attack_Power: 40
    ,Attack_Power_Growth: 2.2
    ,Health: 530
    ,Health_Growth: 80
    ,Health_Regen: 1
    ,Health_Regen_Growth: 0.06
    ,Stamina: 420
    ,Stamina_Growth: 14
    ,Stamina_Regen: 0.3
    ,Stamina_Regen_Growth: 0.01
    ,Defense: 34
    ,Defense_Growth: 1.7
    ,Atk_Speed: 0.16
    ,Crit_Rate: 0
    ,Move_Speed: 3.1
    ,Sight_Range: 8
    ,Attack_Range: 0.48
    ,weapons: [Dagger, Spear]
    ,correction: {
        Dagger: [
            [0, -6, -7],
            [0, 0, 0]
        ],
        Spear: [
            [0, -12, -12],
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
            const damage = calcSkillDamage(character, enemy, 80 + q * 40, 0.5, 1);
            const cost = 30 + q * 15;

            return "<b class='damage'>" + damage + "</b><b> __cost: </b><b class='heal'>-" + cost + '</b>';

        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex;
            const min = calcSkillDamage(character, enemy, 60 + w * 40, 0.5, 1);
            const max = calcSkillDamage(character, enemy, 60 + w * 40 + character.max_hp * (0.03 + w * 0.005), 0.5, 1);
            const cost = 30 + w * 15;
            return min + " - <b class='damage'>" + max + "</b><b> __cost: </b><b class='heal'>-" + cost + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            const e = character.E_LEVEL.selectedIndex;
            const min = calcSkillDamage(character, enemy, 80 + e * 30 + character.max_hp * 0.035 - (0.3 * e | 0) * 10, 0.5, 1);
            const max = calcSkillDamage(character, enemy, 80 + e * 30 + character.max_hp * 0.07 - (0.3 * e | 0) * 10, 0.5, 1);
            const cost = 30 + e * 15;
            return min + " - <b class='damage'>" + max + "</b><b> __cost: </b><b class='heal'>-" + cost + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex;
            const stack = parseInt(character.DIV.querySelector('.xiukai_t').value);
            const damage = calcSkillDamage(character, enemy, 30 + r * 50 + stack, 0.5, 1);
            const cost = 100 + r * 20;
            return "<b class='damage'>" + damage * 6 + '</b> ( ' + damage + " x 6 ) <b> __cost: </b><b class='heal'>-" + cost + '</b>';
        }
        return '-';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='xiukai_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Dagger') {
                const damage = baseAttackDamage(character, enemy, 0, 1, 100, 1);
                return "<b class='damage'>" + damage + ' ~ ' + ((damage + (enemy.max_hp ? enemy.max_hp / 10 : 0)) | 0) + '</b>';
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
        return '';
    }
    ,T_Option: "<input type='number' class='stack xiukai_t' value='0' onchange='fixLimitNum(this, 999)'><b>Stack"
};