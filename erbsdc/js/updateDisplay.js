function updateDisplay() {
	if (character == undefined) {
		alert('select character plz...');
	} else {
		attack_power = character.Attack_Power + 
			character.Attack_Power_Growth * document.querySelector('#level').selectedIndex + 
			((weapon == undefined ? 0 : weapon.Attack_Power) + 
			(chest == undefined ? 0 : chest.Attack_Power) + 
			(head == undefined ? 0 : head.Attack_Power) + 
			(arm == undefined ? 0 : arm.Attack_Power) + 
			(leg == undefined ? 0 : leg.Attack_Power) + 
			(accessory == undefined ? 0 : accessory.Attack_Power)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		document.querySelector('#attack_power').innerText = (attack_power).toFixed(2);
		attack_speed = (character.Atk_Speed + (weapon == undefined ? 0 : weapon.Atk_Speed)) * 
			(100 + (weapon == undefined ? 0 : weapon_mastery_attack_speed + 
			document.querySelector('#weapon_mastery').selectedIndex * 
			weapon_mastery_attack_speed) + 
			((weapon == undefined ? 0 : weapon.Attack_Speed) + 
			(chest == undefined ? 0 : chest.Attack_Speed) + 
			(head == undefined ? 0 : head.Attack_Speed) + 
			(arm == undefined ? 0 : arm.Attack_Speed) + 
			(leg == undefined ? 0 : leg.Attack_Speed) + 
			(accessory == undefined ? 0 : accessory.Attack_Speed)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007)) / 100;
		document.querySelector('#attack_speed').innerText = (attack_speed).toFixed(2);
		critical_strike_chance = 
			((weapon == undefined ? 0 : weapon.Critical_Strike_Chance) + 
			(chest == undefined ? 0 : chest.Critical_Strike_Chance) + 
			(head == undefined ? 0 : head.Critical_Strike_Chance) + 
			(arm == undefined ? 0 : arm.Critical_Strike_Chance) + 
			(leg == undefined ? 0 : leg.Critical_Strike_Chance) + 
			(accessory == undefined ? 0 : accessory.Critical_Strike_Chance)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		document.querySelector('#critical_strike_chance').innerText = (critical_strike_chance).toFixed(2) + '%';
		critical_strike_damage = 
			((weapon == undefined ? 0 : weapon.Critical_Strike_Damage) + 
			(chest == undefined ? 0 : chest.Critical_Strike_Damage) + 
			(head == undefined ? 0 : head.Critical_Strike_Damage) + 
			(arm == undefined ? 0 : arm.Critical_Strike_Damage) + 
			(leg == undefined ? 0 : leg.Critical_Strike_Damage) + 
			(accessory == undefined ? 0 : accessory.Critical_Strike_Damage)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		document.querySelector('#critical_strike_damage').innerText = (critical_strike_damage).toFixed(2) + '%';
		life_steal = 
			((weapon == undefined ? 0 : weapon.Life_Steal) + 
			(chest == undefined ? 0 : chest.Life_Steal) + 
			(head == undefined ? 0 : head.Life_Steal) + 
			(arm == undefined ? 0 : arm.Life_Steal) + 
			(leg == undefined ? 0 : leg.Life_Steal) + 
			(accessory == undefined ? 0 : accessory.Life_Steal)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		document.querySelector('#life_steal').innerText = (life_steal).toFixed(2) + '%';
		extra_normal_attack_damage = 
			((weapon == undefined ? 0 : weapon.Extra_Normal_Attack_Damage) + 
			(chest == undefined ? 0 : chest.Extra_Normal_Attack_Damage) + 
			(head == undefined ? 0 : head.Extra_Normal_Attack_Damage) + 
			(arm == undefined ? 0 : arm.Extra_Normal_Attack_Damage) + 
			(leg == undefined ? 0 : leg.Extra_Normal_Attack_Damage) + 
			(accessory == undefined ? 0 : accessory.Extra_Normal_Attack_Damage)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		extra_normal_attack_damage_percent = weapon == undefined ? 0 : weapon_mastery_extra_normal_attack_damage_percent + 
			document.querySelector('#weapon_mastery').selectedIndex * 
			weapon_mastery_extra_normal_attack_damage_percent;
		document.querySelector('#extra_normal_attack_damage').innerText = 
			(extra_normal_attack_damage).toFixed(2) + '| ' + (extra_normal_attack_damage_percent).toFixed(2) + '%';
		skill_amplification = 
			((weapon == undefined ? 0 : weapon.Skill_Amplification) + 
			(chest == undefined ? 0 : chest.Skill_Amplification) + 
			(head == undefined ? 0 : head.Skill_Amplification) + 
			(arm == undefined ? 0 : arm.Skill_Amplification) + 
			(leg == undefined ? 0 : leg.Skill_Amplification) + 
			(accessory == undefined ? 0 : accessory.Skill_Amplification)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		skill_amplification_percent = 
			(weapon == undefined ? 0 : weapon_mastery_skill_damage_reduction_percent + 
			document.querySelector('#weapon_mastery').selectedIndex * 
			weapon_mastery_skill_damage_reduction_percent) + 
			((weapon == undefined ? 0 : weapon.Skill_Amplification_Percent) + 
			(chest == undefined ? 0 : chest.Skill_Amplification_Percent) + 
			(head == undefined ? 0 : head.Skill_Amplification_Percent) + 
			(arm == undefined ? 0 : arm.Skill_Amplification_Percent) + 
			(leg == undefined ? 0 : leg.Skill_Amplification_Percent) + 
			(accessory == undefined ? 0 : accessory.Skill_Amplification_Percent)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		document.querySelector('#skill_amplification').innerText = 
			(skill_amplification).toFixed(2) + '| ' + (skill_amplification_percent).toFixed(2) + '%';
		cooldown_reduction = 
			((weapon == undefined ? 0 : weapon.Cooldown_Reduction) + 
			(chest == undefined ? 0 : chest.Cooldown_Reduction) + 
			(head == undefined ? 0 : head.Cooldown_Reduction) + 
			(arm == undefined ? 0 : arm.Cooldown_Reduction) + 
			(leg == undefined ? 0 : leg.Cooldown_Reduction) + 
			(accessory == undefined ? 0 : accessory.Cooldown_Reduction)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		document.querySelector('#cooldown_reduction').innerText = (cooldown_reduction).toFixed(2) + '%';
		sp_regen = 
			character.Stamina_Regen + character.Stamina_Regen_Growth * document.querySelector('#level').selectedIndex + 
			((weapon == undefined ? 0 : weapon.SP_Regen) + 
			(chest == undefined ? 0 : chest.SP_Regen) + 
			(head == undefined ? 0 : head.SP_Regen) + 
			(arm == undefined ? 0 : arm.SP_Regen) + 
			(leg == undefined ? 0 : leg.SP_Regen) + 
			(accessory == undefined ? 0 : accessory.SP_Regen)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		sp_regen_percent = 
			((weapon == undefined ? 0 : weapon.SP_Regen_Percent) + 
			(chest == undefined ? 0 : chest.SP_Regen_Percent) + 
			(head == undefined ? 0 : head.SP_Regen_Percent) + 
			(arm == undefined ? 0 : arm.SP_Regen_Percent) + 
			(leg == undefined ? 0 : leg.SP_Regen_Percent) + 
			(accessory == undefined ? 0 : accessory.SP_Regen_Percent)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		document.querySelector('#sp_regen').innerText = 
			(sp_regen).toFixed(2) + '| ' + (sp_regen_percent).toFixed(2) + '%';
		skill_damage_reduction = 
			((weapon == undefined ? 0 : weapon.Skill_Damage_Reduction) + 
			(chest == undefined ? 0 : chest.Skill_Damage_Reduction) + 
			(head == undefined ? 0 : head.Skill_Damage_Reduction) + 
			(arm == undefined ? 0 : arm.Skill_Damage_Reduction) + 
			(leg == undefined ? 0 : leg.Skill_Damage_Reduction) + 
			(accessory == undefined ? 0 : accessory.Skill_Damage_Reduction)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		skill_damage_reduction_percent = 
			1 + document.querySelector('#defense_mastery').selectedIndex * 1 + 
			((weapon == undefined ? 0 : weapon.Skill_Damage_Reduction_Percent) + 
			(chest == undefined ? 0 : chest.Skill_Damage_Reduction_Percent) + 
			(head == undefined ? 0 : head.Skill_Damage_Reduction_Percent) + 
			(arm == undefined ? 0 : arm.Skill_Damage_Reduction_Percent) + 
			(leg == undefined ? 0 : leg.Skill_Damage_Reduction_Percent) + 
			(accessory == undefined ? 0 : accessory.Skill_Damage_Reduction_Percent)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		document.querySelector('#skill_damage_reduction').innerText = 
			(skill_damage_reduction).toFixed(2) + '| ' + (skill_damage_reduction_percent).toFixed(2) + '%';
		defense = 
			character.Defense + character.Defense_Growth * document.querySelector('#level').selectedIndex + 
			((weapon == undefined ? 0 : weapon.Defense) + 
			(chest == undefined ? 0 : chest.Defense) + 
			(head == undefined ? 0 : head.Defense) + 
			(arm == undefined ? 0 : arm.Defense) + 
			(leg == undefined ? 0 : leg.Defense) + 
			(accessory == undefined ? 0 : accessory.Defense)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		document.querySelector('#defense').innerText = (defense).toFixed(2);
		max_hp = 
			(character.Health + character.Health_Growth * document.querySelector('#level').selectedIndex + 
			((weapon == undefined ? 0 : weapon.Max_HP) + 
			(chest == undefined ? 0 : chest.Max_HP) + 
			(head == undefined ? 0 : head.Max_HP) + 
			(arm == undefined ? 0 : arm.Max_HP) + 
			(leg == undefined ? 0 : leg.Max_HP) + 
			(accessory == undefined ? 0 : accessory.Max_HP)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007)) * 
			(1.013 + document.querySelector('#health_mastery').selectedIndex * 0.013) + 
			(character != Xiukai ? 0 : (2 + document.querySelector('#t_level').selectedIndex * 2 + 
				(2 + document.querySelector('#t_level').selectedIndex * 2) * document.querySelector('#level').selectedIndex) * 8);
		document.querySelector('#max_hp').innerText = (max_hp).toFixed(2);
		max_sp = 
			(character.Stamina + character.Stamina_Growth * document.querySelector('#level').selectedIndex + 
			((weapon == undefined ? 0 : weapon.Max_SP) + 
			(chest == undefined ? 0 : chest.Max_SP) + 
			(head == undefined ? 0 : head.Max_SP) + 
			(arm == undefined ? 0 : arm.Max_SP) + 
			(leg == undefined ? 0 : leg.Max_SP) + 
			(accessory == undefined ? 0 : accessory.Max_SP)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007)) * 
			(1 + document.querySelector('#meditation_mastery').selectedIndex * 0.04);
		document.querySelector('#max_sp').innerText = (max_sp).toFixed(2);
		hp_regen = 
			character.Health_Regen + character.Health_Regen_Growth * document.querySelector('#level').selectedIndex + 
			((weapon == undefined ? 0 : weapon.HP_Regen) + 
			(chest == undefined ? 0 : chest.HP_Regen) + 
			(head == undefined ? 0 : head.HP_Regen) + 
			(arm == undefined ? 0 : arm.HP_Regen) + 
			(leg == undefined ? 0 : leg.HP_Regen) + 
			(accessory == undefined ? 0 : accessory.HP_Regen)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		hp_regen_percent = 
			((weapon == undefined ? 0 : weapon.HP_Regen_Percent) + 
			(chest == undefined ? 0 : chest.HP_Regen_Percent) + 
			(head == undefined ? 0 : head.HP_Regen_Percent) + 
			(arm == undefined ? 0 : arm.HP_Regen_Percent) + 
			(leg == undefined ? 0 : leg.HP_Regen_Percent) + 
			(accessory == undefined ? 0 : accessory.HP_Regen_Percent)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		document.querySelector('#hp_regen').innerText = 
			(hp_regen).toFixed(2) + '| ' + (hp_regen_percent).toFixed(2) + '%';
		normal_attack_damage_reduction = 
			((weapon == undefined ? 0 : weapon.Normal_Attack_Damage_Reduction) + 
			(chest == undefined ? 0 : chest.Normal_Attack_Damage_Reduction) + 
			(head == undefined ? 0 : head.Normal_Attack_Damage_Reduction) + 
			(arm == undefined ? 0 : arm.Normal_Attack_Damage_Reduction) + 
			(leg == undefined ? 0 : leg.Normal_Attack_Damage_Reduction) + 
			(accessory == undefined ? 0 : accessory.Normal_Attack_Damage_Reduction)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		normal_attack_damage_reduction_percent = 1.3 + document.querySelector('#defense_mastery').selectedIndex * 1.3;
		document.querySelector('#normal_attack_damage_reduction').innerText = 
			(normal_attack_damage_reduction).toFixed(2) + '| ' + (normal_attack_damage_reduction_percent).toFixed(2) + '%';
		movement_speed = 
			character.Move_Speed + 0.01 + 
			document.querySelector('#move_mastery').selectedIndex * 0.01 + 
			((weapon == undefined ? 0 : weapon.Move_Speed) + 
			(chest == undefined ? 0 : chest.Move_Speed) + 
			(head == undefined ? 0 : head.Move_Speed) + 
			(arm == undefined ? 0 : arm.Move_Speed) + 
			(leg == undefined ? 0 : leg.Move_Speed) + 
			(accessory == undefined ? 0 : accessory.Move_Speed)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		document.querySelector('#movement_speed').innerText = (movement_speed).toFixed(2);
		out_of_combat_movement_speed = 
			0.02 + document.querySelector('#move_mastery').selectedIndex * 0.02 + 
			((weapon == undefined ? 0 : weapon.Out_of_Combat_Movement_Speed) + 
			(chest == undefined ? 0 : chest.Out_of_Combat_Movement_Speed) + 
			(head == undefined ? 0 : head.Out_of_Combat_Movement_Speed) + 
			(arm == undefined ? 0 : arm.Out_of_Combat_Movement_Speed) + 
			(leg == undefined ? 0 : leg.Out_of_Combat_Movement_Speed) + 
			(accessory == undefined ? 0 : accessory.Out_of_Combat_Movement_Speed)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		document.querySelector('#out_of_combat_movement_speed').innerText = (out_of_combat_movement_speed).toFixed(2);
		vision_range = 
			(character.Sight_Range + 0.1 + 
			document.querySelector('#search_mastery').selectedIndex * 0.1 + 
			((weapon == undefined ? 0 : weapon.Vision_Range) + 
			(chest == undefined ? 0 : chest.Vision_Range) + 
			(head == undefined ? 0 : head.Vision_Range) + 
			(arm == undefined ? 0 : arm.Vision_Range) + 
			(leg == undefined ? 0 : leg.Vision_Range) + 
			(accessory == undefined ? 0 : accessory.Vision_Range)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007));
		document.querySelector('#vision_range').innerText = (vision_range).toFixed(2);
		attack_range = 
			character.Attack_Range + (weapon == undefined ? 0 : weapon.Base_Range) + 
			((weapon == undefined ? 0 : weapon.Attack_Range) + 
			(chest == undefined ? 0 : chest.Attack_Range) + 
			(head == undefined ? 0 : head.Attack_Range) + 
			(arm == undefined ? 0 : arm.Attack_Range) + 
			(leg == undefined ? 0 : leg.Attack_Range) + 
			(accessory == undefined ? 0 : accessory.Attack_Range)) * 
			(1.007 + document.querySelector('#craft_mastery').selectedIndex * 0.007);
		document.querySelector('#attack_range').innerText = (attack_range).toFixed(2);
	}
	updateDamage();
	closeItemList();
}
function updateDisplay2() {
	if (character2 == undefined) {
		alert('select character2 plz...');
	} else {
		attack_power2 = character2.Attack_Power + 
			character2.Attack_Power_Growth * document.querySelector('#level2').selectedIndex + 
			((weapon2 == undefined ? 0 : weapon2.Attack_Power) + 
			(chest2 == undefined ? 0 : chest2.Attack_Power) + 
			(head2 == undefined ? 0 : head2.Attack_Power) + 
			(arm2 == undefined ? 0 : arm2.Attack_Power) + 
			(leg2 == undefined ? 0 : leg2.Attack_Power) + 
			(accessory2 == undefined ? 0 : accessory2.Attack_Power)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		document.querySelector('#attack_power2').innerText = (attack_power2).toFixed(2);
		attack_speed2 = (character2.Atk_Speed + (weapon2 == undefined ? 0 : weapon2.Atk_Speed)) * 
			(100 + (weapon2 == undefined ? 0 : weapon_mastery_attack_speed2 + 
			document.querySelector('#weapon_mastery2').selectedIndex * 
			weapon_mastery_attack_speed2) + 
			((weapon2 == undefined ? 0 : weapon2.Attack_Speed) + 
			(chest2 == undefined ? 0 : chest2.Attack_Speed) + 
			(head2 == undefined ? 0 : head2.Attack_Speed) + 
			(arm2 == undefined ? 0 : arm2.Attack_Speed) + 
			(leg2 == undefined ? 0 : leg2.Attack_Speed) + 
			(accessory2 == undefined ? 0 : accessory2.Attack_Speed)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007)) / 100;
		document.querySelector('#attack_speed2').innerText = (attack_speed2).toFixed(2);
		critical_strike_chance2 = 
			((weapon2 == undefined ? 0 : weapon2.Critical_Strike_Chance) + 
			(chest2 == undefined ? 0 : chest2.Critical_Strike_Chance) + 
			(head2 == undefined ? 0 : head2.Critical_Strike_Chance) + 
			(arm2 == undefined ? 0 : arm2.Critical_Strike_Chance) + 
			(leg2 == undefined ? 0 : leg2.Critical_Strike_Chance) + 
			(accessory2 == undefined ? 0 : accessory2.Critical_Strike_Chance)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		document.querySelector('#critical_strike_chance2').innerText = (critical_strike_chance2).toFixed(2) + '%';
		critical_strike_damage2 = 
			((weapon2 == undefined ? 0 : weapon2.Critical_Strike_Damage) + 
			(chest2 == undefined ? 0 : chest2.Critical_Strike_Damage) + 
			(head2 == undefined ? 0 : head2.Critical_Strike_Damage) + 
			(arm2 == undefined ? 0 : arm2.Critical_Strike_Damage) + 
			(leg2 == undefined ? 0 : leg2.Critical_Strike_Damage) + 
			(accessory2 == undefined ? 0 : accessory2.Critical_Strike_Damage)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		document.querySelector('#critical_strike_damage2').innerText = (critical_strike_damage2).toFixed(2) + '%';
		life_steal2 = 
			((weapon2 == undefined ? 0 : weapon2.Life_Steal) + 
			(chest2 == undefined ? 0 : chest2.Life_Steal) + 
			(head2 == undefined ? 0 : head2.Life_Steal) + 
			(arm2 == undefined ? 0 : arm2.Life_Steal) + 
			(leg2 == undefined ? 0 : leg2.Life_Steal) + 
			(accessory2 == undefined ? 0 : accessory2.Life_Steal)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		document.querySelector('#life_steal2').innerText = (life_steal2).toFixed(2) + '%';
		extra_normal_attack_damage2 = 
			((weapon2 == undefined ? 0 : weapon2.Extra_Normal_Attack_Damage) + 
			(chest2 == undefined ? 0 : chest2.Extra_Normal_Attack_Damage) + 
			(head2 == undefined ? 0 : head2.Extra_Normal_Attack_Damage) + 
			(arm2 == undefined ? 0 : arm2.Extra_Normal_Attack_Damage) + 
			(leg2 == undefined ? 0 : leg2.Extra_Normal_Attack_Damage) + 
			(accessory2 == undefined ? 0 : accessory2.Extra_Normal_Attack_Damage)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		extra_normal_attack_damage_percent2 = weapon2 == undefined ? 0 : weapon_mastery_extra_normal_attack_damage_percent2 + 
			document.querySelector('#weapon_mastery2').selectedIndex * 
			weapon_mastery_extra_normal_attack_damage_percent2;
		document.querySelector('#extra_normal_attack_damage2').innerText = 
			(extra_normal_attack_damage2).toFixed(2) + '| ' + (extra_normal_attack_damage_percent2).toFixed(2) + '%';
		skill_amplification2 = 
			((weapon2 == undefined ? 0 : weapon2.Skill_Amplification) + 
			(chest2 == undefined ? 0 : chest2.Skill_Amplification) + 
			(head2 == undefined ? 0 : head2.Skill_Amplification) + 
			(arm2 == undefined ? 0 : arm2.Skill_Amplification) + 
			(leg2 == undefined ? 0 : leg2.Skill_Amplification) + 
			(accessory2 == undefined ? 0 : accessory2.Skill_Amplification)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		skill_amplification_percent2 = 
			(weapon2 == undefined ? 0 : weapon_mastery_skill_damage_reduction_percent2 + 
			document.querySelector('#weapon_mastery2').selectedIndex * 
			weapon_mastery_skill_damage_reduction_percent2) + 
			((weapon2 == undefined ? 0 : weapon2.Skill_Amplification_Percent) + 
			(chest2 == undefined ? 0 : chest2.Skill_Amplification_Percent) + 
			(head2 == undefined ? 0 : head2.Skill_Amplification_Percent) + 
			(arm2 == undefined ? 0 : arm2.Skill_Amplification_Percent) + 
			(leg2 == undefined ? 0 : leg2.Skill_Amplification_Percent) + 
			(accessory2 == undefined ? 0 : accessory2.Skill_Amplification_Percent)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		document.querySelector('#skill_amplification2').innerText = 
			(skill_amplification2).toFixed(2) + '| ' + (skill_amplification_percent2).toFixed(2) + '%';
		cooldown_reduction2 = 
			((weapon2 == undefined ? 0 : weapon2.Cooldown_Reduction) + 
			(chest2 == undefined ? 0 : chest2.Cooldown_Reduction) + 
			(head2 == undefined ? 0 : head2.Cooldown_Reduction) + 
			(arm2 == undefined ? 0 : arm2.Cooldown_Reduction) + 
			(leg2 == undefined ? 0 : leg2.Cooldown_Reduction) + 
			(accessory2 == undefined ? 0 : accessory2.Cooldown_Reduction)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		document.querySelector('#cooldown_reduction2').innerText = (cooldown_reduction2).toFixed(2) + '%';
		sp_regen2 = 
			character2.Stamina_Regen + character2.Stamina_Regen_Growth * document.querySelector('#level2').selectedIndex + 
			((weapon2 == undefined ? 0 : weapon2.SP_Regen) + 
			(chest2 == undefined ? 0 : chest2.SP_Regen) + 
			(head2 == undefined ? 0 : head2.SP_Regen) + 
			(arm2 == undefined ? 0 : arm2.SP_Regen) + 
			(leg2 == undefined ? 0 : leg2.SP_Regen) + 
			(accessory2 == undefined ? 0 : accessory2.SP_Regen)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		sp_regen_percent2 = 
			((weapon2 == undefined ? 0 : weapon2.SP_Regen_Percent) + 
			(chest2 == undefined ? 0 : chest2.SP_Regen_Percent) + 
			(head2 == undefined ? 0 : head2.SP_Regen_Percent) + 
			(arm2 == undefined ? 0 : arm2.SP_Regen_Percent) + 
			(leg2 == undefined ? 0 : leg2.SP_Regen_Percent) + 
			(accessory2 == undefined ? 0 : accessory2.SP_Regen_Percent)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		document.querySelector('#sp_regen2').innerText = 
			(sp_regen2).toFixed(2) + '| ' + (sp_regen_percent2).toFixed(2) + '%';
		skill_damage_reduction2 = 
			((weapon2 == undefined ? 0 : weapon2.Skill_Damage_Reduction) + 
			(chest2 == undefined ? 0 : chest2.Skill_Damage_Reduction) + 
			(head2 == undefined ? 0 : head2.Skill_Damage_Reduction) + 
			(arm2 == undefined ? 0 : arm2.Skill_Damage_Reduction) + 
			(leg2 == undefined ? 0 : leg2.Skill_Damage_Reduction) + 
			(accessory2 == undefined ? 0 : accessory2.Skill_Damage_Reduction)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		skill_damage_reduction_percent2 = 
			1 + document.querySelector('#defense_mastery2').selectedIndex * 1 + 
			((weapon2 == undefined ? 0 : weapon2.Skill_Damage_Reduction_Percent) + 
			(chest2 == undefined ? 0 : chest2.Skill_Damage_Reduction_Percent) + 
			(head2 == undefined ? 0 : head2.Skill_Damage_Reduction_Percent) + 
			(arm2 == undefined ? 0 : arm2.Skill_Damage_Reduction_Percent) + 
			(leg2 == undefined ? 0 : leg2.Skill_Damage_Reduction_Percent) + 
			(accessory2 == undefined ? 0 : accessory2.Skill_Damage_Reduction_Percent)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		document.querySelector('#skill_damage_reduction2').innerText = 
			(skill_damage_reduction2).toFixed(2) + '| ' + (skill_damage_reduction_percent2).toFixed(2) + '%';
		defense2 = 
			character2.Defense + character2.Defense_Growth * document.querySelector('#level2').selectedIndex + 
			((weapon2 == undefined ? 0 : weapon2.Defense) + 
			(chest2 == undefined ? 0 : chest2.Defense) + 
			(head2 == undefined ? 0 : head2.Defense) + 
			(arm2 == undefined ? 0 : arm2.Defense) + 
			(leg2 == undefined ? 0 : leg2.Defense) + 
			(accessory2 == undefined ? 0 : accessory2.Defense)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		document.querySelector('#defense2').innerText = (defense2).toFixed(2);
		max_hp2 = 
			(character2.Health + character2.Health_Growth * document.querySelector('#level2').selectedIndex + 
			((weapon2 == undefined ? 0 : weapon2.Max_HP) + 
			(chest2 == undefined ? 0 : chest2.Max_HP) + 
			(head2 == undefined ? 0 : head2.Max_HP) + 
			(arm2 == undefined ? 0 : arm2.Max_HP) + 
			(leg2 == undefined ? 0 : leg2.Max_HP) + 
			(accessory2 == undefined ? 0 : accessory2.Max_HP)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007)) * 
			(1.013 + document.querySelector('#health_mastery2').selectedIndex * 0.013) + 
			(character2 != Xiukai ? 0 : (2 + document.querySelector('#t_level2').selectedIndex * 2 + 
				(2 + document.querySelector('#t_level2').selectedIndex * 2) * document.querySelector('#level2').selectedIndex) * 8);
		document.querySelector('#max_hp2').innerText = (max_hp2).toFixed(2);
		max_sp2 = 
			(character2.Stamina + character2.Stamina_Growth * document.querySelector('#level2').selectedIndex + 
			((weapon2 == undefined ? 0 : weapon2.Max_SP) + 
			(chest2 == undefined ? 0 : chest2.Max_SP) + 
			(head2 == undefined ? 0 : head2.Max_SP) + 
			(arm2 == undefined ? 0 : arm2.Max_SP) + 
			(leg2 == undefined ? 0 : leg2.Max_SP) + 
			(accessory2 == undefined ? 0 : accessory2.Max_SP)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007)) * 
			(1 + document.querySelector('#meditation_mastery2').selectedIndex * 0.04);
		document.querySelector('#max_sp2').innerText = (max_sp2).toFixed(2);
		hp_regen2 = 
			character2.Health_Regen + character2.Health_Regen_Growth * document.querySelector('#level2').selectedIndex + 
			((weapon2 == undefined ? 0 : weapon2.HP_Regen) + 
			(chest2 == undefined ? 0 : chest2.HP_Regen) + 
			(head2 == undefined ? 0 : head2.HP_Regen) + 
			(arm2 == undefined ? 0 : arm2.HP_Regen) + 
			(leg2 == undefined ? 0 : leg2.HP_Regen) + 
			(accessory2 == undefined ? 0 : accessory2.HP_Regen)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		hp_regen_percent2 = 
			((weapon2 == undefined ? 0 : weapon2.HP_Regen_Percent) + 
			(chest2 == undefined ? 0 : chest2.HP_Regen_Percent) + 
			(head2 == undefined ? 0 : head2.HP_Regen_Percent) + 
			(arm2 == undefined ? 0 : arm2.HP_Regen_Percent) + 
			(leg2 == undefined ? 0 : leg2.HP_Regen_Percent) + 
			(accessory2 == undefined ? 0 : accessory2.HP_Regen_Percent)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		document.querySelector('#hp_regen2').innerText = 
			(hp_regen2).toFixed(2) + '| ' + (hp_regen_percent2).toFixed(2) + '%';
		normal_attack_damage_reduction2 = 
			((weapon2 == undefined ? 0 : weapon2.Normal_Attack_Damage_Reduction) + 
			(chest2 == undefined ? 0 : chest2.Normal_Attack_Damage_Reduction) + 
			(head2 == undefined ? 0 : head2.Normal_Attack_Damage_Reduction) + 
			(arm2 == undefined ? 0 : arm2.Normal_Attack_Damage_Reduction) + 
			(leg2 == undefined ? 0 : leg2.Normal_Attack_Damage_Reduction) + 
			(accessory2 == undefined ? 0 : accessory2.Normal_Attack_Damage_Reduction)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		normal_attack_damage_reduction_percent2 = 1.3 + document.querySelector('#defense_mastery2').selectedIndex * 1.3;
		document.querySelector('#normal_attack_damage_reduction2').innerText = 
			(normal_attack_damage_reduction2).toFixed(2) + '| ' + (normal_attack_damage_reduction_percent2).toFixed(2) + '%';
		movement_speed2 = 
			character2.Move_Speed + 0.01 + 
			document.querySelector('#move_mastery2').selectedIndex * 0.01 + 
			((weapon2 == undefined ? 0 : weapon2.Move_Speed) + 
			(chest2 == undefined ? 0 : chest2.Move_Speed) + 
			(head2 == undefined ? 0 : head2.Move_Speed) + 
			(arm2 == undefined ? 0 : arm2.Move_Speed) + 
			(leg2 == undefined ? 0 : leg2.Move_Speed) + 
			(accessory2 == undefined ? 0 : accessory2.Move_Speed)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		document.querySelector('#movement_speed2').innerText = (movement_speed2).toFixed(2);
		out_of_combat_movement_speed2 = 
			0.02 + document.querySelector('#move_mastery2').selectedIndex * 0.02 + 
			((weapon2 == undefined ? 0 : weapon2.Out_of_Combat_Movement_Speed) + 
			(chest2 == undefined ? 0 : chest2.Out_of_Combat_Movement_Speed) + 
			(head2 == undefined ? 0 : head2.Out_of_Combat_Movement_Speed) + 
			(arm2 == undefined ? 0 : arm2.Out_of_Combat_Movement_Speed) + 
			(leg2 == undefined ? 0 : leg2.Out_of_Combat_Movement_Speed) + 
			(accessory2 == undefined ? 0 : accessory2.Out_of_Combat_Movement_Speed)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		document.querySelector('#out_of_combat_movement_speed2').innerText = (out_of_combat_movement_speed2).toFixed(2);
		vision_range2 = 
			(character2.Sight_Range + 0.1 + 
			document.querySelector('#search_mastery2').selectedIndex * 0.1 + 
			((weapon2 == undefined ? 0 : weapon2.Vision_Range) + 
			(chest2 == undefined ? 0 : chest2.Vision_Range) + 
			(head2 == undefined ? 0 : head2.Vision_Range) + 
			(arm2 == undefined ? 0 : arm2.Vision_Range) + 
			(leg2 == undefined ? 0 : leg2.Vision_Range) + 
			(accessory2 == undefined ? 0 : accessory2.Vision_Range)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007));
		document.querySelector('#vision_range2').innerText = (vision_range2).toFixed(2);
		attack_range2 = 
			character2.Attack_Range + (weapon2 == undefined ? 0 : weapon2.Base_Range) + 
			((weapon2 == undefined ? 0 : weapon2.Attack_Range) + 
			(chest2 == undefined ? 0 : chest2.Attack_Range) + 
			(head2 == undefined ? 0 : head2.Attack_Range) + 
			(arm2 == undefined ? 0 : arm2.Attack_Range) + 
			(leg2 == undefined ? 0 : leg2.Attack_Range) + 
			(accessory2 == undefined ? 0 : accessory2.Attack_Range)) * 
			(1.007 + document.querySelector('#craft_mastery2').selectedIndex * 0.007);
		document.querySelector('#attack_range2').innerText = (attack_range2).toFixed(2);
	}
	updateDamage();
	closeItemList2();
}
document.addEventListener('DOMContentLoaded', (e) => {
	document.querySelector('#weapon_mastery').addEventListener('change', (e) => {
		updateDisplay();
	});
	
	document.querySelector('#hunt_mastery').addEventListener('change', (e) => {
		updateDisplay();
	});
	document.querySelector('#craft_mastery').addEventListener('change', (e) => {
		updateDisplay();
	});
	document.querySelector('#search_mastery').addEventListener('change', (e) => {
		updateDisplay();
	});
	document.querySelector('#move_mastery').addEventListener('change', (e) => {
		updateDisplay();
	});
	
	document.querySelector('#health_mastery').addEventListener('change', (e) => {
		updateDisplay();
	});
	document.querySelector('#defense_mastery').addEventListener('change', (e) => {
		updateDisplay();
	});
	document.querySelector('#meditation_mastery').addEventListener('change', (e) => {
		updateDisplay();
	});
	document.querySelector('#trap_mastery').addEventListener('change', (e) => {
		updateDisplay();
	});
	
	document.querySelector('#level').addEventListener('change', (e) => {
		updateDisplay();
	});
	
	document.querySelector('#q_level').addEventListener('change', (e) => {
		updateDisplay();
	});
	document.querySelector('#w_level').addEventListener('change', (e) => {
		updateDisplay();
	});
	document.querySelector('#e_level').addEventListener('change', (e) => {
		updateDisplay();
	});
	document.querySelector('#r_level').addEventListener('change', (e) => {
		updateDisplay();
	});
	document.querySelector('#t_level').addEventListener('change', (e) => {
		updateDisplay();
	});
	
	document.querySelector('#weapon_mastery2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	
	
	document.querySelector('#hunt_mastery2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	document.querySelector('#craft_mastery2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	document.querySelector('#search_mastery2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	document.querySelector('#move_mastery2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	
	document.querySelector('#health_mastery2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	document.querySelector('#defense_mastery2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	document.querySelector('#meditation_mastery2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	document.querySelector('#trap_mastery2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	
	document.querySelector('#level2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	
	document.querySelector('#q_level2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	document.querySelector('#w_level2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	document.querySelector('#e_level2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	document.querySelector('#r_level2').addEventListener('change', (e) => {
		updateDisplay2();
	});
	document.querySelector('#t_level2').addEventListener('change', (e) => {
		updateDisplay2();
	});
});