const Zahir = {
     Attack_Power: 25
    ,Attack_Power_Growth: 2.8
    ,Health: 520
    ,Health_Growth: 64
    ,Health_Regen: 0.6
    ,Health_Regen_Growth: 0.03
    ,Stamina: 400
    ,Stamina_Growth: 26
    ,Stamina_Regen: 2.4
    ,Stamina_Regen_Growth: 0.1
    ,Defense: 20
    ,Defense_Growth: 1.8
    ,Atk_Speed: 0.11
    ,Crit_Rate: 0
    ,Move_Speed: 3
    ,Sight_Range: 8
    ,Attack_Range: 0.45
    ,weapons: [Throws, Shuriken]
    ,correction: {
        Throws: [
            [0, -10, -12],
            [0, 0, 0]
        ],
        Shuriken: [
            [0, -10, -12],
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
            const min = calcSkillDamage(character, enemy, 40 + q * 60, 0.5, 1);
            const max = calcSkillDamage(character, enemy, 75 + q * 75, 0.5, 1);
            const bonus = calcSkillDamage(character, enemy, 10 + character.T_LEVEL.selectedIndex * 25, 0.3, 1);
            return "<b class='damage'>" + min + ' - ' + (max + bonus)  + '</b> ( ' + max + ', ' + bonus + ' )';
        }
        return '-';
    }
    ,Q_Option: " _ <input type='number' class='stack zahir_q' value='0' onchange='fixLimitNum(this, 7)'><b>Stack"
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            const damage = calcSkillDamage(character, enemy, 25 + character.W_LEVEL.selectedIndex * 25, 0.3, 1);
            const bonus = calcSkillDamage(character, enemy, 10 + character.T_LEVEL.selectedIndex * 25, 0.3, 1);
            return "<b class='damage'>" + damage + ' - ' + (damage + bonus)  + '</b> ( ' + damage + ', ' + bonus + ' )';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            const damage = calcSkillDamage(character, enemy, 80 + character.E_LEVEL.selectedIndex * 30, 0.5, 1);
            const bonus = calcSkillDamage(character, enemy, 10 + character.T_LEVEL.selectedIndex * 25, 0.3, 1);
            return "<b class='damage'>" + damage + ' - ' + (damage + bonus)  + '</b> ( ' + damage + ', ' + bonus + ' )';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex
            const damage = calcSkillDamage(character, enemy, 60 + r * 90, 0.5, 1);
            const add = calcSkillDamage(character, enemy, 30 + r * 45, 0.5, 1);
            const bonus = calcSkillDamage(character, enemy, 10 + character.T_LEVEL.selectedIndex * 25, 0.3, 1);
            return "<b class='damage'>" + (damage + add * 4) + ' - ' + (damage + bonus + add * 4) + '</b> ( ' + damage + ', ' + bonus + ', ' + add + ' x 4, )';
        }
        return '-';
    }
    ,R_Option: ''
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
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 10 + character.T_LEVEL.selectedIndex * 25, 0.3, 1) + '</b>';
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
            weapon === 'Throws' ? '투척' : 
            weapon === 'Shuriken' ? '암기' : 
            '';
        const skill = 
            weapon === 'Throws' ? '"데미지 없음"' : 
            weapon === 'Shuriken' ? '"1타 데미지" ~ "합산 데미지" ( "1타 데미지", "추가 데미지" x "타수" )' : 
            '';
        return '자히르 ( ' + type + ' )\n' + 
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' + 
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
            'HPS: "초당 회복량"\n' + 
            'Q: "최소 데미지" - "합산 데미지" ( "강화 데미지", "패시브 데미지" ) _ "처치 수 차이"\n' + 
            'W: "스킬 데미지" - "합산 데미지" ( "스킬 데미지", "패시브 데미지" )\n' + 
            'E: "스킬 데미지" - "합산 데미지" ( "스킬 데미지", "패시브 데미지" )\n' + 
            'R: "합산 데미지" - "강화 데미지" ( "1타 데미지", "패시브 데미지", "추가 데미지" x "타수" )\n' + 
            'D: ' + skill + '\n' + 
            'T: "스킬 데미지"\n';
    }
};