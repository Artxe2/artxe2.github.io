'use strict';
const Rio = {
     Attack_Power: 21
    ,Attack_Power_Growth: 2.3
    ,Health: 670
    ,Health_Growth: 62
    ,Health_Regen: 0.8
    ,Health_Regen_Growth: 0.04
    ,Stamina: 420
    ,Stamina_Growth: 16
    ,Stamina_Regen: 1.6
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 27
    ,Defense_Growth: 1.8
    ,Atk_Speed: 0.1
    ,Movement_Speed: 3.05
    ,Sight_Range: 8
    ,Attack_Range: 4.2
    ,weapons: [Bow]
    ,correction: {
        Bow: [
            [0, -10, -15],
            [0, 0, 0]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const q = character.Q_LEVEL.selectedIndex - 1;
            if (character.DIV.querySelector('.rio_q').checked) {
                const min = rioAttackDamage(character, enemy, 0, 1.1 + q * 0.04, true);
                const max = rioAttackDamage(character, enemy, 0, (1.1 + q * 0.04) * 1.5, true);
                return "<b class='damage'>" + min + "</b><b> / </b><b class='damage'>" + max + '</b>';
            } else {
                const damage1 = rioAttackDamage(character, enemy, 0, 0.38 + q * 0.03, true);
                const damage2 = rioAttackDamage(character, enemy, 0, 0.42 + q * 0.03, false);
                return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' +  damage1 + ', ' + damage2 + ' )';
            }
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            const q = character.Q_LEVEL.selectedIndex - 1;
            if (character.DIV.querySelector('.rio_q').checked) {
                const min = rioAttackDamage(character, enemy, 0, 1.04 + q * 0.04, true);
                const max = rioAttackDamage(character, enemy, 0, (1.04 + q * 0.04) * 1.25, true);
                const ba = (min * 3 + max) / 4;
                const damage = round(ba * character.attack_speed * 100) / 100;
                const life = calcHeal(ba * (character.life_steal / 100), character.attack_speed, enemy);
                return "<b class='damage'>" + damage + "</b><b> _h/s: </b><b class='heal'>" + life + '</b>';
            } else {
                const ba = rioAttackDamage(character, enemy, 0, 0.4 + q * 0.03, true) +
                    rioAttackDamage(character, enemy, 0, 0.4 + q * 0.03, false);
                const damage1 = round(ba * character.attack_speed * 100) / 100;
                const damage2 = round(ba * calcAttackSpeed(character, 10 + q * 5) * 100) / 100;
                const life = calcHeal(ba * (character.life_steal / 100), calcAttackSpeed(character, 10 + q * 5), enemy);
                return damage1 + " - <b class='damage'>" + damage2 + "</b><b> _h/s: </b><b class='heal'>" + life + '</b>';
            }
        }
        return '-';
    }
    ,DPS_Option: ''
    ,HPS: (character, enemy) => {
        return "<b class='heal'>" + calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 2, enemy) + '</b>';
    }
    ,Q_Skill: (character, enemy) => {
        return "<b class='damage'>" + (character.DIV.querySelector('.rio_q').checked ? 'Hankyu' : 'Daikyu') + '</b>';
    }
    ,Q_Option: "<b> _use</b><input type='checkbox' class='rio_q' onchange='updateDisplay()'>"
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            if (character.DIV.querySelector('.rio_q').checked) {
                const damage = calcSkillDamage(character, enemy, 45 + w * 45, 0.55, 1);
                const cool = 10000 / ((10 - w) * (100 - character.cooldown_reduction) * 0.3);
                return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
            } else {
                const damage1 = calcSkillDamage(character, enemy, 30 + w * 20, 0.3, 1);
                const damage2 = calcSkillDamage(character, enemy, (30 + w * 20) * 0.5, 0.3 * 0.5, 1);
                const cool = 10000 / ((12 - w) * (100 - character.cooldown_reduction));
                return "<b class='damage'>" + damage1 + ' ~ ' + (damage1 + damage2 * 4) + '</b> ( ' + damage1 + ", " + damage2 + " x 4 ) <b> _sd/s: </b><b class='damage'>" + round((damage1 + damage2 * 4) * cool) / 100 + '</b>';
            }
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            if (character.DIV.querySelector('.rio_q').checked) {
                const damage = calcSkillDamage(character, enemy, 50 + e * 20, 0.4, 1);
                const cool = 10000 / ((6 - e * 0.5) * (100 - character.cooldown_reduction) + 30);
                return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
            } else {
                const damage = calcSkillDamage(character, enemy, 40 + e * 10, 0.3, 1);
                const cool = 10000 / ((6 - e * 0.5) * (100 - character.cooldown_reduction) + 30);
                return "<b class='damage'>" + damage * 2 + '</b> ( ' + damage + " x 2 ) <b> _sd/s: </b><b class='damage'>" + round(damage * 2 * cool) / 100 + '</b>';
            }
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            if (character.DIV.querySelector('.rio_q').checked) {
                const min = calcSkillDamage(character, enemy, 300 + r * 50, 0.4, 1);
                const max = calcSkillDamage(character, enemy, (300 + r * 50) * 1.3, 0.4 * 1.3, 1);
                return "<b class='damage'>" + min + ' - ' + max + '</b>';
            } else {
                const damage1 = calcSkillDamage(character, enemy, 40 + r * 30, 0.3, 1);
                const damage2 = calcSkillDamage(character, enemy, 150 + r * 50, 0.6, 1);
                return "<b class='damage'>" + (damage1 * 3 + damage2) + '</b> ( ' + damage1 + ' x 3, ' + damage2 + ' )';
            }
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Bow') {
                const min = calcSkillDamage(character, enemy, wm < 13 ? 150 : 250, 1, 1);
                const max = calcSkillDamage(character, enemy, wm < 13 ? 300 : 500, 2, 1);
                return "<b class='damage'>" + min + ' - ' + max + '</b>';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        return "<b class='damage'>" + character.armer_penetration_percent + '%</b>';
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
            weapon === 'Bow' ? '보우' :
            '';
        const skill =
            weapon === 'Bow' ? '"최소 데미지" - "최대 데미지"' :
            '';
        if (character.DIV.querySelector('.rio_q').checked) {
            return '리오 ( ' + type + ' )\n' +
                'A: "평타 데미지" / "카이츄 데미지"\n' +
                'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
                'HPS: "초당 회복량"\n' +
                'Q: "무기 변환"\n' +
                'W: "스킬 데미지"\n' +
                'E: "스킬 데미지"\n' +
                'R: "최소 데미지" - "최대 데미지"\n' +
                'D: ' + skill + '\n' +
                'T: "방어구 관통력"\n';
        }
        return '리오 ( ' + type + ' )\n' +
            'A: "합산 데미지" ( "1타 데미지", "2타 데미지" )\n' +
            'DPS: "초당 데미지" - "카이츄 데미지" _h/s: "초당 흡혈량" - "카이츄 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "무기 변환"\n' +
            'W: "최소 데미지" ~ "최대 데미지" ( "첫타 데미지", "추가타 데미지" x "타수" )\n' +
            'E: "합산 데미지" ( "1타 데미지", "2타 데미지" )\n' +
            'R: "합산 데미지" ( "연사 데미지" x "타수", "추가타 데미지" )\n' +
            'D: ' + skill + '\n' +
            'T: "방어구 관통력"\n';
    }
    ,COMBO_VARS: '{\"qq\":false}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        let damage = 0;
        let heal = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let qq = data.vars.qq;

        let fi = character.weapon && character.weapon.Focused_Impact ? data.vars.fi || character.weapon.Focused_Impact * 2 : 0;
        let sm = data.vars.sm || 0;
        let sms = data.vars.sms || 0;
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
                    if (qq) {
                        ba = rioAttackDamage(character, enemy, 0, 1.04 + q * 0.04, true);
                    } else {
                        ba = rioAttackDamage(character, enemy, 0, 0.38 + q * 0.03, true);
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                        }
                        ba += rioAttackDamage(character, enemy, 0, 0.42 + q * 0.03, false);
                    }
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'A') {
                    if (qq) {
                        let lost = enemy.max_hp ? floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp) : 0;
                        if (lost < 0) {
                            lost = 0;
                        }
                        ba = rioAttackDamage(character, enemy, 0, (1.04 + q * 0.04) * (1 + lost / 200), true);
                    } else {
                        ba = rioAttackDamage(character, enemy, 0, 0.38 + q * 0.03, true);
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                        }
                        ba += rioAttackDamage(character, enemy, 0, 0.42 + q * 0.03, false);
                    }
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q' || c === 'Q') {
                    qq = !qq;
                } else if (c === 'w') {
                    if (w >= 0) {
                        if (qq) {
                            damage += calcSkillDamage(character, enemy, 45 + w * 45, 0.55, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 30 + w * 20, 0.3, 1);
                        }
                    }
                } else if (c === 'W') {
                    if (w >= 0) {
                        if (qq) {
                            damage += calcSkillDamage(character, enemy, 45 + w * 45, 0.55, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 30 + w * 20, 0.3, 1);
                            for (let j = 0; j < 4; j++) {
                                if (enemy.character === Magnus) {
                                    let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                    if (lost < 0) {
                                        lost = 0;
                                    }
                                    enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                                }
                                damage += calcSkillDamage(character, enemy, (30 + w * 20) * 0.5, 0.3 * 0.5, 1);
                            }
                        }
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        if (qq) {
                            damage += calcSkillDamage(character, enemy, 50 + e * 20, 0.4, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 40 + e * 10, 0.3, 1);
                            if (enemy.character === Magnus) {
                                let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                if (lost < 0) {
                                    lost = 0;
                                }
                                enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                            }
                            damage += calcSkillDamage(character, enemy, 40 + e * 10, 0.3, 1);
                        }
                    }
                } else if (c === 'r') {
                    if (r >= 0) {
                        if (qq) {
                            damage += calcSkillDamage(character, enemy, 300 + r * 50, 0.4, 1);
                        } else {
                            for (let j = 0; j < 3; j++) {
                                damage += calcSkillDamage(character, enemy, 40 + r * 30, 0.3, 1);
                                if (enemy.character === Magnus) {
                                    let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                    if (lost < 0) {
                                        lost = 0;
                                    }
                                    enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                                }
                            }
                        }
                    }
                } else if (c === 'R') {
                    if (r >= 0) {
                        if (qq) {
                            damage += calcSkillDamage(character, enemy, (300 + r * 50) * 1.3, 0.4 * 1.3, 1);
                        } else {
                            for (let j = 0; j < 3; j++) {
                                damage += calcSkillDamage(character, enemy, 40 + r * 30, 0.3, 1);
                                if (enemy.character === Magnus) {
                                    let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                                    if (lost < 0) {
                                        lost = 0;
                                    }
                                    enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                                }
                            }
                            damage += calcSkillDamage(character, enemy, 150 + r * 50, 0.6, 1);
                        }
                    }
                } else if (c === 'd') {
                    if (wm > 5) {
                        if (type === 'Bow') {
                            damage += calcSkillDamage(character, enemy, wm < 13 ? 150 : 250, 1, 1);
                        }
                    }
                } else if (c === 'D') {
                    if (wm > 5) {
                        if (type === 'Bow') {
                            damage += calcSkillDamage(character, enemy, wm < 13 ? 300 : 500, 2, 1);
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
                damage += calcTrueDamage(character, enemy, currHp * 0.02 * sm);
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
                qq: qq
            }
        };
    }
    ,COMBO_Option: 'AaaWaeDqARqaa'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Shuriken' ? 'd: 무스 추가타 데미지\n' + 'D: 무스 첫타 데미지\n' :
            weapon === 'Bow' ? 'd: 무스 외곽 데미지\n' + 'D: 무스 중앙 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 카이츄 데미지\n' +
            'q & Q: 무기 스왑 ( 기본 단궁 )\n' +
            'w: W스킬 최소 데미지\n' +
            'W: W스킬 최대 데미지\n' +
            'e & E: E스킬 데미지\n' +
            'r: R스킬 최소 데미지\n' +
            'R: R스킬 최대 데미지\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};
