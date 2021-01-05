const Adriana = {
     Attack_Power: 31
    ,Attack_Power_Growth: 2.7
    ,Health: 530
    ,Health_Growth: 65
    ,Health_Regen: 0.5
    ,Health_Regen_Growth: 0.03
    ,Stamina: 480
    ,Stamina_Growth: 9
    ,Stamina_Regen: 1
    ,Stamina_Regen_Growth: 0.01
    ,Defense: 27
    ,Defense_Growth: 1.7
    ,Atk_Speed: 0.04
    ,Crit_Rate: 0
    ,Move_Speed: 3
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Throws]
    ,correction: {
        Throws: [
            [3, -9, -18],
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
            const damage = 12 + q * 3 + character.attack_power * (0.1 + q * 0.05) | 0;
            return "<b class='damage'>" + damage + ' ~ ' + damage * 9 + '</b> ( ' + damage + ' x 9 )';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            const damage1 = calcSkillDamage(character, enemy, 4 + t * 3, 0.15, 1);
            let damage2 = damage1;
            for (let i = 1; i < 9; i++) {
                damage2 += calcSkillDamage(character, enemy, (4 + t * 3) * (1 + i * 0.2), 0.15 * (1 + i * 0.2), 1);
            }
            return "<b class='damage'>" + damage1 + ' ~ ' + damage2 + '</b> ( ' + damage1 + ' x 9 )';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const damage = calcSkillDamage(character, enemy, 70 + character.R_LEVEL.selectedIndex * 60, 0.4, 1);
            return "<b class='damage'>" + damage + ' ~ ' + damage * 3 + '</b> ( ' + damage + ' x 3 )';
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
        }
        return '- ';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            const as = 100 / 0.56;
            const min = (calcSkillDamage(character, enemy, 4 + t * 3, 0.15, 1) * as | 0) / 100;
            const max = (calcSkillDamage(character, enemy, (4 + t * 3) * 3, 0.15 * 3, 1) * as | 0) / 100;
            return "<b> _d/s: </b><b class='damage'>" +  + min + ' ~ ' + max + '</b>';
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
            '';
        const skill = 
            weapon === 'Throws' ? '"데미지 없음"' : 
            '';
        return '아드리아나 ( ' + type + ' )\n' + 
            'A: "평균 데미지" ( "최소 데미지" - "치명타 데미지" )\n' + 
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
            'HPS: "초당 회복량"\n' + 
            'Q: "틱당 데미지" ~ "풀히트 데미지" ( "틱당 데미지" x "타수" )\n' + 
            'W: "데미지 없음"\n' + 
            'E: "틱당 데미지" ~ "풀히트 데미지" ( "최소 데미지" x "타수" )\n' + 
            'R: "1발당 데미지" ~ "3 회 사용 시 데미지" ( "1발당 데미지" x "장전 수" )\n' + 
            'D: ' + skill + '\n' + 
            'T: _d/s: "최초 초당 데미지" ~ "최대중첩 시 초당 데미지"\n';
    }
};