'use strict';
const Fiora = {
     Attack_Power: 28
    ,Attack_Power_Growth: 3.7
    ,Health: 720
    ,Health_Growth: 81
    ,Health_Regen: 0.8
    ,Health_Regen_Growth: 0.06
    ,Stamina: 430
    ,Stamina_Growth: 13
    ,Stamina_Regen: 2.2
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 25
    ,Defense_Growth: 2.2
    ,Atk_Speed: 0.22
    ,Movement_Speed: 3.2
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [TwoHandedSword, Rapier, Spear]
    ,correction: {
        TwoHandedSword: [
            [0, 0, 0],
            [0, 3, -3]
        ],
        Rapier: [
            [0, -2, -3],
            [0, 0, -7]
        ],
        Spear: [
            [0, -2, -3],
            [0, 3, -9]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex - 1;
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            if (character.DIV.querySelector('.fiora_r').checked && r >= 0) {
                const bonus = calcSkillDamage(character, enemy, 20 + r * 20, 0.04 + r * 0.14, 1);
                return "<b class='damage'>" + (damage + bonus) + '</b> ( ' +  min + ', ' + bonus + ' - ' + max + ', ' + bonus + ' ) ';
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            const r = character.R_LEVEL.selectedIndex - 1;
            const ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const life = calcHeal(character, ba * (character.life_steal / 100), character.attack_speed, enemy);
            let damage;
            if (character.DIV.querySelector('.fiora_r').checked && r >= 0) {
                const bonus = calcSkillDamage(character, enemy, 20 + r * 20, 0.04 + r * 0.14, 1);
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
            const crid = (1.2 + (character.critical_damage - (!enemy.critical_damage_reduction ? 0 : enemy.critical_damage_reduction)) / 100);
            const min = calcSkillDamage(character, enemy, 60 + q * 60, 0.25, 1);
            const max = calcSkillDamage(character, enemy, (60 + q * 60) * crid, 0.25 * crid, 1);
            const cool = 10000 / ((9 - q * 1) * (100 - character.cooldown_reduction));
            return min + " - <b class='damage'>" + max + "</b><b> _sd/s: </b><b class='damage'>" + round(max * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const r = character.R_LEVEL.selectedIndex - 1;
            const damage1 = baseAttackDamage(character, enemy, 0, 0.6 + w * 0.1, character.critical_strike_chance, 1);
            const damage2 = baseAttackDamage(character, enemy, 0, 0.2 + w * 0.1, character.critical_strike_chance, 1);
            const min1 = baseAttackDamage(character, enemy, 0, 0.6 + w * 0.1, 0, 1);
            const min2 = baseAttackDamage(character, enemy, 0, 0.2 + w * 0.1, 0, 1);
            const max1 = baseAttackDamage(character, enemy, 0, 0.6 + w * 0.1, 100, 1);
            const max2 = baseAttackDamage(character, enemy, 0, 0.2 + w * 0.1, 100, 1);
            const cool = 10000 / ((18 - w * 2) * (100 - character.cooldown_reduction) - 500);
            if (character.DIV.querySelector('.fiora_r').checked && r >= 0) {
                const bonus = calcSkillDamage(character, enemy, 20 + r * 20, 0.04 + r * 0.14, 1);
                return "<b class='damage'>" + (damage1 + damage2 + bonus * 2) + '</b> ( ' +  min1 + ', ' + min2 + ', ' + bonus + ' - ' + max1 + ', ' + max2 + ', ' + bonus + " ) <b> _sd/s: </b><b class='damage'>" + round((damage1 + damage2 + bonus * 2) * cool) / 100 + '</b>';
            }
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' +  min1 + ', ' + min2 + ' - ' + max1 + ', ' + max2 + " ) <b> _sd/s: </b><b class='damage'>" + round((damage1 + damage2) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const crid = (1.2 + (character.critical_damage - (!enemy.critical_damage_reduction ? 0 : enemy.critical_damage_reduction)) / 100);
            const min = calcSkillDamage(character, enemy, 90 + e * 40, 0.4, 1);
            const max = calcSkillDamage(character, enemy, (90 + e * 40) * crid, 0.4 * crid, 1);
            const cool = 10000 / ((16 - e * 2) * (100 - character.cooldown_reduction) + 200);
            return "<b class='damage'>" + min + '</b> - ' + max + "<b> _sd/s: </b><b class='damage'>" + round(min * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const damage = calcSkillDamage(character, enemy, 20 + r * 20, 0.04 + r * 0.14, 1);
            return "<b class='damage'>" + damage + '</b>';
        }
        return '-';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='fiora_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'TwoHandedSword') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, wm < 13 ? 1.75 : 2.25, 1) + '</b>';
            }
            if (type === 'Rapier') {
                const damage = calcSkillDamage(character, enemy, 0,
                    1.75 + (character.critical_damage - (!enemy.critical_damage_reduction ? 0 : enemy.critical_damage_reduction)) / 100, 1);
                const cool = 10000 / ((wm < 13 ? 30 : 18) * (100 - character.cooldown_reduction));
                return "<b class='damage'>" + damage + "</b><b> _d/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
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
            weapon === 'TwoHandedSword' ? '양손검' :
            weapon === 'Rapier' ? '레이피어' :
            weapon === 'Spear' ? '창' :
            '';
        const skill =
            weapon === 'TwoHandedSword' ? '"스킬 데미지"' :
            weapon === 'Rapier' ? '"스킬 데미지"' :
            weapon === 'Spear' ? '"합산 데미지" ( "1타 데미지", "2타 데미지" )' :
            '';
        if (character.DIV.querySelector('.fiora_r').checked) {
            return '피오라 ( ' + type + ' )\n' +
                'A: "평균 데미지" ( "평타 데미지", "갸르드 데미지" - "치명타 데미지", "갸르드 데미지" )\n' +
                'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
                'HPS: "초당 회복량"\n' +
                'Q: "스킬 데미지" - "뚜셰 데미지"\n' +
                'W: "합산 데미지" ( "1타 데미지", "2타 데미지", "갸르드 데미지" - "1타 치명타", "2타 치명타", "갸르드 데미지" )\n' +
                'E: "스킬 데미지" - "뚜셰 데미지"\n' +
                'R: "스킬 데미지" _use "스킬 사용"\n' +
                'D: ' + skill + '\n' +
                'T: "데미지 없음"\n';
        }
        return '피오라 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "스킬 데미지" - "뚜셰 데미지"\n' +
            'W: "합산 데미지" ( "1타 데미지", "2타 데미지" - "1타 치명타", "2타 치명타" )\n' +
            'E: "스킬 데미지" - "뚜셰 데미지"\n' +
            'R: "스킬 데미지" _use "스킬 사용"\n' +
            'D: ' + skill + '\n' +
            'T: "데미지 없음"\n';
    }
    ,COMBO_VARS: '{\"f\":0,\"rr\":false}'
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
        let heal = calcHeal(character, character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let f = data.vars.f, rr = data.vars.rr;

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
            const crid = (1.2 + (character.critical_damage - (!enemy.critical_damage_reduction ? 0 : enemy.critical_damage_reduction)) / 100);
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
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    f++;
                    ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 'a' ? 0 : 100, 1);
                    if (sws) {
                        damage += calcItemDamage(character, enemy, character.accessory.Swift_Strides[0] * round(sws / character.accessory.Swift_Strides[1], 2));
                        sws = 0.0001;
                    }
                    damage += ba;
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                    if (r >= 0) {
                        if (rr) {
                            damage += calcSkillDamage(character, enemy, 20 + r * 20, 0.04 + r * 0.14, 1);
                        }
                    }
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        if (f >= 3 && t === 2 || f >= 4 && t === 1 || f >= 5 && t === 0) {
                            damage += calcSkillDamage(character, enemy, (60 + q * 60) * crid, 0.25 * crid, 1);
                            f = 0;
                        } else {
                            damage += calcSkillDamage(character, enemy, 60 + q * 60, 0.25, 1);
                        }
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        if (character.weapon.Smolder && sm < 4) {
                            sm++;
                            sms = 8;
                            if (character.weapon.Smolder && sm < 4) {
                                sm++;
                            }
                        }
                        if (fi === character.weapon.Focused_Impact * 2) {
                            fi--;
                        }
                        f += 2;
                        ba = baseAttackDamage(character, enemy, 0, 0.6 + w * 0.1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 'a' ? 0 : 100, 1);
                        if (sws) {
                            damage += calcItemDamage(character, enemy, character.accessory.Swift_Strides[0] * round(sws / character.accessory.Swift_Strides[1], 2));
                            sws = 0.0001;
                        }
                        if (r >= 0) {
                            if (rr) {
                                damage += calcSkillDamage(character, enemy, 20 + r * 20, 0.04 + r * 0.14, 1);
                            }
                        }
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                        }
                        ba += baseAttackDamage(character, enemy, 0, 0.2 + w * 0.1, auto_cri ? character.critical_strike_chance : 'a' ? 0 : 100, 1);
                        if (r >= 0) {
                            if (rr) {
                                damage += calcSkillDamage(character, enemy, 20 + r * 20, 0.04 + r * 0.14, 1);
                            }
                        }
                        damage += ba;
                        heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        if (f >= 3 && t === 2 || f >= 4 && t === 1 || f >= 5 && t === 0) {
                            damage += calcSkillDamage(character, enemy, (90 + e * 40) * (1.2 +character.critical_damage / 100), 0.4 * (1.2 + character.critical_damage / 100), 1);
                            f = 0;
                        } else {
                            damage += calcSkillDamage(character, enemy, 90 + e * 40, 0.4, 1);
                        }
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        rr = !rr;
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'TwoHandedSword') {
                            damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 1.75 : 2.25, 1);
                        } else if (type === 'Rapier') {
                            damage += calcSkillDamage(character, enemy, 0,
                                1.75 + (character.critical_damage - (!enemy.critical_damage_reduction ? 0 : enemy.critical_damage_reduction)) / 100, 1);
                        } else if (type === 'Spear') {
                            if (c === 'd') {
                                damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 1 : 1.5, 1);
                            } else {
                                damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 1 : 1.5, 1) * 2;
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
            heal: heal,
            shield: shield,
            vars: {
                fi: fi,
                sm: sm,
                sms: sms,
                sws: sws,
                f: f,
                rr: rr
            }
        };
    }
    ,COMBO_Option: 'rdawqaweawqaw'
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
            weapon === 'Rapier' ? 'd & D: 무스 데미지\n' :
            weapon === 'Spear' ? 'd: 무스 최소 데미지\n' + 'D: 무스 최대 데미지\n' :
            '';
        return 'a: 기본공격 데미지, 패시브 1스택\n' +
            'A: 치명타 데미지, 패시브 1스택\n' +
            'q & Q: Q스킬 데미지\n' +
            'w: W스킬 데미지, 패시브 2스택\n' +
            'W: W스킬 치명타 데미지, 패시브 2스택\n' +
            'e & E: E스킬 데미지\n' +
            'r & R: R스킬 On / Off\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};
