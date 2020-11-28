function baseAttackDamage(base, coe, cri, onhit, extra, isPlayer1) {
	if (isPlayer1) {
		return (((base + attack_power * coe * (100 + cri * (100 + critical_strike_damage) / 100) / 100) * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra + (extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * onhit) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2);
	}
	return (((base + attack_power2 * coe * (100 + cri * (100 + critical_strike_damage2) / 100) / 100) * 
			100 / (100 + (character == undefined ? 0 : defense)) + extra + (extra_normal_attack_damage2 - (character == undefined ? 0 : normal_attack_damage_reduction)) * onhit) * 
			(100 + extra_normal_attack_damage_percent2 - (character == undefined ? 0 : normal_attack_damage_reduction_percent)) / 100).toFixed(2);
}
function calcSkillDamage(base, coe, isPlayer1) {
	if (isPlayer1) {
		return (((base + attack_power * coe) * 100 / (100 + (character2 == undefined ? 0 : defense2)) + 
			skill_amplification - (character2 == undefined ? 0 : skill_damage_reduction2)) * 
			(100 + skill_amplification_percent - (character2 == undefined ? 0 : skill_damage_reduction_percent2)) / 100).toFixed(2);
	}
	return (((base + attack_power * coe) * 100 / (100 + (character == undefined ? 0 : defense)) + 
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
		} else if (weapon.Type == 'AssaultRifle') {
			document.querySelector('#base_attack_damage').innerText = 
				baseAttackDamage(0, 1.05, critical_strike_chance, 3, 0, true) + ' ( ' + 
				baseAttackDamage(0, 0.3, 0, 1, 0, true) + ', ' + baseAttackDamage(0, 0.3, 0, 1, 0, true) + ', ' + baseAttackDamage(0, 0.45, 0, 1, 0, true) + ' - ' + 
				baseAttackDamage(0, 0.3, 100, 1, 0, true) + ', ' + baseAttackDamage(0, 0.3, 100, 1, 0, true) + ', ' + baseAttackDamage(0, 0.45, 100, 1, 0, true) + ' )';
			document.querySelector('#dps').innerText = 
				(parseFloat(baseAttackDamage(0, 1.05, critical_strike_chance, 3, 0, true)) * attack_speed).toFixed(2);
		} else if (weapon.Type == 'Guitar') {
			document.querySelector('#base_attack_damage').innerText = 
				baseAttackDamage(0, 1.3, critical_strike_chance, 3, 0, true) + ' ( ' + 
				baseAttackDamage(0, 1, 0, 1, 0, true) + ', ' + baseAttackDamage(0, 0.15, 0, 1, 0, true) + ', ' + baseAttackDamage(0, 0.15, 0, 1, 0, true) + ' - ' + 
				baseAttackDamage(0, 1, 100, 1, 0, true) + ', ' + baseAttackDamage(0, 0.15, 100, 1, 0, true) + ', ' + baseAttackDamage(0, 0.15, 100, 1, 0, true) + ' )';
			document.querySelector('#dps').innerText = 
				(parseFloat(baseAttackDamage(0, 1.3, critical_strike_chance, 3, 0, true)) * attack_speed).toFixed(2);
		} else {
			document.querySelector('#base_attack_damage').innerText = 
				baseAttackDamage(0, 1, critical_strike_chance, 1, 0, true) + ' ( ' + baseAttackDamage(0, 1, 0, 1, 0, true) + ' - ' + baseAttackDamage(0, 1, 100, 1, 0, true) + ' )';
			document.querySelector('#dps').innerText = 
				(parseFloat(baseAttackDamage(0, 1, critical_strike_chance, 1, 0, true)) * attack_speed).toFixed(2);
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
				(parseFloat(baseAttackDamage(0, 1.05, critical_strike_chance, 3, 0, true)) * 
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
				calcSkillDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 1.5 : 1, true);
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
				baseAttackDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 2 : 1, 
					critical_strike_chance, 1, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 100 : 50, true) + ' ( ' + 
				baseAttackDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 2 : 1, 0, 1, 
					document.querySelector('#weapon_mastery').selectedIndex > 12 ? 100 : 50, true) + ' - ' + 
				baseAttackDamage(0, document.querySelector('#weapon_mastery').selectedIndex > 12 ? 2 : 1, 100, 1, 
					document.querySelector('#weapon_mastery').selectedIndex > 12 ? 100 : 50, true) + ' )';
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
				(0.3 + document.querySelector('#r_level').selectedIndex * 0.05))).toFixed(2);;
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
				calcSkillDamage(90 + document.querySelector('#q_level').selectedIndex * 40, 0.5, true) + ', ' + 
				calcSkillDamage(90 + document.querySelector('#q_level').selectedIndex * 40, 0.5, true) + ' ( ' + 
				Math.round(parseFloat(calcSkillDamage(90 + document.querySelector('#q_level').selectedIndex * 40, 0.5, true))) * 2 + ' )';
			document.querySelector('#r_damage').innerText = 
				(((30 + attack_power * 0.1 + document.querySelector('#r_level').selectedIndex * (5 + attack_power * 0.1)) * 
				100 / (100 + (character2 == undefined ? 0 : defense2))) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2);
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
			document.querySelector('#t_damage').innerText = 'option: ' + 
				(10 + document.querySelector('#t_level').selectedIndex * 5) + ' stack per 1 weapon_mastery - ' + (10 + document.querySelector('#t_level').selectedIndex * 5 + document.querySelector('#weapon_mastery').selectedIndex * (10 + document.querySelector('#t_level').selectedIndex * 5));
		} else if (character == Hyunwoo) {
			document.querySelector('#q_damage').innerText = 
				calcSkillDamage(100 + document.querySelector('#q_level').selectedIndex * 50, 0.4, true);
			document.querySelector('#w_damage').innerText = ' - ';
			document.querySelector('#e_damage').innerText = 
				calcSkillDamage(defense, 0, true) + ' ~ ' + calcSkillDamage(defense + (character2 == undefined ? 0 : max_hp2 * (0.05 + document.querySelector('#e_level').selectedIndex * 0.03)), 0, true);
			document.querySelector('#r_damage').innerText = 
				calcSkillDamage(150 + document.querySelector('#r_level').selectedIndex * 75, 0.5, true) + ' ~ ' + 
				calcSkillDamage(600 + document.querySelector('#r_level').selectedIndex * 300, 2, true);
			document.querySelector('#t_damage').innerText = 'heal: ' + 
				(max_hp * (0.07 + document.querySelector('#t_level').selectedIndex * 0.04)).toFixed(2);
		} else if (character == Hart) {
		} else if (character == Isol) {
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
				baseAttackDamage(0, 1.5 + document.querySelector('#t_level').selectedIndex * 25, critical_strike_chance, 2, 0, true) + ' ( ' + 
				baseAttackDamage(0, 1, 0, 1, 0, true) + ', ' + baseAttackDamage(0, 50 + document.querySelector('#t_level').selectedIndex * 25, 0, 1, 0, true) + ' - ' + 
				baseAttackDamage(0, 1, 100, 1, 0, true) + ', ' + baseAttackDamage(0, 50 + document.querySelector('#t_level').selectedIndex * 25, 100, 1, 0, true) + ' )';
		} else if (character == Yuki) {
		} else if (character == Hyejin) {
		} else if (character == Xiukai) {
		} else if (character == Chiara) {
		} else if (character == Sissela) {
		} else if (character == Adriana) {
		} else if (character == Shoichi) {
		}
	} else {
		document.querySelector('#base_attack_damage').innerText = '0';
		document.querySelector('#dps').innerText = '0';
		document.querySelector('#q_damage').innerText = '0';
		document.querySelector('#w_damage').innerText = '0';
		document.querySelector('#e_damage').innerText = '0';
		document.querySelector('#r_damage').innerText = '0';
		document.querySelector('#d_damage').innerText = '0';
		document.querySelector('#t_damage').innerText = '0';
	}
}
