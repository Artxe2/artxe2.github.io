'use strict';
const Sua = {
     Attack_Power: 23
    ,Attack_Power_Growth: 2
    ,Health: 660
    ,Health_Growth: 74
    ,Health_Regen: 0.7
    ,Health_Regen_Growth: 0.06
    ,Stamina: 480
    ,Stamina_Growth: 18
    ,Stamina_Regen: 1.8
    ,Stamina_Regen_Growth: 0.08
    ,Defense: 23
    ,Defense_Growth: 2.1
    ,Atk_Speed: 0.12
    ,Movement_Speed: 3.15
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Hammer]
    ,correction: {
        Hammer: [
            [0, 0, 0],
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
            let damage, life;
            if (character.DIV.querySelector('.sua_t').checked) {
                const t = character.T_LEVEL.selectedIndex;
                damage = calcSkillDamage(character, enemy, 30 + t * 45 + character.defense * 0.6, 0.6, 1);
                life = calcHeal(damage * 0.3, character.attack_speed, enemy);
            } else {
                const ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
                damage = round(ba * character.attack_speed * 100) / 100;
                life = calcHeal(ba * (character.life_steal / 100), character.attack_speed, enemy);
            }
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
        const q = character.Q_LEVEL.selectedIndex - 1;
        if (character.weapon && q >= 0) {
            const min = calcSkillDamage(character, enemy, 45 + q * 30, 0.4, 1);
            const max = calcSkillDamage(character, enemy, 65 + q * 50, 1, 1);
            const cool = 10000 / ((12 - q) * (100 - character.cooldown_reduction) - 150);
            return "<b class='damage'>" + min + ' - ' + max + "</b><b> __sd/s: </b><b class='damage'>" + round((min + max) / 2 * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const damage = calcSkillDamage(character, enemy, 25 + w * 25, 0.4, 1);
            const shield = floor(50 + w * 40 + character.attack_power * 0.2);
            const cool = 10000 / ((26 - w * 2) * (100 - character.cooldown_reduction) - 150);
            return "<b class='damage'>" + damage + "</b><b> __s: </b><b class='shield'>" + shield + "</b><b> __sd/s: </b><b class='damage'>" + round((damage * floor(6 + w * 0.5)) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const min = calcSkillDamage(character, enemy, 90 + e * 30, 0.4, 1);
            const max = calcSkillDamage(character, enemy, 120 + e * 40, 0.6, 1);
            const cool = 10000 / ((20 - e * 1.5) * (100 - character.cooldown_reduction) - 150);
            return "<b class='damage'>" + min + ' - ' + max + "</b><b> __sd/s: </b><b class='damage'>" + round((min + max) / 2 * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const minQ = calcSkillDamage(character, enemy, 55 + r * 55, 0.4, 1);
            const maxQ = calcSkillDamage(character, enemy, 75 + r * 95, 0.6, 1);
            const damage = calcSkillDamage(character, enemy, 50 + r * 50, 0.4, 1);
            const shield = floor(80 + r * 80 + character.attack_power * 0.2);
            const minE = calcSkillDamage(character, enemy, 100 + r * 60, 0.4, 1);
            const maxE = calcSkillDamage(character, enemy, 250 + r * 150, 1, 1);
            return "<b class='damage'>" + minQ + ' - ' + maxQ + '</b><b> / </b>' +
                "<b class='damage'>" + damage + "</b></b><b> __s: </b><b class='shield'>" + shield + '<b> / </b>' +
                "<b class='damage'>" + minE + ' - ' + maxE + '</b>';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Hammer') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 150 + character.defense : 300 + character.defense * 2, 0, 1) + '</b>';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return !character.weapon || character.weapon.Type !== 'Hammer' ? '' :
            "<b> __use</b><input type='checkbox' class='hammer_d' onchange='updateDisplay()'>";
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            const t = character.T_LEVEL.selectedIndex;
            const damage = calcSkillDamage(character, enemy, 30 + t * 45 + character.defense * 0.6, 0.6, 1);
            const heal = calcHeal(damage * 0.3, 1, enemy);
            return "<b class='damage'>" + damage + "</b><b> __h: </b><b class='heal'>" + heal + '</b>';
        }
        return '-';
    }
    ,T_Option: "<b> __use</b><input type='checkbox' class='sua_t' onchange='updateDisplay()'>"
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type =
            weapon === 'Hammer' ? '망치' :
            '';
        const skill =
            weapon === 'Hammer' ? '"스킬 데미지" _use "스킬 사용"' :
            '';
        return '수아 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" __h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "스킬 데미지" - "최대 데미지"\n' +
            'W: "스킬 데미지" __s: 쉴드량\n' +
            'E: "스킬 데미지" - "최대 데미지"\n' +
            'R: "오딧세이" / "파랑새" / "돈키호테"\n' +
            'D: ' + skill + '\n' +
            'T: "스킬 데미지" __h: "스킬 흡혈량"\n';
    }
    ,COMBO_VARS: '{\"qq\":false,\"rr\":0}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
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
        let shield = 0, c, ba;
        let qq = data.vars.qq, rr = data.vars.rr;
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
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        if (qq) {
                            damage += calcSkillDamage(character, enemy, 65 + q * 50, 1, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 45 + q * 30, 0.4, 1);
                        }
                        qq = true;
                        rr = 0;
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 25 + w * 25, 0.4, 1);
                        rr = 1;
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        if (qq) {
                            damage += calcSkillDamage(character, enemy, 120 + e * 40, 0.6, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 90 + e * 30, 0.4, 1);
                        }
                        qq = false;
                        rr = 2;
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        if (rr === 0) {
                            if (qq) {
                                damage += calcSkillDamage(character, enemy, 75 + r * 95, 0.6, 1);
                            } else {
                                damage += calcSkillDamage(character, enemy, 55 + r * 55, 0.4, 1);
                            }
                            qq = true;
                        } else if (rr === 1) {
                            damage += calcSkillDamage(character, enemy, 50 + r * 50, 0.4, 1);
                        } else if (rr === 2) {
                            if (qq) {
                                damage += calcSkillDamage(character, enemy, 250 + r * 150, 1, 1);
                            } else {
                                damage += calcSkillDamage(character, enemy, 100 + r * 60, 0.4, 1);
                            }
                            qq = false;
                        }
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Hammer') {
                            const dm = wm < 13 ? -0.2 : -0.35;
                            for (let x = index + 1; x <= index + (wm < 13 ? 10 : 14) && x < defense_minus.length; x++) {
                                defense_minus[x] = dm;
                            }
                            damage +=  calcSkillDamage(character, enemy, wm < 13 ? 150 + character.defense : 300 + character.defense * 2, 0, 1);
                        }
                    }
                } else if (c === 't' || c === 'T') {
                    ba = calcSkillDamage(character, enemy, 30 + t * 45 + character.defense * 0.6, 0.6, 1);
                    damage += ba;
                    heal += calcHeal(ba * 0.3, 1, enemy);
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
                qq: qq,
                rr: rr
            }
        };
    }
    ,COMBO_Option: 'wdqtrttqtetqt'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Hammer' ? 'd & D: 무스 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q & Q: Q스킬 데미지, 책갈피\n' +
            'w & W: W스킬 데미지\n' +
            'e & E: E스킬 데미지\n' +
            'r & R: R스킬 데미지\n' +
            't && T: 패시브 데미지\n' +
            d +
            'p & P: 트랩 데미지';
    }
};