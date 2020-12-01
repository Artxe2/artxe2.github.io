function changeWeapon(type, index) {
	if (type == 'dagger') {				
		weapon = dagger[index];
		weapon_mastery_attack_speed = 2.7;
		weapon_mastery_extra_normal_attack_damage_percent = 5;
		weapon_mastery_skill_amplification_percent = 1.5;
	} else if (type == 'twoHandedSword') {				
		weapon = twoHandedSword[index];
		weapon_mastery_attack_speed = 3.3;
		weapon_mastery_extra_normal_attack_damage_percent = 5;
		weapon_mastery_skill_amplification_percent = 1.5;
	} else if (type == 'axe') {				
		weapon = axe[index];
		weapon_mastery_attack_speed = 0;
		weapon_mastery_extra_normal_attack_damage_percent = 4;
		weapon_mastery_skill_amplification_percent = 2;
	} else if (type == 'dualSwords') {				
		weapon = dualSwords[index];
		weapon_mastery_attack_speed = 1.4;
		weapon_mastery_extra_normal_attack_damage_percent = 2.5;
		weapon_mastery_skill_amplification_percent = 1;
	} else if (type == 'pistol') {				
		weapon = pistol[index];
		weapon_mastery_attack_speed = 3;
		weapon_mastery_extra_normal_attack_damage_percent = 4.5;
		weapon_mastery_skill_amplification_percent = 1.9;
	} else if (type == 'assaultRifle') {				
		weapon = assaultRifle[index];
		weapon_mastery_attack_speed = 4;
		weapon_mastery_extra_normal_attack_damage_percent = 1.5;
		weapon_mastery_skill_amplification_percent = 2;
	} else if (type == 'sniperRifle') {				
		weapon = sniperRifle[index];
		weapon_mastery_attack_speed = 0;
		weapon_mastery_extra_normal_attack_damage_percent = 4.8;
		weapon_mastery_skill_amplification_percent = 2;
	} else if (type == 'rapier') {				
		weapon = rapier[index];
		weapon_mastery_attack_speed = 2.7;
		weapon_mastery_extra_normal_attack_damage_percent = 4;
		weapon_mastery_skill_amplification_percent = 2;
	} else if (type == 'spear') {				
		weapon = spear[index];
		weapon_mastery_attack_speed = 0.4;
		weapon_mastery_extra_normal_attack_damage_percent = 4.2;
		weapon_mastery_skill_amplification_percent = 1;
	} else if (type == 'hammer') {				
		weapon = hammer[index];
		weapon_mastery_attack_speed = 0.4;
		weapon_mastery_extra_normal_attack_damage_percent = 5;
		weapon_mastery_skill_amplification_percent = 1.5;
	} else if (type == 'bat') {				
		weapon = bat[index];
		weapon_mastery_attack_speed = 3;
		weapon_mastery_extra_normal_attack_damage_percent = 4;
		weapon_mastery_skill_amplification_percent = 1.2;
	} else if (type == 'throws') {				
		weapon = throws[index];
		weapon_mastery_attack_speed = 0.9;
		weapon_mastery_extra_normal_attack_damage_percent = 5;
		weapon_mastery_skill_amplification_percent = 2;
	} else if (type == 'shuriken') {				
		weapon = shuriken[index];
		weapon_mastery_attack_speed = 1.8;
		weapon_mastery_extra_normal_attack_damage_percent = 4;
		weapon_mastery_skill_amplification_percent = 1.5;
	} else if (type == 'bow') {				
		weapon = bow[index];
		weapon_mastery_attack_speed = 2.2;
		weapon_mastery_extra_normal_attack_damage_percent = 3;
		weapon_mastery_skill_amplification_percent = 2;
	} else if (type == 'crossbow') {				
		weapon = crossbow[index];
		weapon_mastery_attack_speed = 2;
		weapon_mastery_extra_normal_attack_damage_percent = 5;
		weapon_mastery_skill_amplification_percent = 1.8;
	} else if (type == 'glove') {				
		weapon = glove[index];
		weapon_mastery_attack_speed = 3.6;
		weapon_mastery_extra_normal_attack_damage_percent = 2.5;
		weapon_mastery_skill_amplification_percent = 2;
	} else if (type == 'tonfa') {				
		weapon = tonfa[index];
		weapon_mastery_attack_speed = 1.8;
		weapon_mastery_extra_normal_attack_damage_percent = 3.5;
		weapon_mastery_skill_amplification_percent = 3;
	} else if (type == 'guitar') {				
		weapon = guitar[index];
		weapon_mastery_attack_speed = 1.5;
		weapon_mastery_extra_normal_attack_damage_percent = 1.5;
		weapon_mastery_skill_amplification_percent = 2.5;
	} else if (type == 'nunchaku') {				
		weapon = nunchaku[index];
		weapon_mastery_attack_speed = 1.5;
		weapon_mastery_extra_normal_attack_damage_percent = 3.5;
		weapon_mastery_skill_amplification_percent = 3;
	} else if (type == 'whip') {				
		weapon = whip[index];
		weapon_mastery_attack_speed = 0;
		weapon_mastery_extra_normal_attack_damage_percent = 0;
		weapon_mastery_skill_amplification_percent = 0;
	} else {
		weapon = null;
		document.querySelector('#weapon').innerHTML = '';
		updateDisplay();
		return;
	}
	document.querySelector('#weapon').innerHTML = "<img title = '" + weapon.Name + "' src = './weapon/" + weapon.Name + ".png' width = '80px' height = '44px'>";
	updateDisplay();
}
function changeWeapon2(type, index) {
	if (type == 'dagger') {				
		weapon2 = dagger[index];
		weapon_mastery_attack_speed2 = 2.7;
		weapon_mastery_extra_normal_attack_damage_percent2 = 5;
		weapon_mastery_skill_amplification_percent2 = 1.5;
	} else if (type == 'twoHandedSword') {				
		weapon2 = twoHandedSword[index];
		weapon_mastery_attack_speed2 = 3.3;
		weapon_mastery_extra_normal_attack_damage_percent2 = 5;
		weapon_mastery_skill_amplification_percent2 = 1.5;
	} else if (type == 'axe') {				
		weapon2 = axe[index];
		weapon_mastery_attack_speed2 = 0;
		weapon_mastery_extra_normal_attack_damage_percent2 = 4;
		weapon_mastery_skill_amplification_percent2 = 2;
	} else if (type == 'dualSwords') {				
		weapon2 = dualSwords[index];
		weapon_mastery_attack_speed2 = 1.4;
		weapon_mastery_extra_normal_attack_damage_percent2 = 2.5;
		weapon_mastery_skill_amplification_percent2 = 1;
	} else if (type == 'pistol') {				
		weapon2 = pistol[index];
		weapon_mastery_attack_speed2 = 3;
		weapon_mastery_extra_normal_attack_damage_percent2 = 4.5;
		weapon_mastery_skill_amplification_percent2 = 1.9;
	} else if (type == 'assaultRifle') {				
		weapon2 = assaultRifle[index];
		weapon_mastery_attack_speed2 = 4;
		weapon_mastery_extra_normal_attack_damage_percent2 = 1.5;
		weapon_mastery_skill_amplification_percent2 = 2;
	} else if (type == 'sniperRifle') {				
		weapon2 = sniperRifle[index];
		weapon_mastery_attack_speed2 = 0;
		weapon_mastery_extra_normal_attack_damage_percent2 = 4.8;
		weapon_mastery_skill_amplification_percent2 = 2;
	} else if (type == 'rapier') {				
		weapon2 = rapier[index];
		weapon_mastery_attack_speed2 = 2.7;
		weapon_mastery_extra_normal_attack_damage_percent2 = 4;
		weapon_mastery_skill_amplification_percent2 = 2;
	} else if (type == 'spear') {				
		weapon2 = spear[index];
		weapon_mastery_attack_speed2 = 0.4;
		weapon_mastery_extra_normal_attack_damage_percent2 = 4.2;
		weapon_mastery_skill_amplification_percent2 = 1;
	} else if (type == 'hammer') {				
		weapon2 = hammer[index];
		weapon_mastery_attack_speed2 = 0.4;
		weapon_mastery_extra_normal_attack_damage_percent2 = 5;
		weapon_mastery_skill_amplification_percent2 = 1.5;
	} else if (type == 'bat') {				
		weapon2 = bat[index];
		weapon_mastery_attack_speed2 = 3;
		weapon_mastery_extra_normal_attack_damage_percent2 = 4;
		weapon_mastery_skill_amplification_percent2 = 1.2;
	} else if (type == 'throws') {				
		weapon2 = throws[index];
		weapon_mastery_attack_speed2 = 0.9;
		weapon_mastery_extra_normal_attack_damage_percent2 = 5;
		weapon_mastery_skill_amplification_percent2 = 2;
	} else if (type == 'shuriken') {				
		weapon2 = shuriken[index];
		weapon_mastery_attack_speed2 = 1.8;
		weapon_mastery_extra_normal_attack_damage_percent2 = 4;
		weapon_mastery_skill_amplification_percent2 = 1.5;
	} else if (type == 'bow') {				
		weapon2 = bow[index];
		weapon_mastery_attack_speed2 = 2.2;
		weapon_mastery_extra_normal_attack_damage_percent2 = 3;
		weapon_mastery_skill_amplification_percent2 = 2;
	} else if (type == 'crossbow') {				
		weapon2 = crossbow[index];
		weapon_mastery_attack_speed2 = 2;
		weapon_mastery_extra_normal_attack_damage_percent2 = 5;
		weapon_mastery_skill_amplification_percent2 = 1.8;
	} else if (type == 'glove') {				
		weapon2 = glove[index];
		weapon_mastery_attack_speed2 = 3.6;
		weapon_mastery_extra_normal_attack_damage_percent2 = 2.5;
		weapon_mastery_skill_amplification_percent2 = 2;
	} else if (type == 'tonfa') {				
		weapon2 = tonfa[index];
		weapon_mastery_attack_speed2 = 1.8;
		weapon_mastery_extra_normal_attack_damage_percent2 = 3.5;
		weapon_mastery_skill_amplification_percent2 = 3;
	} else if (type == 'guitar') {				
		weapon2 = guitar[index];
		weapon_mastery_attack_speed2 = 1.5;
		weapon_mastery_extra_normal_attack_damage_percent2 = 1.5;
		weapon_mastery_skill_amplification_percent2 = 2.5;
	} else if (type == 'nunchaku') {				
		weapon2 = nunchaku[index];
		weapon_mastery_attack_speed2 = 1.5;
		weapon_mastery_extra_normal_attack_damage_percent2 = 3.5;
		weapon_mastery_skill_amplification_percent2 = 3;
	} else if (type == 'whip') {				
		weapon2 = whip[index];
		weapon_mastery_attack_speed2 = 0;
		weapon_mastery_extra_normal_attack_damage_percent2 = 0;
		weapon_mastery_skill_amplification_percent2 = 0;
	} else {
		weapon2 = null;
		document.querySelector('#weapon2').innerHTML = '';
		updateDisplay2();
		return;
	}
	document.querySelector('#weapon2').innerHTML = "<img title = '" + weapon2.Name + "' src = './weapon/" + weapon2.Name + ".png' width = '80px' height = '44px'>";
	updateDisplay2();
}