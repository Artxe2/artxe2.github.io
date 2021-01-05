const Lenox = {
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
    ,weapons: [Whip]
    ,correction: {
        Whip: [
            [0, 0, 0],
            [0, 0, 0]
        ],
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
            const min = calcSkillDamage(character, enemy, 40 + q * 30, 0.3, 1);
            const max = calcSkillDamage(character, enemy, 40 + q * 30 + character.max_hp * (0.06 + q * 0.005), 0.3, 1);
            return "<b class='damage'>" + min + ' - ' + max  + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex;
            const damage1 = calcSkillDamage(character, enemy, 30 + w * 10, 0.3, 1);
            const damage2 = calcSkillDamage(character, enemy, 40 + w * 35, 0.6, 1);
            return "<b class='damage'>" + damage1 + ' - ' + (damage1 + damage2)  + '</b> ( ' + damage1 + ', ' + damage2 + ' )';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 60 + character.E_LEVEL.selectedIndex * 50, 0.3, 1) + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex
            const damage = calcSkillDamage(character, enemy, 75 + r * 75, 0.8, 1);
            const add = 10 + r * 5;
            const hit = enemy.movement_speed ? enemy.movement_speed * (4 + r) | 0 : 0;
            return "<b class='damage'>" + (damage * 2) + ' ~ ' + (damage * 2 + add * 2 * hit) + '</b> ( ' + damage + ' x 2, [' + add + ' x 2] x ' + hit + ' )';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Whip') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 100 + character.defense : 150, 0.3, 1) + '</b>';
            }
        }
        return '- ';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            return "<b> _s: </b><b class='shield'>" + (character.max_hp * 0.1 | 0) + '</b>';
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
            weapon === 'Whip' ? '채찍' : 
            '';
        const skill = 
            weapon === 'Whip' ? '"스킬 데미지"' : 
            '';
        return '레녹스 ( ' + type + ' )\n' + 
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' + 
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
            'HPS: "초당 회복량"\n' + 
            'Q: "최소 데미지" - "최대 데미지"\n' + 
            'W: "1타 데미지" - "합산 데미지" ( "1타 데미지", "2타 데미지" )\n' + 
            'E: "스킬 데미지"\n' + 
            'R: "합산 데미지" - "출혈 데미지" ( "스킬 데미지" x 2,  "틱당 데미지" x "타수" )\n' + 
            'D: ' + skill + '\n' + 
            'T: _s: "쉴드량"\n';
    }
};