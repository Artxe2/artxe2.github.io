const Hyejin = {
     Attack_Power: 29
    ,Attack_Power_Growth: 2.5
    ,Health: 500
    ,Health_Growth: 64
    ,Health_Regen: 0.6
    ,Health_Regen_Growth: 0.03
    ,Stamina: 400
    ,Stamina_Growth: 26
    ,Stamina_Regen: 2
    ,Stamina_Regen_Growth: 0.08
    ,Defense: 22
    ,Defense_Growth: 1.7
    ,Atk_Speed: 0.12
    ,Crit_Rate: 0
    ,Move_Speed: 3
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Shuriken, Bow]
    ,correction: {
        Shuriken: [
            [10, 2, -4],
            [-10, -7, -7]
        ],
        Bow: [
            [0, -13, -18],
            [-6, -3, -3]
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
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 100 + character.Q_LEVEL.selectedIndex * 25, 0.4, 1) + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex;
            const min = calcSkillDamage(character, enemy, 15 + w * 5, 0.5, 1);
            const max = calcSkillDamage(character, enemy, 140 + w * 65, 0.5, 1);
            return "<b class='damage'>" + min + ' ~ ' + max + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            const e = character.E_LEVEL.selectedIndex;
            const damage1 = calcSkillDamage(character, enemy, 45 + e * 25, 0.3, 1);
            const damage2 = calcSkillDamage(character, enemy, 50 + e * 25, 0.5, 1);
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' + damage1 + ', ' + damage2 + ' )';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex;
            const damage1 = calcSkillDamage(character, enemy, 150 + r * 125, 0.7, 1);
            const damage2 = calcSkillDamage(character, enemy, 80 + r * 50, 0.5, 1);
            return "<b class='damage'>" + (damage1 + damage2 * 5) + '</b> ( ' + damage1 + ', ' + damage2 + ' x 5 )';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Shuriken') {
                const damage = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 110 : 180, 0.3, 1);
                const add = calcSkillDamage(character, enemy, (character.WEAPON_MASTERY.selectedIndex < 13 ? 110 : 180) * 0.3, 0.3 * 0.3, 1);
                return "<b class='damage'>" + damage + ' ~ ' + (damage + add * 11) + '</b> ( ' + damage + ', ' + add + ' x 11 )';
            }
            if (type === 'Bow') {
                const min = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 150 : 250, 1, 1);
                const max = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 300 : 500, 2, 1);
                return "<b class='damage'>" + min + ' - ' + max + '</b>';
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
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type = 
            weapon === 'Shuriken' ? '암기' : 
            weapon === 'Bow' ? '보우' : 
            '';
        const skill = 
            weapon === 'Shuriken' ? '"1타 데미지" ~ "합산 데미지" ( "1타 데미지", "추가 데미지" x "타수" )' : 
            weapon === 'Bow' ? '"최소 데미지" - "최대 데미지"' : 
            '';
        return '혜진 ( ' + type + ' )\n' + 
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' + 
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
            'HPS: "초당 회복량"\n' + 
            'Q: "스킬 데미지"\n' + 
            'W: "최소 데미지" ~ "최대 데미지"\n' + 
            'E: "합산 데미지" ( "1타 데미지", "2타 데미지" )\n' + 
            'R: "합산 데미지" ( "폭발 데미지", "구체 데미지" x "타수" )\n' + 
            'D: ' + skill + '\n' + 
            'T: "데미지 없음"\n';
    }
};
