'use strict';
const characters = [];
document.addEventListener('DOMContentLoaded', (e) => {
    characters.push(
        new Character(characters.length, document.querySelector('#character' + characters.length), document.querySelector('#mode'))
    );
    characters.push(
        new Character(characters.length, document.querySelector('#character' + characters.length), document.querySelector('#mode'))
    );
    characters[0].setEnemy(characters[1]);
    characters[1].setEnemy(characters[0]);
    const basePreset = [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 3, 4, 0, 2, 3, 2, 1, 1, 3, 0, 2, 1, 1, 0, 0 ],
        [ 6, 4, 2, 8, 4, 7, 2, 2, 6, 0, 3, 1, 1, 1, 1 ],
        [ 10, 7, 6, 10, 7, 8, 6, 7, 6, 0, 5, 1, 1, 2, 2 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 16, 14, 17, 12, 12, 17, 12, 12, 7, 1, 5, 2, 5, 3, 2 ],
        [ 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 5, 5, 5, 3, 2 ],
    ]
    for (let i = 0; i < 10; i++) {
        const preset = getCookie('preset' + i);
        if (!preset) {
            setCookie('preset' + i, JSON.stringify(basePreset[i]), 7);
        }
    }
    let  last = getCookie('lastPreset');
    if (!last) {
        characters[0].setPreset(basePreset[0]);
        characters[1].setPreset(basePreset[0]);
    } else {
        characters[0].PRESET.selectedIndex = last;
        characters[1].PRESET.selectedIndex = last;
        characters[0].setPreset(JSON.parse(decodeURIComponent(getCookie('preset' + last))));
        characters[1].setPreset(JSON.parse(decodeURIComponent(getCookie('preset' + last))));
    }
});

function baseAttackDamage(character, enemy, base, coe, cri, onhit) {
    return floor((((base + character.attack_power * coe) * (1 + cri / 100 * (0.75 + (character.critical_damage - (!enemy.critical_damage_reduction ? 0 : enemy.critical_damage_reduction)) / 100)) / (1 + (!enemy.defense ? 0 : enemy.defense / 100)) *
        (1 + (character.extra_normal_attack_damage_percent - (!enemy.normal_attack_damage_reduction_percent ? 0 : enemy.normal_attack_damage_reduction_percent)) / 100)) +
        (character.extra_normal_attack_damage - (!enemy.normal_attack_damage_reduction ? 0 : enemy.normal_attack_damage_reduction)) * onhit) *
        (1 + (character.weapon ? character.character.correction[character.weapon.Type][0][character.MODE.selectedIndex] / 100 : 0)) *
        (1 + (enemy.weapon ? enemy.character.correction[enemy.weapon.Type][1][enemy.MODE.selectedIndex] / 100 : 0)));
}

function calcAttackSpeed(character, bonusAs) {
    return round((character.character.Atk_Speed + character.weapon_attack_speed) *
        (100 + bonusAs + calcEquip(character, 'Attack_Speed') + (!character.weapon ? 0 : (1 + character.WEAPON_MASTERY.selectedIndex) * character.weapon_mastery_attack_speed))) / 100;
}

function calcEquip(character, name, n) {
    let coe = 1.007 + character.CRAFT_MASTERY.selectedIndex * 0.007;
    if (n) {
        for (let i = 0; i < n; i++) {
            coe *= 10;
        }
    }
    let result = (!character.weapon || !character.weapon[name] ? 0 : round6(character.weapon[name] * coe)) +
        (!character.chest || !character.chest[name] ? 0 : round6(character.chest[name] * coe)) +
        (!character.head || !character.head[name] ? 0 : round6(character.head[name] * coe)) +
        (!character.arm || !character.arm[name] ? 0 : round6(character.arm[name] * coe)) +
        (!character.leg || !character.leg[name] ? 0 : round6(character.leg[name] * coe)) +
        (!character.accessory || !character.accessory[name] ? 0 : round6(character.accessory[name] * coe));
    if (n) {
        for (let i = 0; i < n; i++) {
            result /= 10;
        }
    }
    return result;
}

function calcHeal(heal, ps, enemy) {
    let hr = enemy.heal_reduction ? (100 - enemy.heal_reduction) / 100 : 1;
    if (hr <= 0) {
        return 0;
    }
    return round(heal * hr * ps * 100) / 100;
}

function calcSkillDamage(character, enemy, base, coe, onhit) {
    return floor((((base + character.attack_power * coe) / (1 + (!enemy.defense ? 0 : enemy.defense / 100))) *
        (1 + (character.skill_amplification_percent - (!enemy.skill_damage_reduction_percent ? 0 : enemy.skill_damage_reduction_percent)) / 100) +
        (character.skill_amplification - (!enemy.skill_damage_reduction ? 0 : enemy.skill_damage_reduction)) * onhit) *
        (1 + (character.weapon ? character.character.correction[character.weapon.Type][0][character.MODE.selectedIndex] / 100 : 0)) *
        (1 + (enemy.weapon ? enemy.character.correction[enemy.weapon.Type][1][enemy.MODE.selectedIndex] / 100 : 0)));
}

function calcTrueDamage(character, enemy, damage) {
    return floor(damage *
        (1 + (character.weapon ? character.character.correction[character.weapon.Type][0][character.MODE.selectedIndex] / 100 : 0)) *
        (1 + (enemy.weapon ? enemy.character.correction[enemy.weapon.Type][1][enemy.MODE.selectedIndex] / 100 : 0)));
}

function fixLimitNum(target, max) {
    const value = target.value;
    if (value === '' || value < 0) {
        target.value = 0;
    } else if (value > max) {
        target.value = max;
    }
    updateDisplay();
}

function comboTime(value, change) {
    if (change &&
        (characters[0].character && characters[0].COMBO_TIME.value > value ||
            characters[1].character && characters[1].COMBO_TIME.value > value)) {
        return;
    }
    if (value === '' || value < 0) {
        value = 0;
    } else if (value > 60) {
        value = 60;
    }
    for (let c = 0; c < characters.length; c++) {
        const div = characters[c].DIV;
        div.querySelector('.combo_time').value = value;
    }
    updateDisplay();
}

function floor(n, d) {
    if (d) {
        for (let i = 0; i < d; i++) {
            n *= 10;
        }
        n = n + 0.0001 | 0;
        let v = 1;
        for (let i = 0; i < d; i++) {
            v *= 10;
        }
        return n / v;
    }
    return n + 0.0001 | 0;
}

function hartUp(s, x) {
    const skill = [
        ['.hart_q', '.hart_qq'],
        ['.hart_w', '.hart_ww'],
        ['.hart_e', '.hart_ee'],
        ['.hart_r', '.hart_rr'],
        ['.hart_t', '.hart_tt'],
    ];
    for (let c = 0, i; c < characters.length; c++) {
        const div = characters[c].DIV;
        if (div.querySelector('.hart_q')) {
            let count = 0;
            for (i = 0; i < skill.length; i++) {
                if (div.querySelector(skill[i][0]).checked) {
                    count++;
                    if (div.querySelector(skill[i][1]).checked) {
                        count++;
                    }
                } else if (div.querySelector(skill[i][1]).checked) {
                    div.querySelector(skill[i][0]).checked = true;
                    div.querySelector(skill[i][1]).checked = false;
                    count++;
                }

            }
            if (count > 3) {
                if (div.querySelector(skill[s][x]).checked) {
                    div.querySelector(skill[s][x]).checked = false;
                } else {
                    div.querySelector(skill[s][0]).checked = false;
                }
            }
        }
    }
    updateDisplay();
}

function lukeUp(x) {
    const skill = [
        '.luke_q',
        '.luke_w',
        '.luke_e',
        '.luke_r',
    ];
    for (let c = 0, i; c < characters.length; c++) {
        const div = characters[c].DIV;
        if (div.querySelector('.luke_q')) {
            let count = 0;
            for (i = 0; i < skill.length; i++) {
                if (div.querySelector(skill[i]).checked) {
                    count++;
                }
            }
            if (count > 3) {
                div.querySelector(skill[x]).checked = false;
            }
        }
    }
    updateDisplay();
}

function round(n, d) {
    const corr = n < 0 ? -0.0001 : 0.0001;
    if (d) {
        for (let i = 0; i < d; i++) {
            n *= 10;
        }
        if (n % 1 + corr >= 0.5) {
            n = (n + corr | 0) + 1;
        } else {
            n = n + corr | 0;
        }
        let v = 1;
        for (let i = 0; i < d; i++) {
            v *= 10;
        }
        return n / v;
    }
    if (n % 1 + corr >= 0.5) {
        return (n + corr | 0) + 1;
    }
    return n + corr | 0;
}

function round6(n, d) {
    const corr = n < 0 ? -0.0001 : 0.0001;
    if (d) {
        for (let i = 0; i < d; i++) {
            n *= 10;
        }
        if (n % 1 + corr >= 0.6) {
            n = (n + corr | 0) + 1;
        } else {
            n = n + corr | 0;
        }
        let v = 1;
        for (let i = 0; i < d; i++) {
            v *= 10;
        }
        return n / v;
    }
    if (n % 1 + corr >= 0.6) {
        return (n + corr | 0) + 1;
    }
    return n + corr | 0;
}

function simulateCombo() {
    const c0 = characters[0];
    const c1 = characters[1];

    c0.heal_reduction = c0.pure_heal_reduction
    c1.heal_reduction = c1.pure_heal_reduction

    c0.attack_power = floor(c0.pure_attack_power);
    c0.critical_damage = c0.pure_critical_damage;
    c0.skill_amplification = round(c0.pure_skill_amplification, 1);
    c0.skill_amplification_percent = round(c0.pure_skill_amplification_percent);
    c0.defense = floor(c0.pure_defense);
    c0.max_hp = floor(c0.pure_max_hp);

    c1.attack_power = floor(c1.pure_attack_power);
    c1.critical_damage = c1.pure_critical_damage;
    c1.skill_amplification = round(c1.pure_skill_amplification, 1);
    c1.skill_amplification_percent = round(c1.pure_skill_amplification_percent);
    c1.defense = floor(c1.pure_defense);
    c1.max_hp = floor(c1.pure_max_hp);

    let d0;
    let d1;
    const length = c0.COMBO_TIME.value > 0 ? c0.COMBO_TIME.value * 2 : 1;
    const comboStr0 = new Array(length);
    const defense_bonus0 = new Array(length).fill(0);
    const defense_percent0 = new Array(length).fill(0);
    const defense_minus0 = new Array(length).fill(0);
    const comboStr1 = new Array(length);
    const defense_bonus1 = new Array(length).fill(0);
    const defense_percent1 = new Array(length).fill(0);
    const defense_minus1 = new Array(length).fill(0);
    const combo0 = c0.COMBO_OPTION.value;
    const combo1 = c1.COMBO_OPTION.value;
    const data0 = {
        hp: c1.max_hp ? c1.max_hp : 0,
        damage: 0,
        heal: 0,
        shield: 0,
        vars: c0.character ? JSON.parse(c0.character.COMBO_VARS) : {}
    };
    const data1 = {
        hp: c0.max_hp ? c0.max_hp : 0,
        damage: 0,
        heal: 0,
        shield: 0,
        vars: c1.character ? JSON.parse(c1.character.COMBO_VARS) : {}
    };
    for (let i = 0, i0 = 0, i1 = 0; i < length; i++) {
        comboStr0[i] = '';
        if (c0.character && combo0) {
            while (floor(i0 * length / combo0.length) < i + 1) {
                comboStr0[i] += combo0.charAt(i0++);
            }
        }
        comboStr1[i] = '';
        if (c1.character && combo1) {
            while (floor(i1 * length / combo1.length) < i + 1) {
                comboStr1[i] += combo1.charAt(i1++);
            }
        }
    }

    for (let i = 0; i < comboStr0.length; i++) {
        if (c0.character) {
            d0 = c0.character.COMBO(c0, c1, data0, comboStr0[i], i, defense_bonus0, defense_percent0, defense_bonus1, defense_percent1, defense_minus1, data1.hp);
            data0.damage += d0.damage;
            data0.heal += d0.heal;
            data0.shield += d0.shield;
            data0.vars = d0.vars;
        }
        if (c1.character) {
            d1 = c1.character.COMBO(c1, c0, data1, comboStr1[i], i, defense_bonus1, defense_percent1, defense_bonus0, defense_percent0, defense_minus0, data0.hp);
            data1.damage += d1.damage;
            data1.heal += d1.heal;
            data1.shield += d1.shield;
            data1.vars = d1.vars;
            if (c0.character) {
                // if (d0 && d0.vars.healBan) {
                //     data1.heal -= d1.heal;
                //     d1.heal = 0;
                // }
                // if (d1 && d1.vars.healBan) {
                //     data0.heal -= d0.heal;
                //     d0.heal = 0;
                // }
                data0.hp = d0.hp + d1.heal + d1.shield;
                data1.hp = d1.hp + d0.heal + d0.shield;
            }
        }
        if (c0.character === Sissela && !c1.character) {
            data1.hp += d0.heal;
        }
        if (c1.character === Sissela && !c0.character) {
            data0.hp += d1.heal;
        }
    }
    if (c0.character && c1.character) {
        if (c1.max_hp && data0.hp > c1.max_hp) {
            data0.hp = c1.max_hp;
        }
        if (c0.max_hp && data1.hp > c0.max_hp) {
            data1.hp = c0.max_hp;
        }
    }
    const percent0 = (c0.weapon && c1.max_hp ? floor((c1.max_hp - data0.hp) / c1.max_hp * 100, 2) : 0);
    const percent1 = (c1.weapon && c0.max_hp ? floor((c0.max_hp - data1.hp) / c0.max_hp * 100, 2) : 0);
    c0.COMBO_DAMAGE.innerHTML = "<b class='damage'>" + data0.damage + (data1.heal ? " - </b><b class='heal'>" + round(data1.heal, 1) : '') + (data1.shield ? "</b><b class='damage'> - </b><b class='shield'>" + data1.shield : '') + (c1.character ? "</b><b> _ : </b><b class='damage'>" + percent0 + '</b><b>%</b>' : '');
    c1.COMBO_DAMAGE.innerHTML = "<b class='damage'>" + data1.damage + (data0.heal ? " - </b><b class='heal'>" + round(data0.heal, 1) : '') + (data0.shield ? "</b><b class='damage'> - </b><b class='shield'>" + data0.shield : '') + (c0.character ? "</b><b> _ : </b><b class='damage'>" + percent1 + '</b><b>%</b>' : '');

    // c0.heal_reduction = heal_reduction0;
    // c0.attack_power = attack_power0;
    // c0.critical_damage = critical_damage0;
    // c0.skill_amplification = skill_amplification0;
    // c0.skill_amplification_percent = skill_amplification_percent0;
    // c0.defense = defense0;

    // c1.heal_reduction = heal_reduction1;
    // c1.attack_power = attack_power1;
    // c1.critical_damage = critical_damage1;
    // c1.skill_amplification = skill_amplification1;
    // c1.skill_amplification_percent = skill_amplification_percent1;
    // c1.defense = defense1;

    if (c0.changeWeapon) {
        swapWeapon(c0);
    }
    if (c1.changeWeapon) {
        swapWeapon(c1);
    }
    c0.calcStat();
    c1.calcStat();
}

function updateDisplay() {
    for (let i = 0; i < characters.length; i++) {
        characters[i].calcStat();
    }
    for (let i = 0; i < characters.length; i++) {
        characters[i].updateDisplay();
    }
    simulateCombo();
}

function setCookie(name, value, days) {
	value = escape(value)
	if (days) {
		const exDate = new Date();
		exDate.setDate(exDate.getDate() + days);
		value += '; expires=' + exDate;
	}
	document.cookie = name + '=' + escape(value);
}
function getCookie(name) {
	let key, value, values = document.cookie + '; ';
	values = values.split('; ');
	for (let i = 0; i < values.length; i++) {
		key = values[i].substr(0, values[i].indexOf('='));
		if (key == name) {
			value = unescape(values[i].substr(key.length + 1));
			value = value.substr(0, value.indexOf(';'));
			return value;
		}
	}
	return null;
}
function swapWeapon(character) {
    character.changeWeapon = !character.changeWeapon;
    const temp = character.weapon;
    character.weapon = character.subWeapon;
    character.subWeapon = temp;

    character.weapon_mastery_attack_speed = WeaponInfo[character.weapon.Type][0];
    character.weapon_mastery_extra_normal_attack_damage_percent = WeaponInfo[character.weapon.Type][1];
    character.weapon_mastery_skill_amplification_percent = WeaponInfo[character.weapon.Type][2];
    character.weapon_attack_range = WeaponInfo[character.weapon.Type][3];
    character.weapon_attack_speed = WeaponInfo[character.weapon.Type][4];

    character.calcStat();

    character.heal_reduction = character.pure_heal_reduction

    character.attack_power = floor(character.pure_attack_power);
    character.critical_damage = character.pure_critical_damage;
    character.skill_amplification = round(character.pure_skill_amplification, 1);
    character.skill_amplification_percent = round(character.pure_skill_amplification_percent);
    character.defense = floor(character.pure_defense);
}