'use strict';
const Jackie = {
     Attack_Power: 35
    ,Attack_Power_Growth: 3
    ,Health: 730
    ,Health_Growth: 74
    ,Health_Regen: 0.5
    ,Health_Regen_Growth: 0.03
    ,Stamina: 430
    ,Stamina_Growth: 15
    ,Stamina_Regen: 2.1
    ,Stamina_Regen_Growth: 0.04
    ,Defense: 26
    ,Defense_Growth: 2.2
    ,Atk_Speed: 0.12
    ,Movement_Speed: 3.15
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Dagger, TwoHandedSword, Axe, DualSwords]
    ,correction: {
        Dagger: [
            [0, -2, 5],
            [0, -2, -8]
        ],
        TwoHandedSword: [
            [0, 0, 0],
            [0, 2, -8]
        ],
        Axe: [
            [0, 0, -2],
            [0, 2, -8]
        ],
        DualSwords: [
            [0, -5, -8],
            [0, 2, -9]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex - 1;
            let damage, min, max;
            if (character.DIV.querySelector('.jackie_w').checked && w >= 0) {
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
            const w = character.W_LEVEL.selectedIndex - 1;
            if (character.DIV.querySelector('.jackie_w').checked && w >= 0) {
                ba = baseAttackDamage(character, enemy, 0, 1 + 0.1 + w * 0.025, character.critical_strike_chance, 1);
                life = calcHeal(ba * (character.life_steal / 100) + 10 + w * 5 + character.attack_power * 0.1, character.attack_speed, enemy);
            } else {
                ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
                life = calcHeal(ba * (character.life_steal / 100), character.attack_speed, enemy);
            }
            if (character.weapon.Type === 'DualSwords') {
                ba += ba;
                life += life;
            }
            const damage = round(ba * character.attack_speed * 100) / 100;
            return "<b class='damage'>" + damage + "</b><b> _h/s: </b><b class='heal'>" + life + '</b>';
        }
        return '-';
    }
    ,DPS_Option: ''
    ,HPS: (character, enemy) => {
        return "<b class='heal'>" + calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 2, enemy) + '</b>';
    }
    ,Q_Skill: (character, enemy) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        if (character.weapon && q >= 0) {
            const w = character.W_LEVEL.selectedIndex - 1;
            const damage3 = calcTrueDamage(character, enemy, 20 + q * 5);
            const cool = 10000 / ((9 - q * 0.5) * (100 - character.cooldown_reduction) + 17);
            let damage1, damage2;
            if (character.DIV.querySelector('.jackie_w').checked && w >= 0) {
                const heal = calcHeal(10 + w * 5 + character.attack_power * 0.1, 2, enemy);
                damage1 = calcSkillDamage(character, enemy, 30 + q * 30, 0.25 + 0.1 + w * 0.025, 1);
                damage2 = calcSkillDamage(character, enemy, 20 + q * 25, 0.65 + 0.1 + w * 0.025, 1);
                return "<b class='damage'>" + (damage1 + damage2 + damage3 * 6) + '</b> ( ' + damage1 + ', ' + damage2 + ', [ ' + damage3 + " x 6 ] ) <b> _h: </b><b class='heal'>" + heal + "</b><b> _sd/s: </b><b class='damage'>" +round((damage1 + damage2 + damage3 * 5) * cool) / 100 + '</b>';
            } else {
                damage1 = calcSkillDamage(character, enemy, 30 + q * 30, 0.25, 1);
                damage2 = calcSkillDamage(character, enemy, 20 + q * 25, 0.65, 1);
                return "<b class='damage'>" + (damage1 + damage2 + damage3 * 6) + '</b> ( ' + damage1 + ', ' + damage2 + ', [ ' + damage3 + " x 6 ] )<b> _sd/s: </b><b class='damage'>" + round((damage1 + damage2 + damage3 * 5) * cool) / 100 + '</b>';
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
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const w = character.W_LEVEL.selectedIndex - 1;
            const cool = 10000 / ((20 - e * 2) * (100 - character.cooldown_reduction));
            let damage;
            if (character.DIV.querySelector('.jackie_w').checked && w >= 0) {
                damage = calcSkillDamage(character, enemy, 10 + e * 60, 0.3 + e * 0.1 + 0.1 + w * 0.025, 1);
                const heal = calcHeal(10 + w * 5 + character.attack_power * 0.1, 1, enemy);
                return "<b class='damage'>" + damage + "</b><b> _h: </b><b class='heal'>" + heal + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
            }
            damage = calcSkillDamage(character, enemy, 10 + e * 60, 0.3 + e * 0.1, 1);
            return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const w = character.W_LEVEL.selectedIndex - 1;
            let min, max;
            if (character.DIV.querySelector('.jackie_w').checked && w >= 0) {
                min = calcSkillDamage(character, enemy, 100 + r * 125, 0.7 + 0.1 + w * 0.025, 1);
                max = calcSkillDamage(character, enemy, 250 + r * 125, 1 + 0.1 + w * 0.025, 1);
                return "<b class='damage'>" + min + ' ~ ' + max + '</b>';
            }
            min = calcSkillDamage(character, enemy, 100 + r * 125, 0.7, 1);
            max = calcSkillDamage(character, enemy, 250 + r * 125, 1, 1);
            return "<b class='damage'>" + min + ' ~ ' + max + '</b>';
        }
        return '-';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='jackie_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        if (character.weapon) {
            const type = character.weapon.Type;
            if (type === 'Axe') {
                return '';
            }
            const wm = character.WEAPON_MASTERY.selectedIndex;
            if (wm > 5) {
                if (type === 'Dagger') {
                    let damage, heal, bonus;
                    const w = character.W_LEVEL.selectedIndex - 1;
                    if (character.DIV.querySelector('.jackie_w').checked && w >= 0) {
                        damage = baseAttackDamage(character, enemy, 0, 1 + 0.1 + w * 0.025, 100, 1);
                        bonus = calcTrueDamage(character, enemy, enemy.max_hp ? enemy.max_hp * 0.08 : 0);
                        heal = calcHeal(floor(damage + bonus) * (character.life_steal / 100) + 10 + w * 5 + character.attack_power * 0.1, 1, enemy);
                    } else {
                        damage = baseAttackDamage(character, enemy, 0, 1, 100, 1);
                        bonus = calcTrueDamage(character, enemy, enemy.max_hp ? enemy.max_hp * 0.08 : 0);
                        heal = calcHeal(floor(damage + bonus) * (character.life_steal / 100), 1, enemy);
                    }
                    return "<b class='damage'>" + damage + ' ~ ' + floor(damage + bonus) + "</b><b> _h: </b><b class='heal'>" + heal + '</b>';
                }
                if (type === 'TwoHandedSword') {
                    const w = character.W_LEVEL.selectedIndex - 1;
                    if (character.DIV.querySelector('.jackie_w').checked && w >= 0) {
                        const damage = calcSkillDamage(character, enemy, 0, (wm < 13 ? 1.75 : 2.25) + 0.1 + w * 0.025, 1);
                        const heal = calcHeal(10 + w * 5 + character.attack_power * 0.1, 1, enemy);
                        return "<b class='damage'>" + damage + "</b><b> _h: </b><b class='heal'>" + heal + '</b>'
                    }
                    return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, wm < 13 ? 1.75 : 2.25, 1) + '</b>';
                }
                if (type === 'DualSwords') {
                    let damage;
                    const w = character.W_LEVEL.selectedIndex - 1;
                    if (character.DIV.querySelector('.jackie_w').checked && w >= 0) {
                        const heal = calcHeal(10 + w * 5 + character.attack_power * 0.1, 12, enemy);
                        damage = calcSkillDamage(character, enemy, 0, (wm < 13 ? 0.25 : 0.4) + 0.1 + w * 0.025, 1);
                        return "<b class='damage'>" + damage * 12 + '</b> ( ' + damage + " x 12 ) <b> _h: </b><b class='heal'>" + heal + '</b>';
                    } else {
                        damage = calcSkillDamage(character, enemy, 0, wm < 13 ? 0.25 : 0.4, 1);
                        return "<b class='damage'>" + damage * 12 + '</b> ( ' + damage + ' x 12 )';
                    }
                }
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return !character.weapon || character.weapon.Type !== 'Axe' ? '' :
            "<input type='number' class='stack axe_d_s' value='0' onchange='fixLimitNum(this, 5)'><b>Stack _use</b>" +
            "<input type='checkbox' class='axe_d_u' onchange='updateDisplay()'><br>" +
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
                weapon === 'Dagger' ? '"최소 데미지" ~ "최대 데미지" _h: "흡혈량"'  :
                weapon === 'TwoHandedSword' ? '"스킬 데미지" _h: "흡혈량"' :
                weapon === 'DualSwords' ? '"합산 데미지" ( "틱당 데미지" x "타수" ) _h: "흡혈량"' :
                weapon === 'Axe' ? '"스택" _use "스킬사용" _"잃은 체력"' :
                '';
            return '재키 ( ' + type + ' )\n' +
                'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
                'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
                'HPS: "초당 회복량"\n' +
                'Q: "합산 데미지" ( "1타 데미지", "2타 데미지", "출혈 데미지" ) _h: "흡혈량"\n' +
                'W: _use "스킬 사용"\n' +
                'E: "스킬 데미지" _h: "흡혈량"\n' +
                'R: "스킬 데미지" _use "스킬 사용"\n' +
                'D: ' + skill + '\n' +
                'T: _weak "닭, 멧돼지, 늑대" _strong "곰, 생존자, 위클라인"\n';
        } else {
            skill =
                weapon === 'Dagger' ? '"최소 데미지" ~ "최대 데미지" _h: "흡혈량"'  :
                weapon === 'TwoHandedSword' ? '"스킬 데미지"' :
                weapon === 'DualSwords' ? '"합산 데미지" ( "틱당 데미지" x "타수" )' :
                weapon === 'Axe' ? '"스택" _use "스킬사용" _"잃은 체력"' :
                '';
            return '재키 ( ' + type + ' )\n' +
                'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
                'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
                'HPS: "초당 회복량"\n' +
                'Q: "합산 데미지" ( "1타 데미지", "2타 데미지", [ "출혈 데미지" x "타수" ] )\n' +
                'W: _use "스킬 사용"\n' +
                'E: "스킬 데미지"\n' +
                'R: "스킬 데미지" _use "스킬 사용"\n' +
                'D: ' + skill + '\n' +
                'T: _weak "닭, 멧돼지, 늑대" _strong "곰, 생존자, 위클라인"\n';
        }
    }
    ,COMBO_VARS: '{\"bleeding\":[],\"ap\":0,\"ww\":0,\"rr\":0,\"tt\":false,\"ttt\":false,\"dd\":[],\"stack\":0}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const t = character.T_LEVEL.selectedIndex;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        const auto_cri = character.AUTO_CRI.checked;
        let damage = 0;
        let heal = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        const bleeding = data.vars.bleeding;
        let ap = data.vars.ap, ww = data.vars.ww, rr = data.vars.rr,
            tt = data.vars.tt, ttt = data.vars.ttt, dd = data.vars.dd, stack = data.vars.stack;
        if (character.weapon) {
            const type = character.weapon.Type;
            const jackie_tw = [0.04, 0.08, 0.12];
            const jackie_ts = [0.10, 0.15, 0.20];
            if (ww) {
                ww--;
            }
            if (rr) {
                rr--;
            }
            for (let i = 0; i < combo.length; i++) {
                c = combo.charAt(i);
                ap = 1 +
                (tt ? jackie_tw[ t ] : 0) +
                (ttt ? jackie_ts[ t ] : 0) +
                stack * (dd[index] ? 0.06 + character.DIV.querySelector('.axe_d_hp').value * 0.0012 : 0.02);
                character.attack_power = floor(character.pure_attack_power * ap);
                if (enemy.defense) {
                    if (enemy.character === Magnus) {
                        let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                        if (lost < 0) {
                            lost = 0;
                        }
                        enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                    } else {
                        enemy.defense = floor((enemy.pure_defense + defense_bonus[index]) * (1 + defense_percent[index]) * (1 + defense_minus[index]));
                    }
                }
                if (c === 'a' || c === 'A') {
                    if (bleeding[index] && ww && w >= 0) {
                        ba = baseAttackDamage(character, enemy, 0, 1 + 0.1 + w * 0.025, auto_cri ? character.critical_strike_chance : c === 'a' ? 0 : 100, 1);
                        heal += calcHeal(10 + w * 5 + character.attack_power * 0.1, 1, enemy);
                    } else {
                        ba = baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : c === 'a' ? 0 : 100, 1);
                    }
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    if (r >= 0) {
                        if (rr) {
                            const bleed = calcSkillDamage(character, enemy, 10 + r * 10, 0, 0) / 10;
                            for (let x = index; x < index + 12; x++) {
                                if (bleeding[x]) {
                                    bleeding[x] += bleed;
                                } else {
                                    bleeding[x] = bleed;
                                }
                            }
                        }
                    }
                    if (character.weapon.Type === 'DualSwords') {
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                        }
                        if (bleeding[index] && ww && w >= 0) {
                            ba = baseAttackDamage(character, enemy, 0, 1 + 0.1 + w * 0.025, auto_cri ? character.critical_strike_chance : c === 'a' ? 0 : 100, 1);
                            heal += calcHeal(10 + w * 5 + character.attack_power * 0.1, 1, enemy);
                        } else {
                            ba = baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : c === 'a' ? 0 : 100, 1);
                        }
                        damage += ba;
                        heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                        if (r >= 0) {
                            if (rr) {
                                const bleed = calcSkillDamage(character, enemy, 10 + r * 10, 0, 0) / 10;
                                for (let x = index; x < index + 12; x++) {
                                    if (bleeding[x]) {
                                        bleeding[x] += bleed;
                                    } else {
                                        bleeding[x] = bleed;
                                    }
                                }
                            }
                        }
                    }
                    if (stack < 4 && type === 'Axe') {
                        stack++;
                    }
                } else if (c === 'q') {
                    if (q >= 0) {
                        if (bleeding[index] && ww && w >= 0) {
                            damage += calcSkillDamage(character, enemy, 30 + q * 30, 0.25 + 0.1 + w * 0.025, 1);
                            heal += calcHeal(10 + w * 5 + character.attack_power * 0.1, 1, enemy);
                        } else {
                            damage += calcSkillDamage(character, enemy, 30 + q * 30, 0.25, 1);
                        }
                        const bleed = calcTrueDamage(character, enemy, 20 + q * 5);
                        for (let x = index; x < index + 12; x++) {
                            if (bleeding[x]) {
                                bleeding[x] += bleed;
                            } else {
                                bleeding[x] = bleed;
                            }
                        }
                    }
                } else if (c === 'Q') {
                    if (q >= 0) {
                        if (ww && w >= 0) {
                            if (bleeding[index]) {
                                damage += calcSkillDamage(character, enemy, 30 + q * 30, 0.25 + 0.1 + w * 0.025, 1);
                                if (enemy.character === Magnus) {
                                    let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                    if (lost < 0) {
                                        lost = 0;
                                    }
                                    enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                                }
                                damage += calcSkillDamage(character, enemy, 20 + q * 25, 0.65 + 0.1 + w * 0.025, 1);
                                heal += calcHeal(10 + w * 5 + character.attack_power * 0.1, 1, enemy) * 2;
                            } else {
                                damage += calcSkillDamage(character, enemy, 30 + q * 30, 0.25, 1);
                                if (enemy.character === Magnus) {
                                    let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                    if (lost < 0) {
                                        lost = 0;
                                    }
                                    enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                                }
                                damage += calcSkillDamage(character, enemy, 20 + q * 25, 0.65 + 0.1 + w * 0.025, 1);
                                heal += calcHeal(10 + w * 5 + character.attack_power * 0.1, 1, enemy);
                            }
                        } else {
                            damage += calcSkillDamage(character, enemy, 30 + q * 30, 0.25, 1);
                            if (enemy.character === Magnus) {
                                let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                if (lost < 0) {
                                    lost = 0;
                                }
                                enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                            }
                            damage += calcSkillDamage(character, enemy, 20 + q * 25, 0.65, 1);
                        }
                        const bleed = calcTrueDamage(character, enemy, 20 + q * 5);
                        for (let x = index; x < index + 12; x++) {
                            if (bleeding[x]) {
                                bleeding[x] += bleed;
                            } else {
                                bleeding[x] = bleed;
                            }
                        }
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        ww = 11;
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        if (bleeding[index] && ww && w >= 0) {
                            damage += calcSkillDamage(character, enemy, 10 + e * 60, 0.3 + e * 0.1 + 0.1 + w * 0.025, 1);
                            heal += calcHeal(10 + w * 5 + character.attack_power * 0.1, 1, enemy);
                        } else {
                            damage += calcSkillDamage(character, enemy, 10 + e * 60, 0.3 + e * 0.1, 1);
                        }
                    }
                } else if (c === 'r') {
                    if (r >= 0) {
                        if (rr > 0) {
                            if (bleeding[index] && ww) {
                                damage += calcSkillDamage(character, enemy, 100 + r * 125, 0.7 + 0.1 + w * 0.025, 1);
                            } else {
                                damage += calcSkillDamage(character, enemy, 100 + r * 125, 0.7, 1);
                            }
                            rr = 0;
                        } else {
                            rr = 31;
                            bleeding[index + 20 + r * 10] = calcSkillDamage(character, enemy, 300 + r * 200, 1, 1);
                        }
                    }
                } else if (c === 'R') {
                    if (r >= 0) {
                        if (rr > 0) {
                            if (bleeding[index] && ww) {
                                damage += calcSkillDamage(character, enemy, 250 + r * 125, 1 + 0.1 + w * 0.025, 1);
                            } else {
                                damage += calcSkillDamage(character, enemy, 250 + r * 125, 1, 1);
                            }
                            rr = 0;
                        } else {
                            rr = 31;
                            bleeding[index + 20 + r * 10] = calcSkillDamage(character, enemy, 300 + r * 200, 1, 1);
                        }
                    }
                } else if (c === 't') {
                    tt = !tt;
                } else if (c === 'T') {
                    ttt = !ttt;
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Dagger') {
                            let currHp = enemy.max_hp ? data.hp - damage + heal + shield : 0;
                            if (currHp > enemy.max_hp) {
                                currHp = enemy.max_hp;
                            }
                            if (bleeding[index] && ww) {
                                ba = floor(baseAttackDamage(character, enemy, 0, 1 + 0.1 + w * 0.025, 100, 1) + calcTrueDamage(character, enemy, enemy.max_hp ? currHp * 0.08 : 0));
                                heal += calcHeal(10 + w * 5 + character.attack_power * 0.1, 1, enemy);
                            } else {
                                ba = floor(baseAttackDamage(character, enemy, 0, 1, 100, 1) + calcTrueDamage(character, enemy, enemy.max_hp ? currHp * 0.08 : 0));
                            }
                            damage += ba;
                            heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                        } else if (type === 'TwoHandedSword') {
                            if (bleeding[index] && ww) {
                                damage += calcSkillDamage(character, enemy, 0, (wm < 13 ? 1.75 : 2.25) + 0.1 + w * 0.025, 1);
                                heal += calcHeal(10 + w * 5 + character.attack_power * 0.1, 1, enemy);
                            } else {
                                damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 1.75 : 2.25, 1);
                            }
                            damage += ba;
                            heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                        } else if (type === 'DualSwords') {
                            if (bleeding[index] && ww) {
                                for (let j = 0; j < 6; j++) {
                                    damage += calcSkillDamage(character, enemy, 0, (wm < 13 ? 0.25 : 0.4) + 0.1 + w * 0.025, 1);
                                    heal += calcHeal(10 + w * 5 + character.attack_power * 0.1, 1, enemy);
                                    if (enemy.character === Magnus) {
                                        let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                        if (lost < 0) {
                                            lost = 0;
                                        }
                                        enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                                    }
                                }
                            } else {
                                for (let j = 0; j < 6; j++) {
                                    damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 0.25 : 0.4, 1);
                                    if (enemy.character === Magnus) {
                                        let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                        if (lost < 0) {
                                            lost = 0;
                                        }
                                        enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                                    }
                                }
                            }
                        } else if (type === 'Axe') {
                            for (let x = index; x <= index + (wm < 13 ? 16 : 24); x++) {
                                dd[x] = true;
                            }
                        }
                    }
                } else if (c === 'p' || c === 'P') {
                    if (character.trap) {
                        damage += floor(character.trap.Trap_Damage * (1.04 + character.TRAP_MASTERY.selectedIndex * 0.04));
                    }
                }
            }
            if (index % 2 === 0 && bleeding[index]) {
                damage += floor(bleeding[index]);
            }
        }
        damage += checkItemDamage(character, enemy, index);
        return {
            hp: data.hp - damage,
            damage: damage,
            heal: heal,
            shield: shield,
            vars: {
                bleeding: bleeding,
                ap: ap,
                ww: ww,
                rr: rr,
                tt: tt,
                ttt: ttt,
                dd: dd,
                stack: stack
            }
        };
    }
    ,COMBO_Option: 'tTewQradaaaa'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Dagger' ? 'd & D: 무스 데미지(현재 체력 비례)\n' :
            weapon === 'TwoHandedSword' ? 'd & D: D스킬 데미지\n' :
            weapon === 'DualSwords' ? 'd & D: D스킬 6타 데미지\n' :
            weapon === 'Axe' ? 'd & D: 버프 On\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q: Q스킬 1타 데미지, 출혈\n' +
            'Q: Q스킬 최대 데미지, 출혈\n' +
            'w & W: W스킬 On\n' +
            'e & E: E스킬 데미지\n' +
            'r: R스킬 On, 사용후 평타시 출혈, 재사용시 최소 데미지\n' +
            'R: R스킬 On, 사용후 평타시 출혈, 재사용시 최대 데미지\n' +
            't: 패시브 닭, 멧돼지, 들개 On / Off\n' +
            'T: 패시브 곰, 위클라인, 실험체 On / Off\n' +
            d +
            'p & P: 트랩 데미지';
    }
};
