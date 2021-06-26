'use strict';
const Xiukai = {
     Attack_Power: 40
    ,Attack_Power_Growth: 2.5
    ,Health: 700
    ,Health_Growth: 74
    ,Health_Regen: 1
    ,Health_Regen_Growth: 0.06
    ,Stamina: 420
    ,Stamina_Growth: 14
    ,Stamina_Regen: 0.5
    ,Stamina_Regen_Growth: 0.01
    ,Defense: 36
    ,Defense_Growth: 1.7
    ,Atk_Speed: 0.16 //
    ,Movement_Speed: 3.15
    ,Sight_Range: 8
    ,Attack_Range: 0.48
    ,weapons: [Dagger, Spear]
    ,correction: {
        Dagger: [
            [0, -5, -10],
            [0, 0, -3]
        ],
        Spear: [
            [0, -7, -12],
            [0, 0, -3]
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
            const damage = calcSkillDamage(character, enemy, 70 + q * 40, 0.5, 1);
            const cost = 20 + q * 15;
            const cool = 10000 / ((7 - q * 0.5) * (100 - character.cooldown_reduction) + 26);
            return "<b class='damage'>" + damage + "</b><b> _cost: </b><b class='heal'>-" + cost + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';

        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const min = calcSkillDamage(character, enemy, 10 + w * 45, 0.6, 1);
            const max = calcSkillDamage(character, enemy, 10 + w * 45 + character.max_hp * (0.015 + w * 0.01), 0.6, 1);
            const cost = 20 + w * 15;
            const cool = 10000 / ((16 - w * 2) * (100 - character.cooldown_reduction) + 34);
            return min + " - <b class='damage'>" + max + "</b><b> _cost: </b><b class='heal'>-" + cost + "</b><b> _sd/s: </b><b class='damage'>" + round(max * cool) / 100 + '</b>'
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const min = calcSkillDamage(character, enemy, 80 + e * 30 + character.max_hp * 0.02 - floor(0.3 * e) * 10, 0.5, 1);
            const max = calcSkillDamage(character, enemy, 80 + e * 30 + character.max_hp * 0.04 - floor(0.3 * e) * 10, 0.5, 1);
            const cost = 20 + e * 15;
            const cool = 10000 / ((20 - e * 2) * (100 - character.cooldown_reduction));
            return min + " - <b class='damage'>" + max + "</b><b> _cost: </b><b class='heal'>-" + cost + "</b><b> _sd/s: </b><b class='damage'>" + round(max * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const stack = parseInt(character.DIV.querySelector('.xiukai_t').value);
            const damage = calcSkillDamage(character, enemy, 20 + r * 45 + stack * 0.8, 0.5, 1);
            const cost = 100 + r * 20;
            return "<b class='damage'>" + damage * 6 + '</b> ( ' + damage + " x 6 ) <b> _cost: </b><b class='heal'>-" + cost + '</b>';
        }
        return '-';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='xiukai_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Dagger') {
                const damage = baseAttackDamage(character, enemy, 0, 1, 100, 1);
                const heal = calcHeal(floor(damage + (enemy.max_hp ? enemy.max_hp *0.08 : 0)) * (character.life_steal / 100), 1, enemy);
                return "<b class='damage'>" + damage + ' ~ ' + floor(damage + calcTrueDamage(character, enemy, enemy.max_hp ? enemy.max_hp * 0.08 : 0)) + "</b><b> _h: </b><b class='heal'>" + heal + '</b>';
            }
            if (type === 'Spear') {
                const damage = calcSkillDamage(character, enemy, 0, wm < 13 ? 1 : 1.5, 1);
                return "<b class='damage'>" + damage * 2 + '</b> ( ' + damage + ', ' + damage + ' )';
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
    ,T_Option: "<input type='number' class='stack xiukai_t' value='0' onchange='fixLimitNum(this, 999)'><b>Stack"
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
            weapon === 'Spear' ? '창' :
            '';
        const skill =
            weapon === 'Dagger' ? '"최소 데미지" ~ "최대 데미지" _h: "흡혈량"' :
            weapon === 'Spear' ? '"합산 데미지" ( "1타 데미지", "2타 데미지" )' :
            '';
        return '쇼우 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "스킬 데미지" _cost: "체력소모"\n' +
            'W: "최소 데미지" - "최대 데미지" _cost: "체력소모"\n' +
            'E: "최소 데미지" - "최대 데미지" _cost: "체력소모"\n' +
            'R: "합산 데미지" ( "틱당 데미지" x "타수" ) _cost: "체력소모" _use "스킬 사용"\n' +
            'D: ' + skill + '\n' +
            'T: "스택"\n';
    }
    ,COMBO_VARS: '{\"cc\":false}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        const auto_cri = character.AUTO_CRI.checked;
        let damage = 0;
        let heal = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let cc = data.vars.cc;

        let fi = character.weapon && character.weapon.Focused_Impact ? data.vars.fi || character.weapon.Focused_Impact * 2 : 0 ;
        if (character.weapon) {
            let ficri = character.weapon.Focused_Impact * 2 === fi;
            if (fi < character.weapon.Focused_Impact * 2) {
                fi--;
            }
            const type = character.weapon.Type;
            const stack = parseInt(character.DIV.querySelector('.xiukai_t').value);
            for (let i = 0; i < combo.length; i++) {
                c = combo.charAt(i);
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
                if (c === 'a') {
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'A') {
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 100, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 70 + q * 40, 0.5, 1);
                        cc = true;
                        heal -= 20 + q * 15;
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        if (cc) {
                            damage += calcSkillDamage(character, enemy, 10 + w * 45 + character.max_hp * (0.015 + w * 0.01), 0.6, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 10 + w * 45, 0.6, 1);
                        }
                        cc = true;
                        heal -= 20 + w * 15;
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        if (cc) {
                            damage += calcSkillDamage(character, enemy, 80 + e * 30 + character.max_hp * 0.04 - floor(0.3 * e) * 10, 0.5, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 80 + e * 30 + character.max_hp * 0.02 - floor(0.3 * e) * 10, 0.5, 1);
                        }
                        cc = true;
                        heal -= 20 + e * 15;
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        if (cc) {
                            const dm = -0.1 + -r * 0.05;
                            for (let x = index; x <= index + 6 && x < defense_minus.length; x++) {
                                defense_minus[x] = dm;
                            }
                        }
                        const hit = c === 'r' ? 3 : 6;
                        for (let j = 0; j < hit; j++) {
                            damage += calcSkillDamage(character, enemy, 20 + r * 45 + stack * 0.8, 0.5, 1);
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
                        }
                        defense_minus[index] = 0;
                        heal -= 100 + r * 20;
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Dagger') {
                            if (fi === character.weapon.Focused_Impact * 2) {
                                fi--;
                            }
                            let currHp = enemy.max_hp ? enemy.max_hp - damage + heal + shield : 0;
                            if (currHp > enemy.max_hp) {
                                currHp = enemy.max_hp;
                            }
                            ba = floor(baseAttackDamage(character, enemy, 0, 1, 100, 1) + calcTrueDamage(character, enemy, enemy.max_hp ? currHp * 0.08 : 0));
                            damage += ba;
                            heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                        } else if (type === 'Spear') {
                            damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 1 : 1.5, 1);
                            if (c === 'D') {
                                if (enemy.character === Magnus) {
                                    let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                    if (lost < 0) {
                                        lost = 0;
                                    }
                                    enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                                }
                                damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 1 : 1.5, 1) * 2;
                            }
                            cc = true;
                        }
                    }
                } else if (c === 'p' || c === 'P') {
                    if (character.trap) {
                        damage += floor(character.trap.Trap_Damage * (1.04 + character.TRAP_MASTERY.selectedIndex * 0.04));
                    }
                }
            }
        }
        damage += checkItemDamage(character, enemy, index);
        return {
            hp: data.hp - damage,
            damage: damage,
            heal: heal,
            shield: shield,
            vars: {
                fi: fi,
                cc: cc
            }
        };
    }
    ,COMBO_Option: 'dqewRq'
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
            weapon === 'Spear' ? 'd: 무스 최소 데미지, CC기\n' + 'D: 무스 최대 데미지, CC기\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q & Q: Q스킬 데미지, CC기\n' +
            'w & W: W스킬 데미지, CC기\n' +
            'e & E: E스킬 1타 데미지, CC기\n' +
            'r: R스킬 1.5초간 데미지\n' +
            'R\ R스킬 3초간 데미지\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};
