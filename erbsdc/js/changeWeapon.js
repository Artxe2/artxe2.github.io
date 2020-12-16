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
		document.querySelector('#d_damage').innerHTML = "<input id = 'd_stack' type = 'number' value = '0' style = 'width: 40px'><b>Stack _ use: </b>" + 
			"<input id = 'ds' type = 'checkbox'><br>" + 
			"Lost Hp: <input id = 'lost' type = 'number' value = '0' style = 'width: 40px'>%";
		document.querySelector('#d_stack').addEventListener('change', (e) => {
			let stack = document.querySelector('#d_stack');
			if (stack.value == '' || stack.value < 0) {
				stack.value = 0;
			} else if (stack.value > 5) {
				stack.value = 5;
			}
			updateDisplay();
		});
		document.querySelector('#ds').addEventListener('change', (e) => {
			updateDisplay();
		});
		document.querySelector('#lost').addEventListener('change', (e) => {
			let stack = document.querySelector('#lost');
			if (stack.value == '' || stack.value < 0) {
				stack.value = 0;
			} else if (stack.value > 100) {
				stack.value = 100;
			}
			updateDisplay();
		});
	} else if (type == 'dualSwords') {				
		weapon = dualSwords[index];
		weapon_mastery_attack_speed = 1.4;
		weapon_mastery_extra_normal_attack_damage_percent = 2.5;
		weapon_mastery_skill_amplification_percent = 1;
	} else if (type == 'pistol') {				
		weapon = pistol[index];
		weapon_mastery_attack_speed = 3;
		weapon_mastery_extra_normal_attack_damage_percent = 4.5;
		weapon_mastery_skill_amplification_percent = 2.1;
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
	document.querySelector('#weapon').innerHTML = "<img class = '" + weapon.Rarity + "' title = '" + weapon.Title + "' src = './weapon/" + weapon.Name + ".png' width = '80px' height = '44px'>";
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
		document.querySelector('#d_damage2').innerHTML = "<input id = 'd_stack2' type = 'number' value = '0' style = 'width: 40px'><b>Stack _ use: </b>" + 
			"<input id = 'ds2' type = 'checkbox'><br>" + 
			"Lost Hp: <input id = 'lost2' type = 'number' value = '0' style = 'width: 40px'>%"
		document.querySelector('#d_stack2').addEventListener('change', (e) => {
			let stack = document.querySelector('#d_stack2');
			if (stack.value == '' || stack.value < 0) {
				stack.value = 0;
			} else if (stack.value > 5) {
				stack.value = 5;
			}
			updateDisplay2();
		});
		document.querySelector('#ds2').addEventListener('change', (e) => {
			updateDisplay2();
		});
		document.querySelector('#lost2').addEventListener('change', (e) => {
			let stack = document.querySelector('#lost2');
			if (stack.value == '' || stack.value < 0) {
				stack.value = 0;
			} else if (stack.value > 100) {
				stack.value = 100;
			}
			updateDisplay2();
		});
	} else if (type == 'dualSwords') {				
		weapon2 = dualSwords[index];
		weapon_mastery_attack_speed2 = 1.4;
		weapon_mastery_extra_normal_attack_damage_percent2 = 2.5;
		weapon_mastery_skill_amplification_percent2 = 1;
	} else if (type == 'pistol') {				
		weapon2 = pistol[index];
		weapon_mastery_attack_speed2 = 3;
		weapon_mastery_extra_normal_attack_damage_percent2 = 4.5;
		weapon_mastery_skill_amplification_percent2 = 2.1;
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
	document.querySelector('#weapon2').innerHTML = "<img class = '" + weapon2.Rarity + "' title = '" + weapon2.Title + "' src = './weapon/" + weapon2.Name + ".png' width = '80px' height = '44px'>";
	updateDisplay2();
}