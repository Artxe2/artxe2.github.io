const Chiara = {
     Attack_Power: 34
    ,Attack_Power_Growth: 2
    ,Health: 500
    ,Health_Growth: 60
    ,Health_Regen: 0.5
    ,Health_Regen_Growth: 0.02
    ,Stamina: 410
    ,Stamina_Growth: 13
    ,Stamina_Regen: 1.8
    ,Stamina_Regen_Growth: 0.03
    ,Defense: 24
    ,Defense_Growth: 1.5
    ,Atk_Speed: 0.12
    ,Crit_Rate: 0
    ,Move_Speed: 3.15
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Rapier]
    ,correction: {
        Rapier: [
            [0, -5, -3],
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
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 60 + character.Q_LEVEL.selectedIndex * 40, 0.6, 1) + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex;
            const damage = calcSkillDamage(character, enemy, 80 + w * 40, 0.75, 1);
            const shield = 90 + w * 35 + character.attack_power * 0.6 | 0;
            return "<b class='damage'>" + damage + "</b><b> __s: </b><b class='shield'>" + shield;
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            const e = character.E_LEVEL.selectedIndex;
            const damage1 = calcSkillDamage(character, enemy, 40 + e * 20, 0.3, 1);
            const damage2 = calcSkillDamage(character, enemy, 70 + e * 40, 0.7, 1);
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' + damage1 + ', ' + damage2 + ' )';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const damage1 = calcSkillDamage(character, enemy, 20 + character.R_LEVEL.selectedIndex * 7, 0.15, 1);
            const damage2 = calcSkillDamage(character, enemy, 200 + character.R_LEVEL.selectedIndex * 100, 1.2, 1);
            const heal = calcHeal(damage1 * 0.3, 1, enemy);
            return "<b class='damage'>" + (damage1 * 12 + damage2) + '</b> ( ' + damage1 + " x 12, <b class='damage'>" + damage2 + "</b> ) <b> __h/s: </b><b class='heal'>" + heal + '</b>';
        }
        return ' - ';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='chiara_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Rapier') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, (2 + character.critical_strike_damage / 100), 1) + '</b>';
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
    ,T_Option: "<input type='number' class='stack chiara_t' value='0' onchange='fixLimitNum(this, 4)'><b>Stack"
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type = 
            weapon === 'Rapier' ? '레이피어' : 
            '';
        const skill = 
            weapon === 'Rapier' ? '"스킬 데미지"' : 
            '';
        return '키아라 ( ' + type + ' )\n' + 
            'A: "평균 데미지" ( "최소 데미지" - "치명타 데미지" )\n' + 
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
            'HPS: "초당 회복량"\n' + 
            'Q: "스킬 데미지"\n' + 
            'W: "스킬 데미지" __s: 쉴드량\n' + 
            'E: "합산 데미지" ( "1타 데미지", "2타 데미지" )\n' + 
            'R: "합산 데미지" ( "초당 데미지" x "타수", "징벌 데미지" ) __h/s: "초당 흡혈량" _use "스킬 사용"\n' + 
            'D: ' + skill + '\n' + 
            'T: "패시브 스택"\n';
    }
};