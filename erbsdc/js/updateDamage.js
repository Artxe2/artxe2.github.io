function baseAttackDamage(base, coe, cri, onhit, bonus, isPlayer1) {
	if (isPlayer1) {
		return ((((base + attack_power * coe) * (100 + cri * (100 + critical_strike_damage) / 100) / 100 + bonus) * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + (extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * onhit) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2);
	}
	return (((base + attack_power2 * coe * (100 + cri * (100 + critical_strike_damage2) / 100) / 100 + bonus) * 
			100 / (100 + (character == undefined ? 0 : defense)) + (extra_normal_attack_damage2 - (character == undefined ? 0 : normal_attack_damage_reduction)) * onhit) * 
			(100 + extra_normal_attack_damage_percent2 - (character == undefined ? 0 : normal_attack_damage_reduction_percent)) / 100).toFixed(2);
}
function calcSkillDamage(base, coe, isPlayer1) {
	if (isPlayer1) {
		return (((base + attack_power * coe) * 100 / (100 + (character2 == undefined ? 0 : defense2)) + 
			skill_amplification - (character2 == undefined ? 0 : skill_damage_reduction2)) * 
			(100 + skill_amplification_percent - (character2 == undefined ? 0 : skill_damage_reduction_percent2)) / 100).toFixed(2);
	}
	return (((base + attack_power2 * coe) * 100 / (100 + (character == undefined ? 0 : defense)) + 
			skill_amplification2 - (character == undefined ? 0 : skill_damage_reduction)) * 
			(100 + skill_amplification_percent2 - (character == undefined ? 0 : skill_damage_reduction_percent)) / 100).toFixed(2);
}
function calcSkillDamage2(base, coe, def_dec, isPlayer1) {
	if (isPlayer1) {
		return (((base + attack_power * coe) * 100 / (100 + (character2 == undefined ? 0 : defense2 * (1 - def_dec / 100))) + 
			skill_amplification - (character2 == undefined ? 0 : skill_damage_reduction2)) * 
			(100 + skill_amplification_percent - (character2 == undefined ? 0 : skill_damage_reduction_percent2)) / 100).toFixed(2);
	}
	return (((base + attack_power2 * coe) * 100 / (100 + (character == undefined ? 0 : defense * (1 - def_dec / 100))) + 
			skill_amplification2 - (character == undefined ? 0 : skill_damage_reduction)) * 
			(100 + skill_amplification_percent2 - (character == undefined ? 0 : skill_damage_reduction_percent)) / 100).toFixed(2);
}
function updateDamage() {
	if (weapon != undefined) {
		if (weapon.Type == 'DualSwords') {
			document.querySelector('#base_attack_damage').innerText = 
				baseAttackDamage(0, 2, critical_strike_chance, 2, 0, true) + ' ( ' + 
				baseAttackDamage(0, 1, 0, 1, 0, true) + ', ' + baseAttackDamage(0, 1, 0, 1, 0, true) + ' - ' + 
				baseAttackDamage(0, 1, 100, 1, 0, true) + ', ' + baseAttackDamage(0, 1, 100, 1, 0, true) + ' )';
			document.querySelector('#dps').innerText = 
				(parseFloat(baseAttackDamage(0, 2, critical_strike_chance, 2, 0, true)) * attack_speed).toFixed(2);
			document.querySelector('#lsps').innerText = 
				(parseFloat(baseAttackDamage(0, 2, critical_strike_chance, 2, 0, true)) * attack_speed * life_steal / 100 * 0.6).toFixed(2) + ' - ' + 
				(parseFloat(baseAttackDamage(0, 2, critical_strike_chance, 2, 0, true)) * attack_speed * life_steal / 100).toFixed(2);
		} else if (weapon.Type == 'AssaultRifle') {
			document.querySelector('#base_attack_damage').innerText = 
				baseAttackDamage(0, 1.12, critical_strike_chance, 3, 0, true) + ' ( ' + 
				baseAttackDamage(0, 0.32, 0, 1, 0, true) + ', ' + baseAttackDamage(0, 0.32, 0, 1, 0, true) + ', ' + baseAttackDamage(0, 0.48, 0, 1, 0, true) + ' - ' + 
				baseAttackDamage(0, 0.32, 100, 1, 0, true) + ', ' + baseAttackDamage(0, 0.32, 100, 1, 0, true) + ', ' + baseAttackDamage(0, 0.48, 100, 1, 0, true) + ' )';
			document.querySelector('#dps').innerText = 
				(parseFloat(baseAttackDamage(0, 1.12, critical_strike_chance, 3, 0, true)) * attack_speed).toFixed(2);
			document.querySelector('#lsps').innerText = 
				(parseFloat(baseAttackDamage(0, 1.12, critical_strike_chance, 3, 0, true)) * attack_speed * life_steal / 100 * 0.6).toFixed(2) + ' - ' + 
				(parseFloat(baseAttackDamage(0, 1.12, critical_strike_chance, 3, 0, true)) * attack_speed * life_steal / 100).toFixed(2);
		} else if (weapon.Type == 'Guitar') {
			document.querySelector('#base_attack_damage').innerText = 
				baseAttackDamage(0, 1.3, critical_strike_chance, 3, 0, true) + ' ( ' + 
				baseAttackDamage(0, 1.3, 0, 1, 0, true) + ', ' + baseAttackDamage(0, 0.15, 0, 1, 0, true) + ', ' + baseAttackDamage(0, 0.15, 0, 1, 0, true) + ' - ' + 
				baseAttackDamage(0, 1.3, 100, 1, 0, true) + ', ' + baseAttackDamage(0, 0.15, 100, 1, 0, true) + ', ' + baseAttackDamage(0, 0.15, 100, 1, 0, true) + ' )';
			document.querySelector('#dps').innerText = 
				(parseFloat(baseAttackDamage(0, 1.3, critical_strike_chance, 3, 0, true)) * attack_speed).toFixed(2);
			document.querySelector('#lsps').innerText = 
				(parseFloat(baseAttackDamage(0, 1.3, critical_strike_chance, 3, 0, true)) * attack_speed * life_steal / 100 * 0.6).toFixed(2) + ' - ' + 
				(parseFloat(baseAttackDamage(0, 1.3, critical_strike_chance, 3, 0, true)) * attack_speed * life_steal / 100).toFixed(2);
		} else {
			document.querySelector('#base_attack_damage').innerText = 
				baseAttackDamage(0, 1, critical_strike_chance, 1, 0, true) + 
				' ( ' + baseAttackDamage(0, 1, 0, 1, 0, true) + ' - ' + baseAttackDamage(0, 1, 100, 1, 0, true) + ' )';
			document.querySelector('#dps').innerText = 
				(parseFloat(baseAttackDamage(0, 1, critical_strike_chance, 1, 0, true)) * attack_speed).toFixed(2);
			document.querySelector('#lsps').innerText = 
				(parseFloat(baseAttackDamage(0, 1, critical_strike_chance, 1, 0, true)) * attack_speed * life_steal / 100 * 0.6).toFixed(2) + ' - ' + 
				(parseFloat(baseAttackDamage(0, 1, critical_strike_chance, 1, 0, true)) * attack_speed * life_steal / 100).toFixed(2);
		}
		if (weapon.Type == 'Dagger') {
			document.querySelector('#d_damage').innerText = 
				baseAttackDamage(0, 1, 100, 1, 0, true) + ' ~ ' + 
				baseAttackDamage((character2 == undefined ? 0 : max_hp2 / 10), 1, 100, 1, 0, true);
		} else if (weapon.Type == 'TwoHandedSword') {
			document.querySelector('#d_damage').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 2.5 : 2, true);
		} else if (weapon.Type == 'Axe') {
			document.querySelector('#d_damage').innerText = 'AP increases: ' + 
				Math.round(attack_power * 0.02) + ' ~ ' + Math.round(attack_power * 0.1) + ' / ' + 
				Math.round(attack_power * 0.05) + ' ~ ' + Math.round(attack_power * 0.25) + ' - ' + 
				Math.round(attack_power * 0.15) + ' ~ ' + Math.round(attack_power * 0.75);
		} else if (weapon.Type == 'DualSwords') {
			document.querySelector('#d_damage').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 0.5 : 0.3, true) + ' x 6 x 2 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 0.5 : 0.3, true))) * 12) + ' )';
		} else if (weapon.Type == 'Pistol') {
			document.querySelector('#d_damage').innerText = ' - ';
		} else if (weapon.Type == 'AssaultRifle') {
			document.querySelector('#d_damage').innerText = 'dps: ' + 
				(parseFloat(baseAttackDamage(0, 1.12, critical_strike_chance, 3, 0, true)) * 
				(attack_speed + (character.Atk_Speed + (weapon == undefined ? 0 : weapon.Atk_Speed)) * 
				(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 0.6 : 0.4))).toFixed(2);
		} else if (weapon.Type == 'SniperRifle') {
			document.querySelector('#d_damage').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 3 : 2.5, true);
		} else if (weapon.Type == 'Rapier') {
			document.querySelector('#d_damage').innerText = 
				calcSkillDamage(0, 2 + critical_strike_damage / 100, true);
		} else if (weapon.Type == 'Spear') {
			document.querySelector('#d_damage').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 1.5 : 1, true) + ', ' + 
				calcSkillDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 1.5 : 1, true) + ' ( ' + 
				Math.round(parseFloat(calcSkillDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 1.5 : 1, true))) * 2 + ' )'; 
		} else if (weapon.Type == 'Hammer') {
			document.querySelector('#d_damage').innerText = 
				calcSkillDamage(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 300 + defense * 2 : 150 + defense, 0, true);
		} else if (weapon.Type == 'Bat') {
			document.querySelector('#d_damage').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 3 : 2, true);
		} else if (weapon.Type == 'Throws') {
			document.querySelector('#d_damage').innerText = ' - ';
		} else if (weapon.Type == 'Shuriken') {
			document.querySelector('#d_damage').innerText = 
				calcSkillDamage(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 110 : 180, 0.3, true) + ' + ' + 
				Math.round(parseFloat(calcSkillDamage(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 110 : 180, 0.3, true) * 0.3)) + ' x 11 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 110 : 180, 0.3, true))) + 
				Math.round(parseFloat(calcSkillDamage(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 110 : 180, 0.3, true) * 0.3)) * 11) + ' )';
		} else if (weapon.Type == 'Bow') {
			document.querySelector('#d_damage').innerText = 
				calcSkillDamage(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 250 : 150, 1, true) + ' - ' + 
				calcSkillDamage(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 500 : 300, 2, true);
		} else if (weapon.Type == 'Crossbow') {
			document.querySelector('#d_damage').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 1 : 0.6, true);
		} else if (weapon.Type == 'Glove') {
			document.querySelector('#d_damage').innerText = 
				(parseFloat(baseAttackDamage(0, 1, critical_strike_chance, 1, 
					document.querySelector('#weapon_mastery').selectedIndex > 12 ? 
					parseFloat(baseAttackDamage(0, 1, critical_strike_chance, 1, 0, true) * 2) : 
					parseFloat(baseAttackDamage(0, 1, critical_strike_chance, 1, 0, true)), true)) + 
					(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 100 : 50)).toFixed(2) + ' ( ' + 
				(parseFloat(baseAttackDamage(0, 1, 0, 1, 
					document.querySelector('#weapon_mastery').selectedIndex > 12 ? 
					parseFloat(baseAttackDamage(0, 1, 0, 1, 0, true) * 2) : 
					parseFloat(baseAttackDamage(0, 1, 0, 1, 0, true)), true)) + 
					(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 100 : 50)).toFixed(2) + ' - ' + 
				(parseFloat(baseAttackDamage(0, 1, 100, 1, 
					document.querySelector('#weapon_mastery').selectedIndex > 12 ? 
					parseFloat(baseAttackDamage(0, 1, 100, 1, 0, true) * 2) : 
					parseFloat(baseAttackDamage(0, 1, 100, 1, 0, true)), true)) + 
					(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 100 : 50)).toFixed(2) + ' )';
		} else if (weapon.Type == 'Tonfa') {
			document.querySelector('#d_damage').innerText = ' - ';
		} else if (weapon.Type == 'Guitar') {
			document.querySelector('#d_damage').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 2 : 1.5, true);
		} else if (weapon.Type == 'Nunchaku') {
			document.querySelector('#d_damage').innerText = 
				calcSkillDamage(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 250 : 125, 0.5, true) + ' ~ ' + 
				calcSkillDamage(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 600 : 300, 1.5, true);
		} else if (weapon.Type == 'Whip') {
			document.querySelector('#d_damage').innerText = ' - ';
		}
		if (character == Jackie) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(20 + document.querySelector('#q_level').selectedIndex * 20, 0.45, true) + ', ' + 
				calcSkillDamage(30 + document.querySelector('#q_level').selectedIndex * 20, 0.65, true) + ' + ' + 
				calcSkillDamage(80 + document.querySelector('#q_level').selectedIndex * 30, 0, true) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#q_level').selectedIndex * 20, 0.45, true))) + 
				Math.round(parseFloat(calcSkillDamage(30 + document.querySelector('#q_level').selectedIndex * 20, 0.65, true) )) + 
				Math.round(parseFloat(calcSkillDamage(80 + document.querySelector('#q_level').selectedIndex * 30, 0, true)))) + ' )';
			document.querySelector('#w_damage').innerText = 'd: ' + 
				((attack_power * (0.1 + document.querySelector('#w_level').selectedIndex * 0.1) * 
				100 / (100 + (character2 == undefined ? 0 : defense2))) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ' / h: ' + 
				(12 + document.querySelector('#w_level').selectedIndex * 7 + attack_power * 0.1).toFixed(2);
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(10 + document.querySelector('#q_level').selectedIndex * 70, 
					0.3 + document.querySelector('#q_level').selectedIndex * 0.1, true)
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(document.querySelector('#r_level').selectedIndex == 0 ? 300 : 
					document.querySelector('#r_level').selectedIndex == 1 ? 500 : 800, 0.7, true) + ' _ dps: ' + 
				(parseFloat(baseAttackDamage(0, 1, critical_strike_chance, 1, 0, true)) * 
				(attack_speed + (character.Atk_Speed + (weapon == undefined ? 0 : weapon.Atk_Speed)) * 
				(0.3 + document.querySelector('#r_level').selectedIndex * 0.05)) * (weapon2.Type == 'DualSwords' ? 2 : 1)).toFixed(2);
			document.querySelector('#t_damage').innerText = 'AP increases: ' + 
				(document.querySelector('#t_level').selectedIndex == 0 ? Math.round(attack_power * 0.03) + ' ~ ' + Math.round(attack_power * 0.08) : 
				document.querySelector('#t_level').selectedIndex == 1 ? Math.round(attack_power * 0.08) + ' ~ ' + Math.round(attack_power * 0.2) : 
				Math.round(attack_power * 0.15) + ' ~ ' + Math.round(attack_power * 0.4));
		} else if (character == Aya) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(0, 1, true) + ', ' + calcSkillDamage(20 + document.querySelector('#q_level').selectedIndex * 40, 0.5, true) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(0, 1, true))) + 
				Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#q_level').selectedIndex * 40, 0.5, true)))) + ' )';
			document.querySelector('#w_damage').innerText = 
				calcSkillDamage(22 + document.querySelector('#w_level').selectedIndex * 22, 0.25 + 
					document.querySelector('#w_level').selectedIndex * 0.05, true) + ' x 10 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(22 + document.querySelector('#w_level').selectedIndex * 22, 0.25 + 
					document.querySelector('#w_level').selectedIndex * 0.05, true))) * 10) + ' )';
			document.querySelector('#e_damage').innerText = ' - ';
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(200 + document.querySelector('#r_level').selectedIndex * 150, 0.7, true);
			document.querySelector('#t_damage').innerText = 'shield: ' + 
				(150 + document.querySelector('#t_level').selectedIndex * 50 + attack_power * 0.1);
		} else if (character == Fiora) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(40 + document.querySelector('#q_level').selectedIndex * 40, 0.2, true) + ' - ' + 
				calcSkillDamage(80 + document.querySelector('#q_level').selectedIndex * 80, 0.4, true);
			document.querySelector('#w_damage').innerText = 
				baseAttackDamage(0, 0.8 + document.querySelector('#w_level').selectedIndex * 0.25, critical_strike_chance, 2, 0, true) + ' ( ' + 
				baseAttackDamage(0, 0.6 + document.querySelector('#w_level').selectedIndex * 0.1, 0, 1, 0, true) + ', ' + 
				baseAttackDamage(0, 0.2 + document.querySelector('#w_level').selectedIndex * 0.15, 0, 1, 0, true) + ' - ' + 
				baseAttackDamage(0, 0.6 + document.querySelector('#w_level').selectedIndex * 0.1, 100, 1, 0, true) + ', ' + 
				baseAttackDamage(0, 0.2 + document.querySelector('#w_level').selectedIndex * 0.15, 100, 1, 0, true) + ' )';
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(90 + document.querySelector('#e_level').selectedIndex * 40, 0.5, true);
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(30 + document.querySelector('#r_level').selectedIndex * 5, 
					0.1 + document.querySelector('#r_level').selectedIndex * 0.1, true) + ' _ dps: ' + 
				(parseFloat(calcSkillDamage(30 + document.querySelector('#r_level').selectedIndex * 5, 
					0.1 + document.querySelector('#r_level').selectedIndex * 0.1, true)) * attack_speed).toFixed(2);
			document.querySelector('#t_damage').innerText = ' - ';
		} else if (character == Magnus) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(40 + document.querySelector('#q_level').selectedIndex * 60, 0.6, true);
			document.querySelector('#w_damage').innerText = 
				calcSkillDamage(10 + parseInt((document.querySelector('#w_level').selectedIndex + 1) / 2) * 10 + defense * 0.3, 0.3, true) + ' x ' + 
				(6 + parseInt(document.querySelector('#w_level').selectedIndex / 2));
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(60 + document.querySelector('#e_level').selectedIndex * 55, 0.4, true);
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(200 + document.querySelector('#r_level').selectedIndex * 200, 2, true);
			document.querySelector('#t_damage').innerText = 'DEF increases: 0 ~ ' + 
				defense * (0.2 + document.querySelector('#t_level').selectedIndex * 0.15);
		} else if (character == Zahir) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(40 + document.querySelector('#q_level').selectedIndex * 60, 0.5, true) + ' - ' + 
				calcSkillDamage(75 + document.querySelector('#q_level').selectedIndex * 75, 0.5, true);
			document.querySelector('#w_damage').innerText = 
				calcSkillDamage(40 + document.querySelector('#w_level').selectedIndex * 20, 0.3, true);
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(80 + document.querySelector('#e_level').selectedIndex * 30, 0.5, true);
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(60 + document.querySelector('#r_level').selectedIndex * 90, 0.5, true) + ' + ' + 
				calcSkillDamage(30 + document.querySelector('#r_level').selectedIndex * 45, 0.5, true) + ' x 4 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(60 + document.querySelector('#r_level').selectedIndex * 90, 0.5, true))) + 
				Math.round(parseFloat(calcSkillDamage(30 + document.querySelector('#r_level').selectedIndex * 45, 0.5, true))) * 4) + ' )'; 
			document.querySelector('#t_damage').innerText = 
				calcSkillDamage(10 + document.querySelector('#t_level').selectedIndex * 25, 0.3, true);
		} else if (character == Nadine) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(70 + document.querySelector('#q_level').selectedIndex * 45 + 
					10 + document.querySelector('#t_level').selectedIndex * 5 + document.querySelector('#weapon_mastery').selectedIndex * 
					(10 + document.querySelector('#t_level').selectedIndex * 5), 0.6, true) + ' - ' + 
				calcSkillDamage(140 + document.querySelector('#q_level').selectedIndex * 90 + 
					10 + document.querySelector('#t_level').selectedIndex * 5 + document.querySelector('#weapon_mastery').selectedIndex * 
					(10 + document.querySelector('#t_level').selectedIndex * 5), 1.2, true);
			document.querySelector('#w_damage').innerText = 
				calcSkillDamage(100 + document.querySelector('#r_level').selectedIndex * 70, 0.6, true) + ', ' + 
				calcSkillDamage(100 + document.querySelector('#r_level').selectedIndex * 70, 0.6, true) + ', ' + 
				calcSkillDamage(100 + document.querySelector('#r_level').selectedIndex * 40, 0.6, true);
			document.querySelector('#e_damage').innerText = 'dps: ' + 
				(parseFloat(baseAttackDamage(0, 1, critical_strike_chance, 1, 0, true)) * 
				(attack_speed + (character.Atk_Speed + (weapon == undefined ? 0 : weapon.Atk_Speed)) * 
				(0.2 + document.querySelector('#e_level').selectedIndex * 0.1))).toFixed(2);
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(50 + document.querySelector('#r_level').selectedIndex * 50 + 
					10 + document.querySelector('#t_level').selectedIndex * 5 + document.querySelector('#weapon_mastery').selectedIndex * 
					(10 + document.querySelector('#t_level').selectedIndex * 5), 0.5, true) + ' _ dps: ' + 
					(parseFloat(calcSkillDamage(50 + document.querySelector('#r_level').selectedIndex * 50 + 
					10 + document.querySelector('#t_level').selectedIndex * 5 + document.querySelector('#weapon_mastery').selectedIndex * 
					(10 + document.querySelector('#t_level').selectedIndex * 5), 0.5, true)) / 3 * attack_speed).toFixed(2);
			document.querySelector('#t_damage').innerText = 'option - ' + 
				(10 + document.querySelector('#t_level').selectedIndex * 5) + ' stack per 1 weapon_mastery: ' + 
				(10 + document.querySelector('#t_level').selectedIndex * 5 + 
				document.querySelector('#weapon_mastery').selectedIndex * (10 + document.querySelector('#t_level').selectedIndex * 5)) + ' stack';
		} else if (character == Hyunwoo) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(100 + document.querySelector('#q_level').selectedIndex * 50, 0.4, true);
			document.querySelector('#w_damage').innerText = ' - ';
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(defense, 0, true) + ' ~ ' + 
				calcSkillDamage(defense + (character2 == undefined ? 0 : max_hp2 * (0.05 + document.querySelector('#e_level').selectedIndex * 0.03)), 0, true);
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(150 + document.querySelector('#r_level').selectedIndex * 75, 0.5, true) + ' ~ ' + 
				calcSkillDamage(600 + document.querySelector('#r_level').selectedIndex * 300, 2, true);
			document.querySelector('#t_damage').innerText = 'heal: ' + 
				(max_hp * (0.07 + document.querySelector('#t_level').selectedIndex * 0.04)).toFixed(2);
		} else if (character == Hart) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(80 + document.querySelector('#q_level').selectedIndex * 20, 0.3, true) + ' - ' + 
				calcSkillDamage(160 + document.querySelector('#q_level').selectedIndex * 40, 0.6, true);
			document.querySelector('#w_damage').innerText = 'dps: ' + 
				(((attack_power * (1.12 + document.querySelector('#w_level').selectedIndex * 0.07) * 1.3 * (100 + critical_strike_chance * (100 + critical_strike_damage) / 100) / 100) * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + (extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 3) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100 * attack_speed).toFixed(2);
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(20 + document.querySelector('#e_level').selectedIndex * 10, 0.4, true) + ', ' + 
				calcSkillDamage(20 + document.querySelector('#e_level').selectedIndex * 10, 0.4, true) + ' + ' + 
				calcSkillDamage(20 + document.querySelector('#e_level').selectedIndex * 10, 0.4, true) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#e_level').selectedIndex * 10, 0.4, true))) + 
				Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#e_level').selectedIndex * 10, 0.4, true) )) + 
				Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#e_level').selectedIndex * 10, 0.4, true)))) + ' )';
			document.querySelector('#r_damage').innerText = 'heal: ' + 
				(150 + document.querySelector('#t_level').selectedIndex * 50 + 
				max_hp * (0.1 + document.querySelector('#t_level').selectedIndex * 0.05)).toFixed(2);
			document.querySelector('#t_damage').innerText = ' - ';
		} else if (character == Isol) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(50 + document.querySelector('#q_level').selectedIndex * 25, 0.5, true) + ' + ' +  
				calcSkillDamage(8 + document.querySelector('#q_level').selectedIndex * 4, 0.3, true) + ' x 0 ~ 4 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(50 + document.querySelector('#q_level').selectedIndex * 25, 0.5, true))) + 
				Math.round(parseFloat(calcSkillDamage(8 + document.querySelector('#q_level').selectedIndex * 4, 0.3, true))) * 4) + ' )';
			document.querySelector('#w_damage').innerText = 
				calcSkillDamage(20 + document.querySelector('#w_level').selectedIndex * 10, 0.6, true) + ' x 4 ( ' + 
				Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#w_level').selectedIndex * 10, 0.6, true))) * 4 + ' )';
			document.querySelector('#e_damage').innerText = ' - ';
			document.querySelector('#r_damage').innerText = 
				((100 + document.querySelector('#r_level').selectedIndex * 50 + attack_power * 0.3) * 
				(1.04 + document.querySelector('#trap_mastery').selectedIndex * 0.04)).toFixed(2);
			document.querySelector('#t_damage').innerText = ' - ';
		} else if (character == Li_Dailin) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(20 + document.querySelector('#q_level').selectedIndex * 20, 0.5, true) + ' - ' + 
				calcSkillDamage(28 + document.querySelector('#q_level').selectedIndex * 28, 0.7, true) + ' x 3 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(28 + document.querySelector('#q_level').selectedIndex * 28, 0.7, true))) * 3) + ' )';
			document.querySelector('#w_damage').innerText = ' - ';
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(80 + document.querySelector('#e_level').selectedIndex * 55, 0.5, true);
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(40 + document.querySelector('#r_level').selectedIndex * 30, 0.2, true) + ' x 2 - 4 ~ ' + 
				calcSkillDamage(120 + document.querySelector('#r_level').selectedIndex * 90, 0.6, true) + ' x 2 - 4 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(40 + document.querySelector('#r_level').selectedIndex * 30, 0.2, true))) * 4)+ ' - ' + 
				(Math.round(parseFloat(calcSkillDamage(120 + document.querySelector('#r_level').selectedIndex * 90, 0.6, true))) * 4)+ ' )';
			document.querySelector('#t_damage').innerText = 
				baseAttackDamage(0, 1.5 + document.querySelector('#t_level').selectedIndex * 0.25, critical_strike_chance, 2, 0, true) + ' ( ' + 
				baseAttackDamage(0, 1, 0, 1, 0, true) + ', ' + baseAttackDamage(0, 0.5 + document.querySelector('#t_level').selectedIndex * 0.25, 0, 1, 0, true) + ' - ' + 
				baseAttackDamage(0, 1, 100, 1, 0, true) + ', ' + baseAttackDamage(0, 0.5 + document.querySelector('#t_level').selectedIndex * 0.25, 100, 1, 0, true) + ' )';
		} else if (character == Yuki) {
			document.querySelector('#q_damage').innerText = 
				baseAttackDamage(30 + document.querySelector('#q_level').selectedIndex * 25, 1, critical_strike_chance, 1, 0, true) + ' ( ' + 
				baseAttackDamage(30 + document.querySelector('#q_level').selectedIndex * 25, 1, 0, 1, 0, true) + ' - ' + 
				baseAttackDamage(30 + document.querySelector('#q_level').selectedIndex * 25, 1, 100, 1, 0, true) + ' )';
			document.querySelector('#w_damage').innerText = ' - ';
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(70 + document.querySelector('#e_level').selectedIndex * 50, 0.4, true);
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(250 + document.querySelector('#r_level').selectedIndex * 125, 1.5, true) + ', ' + 
				(character2 == undefined ? 0 : max_hp2 * (0.15 + document.querySelector('#r_level').selectedIndex * 0.05)).toFixed(2) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(250 + document.querySelector('#r_level').selectedIndex * 125, 1.5, true))) + 
				Math.round(parseFloat(character2 == undefined ? 0 : max_hp2 * (0.15 + document.querySelector('#r_level').selectedIndex * 0.05)))) + ' )';
			document.querySelector('#t_damage').innerText = 15 + document.querySelector('#t_level').selectedIndex * 15;
		} else if (character == Hyejin) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(100 + document.querySelector('#q_level').selectedIndex * 25, 0.4, true);
			document.querySelector('#w_damage').innerText = 
				calcSkillDamage(15 + document.querySelector('#w_level').selectedIndex * 5, 0.5, true) + ' - ' + 
				calcSkillDamage(140 + document.querySelector('#w_level').selectedIndex * 65, 0.5, true);
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(45 + document.querySelector('#e_level').selectedIndex * 25, 0.3, true) + ' + ' + 
				calcSkillDamage(50 + document.querySelector('#e_level').selectedIndex * 25, 0.5, true) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(45 + document.querySelector('#e_level').selectedIndex * 25, 0.3, true))) + 
				Math.round(parseFloat(calcSkillDamage(50 + document.querySelector('#e_level').selectedIndex * 25, 0.5, true)))) + ' )';
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(150 + document.querySelector('#r_level').selectedIndex * 125, 0.7, true) + ' + ' + 
				calcSkillDamage(80 + document.querySelector('#r_level').selectedIndex * 50, 0.5, true) + ' x 5 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(150 + document.querySelector('#r_level').selectedIndex * 125, 0.7, true))) + 
				Math.round(parseFloat(calcSkillDamage(80 + document.querySelector('#r_level').selectedIndex * 50, 0.5, true))) * 5) + ' )'; 
			document.querySelector('#t_damage').innerText = ' - ';
		} else if (character == Xiukai) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(80 + document.querySelector('#q_level').selectedIndex * 40, 0.5, true);
			document.querySelector('#w_damage').innerText = 
				calcSkillDamage(60 + document.querySelector('#w_level').selectedIndex * 40 + max_hp * 
					(0.03 + document.querySelector('#w_level').selectedIndex * 0.005), 0.4, true) + ' - ' + 
				calcSkillDamage(60 + document.querySelector('#w_level').selectedIndex * 40 + max_hp * 
					(0.06 + document.querySelector('#w_level').selectedIndex * 0.01), 0.4, true);
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(80 + document.querySelector('#e_level').selectedIndex * 30 + max_hp * 
					(0.015 + document.querySelector('#e_level').selectedIndex * 0.005) - 
					(document.querySelector('#e_level').selectedIndex == 4 ? 10 : 0), 0.4, true) + ' - ' + 
				calcSkillDamage(80 + document.querySelector('#e_level').selectedIndex * 30 + max_hp * 
					(0.03 + document.querySelector('#e_level').selectedIndex * 0.01) - 
					(document.querySelector('#e_level').selectedIndex == 4 ? 10 : 0), 0.4, true);
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(50 + document.querySelector('#r_level').selectedIndex * 50 + 
					2 + document.querySelector('#t_level').selectedIndex * 2 + 
					(2 + document.querySelector('#t_level').selectedIndex * 2) * document.querySelector('#level').selectedIndex, 0.5, true) + ' - ' + 
				calcSkillDamage2(50 + document.querySelector('#r_level').selectedIndex * 50 + 
					2 + document.querySelector('#t_level').selectedIndex * 2 + 
					(2 + document.querySelector('#t_level').selectedIndex * 2) * document.querySelector('#level').selectedIndex, 0.5,
					10 + document.querySelector('#r_level').selectedIndex * 5, true) + ' x 6 ( ' + 
				Math.round(parseFloat(calcSkillDamage2(50 + document.querySelector('#r_level').selectedIndex * 50 + 
					2 + document.querySelector('#t_level').selectedIndex * 2 + 
					(2 + document.querySelector('#t_level').selectedIndex * 2) * document.querySelector('#level').selectedIndex, 0.5,
					10 + document.querySelector('#r_level').selectedIndex * 5, true))) * 6 + ' )';
			document.querySelector('#t_damage').innerText = 'option - ' + 
				(2 + document.querySelector('#t_level').selectedIndex * 2) + ' stack per 1 level: ' + 
				(2 + document.querySelector('#t_level').selectedIndex * 2 + 
				(2 + document.querySelector('#t_level').selectedIndex * 2) * document.querySelector('#level').selectedIndex) + ' stack';
		} else if (character == Chiara) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(60 + document.querySelector('#q_level').selectedIndex * 40, 0.6, true);
			document.querySelector('#w_damage').innerText = 'd: ' + 
				calcSkillDamage(80 + document.querySelector('#w_level').selectedIndex * 40, 0.6, true) + ' / s: ' + 
				(100 + document.querySelector('#w_level').selectedIndex * 40 + attack_power * 0.6).toFixed(2);
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(60 + document.querySelector('#e_level').selectedIndex * 20, 0.3, true) + ', ' + 
				calcSkillDamage(70 + document.querySelector('#e_level').selectedIndex * 40, 0.7, true) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(60 + document.querySelector('#e_level').selectedIndex * 20, 0.3, true))) + 
				Math.round(parseFloat(calcSkillDamage(70 + document.querySelector('#e_level').selectedIndex * 40, 0.7, true)))) + ' )';
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(20 + document.querySelector('#r_level').selectedIndex * 7, 0.15, true) + ' x 12 + ' + 
				calcSkillDamage(200 + document.querySelector('#r_level').selectedIndex * 100, 1.2, true) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#r_level').selectedIndex * 7, 0.15, true))) * 12 + 
				Math.round(parseFloat(calcSkillDamage(200 + document.querySelector('#r_level').selectedIndex * 100, 1.2, true)))) + ' )';
			document.querySelector('#t_damage').innerText = 'DEF decreases: 0 ~ ' + 
				(character2 == undefined ? 0 : defense2 * (0.02 + document.querySelector('#t_level').selectedIndex * 0.02) * 4).toFixed(2);
		} else if (character == Sissela) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(40 + document.querySelector('#q_level').selectedIndex * 20, 0.3, true) + ', ' + 
				calcSkillDamage(60 + document.querySelector('#q_level').selectedIndex * 30, 0.5, true) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(40 + document.querySelector('#e_level').selectedIndex * 20, 0.3, true))) + 
				Math.round(parseFloat(calcSkillDamage(60 + document.querySelector('#e_level').selectedIndex * 30, 0.5, true)))) + ' )';
			document.querySelector('#w_damage').innerText = 
				calcSkillDamage(30 + document.querySelector('#w_level').selectedIndex * 60, 0.7, true);
			document.querySelector('#e_damage').innerText = 'd: ' + 
				calcSkillDamage(40 + document.querySelector('#e_level').selectedIndex * 40, 0.6, true) + ' / s: ' + 
				(60 + document.querySelector('#e_level').selectedIndex * 50 + attack_power * 0.5).toFixed(2);
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(75 + document.querySelector('#r_level').selectedIndex * 62.5, 0.5, true) + ' - ' + 
				calcSkillDamage(150 + document.querySelector('#r_level').selectedIndex * 125, 1, true);
			document.querySelector('#t_damage').innerText = 
				calcSkillDamage(18, 1.2, true) + ' _ Skill ampl: ' + (2 +  document.querySelector('#t_level').selectedIndex * 2) + ' ~ ' + 
				(10 + document.querySelector('#t_level').selectedIndex * 10) + ' / ' + 
				(4 +  document.querySelector('#t_level').selectedIndex * 4) + ' ~ ' + 
				(20 + document.querySelector('#t_level').selectedIndex * 20);
		} else if (character == Adriana) {
			document.querySelector('#q_damage').innerText = 
				(12 + document.querySelector('#t_level').selectedIndex * 3 + 
				attack_power * (0.1 + document.querySelector('#t_level').selectedIndex * 0.05)).toFixed(2) + ' x 9 ( ' + 
				Math.round(12 + document.querySelector('#t_level').selectedIndex * 3 + 
				attack_power * (0.1 + document.querySelector('#t_level').selectedIndex * 0.05)) * 9 + ' )';
			document.querySelector('#w_damage').innerText = ' - ';
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(4 + document.querySelector('#t_level').selectedIndex * 3, 0.15, true) + ' ~ ' + 
				Math.round(parseFloat(calcSkillDamage(4 + document.querySelector('#t_level').selectedIndex * 3, 0.15, true)) * 1.3) * 4;
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(70 + document.querySelector('#r_level').selectedIndex * 60, 0.4, true) + ' x 3 ( ' + 
				Math.round(parseFloat(calcSkillDamage(70 + document.querySelector('#r_level').selectedIndex * 60, 0.4, true))) * 3 + ' )';
			document.querySelector('#t_damage').innerText = 
				calcSkillDamage(4 + document.querySelector('#t_level').selectedIndex * 3, 0.15, true) + ' ~ ' + 
				Math.round(parseFloat(calcSkillDamage(4 + document.querySelector('#t_level').selectedIndex * 3, 0.15, true)) * 1.8) * 9;
		} else if (character == Shoichi) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(30 + document.querySelector('#q_level').selectedIndex * 45, 0.45, true)
			document.querySelector('#w_damage').innerText = 
				calcSkillDamage(10 + document.querySelector('#w_level').selectedIndex * 30, 0.3, true)
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(40 + document.querySelector('#e_level').selectedIndex * 35, 0.3, true)
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(50 + document.querySelector('#r_level').selectedIndex * 100, 0.3, true) + ', ' + 
				calcSkillDamage(50 + document.querySelector('#r_level').selectedIndex * 25, 0.3, true) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(50 + document.querySelector('#r_level').selectedIndex * 100, 0.3, true))) + 
				Math.round(parseFloat(calcSkillDamage(50 + document.querySelector('#r_level').selectedIndex * 25, 0.3, true)))) + ' )';
			document.querySelector('#t_damage').innerText = 
				calcSkillDamage(25 + document.querySelector('#t_level').selectedIndex * 35, 0.3, true);
		} else if (character == Silvia) {
			document.querySelector('#q_damage').innerText =  'd: ' + 
				calcSkillDamage(25 + document.querySelector('#q_level').selectedIndex * 25, 0.4, true) + ' / h: ' + 
				(40 + document.querySelector('#q_level').selectedIndex * 20 + attack_power * 0.3).toFixed(2) + ' / r: ' + 
				calcSkillDamage(60 + document.querySelector('#q_level').selectedIndex * 42, 0.5, true);
			document.querySelector('#w_damage').innerText = 
				calcSkillDamage(40 + document.querySelector('#w_level').selectedIndex * 20, 0.3, true) + ' / r: ' + 
				calcSkillDamage(90 + document.querySelector('#w_level').selectedIndex * 40, 0.6, true);
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(70 + document.querySelector('#e_level').selectedIndex * 15, 0.5, true) + ' ~ ' + 
				calcSkillDamage(154 + document.querySelector('#e_level').selectedIndex * 33, 0.5, true) + ' / r: ' + 
				calcSkillDamage(40 + document.querySelector('#e_level').selectedIndex * 25 + 
				movement_speed * (1.2 + document.querySelector('#r_level').selectedIndex * 0.05) * 
				(6 + document.querySelector('#e_level').selectedIndex * 4), 0.6, true);
			document.querySelector('#r_damage').innerText = ' - ';
			document.querySelector('#t_damage').innerText = ' - ';
		}
	} else {
		document.querySelector('#base_attack_damage').innerText = '0';
		document.querySelector('#dps').innerText = '0';
		document.querySelector('#lsps').innerText = '0';
		document.querySelector('#q_damage').innerText = '0';
		document.querySelector('#w_damage').innerText = '0';
		document.querySelector('#e_damage').innerText = '0';
		document.querySelector('#r_damage').innerText = '0';
		document.querySelector('#d_damage').innerText = '0';
		document.querySelector('#t_damage').innerText = '0';
	}
	
	if (weapon2 != undefined) {
		if (weapon2.Type == 'DualSwords') {
			document.querySelector('#base_attack_damage2').innerText = 
				baseAttackDamage(0, 2, critical_strike_chance2, 2, 0, false) + ' ( ' + 
				baseAttackDamage(0, 1, 0, 1, 0, false) + ', ' + baseAttackDamage(0, 1, 0, 1, 0, false) + ' - ' + 
				baseAttackDamage(0, 1, 100, 1, 0, false) + ', ' + baseAttackDamage(0, 1, 100, 1, 0, false) + ' )';
			document.querySelector('#dps2').innerText = 
				(parseFloat(baseAttackDamage(0, 2, critical_strike_chance2, 2, 0, false)) * attack_speed2).toFixed(2);
			document.querySelector('#lsps2').innerText = 
				(parseFloat(baseAttackDamage(0, 2, critical_strike_chance2, 2, 0, false)) * attack_speed2 * life_steal2 / 100 * 0.6).toFixed(2) + ' - ' + 
				(parseFloat(baseAttackDamage(0, 2, critical_strike_chance2, 2, 0, false)) * attack_speed2 * life_steal2 / 100).toFixed(2);
		} else if (weapon2.Type == 'AssaultRifle') {
			document.querySelector('#base_attack_damage2').innerText = 
				baseAttackDamage(0, 1.12, critical_strike_chance2, 3, 0, false) + ' ( ' + 
				baseAttackDamage(0, 0.32, 0, 1, 0, false) + ', ' + baseAttackDamage(0, 0.32, 0, 1, 0, false) + ', ' + baseAttackDamage(0, 0.48, 0, 1, 0, false) + ' - ' + 
				baseAttackDamage(0, 0.32, 100, 1, 0, false) + ', ' + baseAttackDamage(0, 0.32, 100, 1, 0, false) + ', ' + baseAttackDamage(0, 0.48, 100, 1, 0, false) + ' )';
			document.querySelector('#dps2').innerText = 
				(parseFloat(baseAttackDamage(0, 1.12, critical_strike_chance2, 3, 0, false)) * attack_speed2).toFixed(2);
			document.querySelector('#lsps2').innerText = 
				(parseFloat(baseAttackDamage(0, 1.12, critical_strike_chance2, 3, 0, false)) * attack_speed2 * life_steal2 / 100 * 0.6).toFixed(2) + ' - ' + 
				(parseFloat(baseAttackDamage(0, 1.12, critical_strike_chance2, 3, 0, false)) * attack_speed2 * life_steal2 / 100).toFixed(2);
		} else if (weapon2.Type == 'Guitar') {
			document.querySelector('#base_attack_damage2').innerText = 
				baseAttackDamage(0, 1.3, critical_strike_chance2, 3, 0, false) + ' ( ' + 
				baseAttackDamage(0, 1.3, 0, 1, 0, false) + ', ' + baseAttackDamage(0, 0.15, 0, 1, 0, false) + ', ' + baseAttackDamage(0, 0.15, 0, 1, 0, false) + ' - ' + 
				baseAttackDamage(0, 1.3, 100, 1, 0, false) + ', ' + baseAttackDamage(0, 0.15, 100, 1, 0, false) + ', ' + baseAttackDamage(0, 0.15, 100, 1, 0, false) + ' )';
			document.querySelector('#dps2').innerText = 
				(parseFloat(baseAttackDamage(0, 1.3, critical_strike_chance2, 3, 0, false)) * attack_speed2).toFixed(2);
			document.querySelector('#lsps2').innerText = 
				(parseFloat(baseAttackDamage(0, 1.3, critical_strike_chance2, 3, 0, false)) * attack_speed2 * life_steal2 / 100 * 0.6).toFixed(2) + ' - ' + 
				(parseFloat(baseAttackDamage(0, 1.3, critical_strike_chance2, 3, 0, false)) * attack_speed2 * life_steal2 / 100).toFixed(2);
		} else {
			document.querySelector('#base_attack_damage2').innerText = 
				baseAttackDamage(0, 1, critical_strike_chance2, 1, 0, false) + ' ( ' + baseAttackDamage(0, 1, 0, 1, 0, false) + ' - ' + baseAttackDamage(0, 1, 100, 1, 0, false) + ' )';
			document.querySelector('#dps2').innerText = 
				(parseFloat(baseAttackDamage(0, 1, critical_strike_chance2, 1, 0, false)) * attack_speed2).toFixed(2);
			document.querySelector('#lsps2').innerText = 
				(parseFloat(baseAttackDamage(0, 1, critical_strike_chance2, 1, 0, false)) * attack_speed2 * life_steal2 / 100 * 0.6).toFixed(2) + ' - ' + 
				(parseFloat(baseAttackDamage(0, 1, critical_strike_chance2, 1, 0, false)) * attack_speed2 * life_steal2 / 100).toFixed(2);
		}
		if (weapon2.Type == 'Dagger') {
			document.querySelector('#d_damage2').innerText = 
				baseAttackDamage(0, 1, 100, 1, 0, false) + ' ~ ' + 
				baseAttackDamage((character == undefined ? 0 : max_hp / 10), 1, 100, 1, 0, false);
		} else if (weapon2.Type == 'TwoHandedSword') {
			document.querySelector('#d_damage2').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 2.5 : 2, false);
		} else if (weapon2.Type == 'Axe') {
			document.querySelector('#d_damage2').innerText = 'AP increases: ' + 
				Math.round(attack_power2 * 0.02) + ' ~ ' + Math.round(attack_power2 * 0.1) + ' / ' + 
				Math.round(attack_power2 * 0.05) + ' ~ ' + Math.round(attack_power2 * 0.25) + ' - ' + 
				Math.round(attack_power2 * 0.15) + ' ~ ' + Math.round(attack_power2 * 0.75);
		} else if (weapon2.Type == 'DualSwords') {
			document.querySelector('#d_damage2').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 0.5 : 0.3, false) + ' x 6 x 2 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(0, document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 0.5 : 0.3, false))) * 12) + ' )';
		} else if (weapon2.Type == 'Pistol') {
			document.querySelector('#d_damage2').innerText = ' - ';
		} else if (weapon2.Type == 'AssaultRifle') {
			document.querySelector('#d_damage2').innerText = 'dps: ' + 
				(parseFloat(baseAttackDamage(0, 1.12, critical_strike_chance2, 3, 0, false)) * 
				(attack_speed2 + (character2.Atk_Speed + (weapon2 == undefined ? 0 : weapon2.Atk_Speed)) * 
				(document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 0.6 : 0.4))).toFixed(2);
		} else if (weapon2.Type == 'SniperRifle') {
			document.querySelector('#d_damage2').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 3 : 2.5, false);
		} else if (weapon2.Type == 'Rapier') {
			document.querySelector('#d_damage2').innerText = 
				calcSkillDamage(0, 2 + critical_strike_damage2 / 100, false);
		} else if (weapon2.Type == 'Spear') {
			document.querySelector('#d_damage2').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 1.5 : 1, false) + ', ' + 
				calcSkillDamage(0, document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 1.5 : 1, false) + ' ( ' + 
				Math.round(parseFloat(calcSkillDamage(0, document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 1.5 : 1, false))) * 2 + ' )'; 
		} else if (weapon2.Type == 'Hammer') {
			document.querySelector('#d_damage2').innerText = 
				calcSkillDamage(document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 300 + defense2 * 2 : 150 + defense2, 0, false);
		} else if (weapon2.Type == 'Bat') {
			document.querySelector('#d_damage2').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 3 : 2, false);
		} else if (weapon2.Type == 'Throws') {
			document.querySelector('#d_damage2').innerText = ' - ';
		} else if (weapon2.Type == 'Shuriken') {
			document.querySelector('#d_damage2').innerText = 
				calcSkillDamage(document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 110 : 180, 0.3, false) + ' + ' + 
				Math.round(parseFloat(calcSkillDamage(document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 110 : 180, 0.3, false) * 0.3)) + ' x 11 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 110 : 180, 0.3, false))) + 
				Math.round(parseFloat(calcSkillDamage(document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 110 : 180, 0.3, false) * 0.3)) * 11) + ' )';
		} else if (weapon2.Type == 'Bow') {
			document.querySelector('#d_damage2').innerText = 
				calcSkillDamage(document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 250 : 150, 1, false) + ' - ' + 
				calcSkillDamage(document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 500 : 300, 2, false);
		} else if (weapon2.Type == 'Crossbow') {
			document.querySelector('#d_damage2').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 1 : 0.6, false);
		} else if (weapon2.Type == 'Glove') {
			document.querySelector('#d_damage2').innerText = 
				(parseFloat(baseAttackDamage(0, 1, critical_strike_chance2, 1, 
					document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 
					parseFloat(baseAttackDamage(0, 1, critical_strike_chance2, 1, 0, false) * 2) : 
					parseFloat(baseAttackDamage(0, 1, critical_strike_chance2, 1, 0, false)), false)) + 
					(document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 100 : 50)).toFixed(2) + ' ( ' + 
				(parseFloat(baseAttackDamage(0, 1, 0, 1, 
					document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 
					parseFloat(baseAttackDamage(0, 1, 0, 1, 0, false) * 2) : 
					parseFloat(baseAttackDamage(0, 1, 0, 1, 0, false)), false)) + 
					(document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 100 : 50)).toFixed(2) + ' - ' + 
				(parseFloat(baseAttackDamage(0, 1, 100, 1, 
					document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 
					parseFloat(baseAttackDamage(0, 1, 100, 1, 0, false) * 2) : 
					parseFloat(baseAttackDamage(0, 1, 100, 1, 0, false)), false)) + 
					(document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 100 : 50)).toFixed(2) + ' )';
		} else if (weapon2.Type == 'Tonfa') {
			document.querySelector('#d_damage2').innerText = ' - ';
		} else if (weapon2.Type == 'Guitar') {
			document.querySelector('#d_damage2').innerText = 
				calcSkillDamage(0, document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 2 : 1.5, false);
		} else if (weapon2.Type == 'Nunchaku') {
			document.querySelector('#d_damage2').innerText = 
				calcSkillDamage(document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 250 : 125, 0.5, false) + ' ~ ' + 
				calcSkillDamage(document.querySelector('#weapon_mastery2').selectedIndex > 12 ? 600 : 300, 1.5, false);
		} else if (weapon2.Type == 'Whip') {
			document.querySelector('#d_damage2').innerText = ' - ';
		}
		if (character2 == Jackie) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(20 + document.querySelector('#q_level2').selectedIndex * 20, 0.45, false) + ', ' + 
				calcSkillDamage(30 + document.querySelector('#q_level2').selectedIndex * 20, 0.65, false) + ' + ' + 
				calcSkillDamage(80 + document.querySelector('#q_level2').selectedIndex * 30, 0, false) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#q_level2').selectedIndex * 20, 0.45, false))) + 
				Math.round(parseFloat(calcSkillDamage(30 + document.querySelector('#q_level2').selectedIndex * 20, 0.65, false) )) + 
				Math.round(parseFloat(calcSkillDamage(80 + document.querySelector('#q_level2').selectedIndex * 30, 0, false)))) + ' )';
			document.querySelector('#w_damage2').innerText = 'd: ' + 
				((attack_power2 * (0.1 + document.querySelector('#w_level2').selectedIndex * 0.1) * 
				100 / (100 + (character == undefined ? 0 : defense))) * 
				(100 + extra_normal_attack_damage_percent2 - (character == undefined ? 0 : normal_attack_damage_reduction_percent)) / 100).toFixed(2) + ' / h: ' + 
				(12 + document.querySelector('#w_level2').selectedIndex * 7 + attack_power2 * 0.1).toFixed(2);
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(10 + document.querySelector('#q_level2').selectedIndex * 70, 
					0.3 + document.querySelector('#q_level2').selectedIndex * 0.1, false)
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(document.querySelector('#r_level2').selectedIndex == 0 ? 300 : 
					document.querySelector('#r_level2').selectedIndex == 1 ? 500 : 800, 0.7, false) + ' _ dps: ' + 
				(parseFloat(baseAttackDamage(0, 1, critical_strike_chance2, 1, 0, false)) * 
				(attack_speed2 + (character2.Atk_Speed + (weapon2 == undefined ? 0 : weapon2.Atk_Speed)) * 
				(0.3 + document.querySelector('#r_level2').selectedIndex * 0.05)) * (weapon2.Type == 'DualSwords' ? 2 : 1)).toFixed(2);
			document.querySelector('#t_damage2').innerText = 'AP increases: ' + 
				(document.querySelector('#t_level2').selectedIndex == 0 ? Math.round(attack_power2 * 0.03) + ' ~ ' + Math.round(attack_power2 * 0.08) : 
				document.querySelector('#t_level2').selectedIndex == 1 ? Math.round(attack_power2 * 0.08) + ' ~ ' + Math.round(attack_power2 * 0.2) : 
				Math.round(attack_power2 * 0.15) + ' ~ ' + Math.round(attack_power2 * 0.4));
		} else if (character2 == Aya) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(0, 1, false) + ', ' + calcSkillDamage(20 + document.querySelector('#q_level2').selectedIndex * 40, 0.5, false) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(0, 1, false))) + 
				Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#q_level2').selectedIndex * 40, 0.5, false)))) + ' )';
			document.querySelector('#w_damage2').innerText = 
				calcSkillDamage(22 + document.querySelector('#w_level2').selectedIndex * 22, 0.25 + 
					document.querySelector('#w_level2').selectedIndex * 0.05, false) + ' x 10 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(22 + document.querySelector('#w_level2').selectedIndex * 22, 0.25 + 
					document.querySelector('#w_level2').selectedIndex * 0.05, false))) * 10) + ' )';
			document.querySelector('#e_damage2').innerText = ' - ';
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(200 + document.querySelector('#r_level2').selectedIndex * 150, 0.7, false);
			document.querySelector('#t_damage2').innerText = 'shield: ' + 
				(150 + document.querySelector('#t_level2').selectedIndex * 50 + attack_power2 * 0.1);
		} else if (character2 == Fiora) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(40 + document.querySelector('#q_level2').selectedIndex * 40, 0.2, false) + ' - ' + 
				calcSkillDamage(80 + document.querySelector('#q_level2').selectedIndex * 80, 0.4, false);
			document.querySelector('#w_damage2').innerText = 
				baseAttackDamage(0, 0.8 + document.querySelector('#w_level2').selectedIndex * 0.25, critical_strike_chance2, 2, 0, false) + ' ( ' + 
				baseAttackDamage(0, 0.6 + document.querySelector('#w_level2').selectedIndex * 0.1, 0, 1, 0, false) + ', ' + 
				baseAttackDamage(0, 0.2 + document.querySelector('#w_level2').selectedIndex * 0.15, 0, 1, 0, false) + ' - ' + 
				baseAttackDamage(0, 0.6 + document.querySelector('#w_level2').selectedIndex * 0.1, 100, 1, 0, false) + ', ' + 
				baseAttackDamage(0, 0.2 + document.querySelector('#w_level2').selectedIndex * 0.15, 100, 1, 0, false) + ' )';
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(90 + document.querySelector('#e_level2').selectedIndex * 40, 0.5, false);
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(30 + document.querySelector('#r_level2').selectedIndex * 5, 
					0.1 + document.querySelector('#r_level2').selectedIndex * 0.1, false) + ' _ dps: ' + 
				(parseFloat(calcSkillDamage(30 + document.querySelector('#r_level2').selectedIndex * 5, 
					0.1 + document.querySelector('#r_level2').selectedIndex * 0.1, false)) * attack_speed2).toFixed(2);
			document.querySelector('#t_damage2').innerText = ' - ';
		} else if (character2 == Magnus) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(40 + document.querySelector('#q_level2').selectedIndex * 60, 0.6, false);
			document.querySelector('#w_damage2').innerText = 
				calcSkillDamage(10 + parseInt((document.querySelector('#w_level2').selectedIndex + 1) / 2) * 10 + defense2 * 0.3, 0.3, false) + ' x ' + 
				(6 + parseInt(document.querySelector('#w_level2').selectedIndex / 2));
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(60 + document.querySelector('#e_level2').selectedIndex * 55, 0.4, false);
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(200 + document.querySelector('#r_level2').selectedIndex * 200, 2, false);
			document.querySelector('#t_damage2').innerText = 'DEF increases: 0 ~ ' + 
				defense2 * (0.2 + document.querySelector('#t_level2').selectedIndex * 0.15);
		} else if (character2 == Zahir) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(40 + document.querySelector('#q_level2').selectedIndex * 60, 0.5, false) + ' - ' + 
				calcSkillDamage(75 + document.querySelector('#q_level2').selectedIndex * 75, 0.5, false);
			document.querySelector('#w_damage2').innerText = 
				calcSkillDamage(40 + document.querySelector('#w_level2').selectedIndex * 20, 0.3, false);
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(80 + document.querySelector('#e_level2').selectedIndex * 30, 0.5, false);
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(60 + document.querySelector('#r_level2').selectedIndex * 90, 0.5, false) + ' + ' + 
				calcSkillDamage(30 + document.querySelector('#r_level2').selectedIndex * 45, 0.5, false) + ' x 4 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(60 + document.querySelector('#r_level2').selectedIndex * 90, 0.5, false))) + 
				Math.round(parseFloat(calcSkillDamage(30 + document.querySelector('#r_level2').selectedIndex * 45, 0.5, false))) * 4) + ' )'; 
			document.querySelector('#t_damage2').innerText = 
				calcSkillDamage(10 + document.querySelector('#t_level2').selectedIndex * 25, 0.3, false);
		} else if (character2 == Nadine) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(70 + document.querySelector('#q_level2').selectedIndex * 45 + 
					10 + document.querySelector('#t_level2').selectedIndex * 5 + document.querySelector('#weapon_mastery2').selectedIndex * 
					(10 + document.querySelector('#t_level2').selectedIndex * 5), 0.6, false) + ' - ' + 
				calcSkillDamage(140 + document.querySelector('#q_level2').selectedIndex * 90 + 
					10 + document.querySelector('#t_level2').selectedIndex * 5 + document.querySelector('#weapon_mastery2').selectedIndex * 
					(10 + document.querySelector('#t_level2').selectedIndex * 5), 1.2, false);
			document.querySelector('#w_damage2').innerText = 
				calcSkillDamage(100 + document.querySelector('#r_level2').selectedIndex * 70, 0.6, false) + ', ' + 
				calcSkillDamage(100 + document.querySelector('#r_level2').selectedIndex * 70, 0.6, false) + ', ' + 
				calcSkillDamage(100 + document.querySelector('#r_level2').selectedIndex * 40, 0.6, false);
			document.querySelector('#e_damage2').innerText = 'dps: ' + 
				(parseFloat(baseAttackDamage(0, 1, critical_strike_chance2, 1, 0, false)) * 
				(attack_speed2 + (character2.Atk_Speed + (weapon2 == undefined ? 0 : weapon2.Atk_Speed)) * 
				(0.2 + document.querySelector('#e_level2').selectedIndex * 0.1))).toFixed(2);
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(50 + document.querySelector('#r_level2').selectedIndex * 50 + 
					10 + document.querySelector('#t_level2').selectedIndex * 5 + document.querySelector('#weapon_mastery2').selectedIndex * 
					(10 + document.querySelector('#t_level2').selectedIndex * 5), 0.5, false) + ' _ dps: ' + 
					(parseFloat(calcSkillDamage(50 + document.querySelector('#r_level2').selectedIndex * 50 + 
					10 + document.querySelector('#t_level2').selectedIndex * 5 + document.querySelector('#weapon_mastery2').selectedIndex * 
					(10 + document.querySelector('#t_level2').selectedIndex * 5), 0.5, false)) / 3 * attack_speed2).toFixed(2);
			document.querySelector('#t_damage2').innerText = 'option - ' + 
				(10 + document.querySelector('#t_level2').selectedIndex * 5) + ' stack per 1 weapon_mastery: ' + 
				(10 + document.querySelector('#t_level2').selectedIndex * 5 + 
				document.querySelector('#weapon_mastery2').selectedIndex * (10 + document.querySelector('#t_level2').selectedIndex * 5)) + ' stack';
		} else if (character2 == Hyunwoo) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(100 + document.querySelector('#q_level2').selectedIndex * 50, 0.4, false);
			document.querySelector('#w_damage2').innerText = ' - ';
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(defense2, 0, false) + ' ~ ' + 
				calcSkillDamage(defense2 + (character == undefined ? 0 : max_hp * (0.05 + document.querySelector('#e_level2').selectedIndex * 0.03)), 0, false);
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(150 + document.querySelector('#r_level2').selectedIndex * 75, 0.5, false) + ' ~ ' + 
				calcSkillDamage(600 + document.querySelector('#r_level2').selectedIndex * 300, 2, false);
			document.querySelector('#t_damage2').innerText = 'heal: ' + 
				(max_hp2 * (0.07 + document.querySelector('#t_level2').selectedIndex * 0.04)).toFixed(2);
		} else if (character2 == Hart) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(80 + document.querySelector('#q_level2').selectedIndex * 20, 0.3, false) + ' - ' + 
				calcSkillDamage(160 + document.querySelector('#q_level2').selectedIndex * 40, 0.6, false);
			document.querySelector('#w_damage2').innerText = 'dps: ' + 
				(((attack_power2 * (1.12 + document.querySelector('#w_level2').selectedIndex * 0.07) * 1.3 * (100 + critical_strike_chance2 * (100 + critical_strike_damage2) / 100) / 100) * 
				100 / (100 + (character == undefined ? 0 : defense)) + (extra_normal_attack_damage2 - (character == undefined ? 0 : normal_attack_damage_reduction)) * 3) * 
				(100 + extra_normal_attack_damage_percent2 - (character == undefined ? 0 : normal_attack_damage_reduction_percent)) / 100 * attack_speed2).toFixed(2);
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(20 + document.querySelector('#e_level2').selectedIndex * 10, 0.4, false) + ', ' + 
				calcSkillDamage(20 + document.querySelector('#e_level2').selectedIndex * 10, 0.4, false) + ' + ' + 
				calcSkillDamage(20 + document.querySelector('#e_level2').selectedIndex * 10, 0.4, false) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#e_level2').selectedIndex * 10, 0.4, false))) + 
				Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#e_level2').selectedIndex * 10, 0.4, false) )) + 
				Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#e_level2').selectedIndex * 10, 0.4, false)))) + ' )';
			document.querySelector('#r_damage2').innerText = 'heal: ' + 
				(150 + document.querySelector('#t_level2').selectedIndex * 50 + 
				max_hp2 * (0.1 + document.querySelector('#t_level2').selectedIndex * 0.05)).toFixed(2);
			document.querySelector('#t_damage2').innerText = ' - ';
		} else if (character2 == Isol) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(50 + document.querySelector('#q_level2').selectedIndex * 25, 0.5, false) + ' + ' +  
				calcSkillDamage(8 + document.querySelector('#q_level2').selectedIndex * 4, 0.3, false) + ' x 0 ~ 4 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(50 + document.querySelector('#q_level2').selectedIndex * 25, 0.5, false))) + 
				Math.round(parseFloat(calcSkillDamage(8 + document.querySelector('#q_level2').selectedIndex * 4, 0.3, false))) * 4) + ' )';
			document.querySelector('#w_damage2').innerText = 
				calcSkillDamage(20 + document.querySelector('#w_level2').selectedIndex * 10, 0.6, false) + ' x 4 ( ' + 
				Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#w_level2').selectedIndex * 10, 0.6, false))) * 4 + ' )';
			document.querySelector('#e_damage2').innerText = ' - ';
			document.querySelector('#r_damage2').innerText = 
				((100 + document.querySelector('#r_level2').selectedIndex * 50 + attack_power2 * 0.3) * 
				(1.04 + document.querySelector('#trap_mastery2').selectedIndex * 0.04)).toFixed(2);
			document.querySelector('#t_damage2').innerText = ' - ';
		} else if (character2 == Li_Dailin) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(20 + document.querySelector('#q_level2').selectedIndex * 20, 0.5, false) + ' - ' + 
				calcSkillDamage(28 + document.querySelector('#q_level2').selectedIndex * 28, 0.7, false) + ' x 3 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(28 + document.querySelector('#q_level2').selectedIndex * 28, 0.7, false))) * 3) + ' )';
			document.querySelector('#w_damage2').innerText = ' - ';
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(80 + document.querySelector('#e_level2').selectedIndex * 55, 0.5, false);
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(40 + document.querySelector('#r_level2').selectedIndex * 30, 0.2, false) + ' x 2 - 4 ~ ' + 
				calcSkillDamage(120 + document.querySelector('#r_level2').selectedIndex * 90, 0.6, false) + ' x 2 - 4 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(40 + document.querySelector('#r_level2').selectedIndex * 30, 0.2, false))) * 4)+ ' - ' + 
				(Math.round(parseFloat(calcSkillDamage(120 + document.querySelector('#r_level2').selectedIndex * 90, 0.6, false))) * 4)+ ' )';
			document.querySelector('#t_damage2').innerText = 
				baseAttackDamage(0, 1.5 + document.querySelector('#t_level2').selectedIndex * 0.25, critical_strike_chance2, 2, 0, false) + ' ( ' + 
				baseAttackDamage(0, 1, 0, 1, 0, false) + ', ' + baseAttackDamage(0, 0.5 + document.querySelector('#t_level2').selectedIndex * 0.25, 0, 1, 0, false) + ' - ' + 
				baseAttackDamage(0, 1, 100, 1, 0, false) + ', ' + baseAttackDamage(0, 0.5 + document.querySelector('#t_level2').selectedIndex * 0.25, 100, 1, 0, false) + ' )';
		} else if (character2 == Yuki) {
			document.querySelector('#q_damage2').innerText = 
				baseAttackDamage(30 + document.querySelector('#q_level2').selectedIndex * 25, 1, critical_strike_chance2, 1, 0, false) + ' ( ' + 
				baseAttackDamage(30 + document.querySelector('#q_level2').selectedIndex * 25, 1, 0, 1, 0, false) + ' - ' + 
				baseAttackDamage(30 + document.querySelector('#q_level2').selectedIndex * 25, 1, 100, 1, 0, false) + ' )';
			document.querySelector('#w_damage2').innerText = ' - ';
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(70 + document.querySelector('#e_level2').selectedIndex * 50, 0.4, false);
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(250 + document.querySelector('#r_level2').selectedIndex * 125, 1.5, false) + ', ' + 
				(character2 == undefined ? 0 : max_hp2 * (0.15 + document.querySelector('#r_level2').selectedIndex * 0.05)).toFixed(2) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(250 + document.querySelector('#r_level2').selectedIndex * 125, 1.5, false))) + 
				Math.round(parseFloat(character == undefined ? 0 : max_hp * (0.15 + document.querySelector('#r_level2').selectedIndex * 0.05)))) + ' )';
			document.querySelector('#t_damage2').innerText = 15 + document.querySelector('#t_level2').selectedIndex * 15;
		} else if (character2 == Hyejin) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(100 + document.querySelector('#q_level2').selectedIndex * 25, 0.4, false);
			document.querySelector('#w_damage2').innerText = 
				calcSkillDamage(15 + document.querySelector('#w_level2').selectedIndex * 5, 0.5, false) + ' - ' + 
				calcSkillDamage(140 + document.querySelector('#w_level2').selectedIndex * 65, 0.5, false);
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(45 + document.querySelector('#e_level2').selectedIndex * 25, 0.3, false) + ' + ' + 
				calcSkillDamage(50 + document.querySelector('#e_level2').selectedIndex * 25, 0.5, false) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(45 + document.querySelector('#e_level2').selectedIndex * 25, 0.3, false))) + 
				Math.round(parseFloat(calcSkillDamage(50 + document.querySelector('#e_level2').selectedIndex * 25, 0.5, false)))) + ' )';
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(150 + document.querySelector('#r_level2').selectedIndex * 125, 0.7, false) + ' + ' + 
				calcSkillDamage(80 + document.querySelector('#r_level2').selectedIndex * 50, 0.5, false) + ' x 5 ( ' + 
				(Math.round(parseFloat(calcSkillDamage(150 + document.querySelector('#r_level2').selectedIndex * 125, 0.7, false))) + 
				Math.round(parseFloat(calcSkillDamage(80 + document.querySelector('#r_level2').selectedIndex * 50, 0.5, false))) * 5) + ' )'; 
			document.querySelector('#t_damage2').innerText = ' - ';
		} else if (character2 == Xiukai) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(80 + document.querySelector('#q_level2').selectedIndex * 40, 0.5, false);
			document.querySelector('#w_damage2').innerText = 
				calcSkillDamage(60 + document.querySelector('#w_level2').selectedIndex * 40 + max_hp2 * 
					(0.03 + document.querySelector('#w_level2').selectedIndex * 0.005), 0.4, false) + ' - ' + 
				calcSkillDamage(60 + document.querySelector('#w_level2').selectedIndex * 40 + max_hp2 * 
					(0.06 + document.querySelector('#w_level2').selectedIndex * 0.01), 0.4, false);
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(80 + document.querySelector('#e_level2').selectedIndex * 30 + max_hp2 * 
					(0.015 + document.querySelector('#e_level2').selectedIndex * 0.005) - 
					(document.querySelector('#e_level2').selectedIndex == 4 ? 10 : 0), 0.4, false) + ' - ' + 
				calcSkillDamage(80 + document.querySelector('#e_level2').selectedIndex * 30 + max_hp2 * 
					(0.03 + document.querySelector('#e_level2').selectedIndex * 0.01) - 
					(document.querySelector('#e_level2').selectedIndex == 4 ? 10 : 0), 0.4, false);
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(50 + document.querySelector('#r_level2').selectedIndex * 50 + 
					2 + document.querySelector('#t_level2').selectedIndex * 2 + 
					(2 + document.querySelector('#t_level2').selectedIndex * 2) * document.querySelector('#level2').selectedIndex, 0.5, false) + ' - ' + 
				calcSkillDamage2(50 + document.querySelector('#r_level2').selectedIndex * 50 + 
					2 + document.querySelector('#t_level2').selectedIndex * 2 + 
					(2 + document.querySelector('#t_level2').selectedIndex * 2) * document.querySelector('#level2').selectedIndex, 0.5,
					10 + document.querySelector('#r_level2').selectedIndex * 5, false) + ' x 6 ( ' + 
				Math.round(parseFloat(calcSkillDamage2(50 + document.querySelector('#r_level2').selectedIndex * 50 + 
					2 + document.querySelector('#t_level2').selectedIndex * 2 + 
					(2 + document.querySelector('#t_level2').selectedIndex * 2) * document.querySelector('#level2').selectedIndex, 0.5,
					10 + document.querySelector('#r_level2').selectedIndex * 5, false))) * 6 + ' )';
			document.querySelector('#t_damage2').innerText = 'option - ' + 
				(2 + document.querySelector('#t_level2').selectedIndex * 2) + ' stack per 1 level: ' + 
				(2 + document.querySelector('#t_level2').selectedIndex * 2 + 
				(2 + document.querySelector('#t_level2').selectedIndex * 2) * document.querySelector('#level2').selectedIndex) + ' stack';
		} else if (character2 == Chiara) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(60 + document.querySelector('#q_level2').selectedIndex * 40, 0.6, false);
			document.querySelector('#w_damage2').innerText = 'd: ' + 
				calcSkillDamage(80 + document.querySelector('#w_level2').selectedIndex * 40, 0.6, false) + ' / s: ' + 
				(100 + document.querySelector('#w_level2').selectedIndex * 40 + attack_power2 * 0.6).toFixed(2);
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(60 + document.querySelector('#e_level2').selectedIndex * 20, 0.3, false) + ', ' + 
				calcSkillDamage(70 + document.querySelector('#e_level2').selectedIndex * 40, 0.7, false) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(60 + document.querySelector('#e_level2').selectedIndex * 20, 0.3, false))) + 
				Math.round(parseFloat(calcSkillDamage(70 + document.querySelector('#e_level2').selectedIndex * 40, 0.7, false)))) + ' )';
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(20 + document.querySelector('#r_level2').selectedIndex * 7, 0.15, false) + ' x 12 + ' + 
				calcSkillDamage(200 + document.querySelector('#r_level2').selectedIndex * 100, 1.2, false) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(20 + document.querySelector('#r_level2').selectedIndex * 7, 0.15, false))) * 12 + 
				Math.round(parseFloat(calcSkillDamage(200 + document.querySelector('#r_level2').selectedIndex * 100, 1.2, false)))) + ' )';
			document.querySelector('#t_damage2').innerText = 'DEF decreases: 0 ~ ' + 
				(character == undefined ? 0 : defense * (0.02 + document.querySelector('#t_level2').selectedIndex * 0.02) * 4).toFixed(2);
		} else if (character2 == Sissela) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(40 + document.querySelector('#q_level2').selectedIndex * 20, 0.3, false) + ', ' + 
				calcSkillDamage(60 + document.querySelector('#q_level2').selectedIndex * 30, 0.5, false) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(40 + document.querySelector('#e_level2').selectedIndex * 20, 0.3, false))) + 
				Math.round(parseFloat(calcSkillDamage(60 + document.querySelector('#e_level2').selectedIndex * 30, 0.5, false)))) + ' )';
			document.querySelector('#w_damage2').innerText = 
				calcSkillDamage(30 + document.querySelector('#w_level2').selectedIndex * 60, 0.7, false);
			document.querySelector('#e_damage2').innerText = 'd: ' + 
				calcSkillDamage(40 + document.querySelector('#e_level2').selectedIndex * 40, 0.6, false) + ' / s: ' + 
				(60 + document.querySelector('#e_level2').selectedIndex * 50 + attack_power2 * 0.5).toFixed(2);
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(75 + document.querySelector('#r_level2').selectedIndex * 62.5, 0.5, false) + ' - ' + 
				calcSkillDamage(150 + document.querySelector('#r_level2').selectedIndex * 125, 1, false);
			document.querySelector('#t_damage2').innerText = 
				calcSkillDamage(18, 1.2, false) + ' _ Skill ampl: ' + (2 +  document.querySelector('#t_level2').selectedIndex * 2) + ' ~ ' + 
				(10 + document.querySelector('#t_level2').selectedIndex * 10) + ' / ' + 
				(4 +  document.querySelector('#t_level2').selectedIndex * 4) + ' ~ ' + 
				(20 + document.querySelector('#t_level2').selectedIndex * 20);
		} else if (character2 == Adriana) {
			document.querySelector('#q_damage2').innerText = 
				(12 + document.querySelector('#t_level2').selectedIndex * 3 + 
				attack_power2 * (0.1 + document.querySelector('#t_level2').selectedIndex * 0.05)).toFixed(2) + ' x 9 ( ' + 
				Math.round(12 + document.querySelector('#t_level2').selectedIndex * 3 + 
				attack_power2 * (0.1 + document.querySelector('#t_level2').selectedIndex * 0.05)) * 9 + ' )';
			document.querySelector('#w_damage2').innerText = ' - ';
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(4 + document.querySelector('#t_level2').selectedIndex * 3, 0.15, false) + ' ~ ' + 
				Math.round(parseFloat(calcSkillDamage(4 + document.querySelector('#t_level2').selectedIndex * 3, 0.15, false)) * 1.3) * 4;
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(70 + document.querySelector('#r_level2').selectedIndex * 60, 0.4, false) + ' x 3 ( ' + 
				Math.round(parseFloat(calcSkillDamage(70 + document.querySelector('#r_level2').selectedIndex * 60, 0.4, false))) * 3 + ' )';
			document.querySelector('#t_damage2').innerText = 
				calcSkillDamage(4 + document.querySelector('#t_level2').selectedIndex * 3, 0.15, false) + ' ~ ' + 
				Math.round(parseFloat(calcSkillDamage(4 + document.querySelector('#t_level2').selectedIndex * 3, 0.15, false)) * 1.8) * 9;
		} else if (character2 == Shoichi) {
			document.querySelector('#q_damage2').innerText = 
				calcSkillDamage(30 + document.querySelector('#q_level2').selectedIndex * 45, 0.45, false)
			document.querySelector('#w_damage2').innerText = 
				calcSkillDamage(10 + document.querySelector('#w_level2').selectedIndex * 30, 0.3, false)
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(40 + document.querySelector('#e_level2').selectedIndex * 35, 0.3, false)
			document.querySelector('#r_damage2').innerText = 
				calcSkillDamage(50 + document.querySelector('#r_level2').selectedIndex * 100, 0.3, false) + ', ' + 
				calcSkillDamage(50 + document.querySelector('#r_level2').selectedIndex * 25, 0.3, false) + ' ( ' + 
				(Math.round(parseFloat(calcSkillDamage(50 + document.querySelector('#r_level2').selectedIndex * 100, 0.3, false))) + 
				Math.round(parseFloat(calcSkillDamage(50 + document.querySelector('#r_level2').selectedIndex * 25, 0.3, false)))) + ' )';
			document.querySelector('#t_damage2').innerText = 
				calcSkillDamage(25 + document.querySelector('#t_level2').selectedIndex * 35, 0.3, false);
		} else if (character2 == Silvia) {
			document.querySelector('#q_damage2').innerText =  'd: ' + 
				calcSkillDamage(25 + document.querySelector('#q_level2').selectedIndex * 25, 0.4, false) + ' / h: ' + 
				(40 + document.querySelector('#q_level2').selectedIndex * 20 + attack_power2 * 0.3).toFixed(2) + ' / r: ' + 
				calcSkillDamage(60 + document.querySelector('#q_level2').selectedIndex * 42, 0.5, false);
			document.querySelector('#w_damage2').innerText = 
				calcSkillDamage(40 + document.querySelector('#w_level2').selectedIndex * 20, 0.3, false) + ' / r: ' + 
				calcSkillDamage(90 + document.querySelector('#w_level2').selectedIndex * 40, 0.6, false);
			document.querySelector('#e_damage2').innerText = 
				calcSkillDamage(70 + document.querySelector('#e_level2').selectedIndex * 15, 0.5, false) + ' ~ ' + 
				calcSkillDamage(154 + document.querySelector('#e_level2').selectedIndex * 33, 0.5, false) + ' / r: ' + 
				calcSkillDamage(40 + document.querySelector('#e_level2').selectedIndex * 25 + 
				movement_speed2 * (1.2 + document.querySelector('#r_level2').selectedIndex * 0.05) * 
				(6 + document.querySelector('#e_level2').selectedIndex * 4), 0.6, false);
			document.querySelector('#r_damage2').innerText = ' - ';
			document.querySelector('#t_damage2').innerText = ' - ';
		}
	} else {
		document.querySelector('#base_attack_damage2').innerText = '0';
		document.querySelector('#dps2').innerText = '0';
		document.querySelector('#lsps2').innerText = '0';
		document.querySelector('#q_damage2').innerText = '0';
		document.querySelector('#w_damage2').innerText = '0';
		document.querySelector('#e_damage2').innerText = '0';
		document.querySelector('#r_damage2').innerText = '0';
		document.querySelector('#d_damage2').innerText = '0';
		document.querySelector('#t_damage2').innerText = '0';
	}
}
