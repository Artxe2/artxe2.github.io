const Silvia = {
     Attack_Power: 28
    ,Attack_Power_Growth: 2.3
    ,Health: 500
    ,Health_Growth: 63
    ,Health_Regen: 0.4
    ,Health_Regen_Growth: 0.03
    ,Stamina: 440
    ,Stamina_Growth: 22
    ,Stamina_Regen: 2.1
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 20
    ,Defense_Growth: 1.4
    ,Atk_Speed: 0.12
    ,Crit_Rate: 0
    ,Move_Speed: 3
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Pistol]
    ,correction: {
        Pistol: [
            [3, -9, -18],
            [0, 0, 0],
            [10, 0, 0]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon && !character.DIV.querySelector('.silvia_r').checked) {
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon && !character.DIV.querySelector('.silvia_r').checked) {
            const as = 10 / (9.5 / character.attack_speed + 2);
            const shot = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1) * 2 + 
                baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
            const damage1 = Math.round(shot * as * 100) / 100;
            const damage2 = Math.round(shot * character.attack_speed * 100) / 100;
            const life1 = calcHeal(shot * (character.life_steal / 100), as, enemy);
            const life2 = calcHeal(shot * (character.life_steal / 100), character.attack_speed, enemy);
            return "<b class='damage'>" + damage1 + '</b> - ' + damage2 + "<b> __h/s: </b><b class='heal'>" + life1 + '</b> - ' + life2;
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
            if (character.DIV.querySelector('.silvia_r').checked) {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 40 + q * 60, 0.6, 1) + '</b>';
            }
            const damage = calcSkillDamage(character, enemy, 30 + q * 35, 0.4, 1);
            let heal;
            if (character.MODE.selectedIndex == 0) {
                heal = calcHeal((40 + q * 20 + character.attack_power * 0.3) * 1.1, 1, enemy);
            } else {
                heal = calcHeal((40 + q * 20 + character.attack_power * 0.3) * 0.95, 1, enemy);
            }
            return "<b class='damage'>" + damage + "</b><b> __h: </b><b class='heal'>" + heal + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex;
            if (character.DIV.querySelector('.silvia_r').checked) {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 90 + w * 40, 0.6, 1) + '</b>';
            }
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 40 + w * 20, 0.3, 1) + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            const e = character.E_LEVEL.selectedIndex;
            let min, max;
            if (character.DIV.querySelector('.silvia_r').checked) {
                const move = character.movement_speed + character.out_of_combat_movement_speed;
                min = calcSkillDamage(character, enemy, 40 + e * 25 + move / 17 * 2 * (6 + e * 4), 0.6, 1);
                max = calcSkillDamage(character, enemy, 40 + e * 25 + move * (6 + e * 4), 0.6, 1);
                return "<b class='damage'>" + min + ' ~ ' + max + '</b>';
            }
            min = calcSkillDamage(character, enemy, 80 + e * 20, 0.5, 1);
            max = calcSkillDamage(character, enemy, 154 + e * 33, 1.32, 1);
            return "<b class='damage'>" + min + ' ~ ' + max + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            if (character.DIV.querySelector('.silvia_r').checked) {
                const r = character.R_LEVEL.selectedIndex;
                const damage = baseAttackDamage(character, enemy, 0, 1.25 + r * 0.25, character.critical_strike_chance, 1);
                const min = baseAttackDamage(character, enemy, 0, 1.25 + r * 0.25, 0, 1);
                const max = baseAttackDamage(character, enemy, 0, 1.25 + r * 0.25, 100, 1);
                return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
            }
            return '-';
        }
        return '';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='silvia_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Pistol') {
                return '-';
            }
        }
        return '- ';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        return '';
    }
    ,T_Option: "<input type='number' class='stack silvia_t' value='0' onchange='fixLimitNum(this, 15)'><b>Stack"
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type = 
            weapon === 'Pistol' ? '권총' : 
            '';
        const skill = 
            weapon === 'Pistol' ? '"데미지 없음"' : 
            '';
        if (character.DIV.querySelector('.silvia_r').checked) {
            return '실비아 ( ' + type + ' )\n' + 
                'A: "평타 불가"\n' + 
                'DPS: "평타 불가"\n' + 
                'HPS: "초당 회복량"\n' + 
                'Q: "스킬 데미지"\n' + 
                'W: "스킬 데미지"\n' + 
                'E: "최소 데미지" ~ "최대 데미지"\n' + 
                'R: "평균 데미지" ( "평타 데미지" - "치명타 데미지" ) _use "스킬 사용"\n' + 
                'D: ' + skill + '\n' + 
                'T: "스택"\n';
        }
        return '실비아 ( ' + type + ' )\n' + 
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' + 
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
            'HPS: "초당 회복량"\n' + 
            'Q: "스킬 데미지" __h: "회복량"\n' + 
            'W: "스킬 데미지"\n' + 
            'E: "최소 데미지" ~ "최대 데미지"\n' + 
            'R: _use "스킬 사용"\n' + 
            'D: ' + skill + '\n' + 
            'T: "스택"\n';
    }
};