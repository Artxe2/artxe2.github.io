'use strict';
const Yuki = {
     Attack_Power: 26
    ,Attack_Power_Growth: 2.9
    ,Health: 720
    ,Health_Growth: 75
    ,Health_Regen: 0.7
    ,Health_Regen_Growth: 0.05
    ,Stamina: 410
    ,Stamina_Growth: 20
    ,Stamina_Regen: 2.2
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 26
    ,Defense_Growth: 2.3
    ,Atk_Speed: 0.08
    ,Movement_Speed: 3.15
    ,Sight_Range: 8
    ,Attack_Range: 0.45
    ,weapons: [TwoHandedSword, DualSwords]
    ,correction: {
        TwoHandedSword: [
            [0, -14, -14],
            [0, 2, -3]
        ],
        DualSwords: [
            [0, -6, -9],
            [0, -3, -6]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            if (character.weapon.Type === 'DualSwords') {
                if (character.DIV.querySelector('.yuki_t').checked) {
                    const bonus = calcTrueDamage(character, enemy, 25 + t * 15);
                    return "<b class='damage'>" + (damage + damage + bonus + bonus) + '</b> ( ' +  min + ', ' + bonus + ', ' + min + ', ' + bonus + ' - ' + max + ', ' + bonus + ', ' + max + ', ' + bonus + ' )';
                }
                return "<b class='damage'>" + (damage + damage) + '</b> ( ' +  min + ', ' + min + ' - ' + max + ', ' + max + ' )';
            }
            if (character.DIV.querySelector('.yuki_t').checked) {
                const bonus = calcTrueDamage(character, enemy, 25 + t * 15);
                return "<b class='damage'>" + (damage + bonus) + '</b> ( ' +  min + ', ' + bonus + ' - ' + max + ', ' + bonus + ' )';
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            let ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            let bonus = calcTrueDamage(character, enemy, 25 + t * 15);
            let damage;
            if (character.weapon.Type === 'DualSwords') {
                ba += ba;
                bonus += bonus;
            }
            const life = calcHeal(character, ba * (character.life_steal / 100), character.attack_speed, enemy);
            if (character.DIV.querySelector('.yuki_t').checked) {
                damage = round((ba + bonus) * character.attack_speed * 100) / 100;
            } else {
                damage = round(ba * character.attack_speed * 100) / 100;
            }
            return "<b class='damage'>" + damage + "</b><b> _h/s: </b><b class='heal'>" + life + '</b>';
        }
        return '-';
    }
    ,DPS_Option: ''
    ,HPS: (character, enemy) => {
        return "<b class='heal'>" + calcHeal(character, character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 2, enemy) + '</b>';
    }
    ,Q_Skill: (character, enemy) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        if (character.weapon && q >= 0) {
            const t = character.T_LEVEL.selectedIndex;
            const base = 20 + q * 20;
            const coe = character.weapon.Type === 'DualSwords' ? 2 : 1;
            const damage = baseAttackDamage(character, enemy, base, coe, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, base, coe, 0, 1);
            const max = baseAttackDamage(character, enemy, base, coe, 100, 1);
            const life = calcHeal(character, damage * (character.life_steal / 100), 1, enemy);
            const cool = 10000 / ((9 - q * 1) * (100 - character.cooldown_reduction) + 23);
            if (character.DIV.querySelector('.yuki_t').checked) {
                const bonus = calcTrueDamage(character, enemy, 25 + t * 15);
                return "<b class='damage'>" + (damage + bonus) + '</b> ( ' +  min + ', ' + bonus + ' - ' + max + ', ' + bonus + " )<b> _h: </b><b class='heal'>" + life + "</b><b> _sd/s: </b><b class='damage'>" + round((damage + bonus) * cool) / 100 + '</b>';
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + " )<b> _h: </b><b class='heal'>" + life + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const e = character.E_LEVEL.selectedIndex - 1;
            if (e >= 0) {
                const t = character.T_LEVEL.selectedIndex;
                const damage = calcSkillDamage(character, enemy, 65 + e * 55, 0.4, 1);
                const cool = (550 + w * 50) / ((17 - e * 1) * (100 - character.cooldown_reduction) - 300) *
                    10000 / ((18 - w * 2) * (100 - character.cooldown_reduction));
                if (character.DIV.querySelector('.yuki_t').checked) {
                    const bonus = calcTrueDamage(character, enemy, 25 + t * 15);
                    return "<b> _sd/s: </b><b class='damage'>" + round((damage + bonus) * cool) / 100 + '</b>';
                }
                return "<b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
            }
        }
        return '-';
    }
    ,W_Option: "<b> _use</b><input type='checkbox' class='yuki_w' onchange='updateDisplay()'>"
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const t = character.T_LEVEL.selectedIndex;
            const damage = calcSkillDamage(character, enemy, 65 + e * 55, 0.4, 1);
            const cool = 10000 / ((17 - e * 1) * (100 - character.cooldown_reduction) - 300);
            if (character.DIV.querySelector('.yuki_t').checked) {
                const bonus = calcTrueDamage(character, enemy, 25 + t * 15);
                return "<b class='damage'>" + (damage + bonus) + '</b> ( ' + damage + ', ' + bonus + " )<b> _sd/s: </b><b class='damage'>" + round((damage + bonus) * cool) / 100 + '</b>';
            }
            return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const t = character.T_LEVEL.selectedIndex;
            const damage1 = calcSkillDamage(character, enemy, 250 + r * 125, 1.5, 1);
            const damage2 = calcTrueDamage(character, enemy, enemy.max_hp ? enemy.max_hp * (0.15 + r * 0.05) : 0);
            if (character.DIV.querySelector('.yuki_t').checked) {
                const bonus = calcTrueDamage(character, enemy, 25 + t * 15);
                return "<b class='damage'>" + (damage1 + bonus + damage2) + '</b> ( ' + damage1 + ', ' + bonus + ', ' + damage2 + ' )';
            }
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' + damage1 + ', ' + damage2 + ' )';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'TwoHandedSword') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, wm < 13 ? 1.75 : 2.25, 1) + '</b>';
            }
            if (type === 'DualSwords') {
                const damage = calcSkillDamage(character, enemy, 0, wm < 13 ? 0.25 : 0.4, 1);
                return "<b class='damage'>" + damage * 12 + '</b> ( ' + damage + ' x 12 )';
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
            const damage = calcTrueDamage(character, enemy, 25 + t * 15);
            return "<b class='damage'>" + damage + '</b>';
        }
        return '-';
    }
    ,T_Option: "<b> _use</b><input type='checkbox' class='yuki_t' onchange='updateDisplay()'>"
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type =
            weapon === 'TwoHandedSword' ? '양손검' :
            weapon === 'DualSwords' ? '쌍검' :
            '';
        const skill =
            weapon === 'TwoHandedSword' ? '"스킬 데미지"' :
            weapon === 'DualSwords' ? '"합산 데미지" ( "틱당 데미지" x "타수" )' :
            '';
        return '유키 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'W: _use "스킬 사용"\n' +
            'E: "스킬 데미지"\n' +
            'R: "합산 데미지" ( "1타 데미지", "2타 데미지" )\n' +
            'D: ' + skill + '\n' +
            'T: "추가 데미지" _use "스킬 사용"\n';
    }
    ,COMBO_VARS: '{\"tt\":4}'
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
        let throns = 0;
        let heal = calcHeal(character, character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
            let shield = 0, c, ba;
        let tt = data.vars.tt;

        let fi = character.weapon && character.weapon.Focused_Impact ? data.vars.fi || character.weapon.Focused_Impact * 2 : 0;
        let sm = data.vars.sm || 0;
        let sms = data.vars.sms || 0;
        let sws = character.accessory && character.accessory.Swift_Strides ? data.vars.sws || character.accessory.Swift_Strides[1] : 0;
        if (character.weapon) {
            let ficri = character.weapon.Focused_Impact * 2 === fi;
            if (fi < character.weapon.Focused_Impact * 2) {
                fi--;
            }
            if (sws) {
                sws += character.movement_speed / 2;
                if (sws > character.accessory.Swift_Strides[1] ) {
                    sws = character.accessory.Swift_Strides[1];
                }
            }
            const type = character.weapon.Type;
            const base = 20 + q * 20;
            const coe = character.weapon.Type === 'DualSwords' ? 2 : 1;
            const bonus = calcTrueDamage(character, enemy, 25 + t * 15);
            for (let i = 0; i < combo.length; i++) {
                c = combo.charAt(i);
                if (enemy.defense) {
                    if (enemy.character === Magnus) {
                        let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                        if (lost < 0) {
                            lost = 0;
                        }
                        enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                    } else {
                        enemy.defense = floor((enemy.pure_defense + defense_bonus[index]) * (1 + defense_percent[index]) * (1 + defense_minus[index]));
                    }
                }
                if (c === 'a' || c === 'A') {
                    const crit = ficri ? 100 : auto_cri ? character.critical_strike_chance : c === 'a' ? 0 : 100;
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, crit, 1);
                    if (tt) {
                        if (character.weapon.Type != 'DualSwords') {
                            tt--;
                        }
                        ba += bonus;
                    }
                    if (sws) {
                        damage += calcItemDamage(character, enemy, character.accessory.Swift_Strides[0] * round(sws / character.accessory.Swift_Strides[1], 2));
                        sws = 0.0001;
                    }
                    if (character.weapon.Type === 'DualSwords') {
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                        }
                        ba += baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : c === 'a' ? 0 : 100, 1);
                        if (tt) {
                            tt--;
                            ba += bonus;
                        }
                    }
                    damage += ba;
                    if (enemy.head && enemy.head.Throns) {
                        throns += floor(ba * 0.07);
                    }
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q' || c === 'Q') {
                    const crit = ficri ? 100 : auto_cri ? character.critical_strike_chance : c === 'q' ? 0 : 100;
                    if (q >= 0) {
                        if (fi === character.weapon.Focused_Impact * 2) {
                            fi--;
                        }
                        ba = baseAttackDamage(character, enemy, base, coe, crit, 1);
                        if (tt) {
                            tt--;
                            ba += bonus;
                        }
                        damage += ba;
                        if (enemy.head && enemy.head.Throns) {
                            throns += floor(ba * 0.07);
                        }
                        heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        tt = 4;
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        damage += calcSkillDamage(character, enemy, 65 + e * 55, 0.4, 1);
                        if (tt) {
                            tt--;
                            damage += bonus;
                        }
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 250 + r * 125, 1.5, 1) +
                            calcTrueDamage(character, enemy, enemy.max_hp ? enemy.max_hp * (0.15 + r * 0.05) : 0);
                        if (tt) {
                            tt--;
                            damage += bonus;
                        }
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'TwoHandedSword') {
                            damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 1.75 : 2.25, 1);
                        } else if (type === 'DualSwords') {
                            for (let j = 0; j < 6; j++) {
                                damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 0.25 : 0.4, 1);
                                if (tt) {
                                    tt--;
                                    damage += bonus;
                                }
                                if (enemy.character === Magnus) {
                                    let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                    if (lost < 0) {
                                        lost = 0;
                                    }
                                    enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                                }
                            }
                        }
                    }
                } else if (c === 'p' || c === 'P') {
                    if (character.trap) {
                        damage += floor(character.trap.Trap_Damage * (1.04 + character.TRAP_MASTERY.selectedIndex * 0.04));
                    }
                }
            }
            if (index % 2) {
                let currHp = enemy.max_hp ? data.hp- damage + heal + shield : 0;
                if (currHp > enemy.max_hp) {
                    currHp = enemy.max_hp;
                } else if (currHp < 0) {
                    currHp = 0;
                }
                damage += calcTrueDamage(character, enemy, currHp * 0.03 * sm);
            }
            if (sms) {
                sms--;
            } else {
                sm = 0;
            }
        }
        damage += checkItemDamage(character, enemy, index);
        return {
            hp: data.hp - damage,
            damage: damage,
            throns: throns,
            heal: heal,
            shield: shield,
            vars: {
                fi: fi,
                sm: sm,
                sms: sms,
                sws: sws,
                tt: tt
            }
        };
    }
    ,COMBO_Option: 'aqaaewaqrdaea'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'TwoHandedSword' ? 'd & D: 무스 데미지\n' :
            weapon === 'DualSwords' ? 'd & D: 무스 6회 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q: Q스킬 데미지\n' +
            'Q: Q스킬 치명타 데미지\n' +
            'w & W: 패시브 4회 충전\n' +
            'e & E: E스킬 데미지\n' +
            'r & R: R스킬 데미지\n' +
            't && T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};