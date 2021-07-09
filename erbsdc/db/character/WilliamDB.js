'use strict';
const William = {
     Attack_Power: 24
    ,Attack_Power_Growth: 2.5
    ,Health: 680
    ,Health_Growth: 65 //
    ,Health_Regen: 0.6
    ,Health_Regen_Growth: 0.04
    ,Stamina: 480
    ,Stamina_Growth: 26
    ,Stamina_Regen: 1.1
    ,Stamina_Regen_Growth: 0.04
    ,Defense: 24 //
    ,Defense_Growth: 2
    ,Atk_Speed: 0.12
    ,Movement_Speed: 3.1 //
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Throws]
    ,correction: {
        Throws: [
            [0, -6, -9],
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
            const t = character.T_LEVEL.selectedIndex;
            const coe = 0.15 + t * 0.1;
            const ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const ba2 = baseAttackDamage(character, enemy, 0, 1 + coe, character.critical_strike_chance, 1);
            const damage = round(ba * character.attack_speed * 100) / 100;
            let count = 1;
            while ((1 / character.attack_speed) * count < 1.5) {
                count++;
            }
            const damage2 = round((ba * (count - 1) + ba2) / count * character.attack_speed * 100) / 100;
            const life = calcHeal(character, ba * (character.life_steal / 100), character.attack_speed, enemy);
            const life2 = calcHeal(character, (ba * (count - 1) + ba2) / count  * (character.life_steal / 100), character.attack_speed, enemy);
            return "<b> _d/s: </b><b class='damage'>" + damage + ' ~ ' + damage2 + "</b><b> _h/s: </b><b class='heal'>" + life + ' ~ ' + life2 + '</b>';
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
            const coe = 0.15 + t * 0.1;
            const ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) +
                baseAttackDamage(character, enemy, 0, 0.15 + q * 0.05, character.critical_strike_chance, 1);
            const ba2 = baseAttackDamage(character, enemy, 0, 1 + coe, character.critical_strike_chance, 1) +
                baseAttackDamage(character, enemy, 0, 0.15 + q * 0.05 + coe, character.critical_strike_chance, 1);
            const as = calcAttackSpeed(character, 10 + q * 5);
            const damage = round(ba * as * 100) / 100;
            let count = 1;
            while ((1 / as) * count < 1.5) {
                count++;
            }
            const damage2 = round((ba * (count - 1) + ba2) / count * as * 100) / 100;
            const life = calcHeal(character, ba * (character.life_steal / 100), as, enemy);
            const life2 = calcHeal(character, (ba * (count - 1) + ba2) / count  * (character.life_steal / 100), as, enemy);
            return "<b> _d/s: </b><b class='damage'>" + damage + ' ~ ' + damage2 + "</b><b> _h/s: </b><b class='heal'>" + life + ' ~ ' + life2 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const damage = calcSkillDamage(character, enemy, 50 + w * 25, 0.5, 1);
            const cool = 10000 / ((18 - w * 1.5) * (100 - character.cooldown_reduction) + 200);
            return "<b class='damage'>" + damage + ' - ' + damage * 2 + '</b> ( ' + damage + ", " + damage + " )<b> _sd/s: </b><b class='damage'>" + round(damage * 2 * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const damage = calcSkillDamage(character, enemy, 150 + r * 100, 0.45, 1);
            return "<b class='damage'>" + damage + '</b>';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Throws') {
                return '-';
            }
        }
        return '- ';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            const coe = 0.15 + t * 0.1;
            const damage = baseAttackDamage(character, enemy, 0, 1 + coe, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1 + coe, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1 + coe, 100, 1);
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
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
            weapon === 'Throws' ? '투척' :
            '';
        const skill =
            weapon === 'Throws' ? '"데미지 없음"' :
            '';
        return '윌리엄 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "최소 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" ~ "패시브 데미지" _h/s: "초당 흡혈량" ~ "패시브 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: _d/s: "초당 데미지" ~ "패시브 데미지" _h/s: "초당 흡혈량" ~ "패시브 흡혈량"\n' +
            'W: "스킬 데미지" - "합산 데미지 ( "1타 데미지", "2타 데미지" )\n' +
            'E: "데미지 없음"\n' +
            'R: "스킬 데미지"\n' +
            'D: ' + skill + '\n' +
            'T: "평균 데미지" ( "최소 데미지" - "치명타 데미지" )\n';
    }
    ,COMBO_VARS: '{\"qq\":0}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const t = character.T_LEVEL.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        const auto_cri = character.AUTO_CRI.checked;
        let damage = 0;
        let heal = calcHeal(character, character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let qq = data.vars.qq;
        const qc = 0.15 + q * 0.05;
        const tc = 0.15 + t * 0.1;

        let fi = character.weapon && character.weapon.Focused_Impact ? data.vars.fi || character.weapon.Focused_Impact * 2 : 0;
        let sm = data.vars.sm || 0;
        let sms = data.vars.sms || 0;
        let sws = character.accessory && character.accessory.Swift_Strides ? data.vars.sws || character.accessory.Swift_Strides : 0;
        if (character.weapon) {
            let ficri = character.weapon.Focused_Impact * 2 === fi;
            if (fi < character.weapon.Focused_Impact * 2) {
                fi--;
            }
            for (let i = 0; i < combo.length; i++) {
                c = combo.charAt(i);
                if (qq) {
                    qq--;
                }
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
                if (c === 'a') {
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                    if (qq) {
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                        }
                        if (character.weapon.Smolder && sm < 4) {
                            sm++;
                        }
                        ba += baseAttackDamage(character, enemy, 0, qc, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                    }
                    damage += ba;
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'A') {
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 100, 1);
                    if (qq) {
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                        }
                        if (character.weapon.Smolder && sm < 4) {
                            sm++;
                        }
                        ba += baseAttackDamage(character, enemy, 0, qc, ficri ? 100 : auto_cri ? character.critical_strike_chance : 100, 1);
                    }
                    damage += ba;
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        qq = 11;
                    }
                } else if (c === 'w') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 50 + w * 25, 0.5, 1);
                    }
                } else if (c === 'W') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 50 + w * 25, 0.5, 1);
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                        }
                        damage += calcSkillDamage(character, enemy, 50 + w * 25, 0.5, 1);
                    }
                } else if (c === 'r' || c === 'R') {
                    damage += calcSkillDamage(character, enemy, 150 + r * 100, 0.45, 1);
                } else if (c === 't') {
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1 + tc, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                    if (qq) {
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                        }
                        ba += baseAttackDamage(character, enemy, 0, qc + tc, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                    }
                    damage += ba;
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'T') {
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 100, 1);
                    if (qq) {
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.0025)) * (1 + defense_minus[index]));
                        }
                        ba += baseAttackDamage(character, enemy, 0, qc + tc, ficri ? 100 : auto_cri ? character.critical_strike_chance : 100, 1);
                    }
                    damage += ba;
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
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
                qq: qq
            }
        };
    }
    ,COMBO_Option: 'qaetWretetqetetet'
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
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q & Q: Q스킬 On\n' +
            'w: W스킬 1회 데미지\n' +
            'W: W스킬 2회 데미지\n' +
            'e & E: 데미지 없음\n' +
            'r & R: R스킬 데미지\n' +
            't: 패시브 데미지\n' +
            'T: 패시브 치명타 데미지\n' +
            d +
            'p & P: 트랩 데미지';
    }
};