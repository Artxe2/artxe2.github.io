const Hart = {
     Attack_Power: 22
    ,Attack_Power_Growth: 3
    ,Health: 500
    ,Health_Growth: 66
    ,Health_Regen: 0.8
    ,Health_Regen_Growth: 0.04
    ,Stamina: 420
    ,Stamina_Growth: 16
    ,Stamina_Regen: 1.7
    ,Stamina_Regen_Growth: 0.04
    ,Defense: 20
    ,Defense_Growth: 1.9
    ,Atk_Speed: 0.12
    ,Crit_Rate: 0
    ,Move_Speed: 3
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Guitar]
    ,correction: {
        Guitar: [
            [0, -3, -3],
            [0, -2, -5]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            if (character.DIV.querySelector('.hart_t').checked) {
                const damage2 = baseAttackDamage(character, enemy, 0, 0.15, character.critical_strike_chance, 1);
                const min2 = baseAttackDamage(character, enemy, 0, 0.15, 0, 1);
                const max2 = baseAttackDamage(character, enemy, 0, 0.15, 100, 1);
                if (character.DIV.querySelector('.hart_tt').checked) {
                    return "<b class='damage'>" + (damage + damage2 + damage2) + '</b> ( ' +  min + ', ' + min2 + ', ' + min2 + ' - ' + max + ', ' + max2 + ', ' + max2 + ' )';
                }
                return "<b class='damage'>" + (damage + damage2) + '</b> ( ' +  min + ', ' + min2 + ' - ' + max + ', ' + max2 + ' )';
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            const ba1 = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            let damage, life;
            if (character.DIV.querySelector('.hart_t').checked) {
                const ba2 = (baseAttackDamage(character, enemy, 0, 0.15, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
                if (character.DIV.querySelector('.hart_tt').checked) {
                    damage = Math.round((ba1 + ba2 + ba2) * character.attack_speed * 100) / 100;
                    life = calcHeal((ba1 + ba2 + ba2) * (character.life_steal / 100), character.attack_speed, enemy);
                } else {
                    damage = Math.round((ba1 + ba2) * character.attack_speed * 100) / 100;
                    life = calcHeal((ba1 + ba2) * (character.life_steal / 100), character.attack_speed, enemy);
                }
            } else {
                damage = Math.round(ba1 * character.attack_speed * 100) / 100;
                life = calcHeal(ba1 * (character.life_steal / 100), character.attack_speed, enemy);
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
            const q = character.Q_LEVEL.selectedIndex;
            const min = calcSkillDamage(character, enemy, 80 + q * 20, 0.3, 1);
            const max = calcSkillDamage(character, enemy, 160 + q * 40, 0.6, 1);
            return "<b class='damage'>" + min + ' ~ ' + max + '</b>';
        }
        return '-';
    }
    ,Q_Option:  "<b> __up</b><input type='checkbox' class='hart_q' onchange='hartUp(0, 0)'/><input type='checkbox' class='hart_qq' onchange='hartUp(0, 1)'/>"
    ,W_Skill: (character, enemy) => {
        return '';
    }
    ,W_Option:  "<b> _up</b><input type='checkbox' class='hart_w' onchange='hartUp(1, 0)'/><input type='checkbox' class='hart_ww' onchange='hartUp(1, 1)'/>" + 
        "<b> _use</b><input type='checkbox' class='hart_w_u' onchange='updateDisplay()'>"
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            const e = character.E_LEVEL.selectedIndex;
            const sap = character.DIV.querySelector('.hart_ee').checked ? 25 : character.DIV.querySelector('.hart_e').checked ? 15 : 0;
            const stack = character.DIV.querySelector('.hart_e_s').value;
            character.skill_amplification_percent -= sap * (stack - 1);
            const damage1 = calcSkillDamage(character, enemy, 20 + e * 10, 0.4, 1);
            character.skill_amplification_percent += sap;
            const damage2 = calcSkillDamage(character, enemy, 20 + e * 10, 0.4, 1);
            character.skill_amplification_percent += sap;
            const damage3 = calcSkillDamage(character, enemy, 20 + e * 10, 0.4, 1);
            character.skill_amplification_percent -= sap * (3 - stack);
            return "<b class='damage'>" + (damage1 + damage2 + damage3) + '</b> ( ' + damage1 + ', ' + damage2 + ', ' + damage3 + ' )';
        }
        return '-';
    }
    ,E_Option:  "<b> __up</b><input type='checkbox' class='hart_e' onchange='hartUp(2, 0)'/><input type='checkbox' class='hart_ee' onchange='hartUp(2, 1)'/>" + 
        "_ <input type='number' class='stack hart_e_s' value='0' onchange='fixLimitNum(this, 3)'><b>Stack</b>"
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex
            const regen = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 + 
                (character.food ? character.food.HP_Regen / 30 : 0), 2, enemy);
            const heal = calcHeal(30 + r * 10 + (character.max_hp * (0.02 + r * 0.01)), 1, enemy);
            const total = Math.round((heal + regen) * 5 * 100) / 100
            return "<b> _h: </b><b class='heal'>" + total + "</b> ( [ <b class='heal'>" + heal + '</b>, ' + regen + ' ] x 5s )';
        }
        return '-';
    }
    ,R_Option: "<b> __up</b><input type='checkbox' class='hart_r' onchange='hartUp(3, 0)'/><input type='checkbox' class='hart_rr' onchange='hartUp(3, 1)'/>"
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Guitar') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 1.5 : 2.5, 1) + '</b>';
            }
        }
        return '-'
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        return '';
    }
    ,T_Option: "<b> _up</b><input type='checkbox' class='hart_t' onchange='hartUp(4, 0)'/><input type='checkbox' class='hart_tt' onchange='hartUp(4, 1)'/>"
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type = 
            weapon === 'Guitar' ? '기타' : 
            '';
        const skill = 
            weapon === 'Guitar' ? '"스킬 데미지"' : 
            '';
        if (character.DIV.querySelector('.hart_tt').checked) {
            return '하트 ( ' + type + ' )\n' + 
                'A: "평균 데미지" ( "1타 데미지", "2타 데미지", "3타 데미지" - "1타 치명타", "2타 치명타", "3타 치명타" )\n' + 
                'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
                'HPS: "초당 회복량"\n' + 
                'Q: "최소 데미지" ~ "최대 데미지" __up "스킬 강화"\n' + 
                'W: "데미지 없음" _up "스킬 강화"\n' + 
                'E: "합산 데미지" ( "1타 데미지", "2타 데미지", "3타 데미지" ) __up "스킬 강화"\n' + 
                'R: _h: "총 회복량(체젠 및 음식 효과 포함)" ( ["초당 회복량", "초당 체젠"]) __up "스킬 강화"\n' + 
                'D: ' + skill + '\n' + 
                'T: "데미지 없음" _up "스킬 강화"\n';
        }
        if (character.DIV.querySelector('.hart_t').checked) {
            return '하트 ( ' + type + ' )\n' + 
                'A: "평균 데미지" ( "1타 데미지", "2타 데미지" - "1타 치명타", "2타 치명타" )\n' + 
                'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
                'HPS: "초당 회복량"\n' + 
                'Q: "최소 데미지" ~ "최대 데미지" __up "스킬 강화"\n' + 
                'W: "데미지 없음" _up "스킬 강화"\n' + 
                'E: "합산 데미지" ( "1타 데미지", "2타 데미지", "3타 데미지" ) __up "스킬 강화"\n' + 
                'R: _h: "총 회복량(체젠 및 음식 효과 포함)" ( ["초당 회복량", "초당 체젠"]) __up "스킬 강화"\n' + 
                'D: ' + skill + '\n' + 
                'T: "데미지 없음" _up "스킬 강화"\n';
        }
        return '하트 ( ' + type + ' )\n' + 
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' + 
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
            'HPS: "초당 회복량"\n' + 
            'Q: "최소 데미지" ~ "최대 데미지" __up "스킬 강화"\n' + 
            'W: _up "스킬 강화"\n' + 
            'E: "합산 데미지" ( "1타 데미지", "2타 데미지", "3타 데미지" ) __up "스킬 강화"\n' + 
            'R: _h: "총 회복량(체젠 및 음식 효과 포함)" ( ["초당 회복량", "초당 체젠"]) __up "스킬 강화"\n' + 
            'D: ' + skill + '\n' + 
            'T: _up "스킬 강화"\n';
    }
};