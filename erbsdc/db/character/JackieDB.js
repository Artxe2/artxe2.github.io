const Jackie = {
     Attack_Power: 37
    ,Attack_Power_Growth: 2.7
    ,Health: 560
    ,Health_Growth: 77
    ,Health_Regen: 0.5
    ,Health_Regen_Growth: 0.03
    ,Stamina: 430
    ,Stamina_Growth: 15
    ,Stamina_Regen: 2.1
    ,Stamina_Regen_Growth: 0.04
    ,Defense: 26
    ,Defense_Growth: 2.2
    ,Atk_Speed: 0.12
    ,Crit_Rate: 0
    ,Move_Speed: 3.1
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Dagger, TwoHandedSword, Axe, DualSwords]
    ,correction: {
        Dagger: [
            [0, 0, 5],
            [0, 2, 5]
        ],
        TwoHandedSword: [
            [0, 0, 0],
            [3, 2, 5]
        ],
        Axe: [
            [0, 0, 0],
            [0, 2, 5]
        ],
        DualSwords: [
            [0, 0, 0],
            [0, 2, 5]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex;
            let damage, min, max;
            if (character.DIV.querySelector('.jackie_w').checked) {
                damage = baseAttackDamage(character, enemy, 0, 1 + 0.1 + w * 0.025, character.critical_strike_chance, 1);
                min = baseAttackDamage(character, enemy, 0, 1 + 0.1 + w * 0.025, 0, 1);
                max = baseAttackDamage(character, enemy, 0, 1 + 0.1 + w * 0.025, 100, 1);
            } else {
                damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
                min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
                max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            }
            if (character.weapon.Type === 'DualSwords') {
                return "<b class='damage'>" + (damage + damage) + '</b> ( ' +  min + ', ' + min + ' - ' + max + ', ' + max + ' )';
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' ) ';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            let ba, life;
            if (character.DIV.querySelector('.jackie_w').checked) {
                const w = character.W_LEVEL.selectedIndex;
                ba = baseAttackDamage(character, enemy, 0, 1 + 0.1 + w * 0.025, character.critical_strike_chance, 1);
                life = calcHeal(ba * (character.life_steal / 100) + 12 + w * 7 + character.attack_power * 0.1, character.attack_speed, enemy);
            } else {
                ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
                life = calcHeal(ba * (character.life_steal / 100), character.attack_speed, enemy);
            }
            if (character.weapon.Type === 'DualSwords') {
                ba += ba;
                life += life;
            }
            const damage = Math.round(ba * character.attack_speed * 100) / 100;
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
            const w = character.W_LEVEL.selectedIndex;
            const damage3 = calcSkillDamage(character, enemy, 16 + q * 6, 0, 0) * 5;
            let damage1, damage2;
            if (character.DIV.querySelector('.jackie_w').checked) {
                const heal = calcHeal(12 + w * 7 + character.attack_power * 0.1, 2, enemy);
                damage1 = calcSkillDamage(character, enemy, 20 + q * 20, 0.45 + 0.1 + w * 0.025, 1);
                damage2 = calcSkillDamage(character, enemy, 30 + q * 20, 0.65 + 0.1 + w * 0.025, 1);
                return "<b class='damage'>" + (damage1 + damage2 + damage3) + '</b> ( ' + damage1 + ', ' + damage2 + ', ' + damage3 + " ) <b> __h: </b><b class='heal'>" + heal + '</b>';
            } else {
                damage1 = calcSkillDamage(character, enemy, 20 + q * 20, 0.45, 1);
                damage2 = calcSkillDamage(character, enemy, 30 + q * 20, 0.65, 1);
                return "<b class='damage'>" + (damage1 + damage2 + damage3) + '</b> ( ' + damage1 + ', ' + damage2 + ', ' + damage3 + ' )';
            }
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        return '';
    }
    ,W_Option: "<b> _use</b><input type='checkbox' class='jackie_w' onchange='updateDisplay()'>"
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex;
            const e = character.E_LEVEL.selectedIndex;
            if (character.DIV.querySelector('.jackie_w').checked) {
                const damage = calcSkillDamage(character, enemy, 10 + e * 60, 0.3 + e * 0.1 + 0.1 + w * 0.025, 1);
                const heal = calcHeal(12 + w * 7 + character.attack_power * 0.1, 1, enemy);
                return "<b class='damage'>" + damage + "</b><b> __h: </b><b class='heal'>" + heal + '</b>';
            }
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 10 + e * 60, 0.3 + e * 0.1, 1) + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex;
            if (character.DIV.querySelector('.jackie_w').checked) {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 300 + r * 200, 1 + 0.1 + character.W_LEVEL.selectedIndex * 0.025, 1) + '</b>';
            }
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 300 + r * 200, 1, 1) + '</b>';
        }
        return '-';
    }
    ,R_Option: "<b> __use</b><input type='checkbox' class='jackie_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        if (character.weapon) {
            const type = character.weapon.Type;
            if (type === 'Axe') {
                return '';
            }
            if (character.WEAPON_MASTERY.selectedIndex > 5) {
                if (type === 'Dagger') {
                    let damage, heal;
                    if (character.DIV.querySelector('.jackie_w').checked) {
                        const w = character.W_LEVEL.selectedIndex;
                        damage = baseAttackDamage(character, enemy, 0, 1 + 0.1 + w * 0.025, 100, 1);
                        heal = calcHeal((damage + (enemy.max_hp ? enemy.max_hp / 10 : 0) | 0) * (character.life_steal / 100) + 12 + w * 7 + character.attack_power * 0.1, 1, enemy);
                    } else {
                        damage = baseAttackDamage(character, enemy, 0, 1, 100, 1);
                        heal = calcHeal((damage + (enemy.max_hp ? enemy.max_hp / 10 : 0) | 0) * (character.life_steal / 100), 1, enemy);
                    }
                    return "<b class='damage'>" + damage + ' ~ ' + (damage + (enemy.max_hp ? enemy.max_hp / 10 : 0) | 0) + "</b><b> __h: </b><b class='heal'>" + heal + '</b>';
                }
                if (type === 'TwoHandedSword') {
                    if (character.DIV.querySelector('.jackie_w').checked) {
                        const w = character.W_LEVEL.selectedIndex;
                        const damage = calcSkillDamage(character, enemy, 0, (character.WEAPON_MASTERY.selectedIndex < 13 ? 2 : 2.5) + 0.1 + character.W_LEVEL.selectedIndex * 0.025, 1);
                        const heal = calcHeal(12 + w * 7 + character.attack_power * 0.1, 1, enemy);
                        return "<b class='damage'>" + damage + "</b><b> __h: </b><b class='heal'>" + heal + '</b>'
                    }
                    return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 2 : 2.5, 1) + '</b>';
                }
                if (type === 'DualSwords') {
                    let damage;
                    if (character.DIV.querySelector('.jackie_w').checked) {
                        const w = character.W_LEVEL.selectedIndex;
                        const heal = calcHeal(12 + w * 7 + character.attack_power * 0.1, 12, enemy);
                        damage = calcSkillDamage(character, enemy, 0, (character.WEAPON_MASTERY.selectedIndex < 13 ? 0.3 : 0.5) + 0.1 + w * 0.025, 1);
                        return "<b class='damage'>" + damage * 12 + '</b> ( ' + damage + " x 12 ) <b> __h: </b><b class='heal'>" + heal + '</b>';
                    } else {
                        damage = calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 0.3 : 0.5, 1);
                        return "<b class='damage'>" + damage * 12 + '</b> ( ' + damage + ' x 12 )';
                    }
                }
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return !character.weapon || character.weapon.Type !== 'Axe' ? '' : 
            "<input type='number' class='stack axe_d_s' value='0' onchange='fixLimitNum(this, 5)'><b>Stack _use</b><input type='checkbox' class='axe_d_u' onchange='updateDisplay()'><br>" + 
            "_LostHP: <input type='number' class='stack axe_d_hp' value='0' onchange='fixLimitNum(this, 100)'><b>%</b>";
    }
    ,T_Skill: (character, enemy) => {
        return '';
    }
    ,T_Option: "<b> _weak</b><input type='checkbox' class='jackie_t_w' onchange='updateDisplay()'><b> _strong</b><input type='checkbox' class='jackie_t_s' onchange='updateDisplay()'>"
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type = 
            weapon === 'Dagger' ? '단검' : 
            weapon === 'TwoHandedSword' ? '양손검' :
            weapon === 'DualSwords' ? '쌍검' :
            weapon === 'Axe' ? '도끼' :
            '';
        let skill;
        if (character.DIV.querySelector('.jackie_w').checked) {
            skill = 
                weapon === 'Dagger' ? '"최소 데미지" ~ "최대 데미지" __h: "흡혈량"'  : 
                weapon === 'TwoHandedSword' ? '"스킬 데미지" __h: "흡혈량"' : 
                weapon === 'DualSwords' ? '"합산 데미지" ( "틱당 데미지" x "타수" ) __h: "흡혈량"' : 
                weapon === 'Axe' ? '"스택" _use "스킬사용" _"잃은 체력"' : 
                '';
            return '재키 ( ' + type + ' )\n' + 
                'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' + 
                'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
                'HPS: "초당 회복량"\n' + 
                'Q: "합산 데미지" ( "1타 데미지", "2타 데미지", "출혈 데미지" ) __h: "흡혈량"\n' + 
                'W: _use "스킬 사용"\n' + 
                'E: "스킬 데미지" __h: "흡혈량"\n' + 
                'R: "스킬 데미지" __use "스킬 사용"\n' + 
                'D: ' + skill + '\n' + 
                'T: _weak "닭, 멧돼지, 늑대" _strong "곰, 생존자, 위클라인"\n';
        } else {
            skill = 
                weapon === 'Dagger' ? '"최소 데미지" ~ "최대 데미지" __h: "흡혈량"'  : 
                weapon === 'TwoHandedSword' ? '"스킬 데미지"' : 
                weapon === 'DualSwords' ? '"합산 데미지" ( "틱당 데미지" x "타수" )' : 
                weapon === 'Axe' ? '"스택" _use "스킬사용" _"잃은 체력"' : 
                '';
            return '재키 ( ' + type + ' )\n' + 
                'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' + 
                'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
                'HPS: "초당 회복량"\n' + 
                'Q: "합산 데미지" ( "1타 데미지", "2타 데미지", "출혈 데미지" )\n' + 
                'W: _use "스킬 사용"\n' + 
                'E: "스킬 데미지"\n' + 
                'R: "스킬 데미지" __use "스킬 사용"\n' + 
                'D: ' + skill + '\n' + 
                'T: _weak "닭, 멧돼지, 늑대" _strong "곰, 생존자, 위클라인"\n';
        }
    }
};