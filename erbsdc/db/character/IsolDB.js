const Isol = {
     Attack_Power: 32
    ,Attack_Power_Growth: 2.6
    ,Health: 500
    ,Health_Growth: 60
    ,Health_Regen: 0.5
    ,Health_Regen_Growth: 0.03
    ,Stamina: 400
    ,Stamina_Growth: 21
    ,Stamina_Regen: 1.8
    ,Stamina_Regen_Growth: 0.03
    ,Defense: 23
    ,Defense_Growth: 1.6
    ,Atk_Speed: 0.14
    ,Crit_Rate: 0
    ,Move_Speed: 3.05
    ,Sight_Range: 8
    ,Attack_Range: 0.45
    ,weapons: [Pistol, AssaultRifle]
    ,correction: {
        Pistol: [
            [0, -8, -18],
            [0, 0, 0]
        ],
        AssaultRifle: [
            [0, -8, -18],
            [0, 0, 0]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            if (character.weapon.Type === 'AssaultRifle') {
                const damage1 = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1);
                const damage2 = baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
                const min1 = baseAttackDamage(character, enemy, 0, 0.32, 0, 1);
                const min2 = baseAttackDamage(character, enemy, 0, 0.48, 0, 1);
                const max1 = baseAttackDamage(character, enemy, 0, 0.32, 100, 1);
                const max2 = baseAttackDamage(character, enemy, 0, 0.48, 100, 1);
                return "<b class='damage'>" + (damage1 + damage1 + damage2) + '</b> ( ' + min1 + ', ' + min1 + ', ' + min2 + ' - ' + max1 + ', ' + max1 + ', ' + max2 + ' )';
            }
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
            let as, shot;
            if (character.weapon.Type === 'AssaultRifle') {
                as = 10 / (9.5 / character.attack_speed + 2);
                shot = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1) * 2 + 
                    baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
            } else {
                as = character.weapon.Ammo / ((character.weapon.Ammo - 1) / character.attack_speed + 2);
                shot = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            }
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
            const stack = parseInt(character.DIV.querySelector('.isol_q').value);
            const min = calcSkillDamage(character, enemy, 50 + q * 25, 0.5, 1);
            const max = calcSkillDamage(character, enemy, 50 + q * 25 + 
                (8 + q * 4) * stack, 0.5 + stack * 0.3, 1);
            return min + " ~ <b class='damage'>" +  + max + '</b>';
        }
        return '-';
    }
    ,Q_Option: "<span> </span><input type='number' class='stack isol_q' value='0' onchange='fixLimitNum(this, 10)'><b>Stack</b>"
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            const damage = calcSkillDamage(character, enemy, 20 + character.W_LEVEL.selectedIndex * 10, 0.5, 1);
            return "<b class='damage'>" + damage * 4 + '</b> ( ' + damage + ' x 4 )';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            return "<b class='damage'>" + ((100 + character.R_LEVEL.selectedIndex * 50 + character.attack_power * 0.3) * (1.04 + character.TRAP_MASTERY.selectedIndex * 0.04) | 0) + '</b>';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Pistol') {
                return '-';
            }
            if (type === 'AssaultRifle') {
                const as2 = calcAttackSpeed(character, character.WEAPON_MASTERY.selectedIndex < 13 ? 40 : 60);
                const as1 = 10 / (9.5 / as2 + 2);
                const shot = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1) * 2 + 
                    baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
                const damage1 = Math.round(shot * as1 * 100) / 100;
                const damage2 = Math.round(shot * as2 * 100) / 100;
                const life1 = calcHeal(shot * (character.life_steal / 100), as1, enemy);
                const life2 = calcHeal(shot * (character.life_steal / 100), as2, enemy);
                return "<b> _d/s: </b><b class='damage'>" + damage1 + '</b> - ' + damage2 + "<b> __h/s: </b><b class='heal'>" + life1 + '</b> - ' + life2;
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
    ,T_Option: "<b> _use</b><input type='checkbox' class='isol_t' onchange='updateDisplay()'>"
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
            weapon === 'AssaultRifle' ? '돌격소총' :
            '';
        const skill = 
            weapon === 'Pistol' ? '"데미지 없음"' : 
            weapon === 'AssaultRifle' ? '_d/s: "초당 데미지" - "장전 배제 데미지" __h/s: "초당 흡혈량" - "장전 배제 흡혈량"' : 
            '';
        return '아이솔 ( ' + type + ' )\n' + 
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' + 
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
            'HPS: "초당 회복량"\n' + 
            'Q: "최소 데미지" ~ "최대 데미지" "강화 스택"\n' + 
            'W: "합산 데미지" ( "틱당 데미지" x "타수" )\n' + 
            'E: "데미지 없음"\n' + 
            'R: "트랩 데미지"\n' + 
            'D: ' + skill + '\n' + 
            'T: _use "트랩 사용"\n';
    }
};