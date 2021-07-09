'use strict';
const Zahir = {
     Attack_Power: 25
    ,Attack_Power_Growth: 2.7 //
    ,Health: 680
    ,Health_Growth: 58
    ,Health_Regen: 0.6
    ,Health_Regen_Growth: 0.03
    ,Stamina: 400
    ,Stamina_Growth: 26
    ,Stamina_Regen: 2.4
    ,Stamina_Regen_Growth: 0.1
    ,Defense: 23
    ,Defense_Growth: 1.8
    ,Atk_Speed: 0.11
    ,Movement_Speed: 3.05
    ,Sight_Range: 8
    ,Attack_Range: 0.45
    ,weapons: [Throws, Shuriken]
    ,correction: {
        Throws: [
            [0, -10, -14],
            [0, 0, -3]
        ],
        Shuriken: [
            [0, -10, -12],
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
            const life = calcHeal(character, ba * (character.life_steal / 100), character.attack_speed, enemy);
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
            const w = character.W_LEVEL.selectedIndex - 1;
            const t = character.T_LEVEL.selectedIndex;
            const min = calcSkillDamage(character, enemy, 40 + q * 60, 0.5, 1);
            const max = calcSkillDamage(character, enemy, 100 + q * 50, 0.5, 1);
            const bonus = calcSkillDamage(character, enemy, 10 + t * 10, 0.15, 1);
            const ww = w >= 0 ? calcSkillDamage(character, enemy, 20 + w * 30, 0.3, 1) : 0;
            const cool = 10000 / ((8 - q * 0.5) * (100 - character.cooldown_reduction) + 20);
            return "<b class='damage'>" + min + ' - ' + (max + bonus)  + '</b> ( ' + max + ', ' + bonus + " )<b> _sd/s: </b><b class='damage'>" + round(((min + max) / 2 + bonus * 1.5 + ww * 2) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: " _ <input type='number' class='stack zahir_q' value='0' onchange='fixLimitNum(this, 7)'><b>Stack"
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const t = character.T_LEVEL.selectedIndex;
            const damage = calcSkillDamage(character, enemy, 20 + w * 30, 0.3, 1);
            const bonus = calcSkillDamage(character, enemy, 10 + t * 10, 0.15, 1);
            return "<b class='damage'>" + damage + ' - ' + (damage + bonus)  + '</b> ( ' + damage + ', ' + bonus + ' )';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const w = character.W_LEVEL.selectedIndex - 1;
            const t = character.T_LEVEL.selectedIndex;
            const damage = calcSkillDamage(character, enemy, 80 + e * 30, 0.5, 1);
            const bonus = calcSkillDamage(character, enemy, 10 + t * 10, 0.15, 1);
            const ww = w >= 0 ? calcSkillDamage(character, enemy, 20 + w * 30, 0.3, 1) : 0;
            const cool = 10000 / ((20 - e * 2) * (100 - character.cooldown_reduction) + 17);
            return "<b class='damage'>" + damage + ' - ' + (damage + bonus)  + '</b> ( ' + damage + ', ' + bonus + " )<b> _sd/s: </b><b class='damage'>" + round((damage + bonus * 1.5 + ww * 2) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const t = character.T_LEVEL.selectedIndex;
            const damage = calcSkillDamage(character, enemy, 50 + r * 90, 0.5, 1);
            const add = calcSkillDamage(character, enemy, 50 + r * 35, 0.65, 1);
            const bonus = calcSkillDamage(character, enemy, 10 + t * 10, 0.15, 1);
            return "<b class='damage'>" + (damage + add * 4) + ' - ' + (damage + bonus + add * 4) + '</b> ( ' + damage + ', ' + bonus + ', ' + add + ' x 4, )';
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
            const t = character.T_LEVEL.selectedIndex;
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 10 + t * 10, 0.15, 1) + '</b>';
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
            weapon === 'Shuriken' ? '암기' :
            '';
        const skill =
            weapon === 'Throws' ? '"데미지 없음"' :
            weapon === 'Shuriken' ? '"1타 데미지" ~ "합산 데미지" ( "1타 데미지", "추가 데미지" x "타수" )' :
            '';
        return '자히르 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "최소 데미지" - "합산 데미지" ( "강화 데미지", "패시브 데미지" ) _ "처치 수 차이"\n' +
            'W: "스킬 데미지" - "합산 데미지" ( "스킬 데미지", "패시브 데미지" )\n' +
            'E: "스킬 데미지" - "합산 데미지" ( "스킬 데미지", "패시브 데미지" )\n' +
            'R: "합산 데미지" - "강화 데미지" ( "1타 데미지", "패시브 데미지", "추가 데미지" x "타수" )\n' +
            'D: ' + skill + '\n' +
            'T: "스킬 데미지"\n';
    }
    ,COMBO_VARS: '{\"tt\":false}'
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
        let tt = data.vars.tt;

        let fi = character.weapon && character.weapon.Focused_Impact ? data.vars.fi || character.weapon.Focused_Impact * 2 : 0;
        let sm = data.vars.sm || 0;
        let sms = data.vars.sms || 0;
        let sws = character.accessory && character.accessory.Swift_Strides[1] ? data.vars.sws || character.accessory.Swift_Strides[1] : 0;
        if (character.weapon) {
            let ficri = character.weapon.Focused_Impact * 2 === fi;
            if (fi < character.weapon.Focused_Impact * 2) {
                fi--;
            }
            const type = character.weapon.Type;
            const bonus = calcSkillDamage(character, enemy, 10 + t * 10, 0.15, 1);
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
                if (c === 'a') {
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
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
                    damage += ba;
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        if (tt) {
                            tt = false;
                            const dm = -0.1;
                            for (let x = index + 1; x <= index + 4 && x < defense_minus.length; x++) {
                                defense_minus[x] = dm;
                            }
                            damage += calcSkillDamage(character, enemy, 100 + q * 50, 0.5, 1) + bonus;
                        } else {
                            tt = true;
                            damage += calcSkillDamage(character, enemy, 40 + q * 60, 0.5, 1);
                        }
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        damage += calcSkillDamage(character, enemy, 20 + w * 30, 0.3, 1);
                        if (tt) {
                            tt = false;
                            damage += bonus;
                        } else {
                            tt = true;
                        }
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        damage += calcSkillDamage(character, enemy, 80 + e * 30, 0.5, 1);
                        if (tt) {
                            tt = false;
                            damage += bonus;
                        } else {
                            tt = true;
                        }
                    }
                } else if (c === 'r') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 50 + r * 35, 0.65, 1);
                        if (!tt) {
                            tt = true;
                        }
                    }
                } else if (c === 'R') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 50 + r * 90, 0.5, 1);
                        if (tt) {
                            tt = false;
                            damage += bonus;
                        } else {
                            tt = true;
                        }
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
                tt: tt
            }
        };
    }
    ,COMBO_Option: 'qawweRwawwawq'
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
            'q & Q: Q스킬 데미지, 패시브 발동\n' +
            'w & W: W스킬 데미지, 패시브 발동\n' +
            'e & E: E스킬 1타 데미지, 재사용시 2타 데미지, 패시브 발동\n' +
            'r: R스킬 추가타 데미지, 패시브 발동\n' +
            'R: R스킬 첫타 데미지, 패시브 발동\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};