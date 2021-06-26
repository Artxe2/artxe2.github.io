'use strict';
const Adriana = {
     Attack_Power: 28
    ,Attack_Power_Growth: 3.2
    ,Health: 690
    ,Health_Growth: 59
    ,Health_Regen: 0.5
    ,Health_Regen_Growth: 0.03
    ,Stamina: 480
    ,Stamina_Growth: 9
    ,Stamina_Regen: 1
    ,Stamina_Regen_Growth: 0.01
    ,Defense: 29
    ,Defense_Growth: 2
    ,Atk_Speed: 0.04
    ,Movement_Speed: 3.05
    ,Sight_Range: 8
    ,Attack_Range: 0.4
    ,weapons: [Throws]
    ,correction: {
        Throws: [
            [0, -13, -18],
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
            const damage = calcTrueDamage(character, enemy, 16 + q * 2 + character.attack_power * (0.1 + q * 0.05));
            const cool = 10000 / ((7 - q * 0.5) * (100 - character.cooldown_reduction) + 200);
            return "<b class='damage'>" + damage + ' ~ ' + damage * 9 + '</b> ( ' + damage + " x 9 )<b> _sd/s: </b><b class='damage'>" + round(damage * 9 * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const t = character.T_LEVEL.selectedIndex;
            const damage1 = calcSkillDamage(character, enemy, 4 + t * 3, 0.15, 1);
            let damage2 = damage1;
            for (let i = 1; i < 9; i++) {
                damage2 += calcSkillDamage(character, enemy, (4 + t * 3) * (1 + i * 0.2), 0.15 * (1 + i * 0.2), 1);
            }
            return "<b class='damage'>" + damage1 + ' ~ ' + damage2 + '</b> ( ' + damage1 + ' x 9 )';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const damage = calcSkillDamage(character, enemy, 70 + r * 60, 0.4, 1);
            const cool = 10000 / ((40 - r * 8) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + damage + ' - ' + damage * 3 + '</b> ( ' + damage + " x 3 )<b> _sd/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
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
            const as = 100 / 0.56;
            const min = round(calcSkillDamage(character, enemy, 4 + t * 4, 0.2, 1) * as) / 100;
            const max = round(calcSkillDamage(character, enemy, (4 + t * 4) * 3, 0.2 * 3, 1) * as) / 100;
            return "<b> _d/s: </b><b class='damage'>" +  + min + ' ~ ' + max + '</b>';
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
        return '아드리아나 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "최소 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "틱당 데미지" ~ "풀히트 데미지" ( "틱당 데미지" x "타수" )\n' +
            'W: "데미지 없음"\n' +
            'E: "틱당 데미지" ~ "풀히트 데미지" ( "최소 데미지" x "타수" )\n' +
            'R: "1발당 데미지" - "3 회 사용 시 데미지" ( "1발당 데미지" x "장전 수" )\n' +
            'D: ' + skill + '\n' +
            'T: _d/s: "최초 초당 데미지" ~ "최대중첩 시 초당 데미지"\n';
    }
    ,COMBO_VARS: '{\"ww\":0,\"f\":false,\"td\":0,\"tt\":0}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const t = character.T_LEVEL.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        const auto_cri = character.AUTO_CRI.checked;
        let damage = 0;
        let heal = calcHeal(character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let ww = data.vars.ww, f = data.vars.f, td = data.vars.td, tt = data.vars.tt;

        let fi = character.weapon && character.weapon.Focused_Impact ? data.vars.fi || character.weapon.Focused_Impact * 2 : 0 ;
        if (character.weapon) {
            let ficri = character.weapon.Focused_Impact * 2 === fi;
            if (fi < character.weapon.Focused_Impact * 2) {
                fi--;
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
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 0, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'A') {
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, ficri ? 100 : auto_cri ? character.critical_strike_chance : 100, 1);
                    damage += ba;
                    heal += calcHeal(ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q') {
                    if (q >= 0) {
                        td = 0;
                        damage += calcTrueDamage(character, enemy, 16 + q * 2 + character.attack_power * (0.1 + q * 0.05)) * 5;
                        if (ww) {
                            damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                            td++;
                            ww--;
                            tt = 1;
                            while (tt >= 0.56) {
                                damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                                if (td < 10) {
                                    td++;
                                }
                                tt -= 0.56;
                            }
                            f = true;
                        } else {
                            f = false;
                            tt = 0;
                        }
                    }
                } else if (c === 'Q') {
                    if (q >= 0) {
                        damage += calcTrueDamage(character, enemy, 16 + q * 2 + character.attack_power * (0.1 + q * 0.05)) * 9;
                        if (ww) {
                            if (!tt) {
                                damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                                if (td < 10) {
                                    td++;
                                }
                            }
                            ww--;
                            tt++;
                            while (tt >= 0.56) {
                                damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                                if (td < 10) {
                                    td++;
                                }
                                tt -= 0.56;
                            }
                            f = true;
                        } else {
                            f = false;
                            tt = 0;
                        }
                    }
                } else if (c === 'w') {
                    if (w >= 0) {
                        td = 0;
                        if (f) {
                            damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                            td++;
                            ww = 4;
                            tt = 1;
                            while (tt >= 0.56) {
                                damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                                if (td < 10) {
                                    td++;
                                }
                                tt -= 0.56;
                            }
                        } else {
                            ww = 5;
                            tt = 0;
                        }
                    }
                } else if (c === 'W') {
                    if (w >= 0) {
                        if (f) {
                            if (!tt) {
                                damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                                if (td < 10) {
                                    td++;
                                }
                            }
                            ww = 4;
                            tt++;
                            while (tt >= 0.56) {
                                damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1)
                                if (td < 10) {
                                    td++;
                                }
                                tt -= 0.56;
                            }
                        } else {
                            ww = 5;
                            td = 0;
                            tt = 0;
                        }
                    }
                } else if (c === 'e') {
                    if (e >= 0) {
                        td = 0;
                        damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                        td++;
                        if (ww) {
                            ww--;
                        }
                        tt = 1;
                        while (tt >= 0.56) {
                            tt -= 0.56;
                            damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                            if (td < 10) {
                                td++;
                            }
                        }
                        f = true;
                    }
                } else if (c === 'E') {
                    if (e >= 0) {
                        if (!tt) {
                            damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                            if (td < 10) {
                                td++;
                            }
                        }
                        if (ww) {
                            ww--;
                        }
                        tt++;
                        while (tt >= 0.56) {
                            damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                            if (td < 10) {
                                td++;
                            }
                            tt -= 0.56;
                        }
                        f = true;
                    }
                } else if (c === 'r') {
                    if (r >= 0) {
                        td = 0;
                        damage += calcSkillDamage(character, enemy, 70 + r * 60, 0.4, 1);
                        damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                        td++;
                        if (ww) {
                            ww--;
                            tt = 1;
                            while (tt >= 0.56) {
                                tt -= 0.56;
                                damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                                if (td < 10) {
                                    td++;
                                }
                            }
                        } else {
                            tt = 0;
                        }
                        f = true;
                    }
                } else if (c === 'R') {
                    if (r >= 0) {
                        damage += calcSkillDamage(character, enemy, 70 + r * 60, 0.4, 1);
                        if (!tt) {
                            damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                            if (td < 10) {
                                td++;
                            }
                        }
                        if (ww) {
                            ww--;
                            tt++;
                            while (tt >= 0.56) {
                                tt -= 0.56;
                                damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                                if (td < 10) {
                                    td++;
                                }
                            }
                        } else {
                            tt = 0;
                        }
                        f = true;
                    }
                } else if (c === 't') {
                    td = 0;
                    damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                    td++;
                    if (ww) {
                        ww--;
                    }
                    tt = 1;
                    while (tt >= 0.56) {
                        tt -= 0.56;
                        damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                        if (td < 10) {
                            td++;
                        }
                    }
                } else if (c === 'T') {
                    if (!tt) {
                        damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                        if (td < 10) {
                            td++;
                        }
                    }
                    if (ww) {
                        ww--;
                    }
                    tt++;
                    while (tt >= 0.56) {
                        damage += calcSkillDamage(character, enemy, (4 + t * 4) * (1 + td * 0.2), 0.2 * (1 + td * 0.2), 1);
                        if (td < 10) {
                            td++;
                        }
                        tt -= 0.56;
                    }
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
                ww: ww,
                f: f,
                td: td,
                tt: tt
            }
        };
    }
    ,COMBO_Option: 'awQRawTaRa'
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
            'q: Q스킬을 1초간 히트시켰을 시 데미지,\n&nbsp;&nbsp;&nbsp;&nbsp;패시브 스택이 초기화되며 w가 깔려있을 경우 1초간 패시브 데미지\n' +
            'Q: Q스킬을 2초간 히트시켰을 시 데미지,\n&nbsp;&nbsp;&nbsp;&nbsp;W가 깔려있을 경우 1초간 패시브 데미지\n' +
            'w: 다음 5회 스킬에 패시브 데미지 추가,\n&nbsp;&nbsp;&nbsp;&nbsp;R 또는 E스킬 이후에 사용시 패시브 스택이 초기화되며 1초간 패시브 데미지\n' +
            'W: 다음 5회 스킬에 패시브 데미지 추가,\n&nbsp;&nbsp;&nbsp;&nbsp;R 또는 E스킬 이후에 사용시 1초간 패시브 데미지\n' +
            'e: 패시브 스택이 초기화되며 1초간 패시브 데미지\n' +
            'E: 1초간 패시브 데미지\n' +
            'r: R스킬 데미지, 패시브 스택이 초기화되며 1회 패시브 데미지,\n&nbsp;&nbsp;&nbsp;&nbsp;W가 깔려있을 경우 1초간 패시브 데미지\n' +
            'R: 1초간 패시브 데미지, 1회 패시브 데미지,\n&nbsp;&nbsp;&nbsp;&nbsp;W가 깔려있을 경우 1초간 패시브 데미지\n' +
            't: 패시브 스택이 초기화되며 1초간 패시브 데미지\n' +
            'T: 1초간 패시브 데미지\n' +
            d +
            'p & P: 트랩 데미지';
    }
};