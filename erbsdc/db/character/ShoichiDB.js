'use strict';
const Shoichi = {
     Attack_Power: 19
    ,Attack_Power_Growth: 4
    ,Health: 720
    ,Health_Growth: 69
    ,Health_Regen: 0.8
    ,Health_Regen_Growth: 0.04
    ,Stamina: 370
    ,Stamina_Growth: 13
    ,Stamina_Regen: 1.6
    ,Stamina_Regen_Growth: 0.04
    ,Defense: 27
    ,Defense_Growth: 2.2
    ,Atk_Speed: 0.12
    ,Movement_Speed: 3.15
    ,Sight_Range: 8
    ,Attack_Range: 0.43
    ,weapons: [Dagger]
    ,correction: {
        Dagger: [
            [0, -9, -6],
            [0, 0, -3]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            let damage, min, max;
            if (character.DIV.querySelector('.shoichi_t').value == 5) {
                const t = character.T_LEVEL.selectedIndex;
                damage = baseAttackDamage(character, enemy, 0, 1 + 0.1 + 0.05 * t, character.critical_strike_chance, 1);
                min = baseAttackDamage(character, enemy, 0, 1 + 0.1 + 0.05 * t, 0, 1);
                max = baseAttackDamage(character, enemy, 0, 1 + 0.1 + 0.05 * t, 100, 1);
            } else {
                damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
                min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
                max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            let ba;
            if (character.DIV.querySelector('.shoichi_t').value == 5) {
                const t = character.T_LEVEL.selectedIndex;
                ba = baseAttackDamage(character, enemy, 0, 1 + 0.1 + 0.05 * t, character.critical_strike_chance, 1);
            } else {
                ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            }
            const damage = floor(ba * character.attack_speed * 100) / 100;
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
            const w = character.W_LEVEL.selectedIndex - 1;
            const t = character.T_LEVEL.selectedIndex;
            const damage = calcSkillDamage(character, enemy, 10 + q * 55, 0.45, 1);
            const ww = w >= 0 ? calcSkillDamage(character, enemy, 10 + w * 30, 0.3, 1) : 0;
            const tt = calcSkillDamage(character, enemy, 10 + t * 35, 0.4, 1);
            const cool = 10000 / (6 * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round((damage + (tt + ww) / 2) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const damage = calcSkillDamage(character, enemy, 10 + w * 30, 0.3, 1);
            const cool = 10000 / ((16 - w * 1) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const w = character.W_LEVEL.selectedIndex - 1;
            const t = character.T_LEVEL.selectedIndex;
            const damage = calcSkillDamage(character, enemy, 35 + e * 40, 0.3, 1);
            const ww = w >= 0 ? calcSkillDamage(character, enemy, 10 + w * 30, 0.3, 1) : 0;
            const tt = calcSkillDamage(character, enemy, 10 + t * 35, 0.4, 1);
            const cool = 10000 / ((18 - e * 2) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round((damage + tt + ww) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const w = character.W_LEVEL.selectedIndex - 1;
            const t = character.T_LEVEL.selectedIndex;
            const damage1 = calcSkillDamage(character, enemy, 50 + r * 100, 0.3, 1);
            const damage2 = calcSkillDamage(character, enemy, 25 + r * 35, 0.3, 1);
            const ww = w >= 0 ? calcSkillDamage(character, enemy, 10 + w * 30, 0.3, 1) : 0;
            const tt = calcSkillDamage(character, enemy, 10 + t * 35, 0.4, 1);
            return "<b class='damage'>" + (damage1 + damage2 + tt * 4 + ww * 2) + '</b> ( ' + damage1 + ', ' + damage2 + ', ' + tt + ' x 4, ' + ww + ' x 2 )';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Dagger') {
                let damage;
                if (character.DIV.querySelector('.shoichi_t').value == 5) {
                    const t = character.T_LEVEL.selectedIndex;
                    damage = baseAttackDamage(character, enemy, 0, 1 + 0.1 + 0.05 * t, 100, 1);
                } else {
                    damage = baseAttackDamage(character, enemy, 0, 1, 100, 1);
                }
                const bonus = calcTrueDamage(character, enemy, enemy.max_hp ? enemy.max_hp * 0.08 : 0);
                const heal = calcHeal(floor(damage + bonus) * (character.life_steal / 100), 1, enemy);
                return "<b class='damage'>" + damage + ' ~ ' + floor(damage + bonus) + "</b><b> _h: </b><b class='heal'>" + heal + '</b>';
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
            const damage = calcSkillDamage(character, enemy, 10 + t * 35, 0.4, 1);
            return "<b class='damage'>" + damage + '</b>';
        }
        return '-';
    }
    ,T_Option: "_ <input type='number' class='stack shoichi_t' value='0' onchange='fixLimitNum(this, 5)'><b>Stack</b>"
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
            '';
        const skill =
            weapon === 'Dagger' ? '"최소 데미지" ~ "최대 데미지" _h: "흡혈량"' :
            '';
        return '쇼이치 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "스킬 데미지"\n' +
            'W: "스킬 데미지"\n' +
            'E: "스킬 데미지"\n' +
            'R: "합산 데미지" ( "1타 데미지", "2타 데미지", "패시브 데미지" x "타수", "W 데미지" )\n' +
            'D: ' + skill + '\n' +
            'T: "스킬 데미지"_ "스택"\n';
    }
    ,COMBO_VARS: '{\"tt\":0}'
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
        let tt = data.vars.tt;
        if (character.weapon) {
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
                    if (tt === 5) {
                        ba = baseAttackDamage(character, enemy, 0, 1 + 0.1 + 0.05 * t, auto_cri ? character.critical_strike_chance : 0, 1);
                    } else {
                        ba = baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : 0, 1);
                    }
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'A') {
                    if (tt === 5) {
                        ba = baseAttackDamage(character, enemy, 0, 1 + 0.1 + 0.05 * t, auto_cri ? character.critical_strike_chance : 100, 1);
                    } else {
                        ba = baseAttackDamage(character, enemy, 0, 1, auto_cri ? character.critical_strike_chance : 100, 1);
                    }
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        if (tt < 5) {
                            tt++;
                            character.critical_strike_chance += 5 + t * 2;
                            if (character.critical_strike_chance > 100) {
                                character.critical_strike_chance = 100;
                            }
                        }
                        damage += calcSkillDamage(character, enemy, 10 + q * 55, 0.45, 1);
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        if (tt < 5) {
                            tt++;
                            character.critical_strike_chance += 5 + t * 2;
                            if (character.critical_strike_chance > 100) {
                                character.critical_strike_chance = 100;
                            }
                        }
                        damage += calcSkillDamage(character, enemy, 10 + w * 30, 0.3, 1);
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        if (tt < 5) {
                            tt++;
                            character.critical_strike_chance += 5 + t * 2;
                            if (character.critical_strike_chance > 100) {
                                character.critical_strike_chance = 100;
                            }
                        }
                        damage += calcSkillDamage(character, enemy, 35 + e * 40, 0.3, 1);
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        if (tt < 5) {
                            tt++;
                            character.critical_strike_chance += 5 + t * 2;
                            if (character.critical_strike_chance > 100) {
                                character.critical_strike_chance = 100;
                            }
                        }
                        if (tt < 5) {
                            tt++;
                            character.critical_strike_chance += 5 + t * 2;
                            if (character.critical_strike_chance > 100) {
                                character.critical_strike_chance = 100;
                            }
                        }
                        damage += calcSkillDamage(character, enemy, 50 + r * 100, 0.3, 1);
                        if (enemy.character === Magnus) {
                            let lost = floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp);
                            if (lost < 0) {
                                lost = 0;
                            }
                            enemy.defense = floor(enemy.pure_defense * (1 + lost * (0.002 + et * 0.004)) * (1 + defense_minus[index]));
                        }
                        damage += calcSkillDamage(character, enemy, 25 + r * 35, 0.3, 1);
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Dagger') {
                            let currHp = enemy.max_hp ? enemy.max_hp - damage + heal + shield : 0;
                            if (currHp > enemy.max_hp) {
                                currHp = enemy.max_hp;
                            }
                            if (tt === 5) {
                                ba = floor(baseAttackDamage(character, enemy, 0, 1 + 0.1 + 0.05 * t, 100, 1) + calcTrueDamage(character, enemy, enemy.max_hp ? currHp * 0.08 : 0));
                            } else {
                                ba = floor(baseAttackDamage(character, enemy, 0, 1, 100, 1) + calcTrueDamage(character, enemy, enemy.max_hp ? currHp * 0.08 : 0));
                            }
                            damage += ba;
                            heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                        }
                    }
                } else if (c === 't' || c === 'T') {
                    if (tt < 5) {
                        tt++;
                    }
                    damage += calcSkillDamage(character, enemy, 10 + t * 35, 0.4, 1);
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
                tt: tt
            }
        };
    }
    ,COMBO_Option: 'ewtaqdrwtttwtaq'
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
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q & Q: Q스킬 데미지\n' +
            'w & W: W스킬 데미지\n' +
            'e & E: E스킬 데미지\n' +
            'r & R: R스킬 데미지\n' +
            't & T: 패시브 데미지\n' +
            d +
            'p & P: 트랩 데미지';
    }
};