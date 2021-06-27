'use strict';
const Luke = {
     Attack_Power: 28
    ,Attack_Power_Growth: 2.5
    ,Health: 750
    ,Health_Growth: 78
    ,Health_Regen: 1
    ,Health_Regen_Growth: 0.06
    ,Stamina: 420
    ,Stamina_Growth: 15
    ,Stamina_Regen: 1.9
    ,Stamina_Regen_Growth: 0.06
    ,Defense: 30
    ,Defense_Growth: 1.8
    ,Atk_Speed: 0.12
    ,Movement_Speed: 3.2
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Bat]
    ,correction: {
        Bat: [
            [0, 0, 0],
            [0, 0, -6]
        ]
    }
    ,Base_Attack: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex - 1;
            const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
            const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
            if (character.DIV.querySelector('.luke_w_u').checked && w >= 0) {
                const bonus = calcSkillDamage(character, enemy, 20 + w * 15, 0.2, 1);
                return "<b class='damage'>" + (damage + bonus) + '</b> ( ' +  min + ', ' + bonus + ' - ' + max + ', ' + bonus + ' ) ';
            }
            return "<b class='damage'>" + damage + '</b> ( ' +  min + ' - ' + max + ' )';
        }
        return '-';
    }
    ,Base_Attack_Option: ''
    ,DPS: (character, enemy) => {
        if (character.weapon) {
            const w = character.W_LEVEL.selectedIndex - 1;
            const ba = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
            const life = calcHeal(ba * (character.life_steal / 100), character.attack_speed, enemy);
            let damage;
            if (character.DIV.querySelector('.luke_w_u').checked && w >= 0) {
                const bonus = calcSkillDamage(character, enemy, 20 + w * 15, 0.2, 1);
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
        return "<b class='heal'>" + calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 2, enemy) + '</b>';
    }
    ,Q_Skill: (character, enemy) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        if (character.weapon && q >= 0) {
            const w = character.W_LEVEL.selectedIndex - 1;
            const damage1 = calcSkillDamage(character, enemy, 15 + q * 25, 0.5, 1);
            const damage2 = calcSkillDamage(character, enemy, 50 + q * 30, 1, 1);
            const cool = 10000 / ((16 - q * 2) * (100 - character.cooldown_reduction));
            let cd;
            if (character.DIV.querySelector('.luke_w').checked && w >= 0) {
                const cool2 = 10000 / ((18 - q * 2.5) * (100 - character.cooldown_reduction) / (1 + character.attack_speed * 0.5));
                cd = round((damage1 + damage2) * cool) / 100 + ' ~ ' + round((damage1 + damage2) * cool2) / 100;
            } else {
                cd = round((damage1 + damage2) * cool) / 100;
            }
            if (character.DIV.querySelector('.luke_q').checked) {
                const heal = calcHeal(calcSkillDamage(character, enemy, 50 + q * 30, 1, 1) * 0.8, 1, enemy);
                return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' + damage1 + ', ' + damage2 + " )</b><b> _h: </b><b class='heal'>" + heal + "</b><b> _sd/s: </b><b class='damage'>" + cd + '</b>';
            }
            return "<b class='damage'>" + (damage1 + damage2) + '</b> ( ' + damage1 + ', ' + damage2 + " )<b> _sd/s: </b><b class='damage'>" + cd + '</b>';
        }
        return '-';
    }
    ,Q_Option:  "<b> _up</b><input type='checkbox' class='luke_q' onchange='lukeUp(0)'/>"
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const damage = calcSkillDamage(character, enemy, 10 + w * 10, 0.2, 1);
            return "<b class='damage'>" + damage + '</b>';
        }
        return '-';
    }
    ,W_Option:  "<b> _up</b><input type='checkbox' class='luke_w' onchange='lukeUp(1)'/> _ " +
        "<input type='number' class='stack luke_w_s' value='0' onchange='fixLimitNum(this, 5)'><b>Stack _use</b>" +
        "<input type='checkbox' class='luke_w_u' onchange='updateDisplay()'>"
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const damage = calcSkillDamage(character, enemy, 60 + e * 30, 0.4, 1);
            const cool = 10000 / ((22 - e * 3) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + "</b><b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option:  "<b> _up</b><input type='checkbox' class='luke_e' onchange='lukeUp(2)'/>"
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const min = calcSkillDamage(character, enemy, 200 + r * 100, 0.75, 1);
            let max;
            if (enemy.max_hp) {
                const hp = enemy.max_hp;
                let start = 0, mid, end = floor(hp * 0.75) + 1, coe;
                while (start < end) {
                    mid = (start + end + 1) / 2;
                    coe = (mid * 100.0 / hp > 75 ? 75 : mid * 100.0 / hp) / 75 + 1;
                    max = calcSkillDamage(character, enemy, (200 + r * 100) * coe, 0.75 * coe, 1);
                    if (max + mid > hp) {
                        end = mid - 1;
                    } else {
                        start = mid;
                    }
                }
            } else {
                max = calcSkillDamage(character, enemy, 400 + r * 200, 1.5, 1);
            }
            return "<b class='damage'>" + min + ' ~ ' + max + '</b>';
        }
        return '-';
    }
    ,R_Option: "<b> _up</b><input type='checkbox' class='luke_r' onchange='lukeUp(3)'/>"
    ,D_Skill: (character, enemy) => {
        if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
            const type = character.weapon.Type;
            if (type === 'Bat') {
                return "<b class='damage'>" + calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 2 : 3, 1) + '</b>';
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
            let stack = parseInt(character.DIV.querySelector('.luke_t').value);
            stack = stack > 50 ? floor(stack / 10 - 5) : 0;
            const min = calcHeal(character.max_hp * ((t === 2 ? 0.01 : 0) + 0.05 + t * 0.03 + stack * 0.01), 1, enemy);
            const max = calcHeal(character.max_hp * (0.1 + t * 0.05 + stack * 0.01), 1, enemy);
            return "<b> _h: </b><b class='heal'> 0 ~ " + min + ' / ' + max + '</b>';
        }
        return ' - ';
    }
    ,T_Option: " _ <input type='number' class='stack luke_t' value='0' onchange='fixLimitNum(this, 150)'><b>Stack"
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
        if (character.DIV.querySelector('.luke_w_u').checked) {
            return '루크 ( ' + type + ' )\n' +
                'A: "평균 데미지" ( "평타 데미지", "강박증 데미지" - "치명타 데미지", "강박증 데미지" )\n' +
                'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
                'HPS: "초당 회복량"\n' +
                'Q: "합산 데미지" ( "1타 데미지", "2타 데미지" ) _h: "흡혈량" _up "스킬 강화"\n' +
                'W: "스킬 데미지" _up "스킬 강화" _ "스택" _use "스킬사용"\n' +
                'E: "스킬 데미지" _up "스킬 강화"\n' +
                'R: "최소 데미지" ~ "최대 막타 데미지" _up "스킬 강화"\n' +
                'D: ' + skill + '\n' +
                'T: _h: "회복량" _ "스택"\n';
        }
        return '루크 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "합산 데미지" ( "1타 데미지", "2타 데미지" ) _h: "흡혈량" _up "스킬 강화"\n' +
            'W: "스킬 데미지" _up "스킬 강화" _ "스택" _use "스킬사용"\n' +
            'E: "스킬 데미지" _up "스킬 강화"\n' +
            'R: "최소 데미지" ~ "최대 막타 데미지" _up "스킬 강화"\n' +
            'D: ' + skill + '\n' +
            'T: _h: "회복량" _ "스택"\n';
    }
    ,COMBO_VARS: '{\"qq\":false,\"ww\":0}'
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
        let qq = data.vars.qq, ww = data.vars.ww;

        let fi = character.weapon && character.weapon.Focused_Impact ? data.vars.fi || character.weapon.Focused_Impact * 2 : 0;
        let sm = data.vars.sm || 0;
        let sms = data.vars.sms || 0;
        if (character.weapon) {
            let ficri = character.weapon.Focused_Impact * 2 === fi;
            if (fi < character.weapon.Focused_Impact * 2) {
                fi--;
            }
            const type = character.weapon.Type;
            const bonus = calcSkillDamage(character, enemy, 10 + w * 10, 0.2, 1);
            if (ww) {
                ww--;
            }
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
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    if (w >= 0) {
                        if (ww) {
                            damage += bonus;
                        }
                    }
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
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                    if (w >= 0) {
                        if (ww) {
                            damage += bonus;
                        }
                    }
                } else if (c === 'q' || c === 'Q') {
                    if (q >= 0) {
                        if (qq) {
                            qq = false;
                            ba = calcSkillDamage(character, enemy, 50 + q * 30, 1, 1);
                            damage += ba;
                            if (character.DIV.querySelector('.luke_q').checked) {
                                heal += calcHeal(ba * 0.8, 1, enemy);
                            }
                        } else {
                            qq = true;
                            damage += calcSkillDamage(character, enemy, 15 + q * 25, 0.5, 1);
                        }
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        ww = 11;
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        damage += calcSkillDamage(character, enemy, 60 + e * 30, 0.4, 1);
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        let lost = enemy.max_hp ? floor((enemy.max_hp - (data.hp - damage + heal + shield)) * 100.0 / enemy.max_hp) : 0;
                        if (lost < 0) {
                            lost = 0;
                        }
                        const coe = enemy.max_hp ? (lost > 75 ? 75 : lost) / 75 + 1 : 2;
                        damage += calcSkillDamage(character, enemy, (200 + r * 100) * coe, 0.75 * coe, 1);
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Bat') {
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
                qq: qq,
                ww: ww,
            }
        };
    }
    ,COMBO_Option: 'qqwaaaaaadqerq'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Bat' ? 'd & D: D스킬 데미지\n' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q & Q: Q스킬 1타 데미지, 재사용시 2타 데미지 ( 쉴드 브레이크 적용 x )\n' +
            'w & W: W스킬 On\n' +
            'e & E: E스킬 데미지\n' +
            'r & R: R스킬 데미지( 잃은 체력 비례 Max 75% ? )\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};
