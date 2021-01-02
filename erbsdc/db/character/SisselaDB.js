const Sissela = {
     Attack_Power: 23
    ,Attack_Power_Growth: 2.4
    ,Health: 480
    ,Health_Growth: 60
    ,Health_Regen: 0.4
    ,Health_Regen_Growth: 0.02
    ,Stamina: 400
    ,Stamina_Growth: 16
    ,Stamina_Regen: 1.1
    ,Stamina_Regen_Growth: 0.02
    ,Defense: 19
    ,Defense_Growth: 1.7
    ,Atk_Speed: 0.12
    ,Crit_Rate: 0
    ,Move_Speed: 3
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Throws, Shuriken]
    ,correction: {
        Throws: [
            [0, -15, -18],
            [0, 0, 0]
        ],
        Shuriken: [
            [0, -15, -18],
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
        const t = character.T_LEVEL.selectedIndex;
        const lost = character.DIV.querySelector('.sissela_t').value;
        const passive = calcHeal(lost < 10 ? 0 : 
            (lost >= 90 ? 26 + t * 10 : 2 + t * 2 + (3 + t) * ((lost / 10 | 0) - 1)) * (character.DIV.querySelector('.sissela_r').checked ? 2 : 1), 1, enemy);
        const total = Math.round((passive + (calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 + 
            (character.food ? character.food.HP_Regen / 30 : 0), 2, enemy))) * 100) / 100;
        return "<b class='heal'>" + total + '</b>';
    }
    ,Q_Skill: (character, enemy) => {
        if (character.weapon) {
            const q = character.Q_LEVEL.selectedIndex;
            const damage1 = calcSkillDamage(character, enemy, 40 + q * 20, 0.3, 1);
            const damage2 = calcSkillDamage(character, enemy, 60 + q * 30, 0.5, 1);
            const cost = 50 + q * 10;
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' + damage1 + ', ' + damage2 + " ) <b> __cost: </b><b class='heal'>-" + cost + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex;
            const damage = calcSkillDamage(character, enemy, 30 + w * 60, 0.7, 1);
            const cost = 60 + w * 20;
            return "<b class='damage'>" + damage + "</b><b> __cost: </b><b class='heal'>-" + cost + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            const e = character.E_LEVEL.selectedIndex;
            const damage = calcSkillDamage(character, enemy, 40 + e * 50, 0.6, 1);
            const shield = 60 + e * 50 + character.attack_power * 0.5;
            return "<b class='damage'>" + damage + '</b><b> __s: </b>' + shield;
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex;
            const bonus = character.DIV.querySelector('.sissela_t').value * 2;
            const min = calcSkillDamage(character, enemy, (150 + r * 125 + bonus) * 0.5, 1 * 0.5, 1);
            const max = calcSkillDamage(character, enemy, 150 + r * 125 + bonus, 1, 1);
            return "<b class='damage'>" + min + ' - ' + max + '</b>';
        }
        return '-';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='sissela_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Throws') {
                return '-';
            }
            if (type === 'Shuriken') {
                const damage = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 110 : 180, 0.3, 1);
                const add = calcSkillDamage(character, enemy, (character.WEAPON_MASTERY.selectedIndex < 13 ? 110 : 180) * 0.3, 0.3 * 0.3, 1);
                return "<b class='damage'>" + damage + ' ~ ' + (damage + add * 11) + '</b> ( ' + damage + ', ' + add + ' x 11 )';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const bonus = calcSkillDamage(character, enemy, 28 + character.LEVEL.selectedIndex * 10, 0.2, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            return "<b class='damage'>" + (damage + bonus) + '</b> ( ' +  min + ', ' + bonus + ' - ' + max + ', ' + bonus + ' ) ';
        }
        return '-';
    }
    ,T_Option: "<br>_LostHP: <input type='number' class='stack sissela_t' value='0' onchange='fixLimitNum(this, 100)'><b>%</b>"
};