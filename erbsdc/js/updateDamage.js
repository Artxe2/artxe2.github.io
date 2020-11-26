function updateDamage() {
	if (weapon != undefined) {	
		//(공격력 * 계수 * (100 + 크확 * (100 + 크뎀증) / 100) / 100 / (100 + 적 방어력) + 기공추 - 적 기감) * (100 + 뎀증 - 적 뎀감) / 100
		//(공격력 * 계수 / (100 + 적 방어력) + 기공추 - 적 기감) * (100 + 뎀증 - 적 뎀감) / 100
		//(공격력 * 계수 * (200 + 크뎀증) / 100 / (100 + 적 방어력) + 기공추 - 적 기감) * (100 + 뎀증 - 적 뎀감) / 100
		if (weapon.Type == 'dagger') {
			document.querySelector('#base_attack_damage').innerText = 
				((attack_power * 100 * (100 + critical_strike_chance * (100 + critical_strike_damage) / 100) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ' (' + 
				((attack_power * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ' - ' + 
				((attack_power * 100 * (200 + critical_strike_damage) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ') x 2';
			document.querySelector('#dps').innerText = 
				((attack_power * 100 * (100 + critical_strike_chance * (100 + critical_strike_damage) / 100) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100 * attack_speed * 2).toFixed(2);
		} else if (weapon.Type == 'AssaultRifle') {
			document.querySelector('#base_attack_damage').innerText = 
				((attack_power * 105 * (100 + critical_strike_chance * (100 + critical_strike_damage) / 100) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + (extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 3) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ' (' + 
				((attack_power * 
				30 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ', ' +
				((attack_power * 
				30 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ', ' +
				((attack_power * 
				45 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ' - ' + 
				((attack_power * 30 * (200 + critical_strike_damage) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ', ' +
				((attack_power * 30 * (200 + critical_strike_damage) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ', ' +
				((attack_power * 45 * (200 + critical_strike_damage) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ')';
			document.querySelector('#dps').innerText = 
				((attack_power * 105 * (100 + critical_strike_chance * (100 + critical_strike_damage) / 100) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + (extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 3) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100 * attack_speed).toFixed(2);
		} else if (weapon.Type == 'Guitar') {
			document.querySelector('#base_attack_damage').innerText = 
				((attack_power * 130 * (100 + critical_strike_chance * (100 + critical_strike_damage) / 100) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + (extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 3) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ' (' + 
				((attack_power * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ', ' +
				((attack_power * 
				15 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ', ' +
				((attack_power * 
				15 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ' - ' + 
				((attack_power * 100 * (200 + critical_strike_damage) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ', ' +
				((attack_power * 15 * (200 + critical_strike_damage) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ', ' +
				((attack_power * 15 * (200 + critical_strike_damage) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ')';
			document.querySelector('#dps').innerText = ((attack_power * 130 * (100 + critical_strike_chance * (100 + critical_strike_damage) / 100) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + (extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 3) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100 * attack_speed).toFixed(2);
		} else {
			document.querySelector('#base_attack_damage').innerText = 
				((attack_power * 100 * (100 + critical_strike_chance * (100 + critical_strike_damage) / 100) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ' (' + 
				((attack_power * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ' - ' + 
				((attack_power * 100 * (200 + critical_strike_damage) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ')';
			document.querySelector('#dps').innerText = 
				((attack_power * 100 * (100 + critical_strike_chance * (100 + critical_strike_damage) / 100) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100 * attack_speed).toFixed(2);
		}	
		if (weapon.type == 'dagger') {
		} else if (weapon.type == 'twoHandedSword') {
		} else if (weapon.type == 'axe') {
		} else if (weapon.type == 'dualSwords') {
		} else if (weapon.type == 'pistol') {
		} else if (weapon.type == 'assaultRifle') {
			document.querySelector('#d_damage').innerText = 'dps - ' + 
				((attack_power * 105 * (100 + critical_strike_chance * (100 + critical_strike_damage) / 100) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + (extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 3) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100 * 
				(attack_speed + (character.Atk_Speed + (weapon == undefined ? 0 : weapon.Atk_Speed)) * (document.querySelector('#weapon_mastery').selectedIndex > 12 ? 0.6 : 0.4))).toFixed(2);
		} else if (weapon.type == 'sniperRifle') {
		} else if (weapon.type == 'rapier') {
		} else if (weapon.type == 'spear') {
		} else if (weapon.type == 'hammer') {
		} else if (weapon.type == 'bat') {
		} else if (weapon.type == 'throws') {
		} else if (weapon.type == 'shuriken') {	
		} else if (weapon.type == 'bow') {
		} else if (weapon.type == 'crossbow') {
		} else if (weapon.type == 'glove') {
			document.querySelector('#d_damage').innerText = 
				((attack_power * (document.querySelector('#weapon_mastery').selectedIndex > 12 ? 200 : 100) * (100 + critical_strike_chance * (100 + critical_strike_damage) / 100) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + 
				(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 100 :  50) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ' (' + 
				((attack_power * (document.querySelector('#weapon_mastery').selectedIndex > 12 ? 200 : 100) / 
				(100 + (character2 == undefined ? 0 : defense2)) + 
				(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 100 : 50) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ' - ' + 
				((attack_power * (document.querySelector('#weapon_mastery').selectedIndex > 12 ? 200 : 100) * (200 + critical_strike_damage) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + 
				(document.querySelector('#weapon_mastery').selectedIndex > 12 ? 100 : 50) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ')';
		} else if (weapon.type == 'tonfa') {
		} else if (weapon.type == 'guitar') {	
		} else if (weapon.type == 'nunchaku') {
		} else if (weapon.type == 'whip') {
		}
		if (character == Jackie) {
		} else if (character == Aya) {
			document.querySelector('#q_damage').innerText = 
				((attack_power * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + skill_amplification - (character2 == undefined ? 0 : skill_damage_reduction2)) * 
				(100 + skill_amplification_percent - (character2 == undefined ? 0 : skill_damage_reduction_percent2)) / 100).toFixed(2) + ', ' + 
				(((20 + document.querySelector('#q_level').selectedIndex * 40 + attack_power * 0.5) * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + skill_amplification - (character2 == undefined ? 0 : skill_damage_reduction2)) * 
				(100 + skill_amplification_percent - (character2 == undefined ? 0 : skill_damage_reduction_percent2)) / 100).toFixed(2);
			document.querySelector('#w_damage').innerText = 
				(((22 + document.querySelector('#w_level').selectedIndex * 22 + attack_power * (0.25 + document.querySelector('#w_level').selectedIndex * 0.05)) * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + skill_amplification - (character2 == undefined ? 0 : skill_damage_reduction2)) * 
				(100 + skill_amplification_percent - (character2 == undefined ? 0 : skill_damage_reduction_percent2)) / 100).toFixed(2) + ' x 10';
			document.querySelector('#e_damage').innerText = ' - ';
			document.querySelector('#r_damage').innerText = 
				(((200 + document.querySelector('#r_level').selectedIndex * 150 + attack_power * 0.7) * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + skill_amplification - (character2 == undefined ? 0 : skill_damage_reduction2)) * 
				(100 + skill_amplification_percent - (character2 == undefined ? 0 : skill_damage_reduction_percent2)) / 100).toFixed(2);
			document.querySelector('#t_damage').innerText = 'shield - ' + (150 + document.querySelector('#t_level').selectedIndex * 50 + attack_power * 0.1);
		} else if (character == Fiora) {
		} else if (character == Magnus) {
		} else if (character == Zahir) {
		} else if (character == Nadine) {
		} else if (character == Hyunwoo) {
		} else if (character == Hart) {
		} else if (character == Isol) {
		} else if (character == Li_Dailin) {
			document.querySelector('#q_damage').innerText = 
				(((20 + document.querySelector('#q_level').selectedIndex * 20 + attack_power * 0.5) * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + skill_amplification - (character2 == undefined ? 0 : skill_damage_reduction2)) * 
				(100 + skill_amplification_percent - (character2 == undefined ? 0 : skill_damage_reduction_percent2)) / 100).toFixed(2) + ' - ' + 
				(((28 + document.querySelector('#q_level').selectedIndex * 28 + attack_power * 0.7) * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + skill_amplification - (character2 == undefined ? 0 : skill_damage_reduction2)) * 
				(100 + skill_amplification_percent - (character2 == undefined ? 0 : skill_damage_reduction_percent2)) / 100).toFixed(2);
			document.querySelector('#w_damage').innerText = ' - ';
			document.querySelector('#e_damage').innerText = 
				(((80 + document.querySelector('#e_level').selectedIndex * 55 + attack_power * 0.5) * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + skill_amplification - (character2 == undefined ? 0 : skill_damage_reduction2)) * 
				(100 + skill_amplification_percent - (character2 == undefined ? 0 : skill_damage_reduction_percent2)) / 100).toFixed(2);
			document.querySelector('#r_damage').innerText = 
				(((40 + document.querySelector('#r_level').selectedIndex * 30 + attack_power * 0.2) * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + skill_amplification - (character2 == undefined ? 0 : skill_damage_reduction2)) * 
				(100 + skill_amplification_percent - (character2 == undefined ? 0 : skill_damage_reduction_percent2)) / 100).toFixed(2) + ' - ' + 
				(((120 + document.querySelector('#r_level').selectedIndex * 90 + attack_power * 0.6) * 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + skill_amplification - (character2 == undefined ? 0 : skill_damage_reduction2)) * 
				(100 + skill_amplification_percent - (character2 == undefined ? 0 : skill_damage_reduction_percent2)) / 100).toFixed(2) + ' x2 x4';
			document.querySelector('#t_damage').innerText = 
				((attack_power * (50 + document.querySelector('#t_level').selectedIndex * 25) * (100 + critical_strike_chance * (100 + critical_strike_damage) / 100) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ' (' + 
				((attack_power * (50 + document.querySelector('#t_level').selectedIndex * 25) / 
				(100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ' - ' + 
				((attack_power * (50 + document.querySelector('#t_level').selectedIndex * 25) * (200 + critical_strike_damage) / 
				100 / (100 + (character2 == undefined ? 0 : defense2)) + extra_normal_attack_damage - (character2 == undefined ? 0 : normal_attack_damage_reduction2)) * 
				(100 + extra_normal_attack_damage_percent - (character2 == undefined ? 0 : normal_attack_damage_reduction_percent2)) / 100).toFixed(2) + ')';
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
