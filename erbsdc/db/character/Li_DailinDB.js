'use strict';
const Li_Dailin = {
     Attack_Power: 31
    ,Attack_Power_Growth: 2.5
    ,Health: 720
    ,Health_Growth: 76
    ,Health_Regen: 1.1
    ,Health_Regen_Growth: 0.07
    ,Stamina: 420
    ,Stamina_Growth: 16
    ,Stamina_Regen: 0.2
    ,Stamina_Regen_Growth: 0.01
    ,Defense: 22
    ,Defense_Growth: 2.2
    ,Atk_Speed: 0.07 //
    ,Movement_Speed: 3.15
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Glove, Nunchaku]
    ,correction: {
        Glove: [
            [0, -2, -3],
            [0, 0, -3]
        ],
        Nunchaku: [
            [0, 0, 0],
            [0, 3, 0]
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
            const min = calcSkillDamage(character, enemy, 25 + q * 20, 0.5, 1);
            const max = calcSkillDamage(character, enemy, 28 + q * 28, 0.6, 1);
            const cool = 10000 / ((12 - q * 0.5) * (100 - character.cooldown_reduction) + 100);
            return "<b class='damage'>" + max * 3 + '</b> ( ' + min + ' x 3 - ' + max + " x 3 )<b> _sd/s: </b><b class='damage'>" + round((max * 3) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const t = character.T_LEVEL.selectedIndex;
            const damage1 = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const damage2 = baseAttackDamage(character, enemy, 0, 0.4 + t * 0.2, character.critical_strike_chance, 1);
            const dps = round((damage1 + damage2) * character.attack_speed * 100) / 100;
            const life = calcHeal((damage1 + damage2) * (character.life_steal / 100), character.attack_speed, enemy);
            return "<b> _d/s: </b><b class='damage'>" + dps + "</b><b> _h/s: </b><b class='heal'>" + life + '</b>';
        }
        return '-';
    }
    ,W_Option: "<b> _use</b><input type='checkbox' class='lida_w' onchange='updateDisplay()'>"
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const damage = calcSkillDamage(character, enemy, 80 + e * 55, 0.5, 1);
            const cool = 10000 / ((13 - e * 1) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const min = calcSkillDamage(character, enemy, 25 + r * 30, 0.15, 1);
            let max;
            if (enemy.max_hp) {
                const hp = enemy.max_hp;
                const heal = calcHeal(enemy.hp_regen * (enemy.hp_regen_percent + 100) / 100 +
                    (enemy.food ? enemy.food.HP_Regen / 30 : 0), 2, character);
                let start = 0, mid, end = floor(hp * 0.75) + 1, coe;
                while (start < end) {
                    mid = (start + end + 1) / 2;
                    coe = 2 * (mid * 100.0 / hp > 75 ? 75 : mid * 100.0 / hp) / 75 + 1;
                    max = calcSkillDamage(character, enemy, (25 + r * 30) * coe, 0.15 * coe, 1);
                    if (max * 4 + mid > hp + heal) {
                        end = mid - 1;
                    } else {
                        start = mid;
                    }
                }
            } else {
                max = calcSkillDamage(character, enemy, 75 + r * 90, 0.45, 1);
            }
            return "<b class='damage'>" + min * 4 + ' ~ ' + max * 4 + '</b> ( [ ' + min + ' x 4 ] ~ [ ' + max + ' x 4 ] )';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Glove') {
                const coe = wm < 13 ? 1.4 : 2;
                const bonus = calcTrueDamage(character, enemy, wm < 13 ? 50 : 100);
                const min = baseAttackDamage(character, enemy, 0, 1 + coe, 0, 1) + bonus;
                const max = baseAttackDamage(character, enemy, 0, (1 + coe) * 1.19, 0, 1) + bonus;
                const life = calcHeal(min * (character.life_steal / 100), 1, enemy);
                const cool = 100 / (wm < 13 ? 12 : 10);
                return "<b class='damage'>" + min + '</b> ( ' +  min + ' ~ ' + max + " )<b> _h: </b><b class='heal'>" + life + "</b><b> _sd/s: </b><b class='damage'>" + round(min * cool) / 100 + '</b>';
            }
            if (type === 'Nunchaku') {
                const min = calcSkillDamage(character, enemy, wm < 13 ? 150 : 300, 0.5, 1);
                const max = calcSkillDamage(character, enemy, wm < 13 ? 300 : 600, 1.5, 1);
                return "<b class='damage'>" + min + ' ~ ' + max + '</b>';
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
            const coe = 0.4 + t * 0.2;
            const damage1 = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const damage2 = baseAttackDamage(character, enemy, 0, coe, character.critical_strike_chance, 1);
            const min1 = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const min2 = baseAttackDamage(character, enemy, 0, coe, 0, 1);
            const max1 = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            const max2 = baseAttackDamage(character, enemy, 0, coe, 100, 1);
            const over1 = baseAttackDamage(character, enemy, 0, 1.19, 100, 1);
            const over2 = baseAttackDamage(character, enemy, 0, coe * 1.19, 100, 1);
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' +  min1 + ', ' + min2 + ' - ' + max1 + ', ' + max2 + ' / ' + over1 + ', ' + over2 + ' ) ';
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
            weapon === 'Glove' ? '글러브' :
            weapon === 'Nunchaku' ? '쌍절곤' :
            '';
        const skill =
            weapon === 'Glove' ? '"스킬 데미지" ( "스킬 데미지" ~ "최대 강화 데미지" ) _h: "스킬 흡혈량"' :
            weapon === 'Nunchaku' ? '"최소 데미지" ~ "최대 데미지"' :
            '';
        return '리 다이린 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "합산 강화 데미지" ( "1타 데미지", "2타 데미지", "3타 데미지" - "1타 강화", "2타 강화", "3타 강화" )\n' +
            'W: _d/s: "만취 초당 데미지" _h/s: "만취 초당 흡혈량" _use "스킬 사용"\n' +
            'E: "스킬 데미지"\n' +
            'R: "최소 합산 데미지" ~ "최대 막타 데미지" / "최대 강화 데미지" ( [ "최소 데미지" x "타수" ] ~ [ "최대 데미지" x "타수" ] )\n' +
            'D: ' + skill + '\n' +
            'T: "평균 데미지" ( "1타 데미지", "2타 데미지" - "1타 치명타", "2타 치명타" / "1타 최대 강화", "2타 최대 강화" )\n';
    }
    ,COMBO_VARS: '{\"bac\":0,\"liquid\":0,\"bqqac\":0,\"wq\":0}'
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
        let bac = data.vars.bac, liquid = data.vars.liquid, qq = data.vars.qq, wq = data.vars.wq;

        let fi = character.weapon && character.weapon.Focused_Impact ? data.vars.fi || character.weapon.Focused_Impact * 2 : 0 ;
        if (character.weapon) {
            let ficri = character.weapon.Focused_Impact * 2 === fi;
            if (fi < character.weapon.Focused_Impact * 2) {
                fi--;
            }
            const type = character.weapon.Type;
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
                    if (liquid > 1) {
                        liquid = liquid === 2 ? 1 : 0;
                        ba = baseAttackDamage(character, enemy, 0, 1 * (1 + bac * 0.002), ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                        damage += ba;
                        heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    } else {
                        liquid = 0;
                        ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                        damage += ba;
                        heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    }
                } else if (c === 'A') {
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    if (liquid > 1) {
                        liquid = liquid === 2 ? 1 : 0;
                        ba = baseAttackDamage(character, enemy, 0, 1 * (1 + bac * 0.002), ficri ? 100 : auto_cri ? character.critical_strike_chance : 100, 1);
                        damage += ba;
                        heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    } else {
                        liquid = 0;
                        ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 100, 1);
                        damage += ba;
                        heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    }
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        if (liquid === 1) {
                            liquid = 0;
                        }
                        if (qq > 0) {
                            qq--;
                            damage += calcSkillDamage(character, enemy, 25 + q * 20, 0.5, 1);
                        } else if (wq > 0) {
                            wq--;
                            damage += calcSkillDamage(character, enemy, 28 + q * 28, 0.6, 1);
                        } else if (bac >= 40) {
                            wq = 2;
                            damage += calcSkillDamage(character, enemy, 28 + q * 28, 0.6, 1);
                            bac -= 40;
                        } else {
                            qq = 2;
                            damage += calcSkillDamage(character, enemy, 25 + q * 20, 0.5, 1);
                        }
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        if (bac < 55) {
                            if (bac >= 40) {
                                liquid = 2;
                            } else {
                                liquid = 1.5;
                            }
                            bac += 45;
                        } else {
                            bac = 95;
                        }
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        if (liquid === 1) {
                            liquid = 0;
                        }
                        if (bac >= 40) {
                            bac -= 40;
                        }
                        damage += calcSkillDamage(character, enemy, 80 + e * 55, 0.5, 1)
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        let lost = enemy.max_hp ? floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp) : 0;
                        if (lost < 0) {
                            lost = 0;
                        }
                        const coe = enemy.max_hp ? 2 * (lost > 75 ? 75 : lost) / 75 + 1 : 3;
                        const hit = bac >= 40 ? 4 : 2;
                        for (let j = 0; j < hit; j++) {
                            damage += calcSkillDamage(character, enemy, (25 + r * 30) * coe, 0.15 * coe, 1);
                            if (enemy.character === Magnus) {
                                lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                if (lost < 0) {
                                    lost = 0;
                                }
                                enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                            }
                        }
                        if (bac >= 40) {
                            bac -= 40;
                        }
                    }
                } else if (c === 'd') {
                    if (wm > 5) {
                        if (type === 'Glove') {
                            if (fi === character.weapon.Focused_Impact * 2) {
                                fi--;
                            }
                            const coe = wm < 13 ? 1.4 : 2;
                            const bonus = calcTrueDamage(character, enemy, wm < 13 ? 50 : 100);
                            if (liquid) {
                                ba = baseAttackDamage(character, enemy, 0, (1 + coe) * (1 + bac * 0.002), 0, 1) + bonus;
                                damage += ba;
                                heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                            } else {
                                ba = baseAttackDamage(character, enemy, 0, 1 + coe, 0, 1) + bonus;
                                damage += ba;
                                heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                            }
                        	liquid = 0;
                        } else if (type === 'Nunchaku') {
                            if (liquid === 1) {
                            	liquid = 0;
                            }
                            damage += calcSkillDamage(character, enemy, wm < 13 ? 150 : 300, 0.5, 1);
                        }
                    }
                } else if (c === 'D') {
                    if (wm > 5) {
                        if (type === 'Glove') {
                            if (fi === character.weapon.Focused_Impact * 2) {
                                fi--;
                            }
                            const coe = wm < 13 ? 1.4 : 2;
                            const bonus = calcTrueDamage(character, enemy, wm < 13 ? 50 : 100);
                            if (liquid) {
                                liquid = 0;
                                ba = baseAttackDamage(character, enemy, 0, (1 + coe) * (1 + bac * 0.002), 0, 1) + bonus;
                                damage += ba;
                                heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                            } else {
                                ba = baseAttackDamage(character, enemy, 0, 1 + coe, 0, 1) + bonus;
                                damage += ba;
                                heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                            }
                        } else if (type === 'Nunchaku') {
                            damage += calcSkillDamage(character, enemy, wm < 13 ? 300 : 600, 1.5, 1);
                        }
                    }
                } else if (c === 't') {
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    if (liquid > 1) {
                        ba = baseAttackDamage(character, enemy, 0, 1 + bac * 0.002, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                        }

                        ba += baseAttackDamage(character, enemy, 0, (0.4 + t * 0.2) * (1 + bac * 0.002), auto_cri ? character.critical_strike_chance : 0, 1);
                        damage += ba;
                        heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    } else {
                        ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                        }
                        ba += baseAttackDamage(character, enemy, 0, (0.4 + t * 0.2), auto_cri ? character.critical_strike_chance : 0, 1);
                        damage += ba;
                        heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    }
                    liquid = 0;
                } else if (c === 'T') {
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    if (liquid > 1) {
                        ba = baseAttackDamage(character, enemy, 0, 1 + bac * 0.002, auto_cri ? character.critical_strike_chance : 100, 1);
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                        }
                        ba += baseAttackDamage(character, enemy, 0, (0.4 + t * 0.2) * (1 + bac * 0.002), auto_cri ? character.critical_strike_chance : 100, 1);
                        damage += ba;
                        heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    } else {
                        ba = baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : 100, 1);
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                        }
                        ba += baseAttackDamage(character, enemy, 0, (0.4 + t * 0.2), auto_cri ? character.critical_strike_chance : 100, 1);
                        damage += ba;
                        heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    }
                    liquid = 0;
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
                bac: bac,
                liquid: liquid,
                qq: qq,
                wq: wq
            }
        };
    }
    ,COMBO_Option: 'wweqtdwqtqtrt'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Glove' ? 'd & D: 무스 데미지\n' :
            weapon === 'Nunchaku' ? 'd: 무스 즉발 데미지\n' + 'D: 무스 최대 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q & Q: Q스킬 1회 데미지\n' +
            'w & W: W스킬 사용(최대 게이지 95)\n' +
            'e & E: E스킬 데미지\n' +
            'r & R: R스킬 데미지( 잃은 체력 비례 Max 75% )\n' +
            't: 패시브 데미지\n' +
            'T: 패시브 치명타 데미지\n' +
            d +
            'p & P: 트랩 데미지';
    }
};
