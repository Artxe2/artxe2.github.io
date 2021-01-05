const Emma = {
     Attack_Power: 40
    ,Attack_Power_Growth: 2.5
    ,Health: 550
    ,Health_Growth: 60
    ,Health_Regen: 0.4
    ,Health_Regen_Growth: 0.02
    ,Stamina: 430
    ,Stamina_Growth: 18
    ,Stamina_Regen: 1.1
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 28
    ,Defense_Growth: 1.6
    ,Atk_Speed: 0.12
    ,Crit_Rate: 0
    ,Move_Speed: 3
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Shuriken]
    ,correction: {
        Shuriken: [
            [0, -4, -8],
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
            const damage = calcSkillDamage(character, enemy, 40 + q * 40, 0.3, 1);
            const heal = calcHeal((60 + q * 10) * (0.08 + character.E_LEVEL.selectedIndex * 0.03), 1, enemy);
            return "<b class='damage'>" + damage * 2 + '</b> ( ' + damage + " x 2 ) <b> __h: </b><b class='heal'>" + heal + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex;
            const damage = calcSkillDamage(character, enemy, 100 + w * 50, 0.75, 1);
            const heal = calcHeal((60 + w * 10) * (0.08 + character.E_LEVEL.selectedIndex * 0.03), 1, enemy);
            return "<b class='damage'>" + damage + "</b><b> __h: </b><b class='heal'>" + heal + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        if (character.weapon) {
            const e = character.E_LEVEL.selectedIndex;
            const heal = calcHeal((70 + e * 10) * (0.08 + e * 0.03), 1, enemy);
            return "<b> _h: </b><b class='heal'>" + heal + '</b>'
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex;
            const min = calcSkillDamage(character, enemy, 150 + r * 50, 0.45, 1);
            const max = calcSkillDamage(character, enemy, 200 + r * 50, 0.75, 1);
            const heal = calcHeal(8 + r * 3, 1, enemy);
            return "<b class='damage'>" + min + "</b><b> / </b><b class='damage'>" + max + "</b><b> __h: </b><b class='heal'>" + heal + '</b>';
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
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const bonus = calcSkillDamage(character, enemy, character.max_sp * (0.02 + t * 0.01), 0, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            const shield = 90 + t * 30 + character.max_sp * (0.03 + t * 0.03) | 0;
            return "<b class='damage'>" + (damage + bonus) + '</b> ( ' +  min + ', ' + bonus + ' - ' + max + ', ' + bonus + " ) <b> __s: </b><b class='shield'>" + shield + '</b>';
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
            weapon === 'Shuriken' ? '암기' : 
            '';
        const skill = 
            weapon === 'Shuriken' ? '"1타 데미지" ~ "합산 데미지" ( "1타 데미지", "추가 데미지" x "타수" )' : 
            '';
        return '엠마 ( ' + type + ' )\n' + 
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' + 
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' + 
            'HPS: "초당 회복량"\n' + 
            'Q: "합산 데미지" ( "1발당 데미지" x "타수" ) __h: "회복량"\n' + 
            'W: "스킬 데미지" _h: "회복량"\n' + 
            'E: _h: "회복량"\n' + 
            'R: "비둘기 데미지" / "모자 데미지" __h: "회복량"\n' + 
            'D: ' + skill + '\n' + 
            'T: "패시브 데미지" ( "평타 데미지", "추가 데미지" - "치명타 데미지", "추가 데미지" ) __s: "쉴드량"\n';
    }
}