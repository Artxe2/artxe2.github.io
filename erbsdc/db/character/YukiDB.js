const Yuki = {
     Attack_Power: 32
    ,Attack_Power_Growth: 2.6
    ,Health: 550
    ,Health_Growth: 81
    ,Health_Regen: 0.7
    ,Health_Regen_Growth: 0.05
    ,Stamina: 410
    ,Stamina_Growth: 20
    ,Stamina_Regen: 2.2
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 26
    ,Defense_Growth: 2
    ,Atk_Speed: 0.06
    ,Crit_Rate: 0
    ,Move_Speed: 3.1
    ,Sight_Range: 8
    ,Attack_Range: 0.45
    ,weapons: [TwoHandedSword, DualSwords]
    ,correction: {
        TwoHandedSword: [
            [0, -8, -10],
            [0, 0, 0]
        ],
        DualSwords: [
            [9, 1, 1],
            [-3, -3, -3]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            if (character.weapon.Type === 'DualSwords') {
                if (character.DIV.querySelector('.yuki_t').checked) {
                    const bonus = calcTrueDamage(character, enemy, 15 + 15 * character.T_LEVEL.selectedIndex);
                    return "<b class='damage'>" + (damage + damage + bonus + bonus) + '</b> ( ' +  min + ', ' + bonus + ', ' + min + ', ' + bonus + ' - ' + max + ', ' + bonus + ', ' + max + ', ' + bonus + ' )';
                }
                return "<b class='damage'>" + (damage + damage) + '</b> ( ' +  min + ', ' + min + ' - ' + max + ', ' + max + ' )';
            }
            if (character.DIV.querySelector('.yuki_t').checked) {
                const bonus = calcTrueDamage(character, enemy, 15 + 15 * character.T_LEVEL.selectedIndex);
                return "<b class='damage'>" + (damage + bonus) + '</b> ( ' +  min + ', ' + bonus + ' - ' + max + ', ' + bonus + ' )';
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            let ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            let bonus = calcTrueDamage(character, enemy, 15 + 15 * character.T_LEVEL.selectedIndex);
            let damage;
            if (character.weapon.Type === 'DualSwords') {
                ba += ba;
                bonus += bonus;
            }
            const life = calcHeal(ba * (character.life_steal / 100), character.attack_speed, enemy);
            if (character.DIV.querySelector('.yuki_t').checked) {
                damage= Math.round((ba + bonus) * character.attack_speed * 100) / 100;
            } else {
                damage= Math.round(ba * character.attack_speed * 100) / 100;
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
            const base = 20 + character.Q_LEVEL.selectedIndex * 25;
            const coe = character.weapon.Type === 'DualSwords' ? 2 : 1;
            const damage = baseAttackDamage(character, enemy, base, coe, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, base, coe, 0, 1);
            const max = baseAttackDamage(character, enemy, base, coe, 100, 1);
            const life = calcHeal(damage * (character.life_steal / 100), 1, enemy);
            if (character.DIV.querySelector('.yuki_t').checked) {
                const bonus = calcTrueDamage(character, enemy, 15 + 15 * character.T_LEVEL.selectedIndex);
                return "<b class='damage'>" + (damage + bonus) + '</b> ( ' +  min + ', ' + bonus + ' - ' + max + ', ' + bonus + " )<b> __h: </b><b class='heal'>" + life + '</b>';
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + " )<b> __h: </b><b class='heal'>" + life + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        return '';
    }
    ,W_Option: "<b> _use</b><input type='checkbox' class='yuki_w' onchange='updateDisplay()'>"
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            if (character.DIV.querySelector('.yuki_t').checked) {
                const damage = calcSkillDamage(character, enemy, 70 + character.E_LEVEL.selectedIndex * 50, 0.4, 1);
                const bonus = calcTrueDamage(character, enemy, 15 + 15 * character.T_LEVEL.selectedIndex);
                return "<b class='damage'>" + (damage + bonus) + ' ( ' + damage + ', ' + bonus + ' )</b>';
            }
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 70 + character.E_LEVEL.selectedIndex * 50, 0.4, 1) + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex;
            const damage1 = calcSkillDamage(character, enemy, 250 + r * 125, 1.5, 1);
            const damage2 = calcTrueDamage(character, enemy, enemy.max_hp ? enemy.max_hp * (0.15 + r * 0.05) : 0);
            if (character.DIV.querySelector('.yuki_t').checked) {
                const bonus = calcTrueDamage(character, enemy, 15 + 15 * character.T_LEVEL.selectedIndex);
                return "<b class='damage'>" + (damage1 + bonus + damage2 + bonus) + '</b> ( ' + damage1 + ', ' + bonus + ', ' + damage2 + ', ' + bonus + ' )';
            }
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' + damage1 + ', ' + damage2 + ' )';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'TwoHandedSword') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 2 : 2.5, 1) + '</b>';
            }
            if (type === 'DualSwords') {
                const damage = calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 0.3 : 0.5, 1);
                return "<b class='damage'>" + damage * 12 + '</b> ( ' + damage + ' x 12 )';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            const damage = calcTrueDamage(character, enemy, 15 + 15 * character.T_LEVEL.selectedIndex);
            return "<b class='damage'>" + damage + '</b>';
        }
        return '-';
    }
    ,T_Option: "<b> _use</b><input type='checkbox' class='yuki_t' onchange='updateDisplay()'>"
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type = 
            weapon === 'TwoHandedSword' ? '양손검' :
            weapon === 'DualSwords' ? '쌍검' :
            '';
        const skill = 
            weapon === 'TwoHandedSword' ? '"스킬 데미지"' : 
            weapon === 'DualSwords' ? '"합산 데미지" ( "틱당 데미지" x "타수" )' : 
            '';
        return '유키 ( ' + type + ' )\n' + 
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' + 
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
            'HPS: "초당 회복량"\n' + 
            'Q: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' + 
            'W: _use "스킬 사용"\n' + 
            'E: "스킬 데미지"\n' + 
            'R: "합산 데미지" ( "1타 데미지", "2타 데미지" )\n' + 
            'D: ' + skill + '\n' + 
            'T: "추가 데미지" ( "스킬 데미지" x "장전 수" )\n';
    }
};