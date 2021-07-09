'use strict';
const Barbara = {
     Attack_Power: 18
    ,Attack_Power_Growth: 1.7
    ,Health: 620
    ,Health_Growth: 68
    ,Health_Regen: 0.4
    ,Health_Regen_Growth: 0.03
    ,Stamina: 390
    ,Stamina_Growth: 17
    ,Stamina_Regen: 2
    ,Stamina_Regen_Growth: 0.04
    ,Defense: 21
    ,Defense_Growth: 1.9
    ,Atk_Speed: 0.04
    ,Movement_Speed: 3.05
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Bat]
    ,correction: {
        Bat: [
            [0, -6, -9],
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
            const r = character.R_LEVEL.selectedIndex - 1
            const t = character.T_LEVEL.selectedIndex;
            const level = character.LEVEL.selectedIndex + 1;
            const stack = parseInt(character.DIV.querySelector('.barbara_t').value);
            const damage = calcSkillDamage(character, enemy, 15 + q * 15, 0.15, 1) +
                (r >= 0 && character.DIV.querySelector('.barbara_r').checked ? calcSkillDamage(character, enemy, 50 + r * 25, 0.6, 1) : 0);
            const shot = calcSkillDamage(character, enemy, 15, 0.06 * level, 1);
            return "<b class='damage'>" + damage + "</b><b> _dps: </b><b class='damage'>" + shot * (0.9 + stack * (0.15 + t * 0.05)) + '</b> ( ' + shot + ' )';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const r = character.R_LEVEL.selectedIndex - 1;
            const level = character.LEVEL.selectedIndex + 1;
            const coe = r >= 0 && character.DIV.querySelector('.barbara_r').checked ? 1.05 + r * 0.05 : 1;
            const min = calcSkillDamage(character, enemy, (30 + w * 30) * 0.6 * coe, 0.25 * 0.6 * coe, 1);
            const max = calcSkillDamage(character, enemy, (30 + w * 30) * coe, 0.25 * coe, 1);
            const rail = calcSkillDamage(character, enemy, (40 + w * 40 + 6) * coe, (0.06 * level) * 0.4 * coe, 1);
            const cool = 10000 / ((r >= 0 && character.DIV.querySelector('.barbara_r').checked ? 0.66 : 4) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + max + ' - ' + min * 2 + "</b><b> / </b><b class='damage'>" + rail + "</b><b> _sd/s: </b><b class='damage'>" + round(rail * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const r = character.R_LEVEL.selectedIndex - 1;
            const rr = r >= 0 && character.DIV.querySelector('.barbara_r').checked;
            const coe = rr ? 0.5 + r * 0.05 : 0.3;
            const damage = calcSkillDamage(character, enemy, 60 + e * 20, 0.35, 1);
            const bonus = calcTrueDamage(character, enemy, (e < 2 ? 1 : 0) + 4 + e * 3 + character.attack_power * 0.05 +
                (enemy.max_hp ? enemy.max_hp * (0.005 + e * 0.005) : 0));
            const min = floor((damage + bonus) * coe);
            const max = floor((damage + bonus * (rr ? 10 : 8)) * coe);
            return "<b class='damage'>" + damage + ' ~ ' + bonus * (rr ? 10 : 8) + "</b><b> _dps: </b><b class='damage'>" + bonus * 2 + "</b><b> _s: </b><b class='shield'>" + min + ' - ' + max + '</b>';
        }
        return '-';
    }
    ,E_Option: "<b> _use</b><input type='checkbox' class='barbara_e' onchange='updateDisplay()'>"
    ,R_Skill: (character, enemy) => {
        return '-';
    }
    ,R_Option: "<b> _use</b><input type='checkbox' class='barbara_r' onchange='updateDisplay()'>"
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Hammer') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 150 + character.defense : 300 + character.defense * 2, 0, 1) + '</b>';
            }
            if (type === 'Bat') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 2 : 3, 1) + '</b>';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return !character.weapon || character.weapon.Type !== 'Hammer' ? '' :
            "<b> _use</b><input type='checkbox' class='hammer_d' onchange='updateDisplay()'>";
    }
    ,T_Skill: (character, enemy) => {
        return '-';
    }
    ,T_Option: " _ <input type='number' class='stack barbara_t' value='0' onchange='fixLimitNum(this, 3)'><b>Stack"
    ,Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const type =
            weapon === 'Bat' ? '방망이' :
            '';
        const skill =
            weapon === 'Bat' ? '"스킬 데미지"' :
            '';
        return '바바라 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "스킬 데미지" _dps: "포탑 DPS" ( "포탑 데미지" )\n' +
            'W: "스킬 데미지" - "합산 데미지" / "레이저 데미지"\n' +
            'E: "스킬 데미지" _dps: "초당 데미지" _s: "최소 쉴드량" - "최대 쉴드량" _use "스킬 사용"\n' +
            'R: _use "스킬 사용"\n' +
            'D: ' + skill + '\n' +
            'T: "데미지 없음" _ "스택"\n';
    }
    ,COMBO_VARS: '{\"ww\":0,\"rr\":false}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        const level = character.LEVEL.selectedIndex + 1;
        const auto_cri = character.AUTO_CRI.checked;
        let damage = 0;
        let heal = calcHeal(character, character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let ww = data.vars.ww, rr = data.vars.rr;

        const cool = (20 - e * 2) * (100 - character.cooldown_reduction) / 100 + 4;
        if (index === 0 || floor(index / 2 / cool) > floor((index - 1) / 2 / cool)) {
            shield += floor(calcSkillDamage(character, enemy, 60 + e * 20, 0.35, 1) * 0.3 +
                calcTrueDamage(character, enemy, (e < 2 ? 1 : 0) + 4 + e * 3 + character.attack_power * 0.05 +
                    (enemy.max_hp ? enemy.max_hp * (0.005 + e * 0.005) : 0)) * 8 * 0.3);
        }

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
            }
            const type = character.weapon.Type;
            const coe = 1.05 + r * 0.05;
            for (let i = 0; i < combo.length; i++) {
                c = combo.charAt(i);
                if (ww) {
                    ww--;
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
                if (c === 'a' || c === 'A') {
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : c === 'a' ? 0 : 100, 1);
                    damage += ba;
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q') {
                    if (q >= 0) {
                        if (w >= 0 && ww) {
                            damage += calcSkillDamage(character, enemy, (40 + w * 40) * coe, 0.5 * coe, 1);
                        } else {
                            damage += calcSkillDamage(character, enemy, 15, 0.06 * level, 1);
                        }
                    }
                } else if (c === 'Q') {
                    if (q >= 0) {
                        damage += calcSkillDamage(character, enemy, 15 + q * 15, 0.15, 1);
                        if (r >= 0 && rr) {
                            rr = false;
                            damage += calcSkillDamage(character, enemy, 50 + r * 25, 0.6, 1);
                        }
                    }
                } else if (c === 'w') {
                    if (w >= 0) {
                        if (r >= 0 && rr) {
                            rr = false;
                            ww = 15;
                        } else {
                            damage += calcSkillDamage(character, enemy, (30 + w * 30) * 0.6 * (ww ? coe : 1), 0.25 * 0.6 * (ww ? coe : 1), 1) * 2;
                        }
                    }
                } else if (c === 'W') {
                    if (w >= 0) {
                        if (r >= 0 && rr) {
                            rr = false;
                            ww = 15;
                        } else {
                            damage += calcSkillDamage(character, enemy, (40 + w * 40 + 6) * (ww ? coe : 1), (0.06 * level) * 0.4 * (ww ? coe : 1), 1);
                        }
                    }
                } else if (c === 'e') {
                    if (e >= 0) {
                        damage += calcTrueDamage(character, enemy, (e < 2 ? 1 : 0) + 5 + e * 3 + character.attack_power * 0.05 +
                            (enemy.max_hp ? enemy.max_hp * (0.005 + e * 0.005) : 0));
                    }
                } else if (c === 'E') {
                    if (e >= 0) {
                        damage += calcSkillDamage(character, enemy, 60 + e * 20, 0.35, 1);
                        if (r >= 0 && rr) {
                            rr = false;
                        }
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        rr = !rr;
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Hammer') {
                            const dm = wm < 13 ? -0.2 : -0.35;
                            for (let x = index + 1; x <= index + (wm < 13 ? 10 : 14) && x < defense_minus.length; x++) {
                                defense_minus[x] = dm;
                            }
                            damage +=  calcSkillDamage(character, enemy, wm < 13 ? 150 + character.defense : 300 + character.defense * 2, 0, 1);
                        } else if (type === 'Bat') {
                            damage += calcSkillDamage(character, enemy, 0, wm < 13 ? 2 : 3, 1);
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
                ww: ww,
                rr: rr
            }
        };
    }
    ,COMBO_Option: 'QwWerwedwWewWewWEwWewWewWewWEwW'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Bat' ? 'd & D: 무스 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q: Q스킬 포탑 데미지\n' +
            'Q: Q스킬 설치 데미지, 궁 소모\n' +
            'w: W스킬 직격 데미지, 궁 소모\n' +
            'W: W스킬 레일건 데미지, 궁 소모\n' +
            'e: E스킬 1초간 도트 데미지\n' +
            'E: E스킬 폭발 데미지, 궁 소모\n' +
            'r & R: R스킬 On / Off\n' +
            't && T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};