const Sissela = {
     Attack_Power: 23
    ,Attack_Power_Growth: 2.4
    ,Health: 510
    ,Health_Growth: 63
    ,Health_Regen: 0.4
    ,Health_Regen_Growth: 0.02
    ,Stamina: 400
    ,Stamina_Growth: 16
    ,Stamina_Regen: 1.1
    ,Stamina_Regen_Growth: 0.02
    ,Defense: 19
    ,Defense_Growth: 1.7
    ,Atk_Speed: 0.15
    ,Movement_Speed: 3
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Throws, Shuriken]
    ,correction: {
        Throws: [
            [0, -15, -18],
            [0, 0, 0]
        ],
        Shuriken: [
            [0, -13, -16],
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
            const damage = round(ba * character.attack_speed * 100) / 100;
            const life = calcHeal(ba * (character.life_steal / 100), character.attack_speed, enemy);
            return "<b class='damage'>" + damage + "</b><b> __h/s: </b><b class='heal'>" + life + '</b>';
        }
        return '-';
    }
    ,DPS_Option: ''
    ,HPS: (character, enemy) => {
        const t = character.T_LEVEL.selectedIndex;
        const lost = character.DIV.querySelector('.sissela_t').value;
        const passive = calcHeal(lost < 10 ? 0 :
            (lost >= 90 ? 26 + t * 10 : 2 + t * 2 + (3 + t) * ((lost / 10 | 0) - 1)) * (character.DIV.querySelector('.sissela_r').checked ? 2 : 1), 1, enemy);
        const total = round((passive + (calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 2, enemy))) * 100) / 100;
        return "<b class='heal'>" + total + '</b>';
    }
    ,Q_Skill: (character, enemy) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        if (character.weapon && q >= 0) {
            const damage1 = calcSkillDamage(character, enemy, 40 + q * 20, 0.3, 1);
            const damage2 = calcSkillDamage(character, enemy, 60 + q * 30, 0.5, 1);
            const cost = 50 + q * 10;
            const cool = 10000 / ((6.5 - q * 0.75) * (100 - character.cooldown_reduction) + 4);
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' + damage1 + ', ' + damage2 + " ) <b> __cost: </b><b class='heal'>-" + cost + "</b><b> __sd/s: </b><b class='damage'>" + round((damage1 + damage2) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const damage = calcSkillDamage(character, enemy, 30 + w * 60, 0.7, 1);
            const cost = 60 + w * 20;
            const cool = 10000 / ((19.5 - w * 1.5) * (100 - character.cooldown_reduction) + 150);
            return "<b class='damage'>" + damage + "</b><b> __cost: </b><b class='heal'>-" + cost + "</b><b> __sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const damage = calcSkillDamage(character, enemy, 40 + e * 50, 0.6, 1);
            const shield = 75 + e * 50 + character.attack_power * 0.5;
            const cool = 10000 / ((14 - e * 1) * (100 - character.cooldown_reduction) + 20);
            return "<b class='damage'>" + damage + "</b><b> __s: </b><b class='shield'>" + shield + "</b><b> __sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {

            const sissela_t = character.DIV.querySelector('.sissela_t');
            const skill_amplification = character.skill_amplification;
            character.skill_amplification = round(character.calc_skill_amplification +
                (2 + character.T_LEVEL.selectedIndex * 3) * (sissela_t.value < 10 ? 0 : (sissela_t.value >= 90 ? 5 : sissela_t.value / 20 + 0.5)), 1);

            const bonus = character.DIV.querySelector('.sissela_t').value * 2;
            const min = calcSkillDamage(character, enemy, (150 + r * 125 + bonus) * 0.5, 1 * 0.5, 1);
            const max = calcSkillDamage(character, enemy, 150 + r * 125 + bonus, 1, 1);

            character.skill_amplification = skill_amplification;

            return "<b class='damage'>" + min + ' - ' + max + '</b>';
        }
        return '-';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='sissela_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Throws') {
                return '-';
            }
            if (type === 'Shuriken') {
                const damage = calcSkillDamage(character, enemy, wm < 13 ? 80 : 160, 0.3, 1);
                const add = calcSkillDamage(character, enemy, (wm < 13 ? 80 : 160) * 0.3, 0.3 * 0.3, 1);
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
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const bonus = calcSkillDamage(character, enemy, 28 + character.LEVEL.selectedIndex * 10, 0.2, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            return "<b class='damage'>" + (damage + bonus) + '</b> ( ' +  min + ', ' + bonus + ' - ' + max + ', ' + bonus + ' ) ';
        }
        return '-';
    }
    ,T_Option: "<br>_LostHP: <input type='number' class='stack sissela_t' value='0' onchange='fixLimitNum(this, 100)'><b>%</b>"
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
        return '시셀라 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "합산 데미지" ( "1타 데미지", "2타 데미지" ) __cost: "체력소모"\n' +
            'W: "스킬 데미지" __cost: "체력소모"\n' +
            'E: "스킬 데미지" __s: "쉴드량"\n' +
            'R: "최소 데미지" - "최대 데미지" _use "스킬 사용"\n' +
            'D: ' + skill + '\n' +
            'T: "패시브 데미지" ( "평타 데미지", "추가 데미지" - "치명타 데미지", "추가 데미지" ) _"잃은 체력"\n';
    }
    ,COMBO_VARS: '{\"rr\":0}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus, myHp) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const t = character.T_LEVEL.selectedIndex;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        let damage = 0;
        let heal = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let lost = floor((character.max_hp - (myHp + heal)) * 100.0 / character.max_hp);
        let shield = 0, c, ba;
        let rr = data.vars.rr;
        heal += calcHeal(lost < 10 ? 0 :
            (lost >= 90 ? 26 + et * 10 : 2 + et * 2 + (3 + et) * ((lost / 10 | 0) - 1)) * (rr ? 2 : 1), 0.5, enemy);
        if (character.weapon) {
            const type = character.weapon.Type;
            if (rr) {
                rr--;
            }
            for (let i = 0; i < combo.length; i++) {
                c = combo.charAt(i);
                character.skill_amplification = round(character.pure_skill_amplification +
                    (2 + t * 3) * (lost < 10 ? 0 : (lost >= 90 ? 5 : lost / 20 + 0.5)) * (rr ? 2 : 1), 1);
                if (enemy.defense) {
                    if (enemy.character === Magnus) {
                        lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                        if (lost < 0) {
                            lost = 0;
                        }
                        enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.002)) * (1 + defense_minus[index]));
                    } else {
                        enemy.defense = floor((enemy.pure_defense + defense_bonus[index]) * (1 + defense_percent[index]) * (1 + defense_minus[index]));
                    }
                }
                if (c === 'a') {
                    ba = baseAttackDamage(character, enemy, 0, 1, 0, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'A') {
                    ba = baseAttackDamage(character, enemy, 0, 1, 100, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 60 + q * 30, 0.5, 1);
                        heal -= 50 + q * 10;
                    }
                } else if (c === 'Q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 40 + q * 20, 0.3, 1) + calcSkillDamage(character, enemy, 60 + q * 30, 0.5, 1);
                        heal -= 50 + q * 10;
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 30 + w * 60, 0.7, 1);
                        heal -= 60 + w * 20;
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        damage += calcSkillDamage(character, enemy, 40 + e * 50, 0.6, 1);
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        const bonus = lost * 2;
                        damage += calcSkillDamage(character, enemy, 150 + r * 125 + bonus, 1, 1);
                        let self = calcSkillDamage(character, character, 150 + r * 125 + bonus, 1, 1);
                        if (myHp + heal - self < 100) {
                            self = myHp + heal - 100;
                            if (self < 0) {
                                self = 0;
                            }
                        }
                        heal -= self;
                        rr = 11;
                    }
                } else if (c === 'd') {
                    if (wm > 5) {
                        if (type === 'Shuriken') {
                            damage += calcSkillDamage(character, enemy, (wm < 13 ? 80 : 160) * 0.3, 0.3 * 0.3, 1);
                        }
                    }
                } else if (c === 'D') {
                    if (wm > 5) {
                        if (type === 'Shuriken') {
                            damage += calcSkillDamage(character, enemy, wm < 13 ? 80 : 160, 0.3, 1);
                        }
                    }
                } else if (c === 't') {
                    ba = baseAttackDamage(character, enemy, 0, 1, 0, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    damage += calcSkillDamage(character, enemy, 28 + character.LEVEL.selectedIndex * 10, 0.2, 1);
                } else if (c === 'T') {
                    ba = baseAttackDamage(character, enemy, 0, 1, 100, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    damage += calcSkillDamage(character, enemy, 28 + character.LEVEL.selectedIndex * 10, 0.2, 1);
                } else if (c === 'p' || c === 'P') {
                    if (character.trap) {
                        damage += floor(character.trap.Trap_Damage * (1.04 + character.TRAP_MASTERY.selectedIndex * 0.04));
                    }
                }
            }
        }
        return {
            hp: data.hp - damage,
            damage: damage,
            heal: heal,
            shield: shield,
            vars: {
                rr: rr
            }
        };
    }
    ,COMBO_Option: 'tQrqeDdddawtQa'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Throws' ? 'd & D: 데미지 없음\n' :
            weapon === 'Shuriken' ? 'd: 무스 추가타 데미지\n' + 'D: 무스 첫타 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q: Q스킬 2타 데미지\n' +
            'Q: Q스킬 최대 데미지\n' +
            'w & W: W스킬 데미지\n' +
            'e & E: E스킬 1타 데미지, 재사용시 2타 데미지\n' +
            'r & R: R스킬 데미지\n' +
            't & T: 패시브 데미지\n' +
            d +
            'p & P: 트랩 데미지';
    }
};