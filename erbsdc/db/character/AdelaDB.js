'use strict';
const Adela = {
     Attack_Power: 34
    ,Attack_Power_Growth: 3.6
    ,Health: 670
    ,Health_Growth: 72
    ,Health_Regen: 0.6
    ,Health_Regen_Growth: 0.06
    ,Stamina: 500
    ,Stamina_Growth: 26
    ,Stamina_Regen: 2
    ,Stamina_Regen_Growth: 0.08
    ,Defense: 28
    ,Defense_Growth: 2.2
    ,Atk_Speed: 0.045 //
    ,Movement_Speed: 3.05
    ,Sight_Range: 8
    ,Attack_Range: 2.9
    ,weapons: [Rapier]
    ,correction: {
        Rapier: [
            [0, -7, -9],
            [0, 2, 0]
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
            const min = calcSkillDamage(character, enemy, 30 + q * 30, 0.65, 1);
            const max = calcSkillDamage(character, enemy, 40 + q * 30, 1, 1);
            const cool = 100 / (4 - q * 0.5);
            return "<b class='damage'>" + min + ' - ' + max  + "</b><b> _sd/s: </b><b class='damage'>" + round(min * cool) / 100 + ' ~ ' + round(max * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,Q_Option: ''
    ,W_Skill: (character, enemy) => {
        const w = character.W_LEVEL.selectedIndex - 1;
        if (character.weapon && w >= 0) {
            const q = character.Q_LEVEL.selectedIndex - 1;
            const damage = calcSkillDamage(character, enemy, 45 + w * 45, 0.3, 1);
            const bonus = calcSkillDamage(character, enemy, (30 + q * 40) * 0.5, 0.6 * 0.5, 1);
            const cool = 10000 / ((18 - w * 2) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + (damage + bonus) + "</b> ( <b class='damage'>" + damage + '</b>, ' + bonus + " )<b> _sd/s: </b><b class='damage'>" + round((damage + bonus) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,W_Option: ''
    ,E_Skill: (character, enemy) => {
        const e = character.E_LEVEL.selectedIndex - 1;
        if (character.weapon && e >= 0) {
            const q = character.Q_LEVEL.selectedIndex - 1;
            const damage = calcSkillDamage(character, enemy, 65 + e * 45, 0.4, 1);
            const bonus = calcSkillDamage(character, enemy, (30 + q * 40) * 0.5, 0.6 * 0.5, 1);
            const cool = 10000 / ((20 - e * 2) * (100 - character.cooldown_reduction));
            return "<b class='damage'>" + (damage + bonus) + "</b> ( <b class='damage'>" + damage + '</b>, ' + bonus + " )<b> _sd/s: </b><b class='damage'>" + round((damage + bonus) * cool) / 100 + '</b>';
        }
        return '-';
    }
    ,E_Option: ''
    ,R_Skill: (character, enemy) => {
        const r = character.R_LEVEL.selectedIndex - 1;
        if (character.weapon && r >= 0) {
            const min = calcSkillDamage(character, enemy, 100 + r * 100, 0.5, 1);
            const max = calcSkillDamage(character, enemy, 100 + r * 100 + (enemy.max_hp ? enemy.max_hp * 0.18 : 0), 0.5, 1);
            return "<b class='damage'>" + min + ' ~ ' + max + '</b>';
        }
        return '-';
    }
    ,R_Option: ''
    ,D_Skill: (character, enemy) => {
        const wm = character.WEAPON_MASTERY.selectedIndex;
        if (character.weapon && wm > 5) {
            const type = character.weapon.Type;
            if (type === 'Rapier') {
                const damage = calcSkillDamage(character, enemy, 0,
                    1.75 + (character.critical_damage - (!enemy.critical_damage_reduction ? 0 : enemy.critical_damage_reduction)) / 100, 1);
                const cool = 10000 / ((wm < 13 ? 30 : 18) * (100 - character.cooldown_reduction));
                return "<b class='damage'>" + damage + "</b><b> _d/s: </b><b class='damage'>" + round(damage * cool) / 100 + '</b>';
            }
        }
        return '-';
    }
    ,D_Option: (character, enemy) => {
        return '';
    }
    ,T_Skill: (character, enemy) => {
        if (character.weapon) {
            return "<b class='damage'>" + calcSkillDamage(character, enemy, 10 + character.T_LEVEL.selectedIndex * 25, 0.3, 1) + '</b>';
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
            weapon === 'Rapier' ? '레이피어' :
            '';
        const skill =
            weapon === 'Rapier' ? '"스킬 데미지"' :
            '';
        return '아델라 ( ' + type + ' )\n' +
            'A: "평균 데미지" ( "평타 데미지" - "치명타 데미지" )\n' +
            'DPS: "초당 데미지" _h/s: "초당 흡혈량"\n' +
            'HPS: "초당 회복량"\n' +
            'Q: "폰 데미지" - "퀸 데미지"\n' +
            'W: "합산 데미지" ( "나이트 데미지", "폰 데미지" )\n' +
            'E: "합산 데미지" ( "룩 데미지", "폰 데미지" )\n' +
            'R: "최소 데미지" ~ "최대 데미지"\n' +
            'D: ' + skill + '\n' +
            'T: "스킬 데미지"\n';
    }
    ,COMBO_VARS: '{\"qq\":false,\"qqq\":false,\"qw\":false,\"qe\":false,\"ww\":0,\"ee\":0}'
    ,COMBO: (character, enemy, data, combo, index, de_bonus, de_percent, defense_bonus, defense_percent, defense_minus) => {
        const q = character.Q_LEVEL.selectedIndex - 1;
        const w = character.W_LEVEL.selectedIndex - 1;
        const e = character.E_LEVEL.selectedIndex - 1;
        const r = character.R_LEVEL.selectedIndex - 1;
        const wm = character.WEAPON_MASTERY.selectedIndex;
        const et = enemy.T_LEVEL.selectedIndex;
        const auto_cri = character.AUTO_CRI.checked;
        let damage = 0;
        let throns = 0;
        let heal = calcHeal(character, character.hp_regen * (character.hp_regen_percent + 100) / 100 +
            (character.food ? character.food.HP_Regen / 30 : 0), 1, enemy);
        let shield = 0, c, ba;
        let qq = data.vars.qq, qqq = data.vars.qqq, qw = data.vars.qw, qe = data.vars.qe, ww = data.vars.ww, ee = data.vars.ee;

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
                    const crit = ficri ? 100 : auto_cri ? character.critical_strike_chance : c === 'a' ? 0 : 100;
                    if (character.weapon.Smolder && sm < 4) {
                        sm++;
                        sms = 8;
                    }
                    if (fi === character.weapon.Focused_Impact * 2) {
                        fi--;
                    }
                    ba = baseAttackDamage(character, enemy, 0, 1, crit, 1);
                    if (sws) {
                        damage += calcItemDamage(character, enemy, character.accessory.Swift_Strides[0] * round(sws / character.accessory.Swift_Strides[1], 2));
                        sws = 0.0001;
                    }
                    damage += ba;
                    if (enemy.head && enemy.head.Throns) {
                        throns += floor(ba * 0.07);
                    }
                    heal += calcHeal(character, ba * (character.life_steal / 100), 1, enemy);
                } else if (c === 'q') {
                    if (q >= 0) {
                        if (qq < 4) {
                            qq++;
                        }
                        damage += calcSkillDamage(character, enemy, 40 + q * 30, 1, 1);
                        qqq = false;
                        qw = true;
                        qe = true;
                    }
                } else if (c === 'Q') {
                    if (q >= 0) {
                        if (qq < 4) {
                            qq++;
                        }
                        damage += calcSkillDamage(character, enemy, 40 + q * 30, 1, 1);
                        qqq = true;
                        qw = true;
                        qe = true;
                    }
                } else if (c === 'w' || c === 'W') {
                    if (w >= 0) {
                        if (qw) {
                            if (qqq) {
                                damage += calcSkillDamage(character, enemy, (40 + q * 30) * 0.5, 1 * 0.5, 1);
                            } else {
                                damage += calcSkillDamage(character, enemy, (30 + q * 30) * 0.5, 0.6 * 0.5, 1);
                            }
                            qw = false;
                        }
                        if (ee > 1) {
                            ee = 1;
                            damage += calcSkillDamage(character, enemy, (65 + e * 45) * 0.5, 0.4 * 0.5, 1);
                        }
                        ww = 2;
                        damage += calcSkillDamage(character, enemy, 45 + w * 45, 0.3, 1);
                    }
                } else if (c === 'e' || c === 'E') {
                    if (e >= 0) {
                        if (qe) {
                            if (qqq) {
                                damage += calcSkillDamage(character, enemy, (40 + q * 30) * 0.5, 1 * 0.5, 1);
                            } else {
                                damage += calcSkillDamage(character, enemy, (30 + q * 30) * 0.5, 0.6 * 0.5, 1);
                            }
                            qe = false;
                        }
                        if (ww > 1) {
                            ww = 1;
                            damage += calcSkillDamage(character, enemy, (45 + w * 45) * 0.5, 0.3 * 0.5, 1);
                        }
                        ee = 2;
                        damage += calcSkillDamage(character, enemy, 65 + e * 45, 0.4, 1);
                    }
                } else if (c === 'r' || c === 'R') {
                    if (r >= 0) {
                        let ea = qq;
                        if (ww) {
                            ea++;
                        }
                        if (ee) {
                            ea++;
                        }
                        damage += calcSkillDamage(character, enemy, 100 + r * 100 + (enemy.max_hp ? enemy.max_hp * 0.03 * ea : 0), 0.5, 1);
                    }
                } else if (c === 'd' || c === 'D') {
                    if (wm > 5) {
                        if (type === 'Rapier') {
                            damage += calcSkillDamage(character, enemy, 0,
                                1.75 + (character.critical_damage - (!enemy.critical_damage_reduction ? 0 : enemy.critical_damage_reduction)) / 100, 1);
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
            throns: throns,
            heal: heal,
            shield: shield,
            vars: {
                fi: fi,
                sm: sm,
                sms: sms,
                sws: sws,
                qq: qq,
                qqq: qqq,
                qw: qw,
                qe: qe,
                ww: ww,
                ee: ee
            }
        };
    }
    ,COMBO_Option: 'aQweaaqdrqa'
    ,COMBO_Help: (character) => {
        if (!character.character) {
            return 'select character plz';
        }
        if (!character.weapon) {
            return 'select weapon plz';
        }
        const weapon = character.weapon.Type;
        const d =
            weapon === 'Rapier' ? '"스킬 데미지"' :
            '';
        return 'a: 기본공격 데미지\n' +
            'A: 치명타 데미지\n' +
            'q & Q: Q스킬 폰 데미지\n' +
            'Q: Q스킬 퀸 데미지\n' +
            'w & W: W스킬 데미지, 쿠션 데미지\n' +
            'e & E: E스킬 데미지, 쿠션 데미지\n' +
            'r & R: R스킬 데미지\n' +
            't & T: 데미지 없음\n' +
            d +
            'p & P: 트랩 데미지';
    }
};