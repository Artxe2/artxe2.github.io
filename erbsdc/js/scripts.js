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
});

function baseAttackDamage(character, enemy, base, coe, cri, onhit) {
    return (((base + character.attack_power * coe) * (1 + cri / 100 * (1 + character.critical_strike_damage / 100)) / (1 + (!enemy.defense ? 0 : enemy.defense / 100)) + 
        (character.extra_normal_attack_damage - (!enemy.normal_attack_damage_reduction ? 0 : enemy.normal_attack_damage_reduction)) * onhit) * 
        (1 + (character.extra_normal_attack_damage_percent - (!enemy.normal_attack_damage_reduction_percent ? 0 : enemy.normal_attack_damage_reduction_percent)) / 100)) * 
        (1 + (character.weapon ? character.character.correction[character.weapon.Type][0][character.MODE.selectedIndex] / 100 : 0)) * 
        (1 + (enemy.weapon ? enemy.character.correction[enemy.weapon.Type][1][enemy.MODE.selectedIndex] / 100 : 0)) | 0;
}

function calcSkillDamage(character, enemy, base, coe, onhit) {	
    return (((base + character.attack_power * coe) / (1 + (!enemy.defense ? 0 : enemy.defense / 100)) + 
        (character.skill_amplification - (!enemy.skill_damage_reduction ? 0 : enemy.skill_damage_reduction)) * onhit) * 
        (1 + (character.skill_amplification_percent - (!enemy.skill_damage_reduction_percent ? 0 : enemy.skill_damage_reduction_percent)) / 100)) * 
        (1 + (character.weapon ? character.character.correction[character.weapon.Type][0][character.MODE.selectedIndex] / 100 : 0)) * 
        (1 + (enemy.weapon ? enemy.character.correction[enemy.weapon.Type][1][enemy.MODE.selectedIndex] / 100 : 0)) | 0;
}

function calcHeal(heal, ps, enemy) {
    return Math.round(heal * (enemy.heal_reduction ? 0.6 : 1) * ps * 100) / 100;
}

function calcAttackSpeed(character, bonusAs) {
    return character.attack_speed + (character.base_attack_speed * bonusAs | 0) / 100;
} 

function gloveAttackDamage(character, enemy, coe, cri, bonus) {
    return (((character.attack_power * coe * (1 + cri / 100 * (1 + character.critical_strike_damage / 100)) + 
        character.extra_normal_attack_damage - (!enemy.normal_attack_damage_reduction ? 0 : enemy.normal_attack_damage_reduction)) * 
        (1 + (character.extra_normal_attack_damage_percent - (!enemy.normal_attack_damage_reduction_percent ? 0 : enemy.normal_attack_damage_reduction_percent)) / 100)) * 
        (1 + (character.weapon ? character.character.correction[character.weapon.Type][0][character.MODE.selectedIndex] / 100 : 0)) * 
        (1 + (enemy.weapon ? enemy.character.correction[enemy.weapon.Type][1][enemy.MODE.selectedIndex] / 100 : 0)) | 0) + bonus;
}

function hartUp(s, x) {
    const skill = [
        ['.hart_q', '.hart_qq'],
        ['.hart_w', '.hart_ww'],
        ['.hart_e', '.hart_ee'],
        ['.hart_r', '.hart_rr'],
        ['.hart_t', '.hart_tt'],
    ]
    for (let c = 0, i; c < characters.length; c++) {
        const div = characters[c].DIV;
        if (div.querySelector('.hart_q')) {
            let count = 0;
            for (i = 0; i < 5; i++) {
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

function fixLimitNum(target, max) {
    const value = target.value;
    if (value === '' || value < 0) {
        target.value = 0;
    } else if (value > max) {
        target.value = max;
    }
    updateDisplay();
}

function updateDisplay() {
    for (let i = 0; i < characters.length; i++) {
        characters[i].calcStat();
    }
    for (let i = 0; i < characters.length; i++) {
        characters[i].updateDisplay();
    }
}