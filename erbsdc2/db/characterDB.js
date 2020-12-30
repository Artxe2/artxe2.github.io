const Jackie = {
	 Attack_Power: 37
	,Attack_Power_Growth: 2.7
	,Health: 560
	,Health_Growth: 77
	,Health_Regen: 0.5
	,Health_Regen_Growth: 0.03
	,Stamina: 430
	,Stamina_Growth: 15
	,Stamina_Regen: 2.1
	,Stamina_Regen_Growth: 0.04
	,Defense: 26
	,Defense_Growth: 2.2
	,Atk_Speed: 0.12
	,Crit_Rate: 0
	,Move_Speed: 3.1
	,Sight_Range: 8
	,Attack_Range: 0.4
	,weapons: [Dagger, TwoHandedSword, Axe, DualSwords]
	,correction: {
		Dagger: [
			[0, 0, 5],
			[0, 2, 5]
		],
		TwoHandedSword: [
			[0, 0, 0],
			[3, 2, 5]
		],
		Axe: [
			[0, 0, 0],
			[0, 2, 5]
		],
		DualSwords: [
			[0, 0, 0],
			[0, 2, 5]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + ' ( ' +  min + ', ' + min + ' - ' + max + ', ' + max + ' )';
			}
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + '<b> __h/s: </b>' + life * 2;
			}
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		if (character.weapon) {
			const min1 = calcSkillDamage(character, enemy, 20 + character.Q_LEVEL.selectedIndex * 20, 0.45, 1);
			const min2 = calcSkillDamage(character, enemy, 30 + character.Q_LEVEL.selectedIndex * 20, 0.65, 1);
			const min3 = calcSkillDamage(character, enemy, 16 + character.Q_LEVEL.selectedIndex * 6, 0, 0) * 5;
			const max1 = calcSkillDamage(character, enemy, 20 + character.Q_LEVEL.selectedIndex * 20, 0.45 + 0.1 + character.W_LEVEL.selectedIndex * 0.025, 1);
			const max2 = calcSkillDamage(character, enemy, 30 + character.Q_LEVEL.selectedIndex * 20, 0.65 + 0.1 + character.W_LEVEL.selectedIndex * 0.025, 1);
			return min1 + min2 + min3 + ' - ' + (max1 + max2 + min3) + 
				' ( ' + min1 + ', ' + min2 + ', ' + min3 + ' - ' + max1 + ', ' + max2 + ', ' + min3 + ' )';
		}
		return '-';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1 + 0.1 + character.W_LEVEL.selectedIndex * 0.025, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = (((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) + ((12 + character.W_LEVEL.selectedIndex * 7 + character.attack_power * 0.1) | 0)) * character.attack_speed * 100 | 0) / 100;
			if (character.weapon.Type === 'DualSwords') {
				return '<b>_d/s: </b>' + damage * 2 + '<b> __h/s: </b>' + life * 2;
			}
			return '<b>_d/s: </b>' + damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		if (character.weapon) {
			const min = calcSkillDamage(character, enemy, 10 + character.E_LEVEL.selectedIndex * 60, 0.3 + character.E_LEVEL.selectedIndex * 0.1, 1);
			const max = calcSkillDamage(character, enemy, 10 + character.E_LEVEL.selectedIndex * 60, 0.3 + character.E_LEVEL.selectedIndex * 0.1 + 0.1 + character.W_LEVEL.selectedIndex * 0.025, 1);
			return min + ' - ' + max;
		}
		return '-';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		if (character.weapon) {
			const as = calcAttackSpeed(character, 20 + character.R_LEVEL.selectedIndex * 5);
			const min1 = calcSkillDamage(character, enemy, 300 + character.R_LEVEL.selectedIndex * 200, 1, 1);
			const min2 = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * as * 100 | 0) / 100;
			const min3 = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * as * 100 | 0) / 100;
			const max1 = calcSkillDamage(character, enemy, 300 + character.R_LEVEL.selectedIndex * 200, 1 + 0.1 + character.W_LEVEL.selectedIndex * 0.025, 1);
			const max2 = (baseAttackDamage(character, enemy, 0, 1 + 0.1 + character.W_LEVEL.selectedIndex * 0.025, character.critical_strike_chance, 1) * as * 100 | 0) / 100;
			const max3 = (((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) + ((12 + character.W_LEVEL.selectedIndex * 7 + character.attack_power * 0.1) | 0)) * as * 100 | 0) / 100;
			if (character.weapon.Type === 'DualSwords') {
				return min1 + ' - ' + max1 + '<b> __d/s: </b>' + min2 * 2 + ' - ' + max2 * 2 + '<b> __h/s: </b>' + min3 * 2 + ' - ' + max3 * 2;
			}
			return min1 + ' - ' + max1 + '<b> __d/s: </b>' + min2 + ' - ' + max2 + '<b> __h/s: </b>' + min3 + ' - ' + max3;
		}
		return '-';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		if (character.weapon) {
			const type = character.weapon.Type;
			if (type === 'Axe') {
				return '';
			}
			if (character.WEAPON_MASTERY.selectedIndex > 5) {
				if (type === 'Dagger') {
					const damage = baseAttackDamage(character, enemy, 0, 1, 100, 1);
					return damage + ' - ' + ((damage + (enemy.max_hp ? enemy.max_hp / 10 : 0)) | 0);
				}
				if (type === 'TwoHandedSword') {
					return calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 2 : 2.5, 1);
				}
				if (type === 'DualSwords') {
					const min = calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 0.3 : 0.5, 1);
					const max = calcSkillDamage(character, enemy, 0, (character.WEAPON_MASTERY.selectedIndex < 13 ? 0.3 : 0.5) + 0.1 + character.W_LEVEL.selectedIndex * 0.025, 1);
					return min * 12 + ' - ' + (max * 12) + ' ( ' + min + ' x 12 - ' + max + ' x 12 )';
				}
			}
		}
		return '-';
	}
	,D_Option: (character, enemy) => {
		return !character.weapon || character.weapon.Type !== 'Axe' ? '' : 
			"<input type='number' class='stack axe_d_s' value='0' onchange='fixLimitNum(this, 5)'><b>Stack _use</b><input type='checkbox' class='axe_d_u' onchange='updateDisplay()'><br>" + 
			"_LostHP: <input type='number' class='stack lost_hp' value='0' onchange='fixLimitNum(this, 100)'><b>%</b>"; 
	}
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: "<b>_weak</b><input type='checkbox' class='jackie_t_w' onchange='updateDisplay()'><b> _strong</b><input type='checkbox' class='jackie_t_s' onchange='updateDisplay()'>"
};
const Aya = {
	 Attack_Power: 28
	,Attack_Power_Growth: 2.6
	,Health: 480
	,Health_Growth: 63
	,Health_Regen: 0.5
	,Health_Regen_Growth: 0.05
	,Stamina: 440
	,Stamina_Growth: 22
	,Stamina_Regen: 2.3
	,Stamina_Regen_Growth: 0.07
	,Defense: 14
	,Defense_Growth: 1.4
	,Atk_Speed: 0.12
	,Crit_Rate: 0
	,Move_Speed: 3.0
	,Sight_Range: 8
	,Attack_Range: 0.4
	,weapons: [Pistol, AssaultRifle, SniperRifle]
	,correction: {
		Pistol: [
			[0, -15, -11],
			[0, 0, 0]
		],
		AssaultRifle: [
			[0, -15, -13],
			[0, 0, 0]
		],
		SniperRifle: [
			[0, -15, -15],
			[0, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			if (character.weapon.Type === 'AssaultRifle') {
				const damage1 = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1);
				const damage2 = baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
				const min1 = baseAttackDamage(character, enemy, 0, 0.32, 0, 1);
				const min2 = baseAttackDamage(character, enemy, 0, 0.48, 0, 1);
				const max1 = baseAttackDamage(character, enemy, 0, 0.32, 100, 1);
				const max2 = baseAttackDamage(character, enemy, 0, 0.48, 100, 1);
				return damage1 * 2 + damage2 + ' ( ' + min1 + ', ' + min1 + ', ' + min2 + ' - ' + max1 + ', ' + max1 + ', ' + max2 + ' )';
			}
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			return damage + ' ( ' +  min + ' - ' + max + ' )';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			let as, shot;
			if (character.weapon.Type === 'AssaultRifle') {
				as = 10 / (9.5 / character.attack_speed + 2);
				shot = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1) * 2 + 
					baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
			} else {
				as = character.weapon.Ammo / ((character.weapon.Ammo - 1) / character.attack_speed + 2);
				shot = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			}
			const damage1 = (shot * as * 100 | 0) / 100;
			const damage2 = (shot * character.attack_speed * 100 | 0) / 100;
			const life1 = ((shot * (character.life_steal / 100) | 0) * as * 100 | 0) / 100;
			const life2 = ((shot * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			return damage1 + ' - ' + damage2 + '<b> __h/s: </b>' + life1 + ' - ' + life2;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		if (character.weapon) {
			const damage1 = calcSkillDamage(character, enemy, 0, 1, 1);
			const damage2 = calcSkillDamage(character, enemy, 20 + character.Q_LEVEL.selectedIndex * 40, 0.5, 1);
			return damage1 + damage2 + ' ( ' + damage1 + ', ' + damage2 + ' )';
		}
		return '-';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		if (character.weapon) {
			const damage = calcSkillDamage(character, enemy, 22 + character.W_LEVEL.selectedIndex * 22, 0.3 + character.W_LEVEL.selectedIndex * 0.05, 1);
			return damage * 10 + ' ( ' + damage + ' x 10 )';
		}
		return '-';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		return '-';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		if (character.weapon) {
			return calcSkillDamage(character, enemy, 200 + character.R_LEVEL.selectedIndex * 150, 0.7, 1);
		}
		return '-';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
			const type = character.weapon.Type;
			if (type === 'Pistol') {
				return '-';
			}
			if (type === 'AssaultRifle') {
				const as2 = calcAttackSpeed(character, character.WEAPON_MASTERY.selectedIndex < 13 ? 40 : 60);
				const as1 = 10 / (9.5 / as2 + 2);
				const shot = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1) * 2 + 
					baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
				const damage1 = (shot * as1 * 100 | 0) / 100;
				const damage2 = (shot * as2 * 100 | 0) / 100;
				const life1 = ((shot * (character.life_steal / 100) | 0) * as1 * 100 | 0) / 100;
				const life2 = ((shot * (character.life_steal / 100) | 0) * as2 * 100 | 0) / 100;
				const shield = 100 + character.T_LEVEL.selectedIndex * 50 + character.attack_power * 0.3 | 0;
				return '<b>_d/s: </b>' + damage1 + ' - ' + damage2 + '<b> __h/s: </b>' + life1 + ' - ' + life2 + 
					'<b> __s/s: </b>' + (shield * (1 + as1 * 6) / 0.3 | 0) / 100 + ' - ' + (shield * (1 + as2 * 6) / 0.3 | 0) / 100
			}
			if (type === 'SniperRifle') {
				return calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 2.5 : 3, 1);
			}
		}
		return '-';
	}
	,D_Option: (character, enemy) => {
		return '';
	}
	,T_Skill: (character, enemy) => {
		if (character.weapon) {
			const shield = 100 + character.T_LEVEL.selectedIndex * 50 + character.attack_power * 0.3 | 0;
			let as;
			if (character.weapon.Type === 'AssaultRifle') {
				as = 10 / (9.5 / character.attack_speed + 2) * 6;
			} else {
				as = character.weapon.Ammo / ((character.weapon.Ammo - 1) / character.attack_speed + 2) * 2;
			}
			return '<b>_s: </b>' + shield + '<b> __s/s: </b>' + (shield * (1 + as) / 0.3 | 0) / 100;
		}
		return '-';
	}
	,T_Option: ''
};
const Fiora = {
	 Attack_Power: 37
	,Attack_Power_Growth: 2.5
	,Health: 550
	,Health_Growth: 87
	,Health_Regen: 0.8
	,Health_Regen_Growth: 0.06
	,Stamina: 430
	,Stamina_Growth: 13
	,Stamina_Regen: 2.2
	,Stamina_Regen_Growth: 0.06
	,Defense: 25
	,Defense_Growth: 2.2
	,Atk_Speed: 0.22
	,Crit_Rate: 0
	,Move_Speed: 3.15
	,Sight_Range: 8
	,Attack_Range: 0.4
	,weapons: [TwoHandedSword, Rapier, Spear]
	,correction: {
		TwoHandedSword: [
			[0, -2, -3],
			[0, 3, 6]
		],
		Rapier: [
			[0, -2, -3],
			[0, 3, 6]
		],
		Spear: [
			[0, -2, -3],
			[0, 3, 6]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		if (character.weapon) {
			const min = calcSkillDamage(character, enemy, 60 + character.Q_LEVEL.selectedIndex * 60, 0.25, 1);
			const max = calcSkillDamage(character, enemy, (60 + character.Q_LEVEL.selectedIndex * 60) * (1.2 +character.critical_strike_damage / 100), 0.25 * (1.2 + character.critical_strike_damage / 100), 1);
			return min + ' - ' + max;
		}
		return '-';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		if (character.weapon) {
			const damage1 = baseAttackDamage(character, enemy, 0, 0.6 + character.W_LEVEL.selectedIndex * 0.1, character.critical_strike_chance, 1);
			const damage2 = baseAttackDamage(character, enemy, 0, 0.2 + character.W_LEVEL.selectedIndex * 0.1, character.critical_strike_chance, 1);
			const min1 = baseAttackDamage(character, enemy, 0, 0.6 + character.W_LEVEL.selectedIndex * 0.1, 0, 1);
			const min2 = baseAttackDamage(character, enemy, 0, 0.2 + character.W_LEVEL.selectedIndex * 0.1, 0, 1);
			const max1 = baseAttackDamage(character, enemy, 0, 0.6 + character.W_LEVEL.selectedIndex * 0.1, 100, 1);
			const max2 = baseAttackDamage(character, enemy, 0, 0.2 + character.W_LEVEL.selectedIndex * 0.1, 100, 1);
			return damage1 + damage2 + ' ( ' +  min1 + ', ' + min2 + ' - ' + max1 + ', ' + max2 + ' ) ';
		}
		return '-';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		if (character.weapon) {
			const min = calcSkillDamage(character, enemy, 90 + character.Q_LEVEL.selectedIndex * 40, 0.4, 1);
			const max = calcSkillDamage(character, enemy, (90 + character.Q_LEVEL.selectedIndex * 40) * (1.2 +character.critical_strike_damage / 100), 0.4 * (1.2 + character.critical_strike_damage / 100), 1);
			return min + ' - ' + max;
		}
		return '-';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		if (character.weapon) {
			return calcSkillDamage(character, enemy, 30 + character.R_LEVEL.selectedIndex * 5, 0.06 + character.R_LEVEL.selectedIndex * 0.12, 1);
		}
		return '-';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
			const type = character.weapon.Type;
			if (type === 'TwoHandedSword') {
				return calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 2 : 2.5, 1);
			}
			if (type === 'Rapier') {
				return calcSkillDamage(character, enemy, 0, (2 + character.critical_strike_damage / 100), 1);
			}
			if (type === 'Spear') {
				const damage = calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 1 : 1.5, 1);
				return damage * 2 + ' ( ' + damage + ', ' + damage + ' )';
			}
		}
		return '-';
	}
	,D_Option: (character, enemy) => {
		return '';
	}
	,T_Skill: (character, enemy) => {
		return '-';
	}
	,T_Option: ''
};
const Magnus = {
	 Attack_Power: 32
	,Attack_Power_Growth: 1.5
	,Health: 600
	,Health_Growth: 91
	,Health_Regen: 1
	,Health_Regen_Growth: 0.05
	,Stamina: 410
	,Stamina_Growth: 14
	,Stamina_Regen: 1.9
	,Stamina_Regen_Growth: 0.06
	,Defense: 25
	,Defense_Growth: 1.5
	,Atk_Speed: 0.12
	,Crit_Rate: 0
	,Move_Speed: 3.2
	,Sight_Range: 8
	,Attack_Range: 0.5
	,weapons: [Hammer, Bat]
	,correction: {
		Hammer: [
			[0, -5, -3],
			[0, 0, 0]
		],
		Bat: [
			[0, -3, -3],
			[0, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		if (character.weapon) {
			return calcSkillDamage(character, enemy, 40 + character.Q_LEVEL.selectedIndex * 60, 0.6, 1);
		}
		return '-';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		if (character.weapon) {
			const damage = calcSkillDamage(character, enemy, (1.5 + character.W_LEVEL.selectedIndex * 0.5 | 0) * 10 + character.defense * 0.3, 0.3, 1);
			return damage * (6 + character.W_LEVEL.selectedIndex * 0.5 | 0) + ' ( ' + damage + ' x ' + (6 + character.W_LEVEL.selectedIndex * 0.5 | 0) + ' )';
		}
		return '-';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		if (character.weapon) {
			return calcSkillDamage(character, enemy, 60 + character.E_LEVEL.selectedIndex * 55, 0.4, 1);
		}
		return '-';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		if (character.weapon) {
			return calcSkillDamage(character, enemy, 200 + character.R_LEVEL.selectedIndex * 200, 2, 1);
		}
		return '-';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
			const type = character.weapon.Type;
			if (type === 'Hammer') {
				return calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 150 + character.defense : 300 + character.defense * 2, 0, 1);
			}
			if (type === 'Bat') {
				return calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 2 : 3, 1);
			}
		}
		return '-';
	}
	,D_Option: (character, enemy) => {
		return !character.weapon || character.weapon.Type !== 'Hammer' ? '' : 
			"<b> __use</b><input type='checkbox' class='hammer_d' onchange='updateDisplay()'>"; 
	}
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: "_LostHP: <input type='number' class='stack magnus_t' value='0' onchange='fixLimitNum(this, 999)'><b>%</b>"
};
const Zahir = {
	 Attack_Power: 25
	,Attack_Power_Growth: 2.8
	,Health: 520
	,Health_Growth: 64
	,Health_Regen: 0.6
	,Health_Regen_Growth: 0.03
	,Stamina: 400
	,Stamina_Growth: 26
	,Stamina_Regen: 2.4
	,Stamina_Regen_Growth: 0.1
	,Defense: 20
	,Defense_Growth: 1.8
	,Atk_Speed: 0.11
	,Crit_Rate: 0
	,Move_Speed: 3
	,Sight_Range: 8
	,Attack_Range: 0.45
	,weapons: [Throws, Shuriken]
	,correction: {
		Throws: [
			[0, -10, -12],
			[0, 0, 0]
		],
		Shuriken: [
			[0, -10, -12],
			[0, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		if (character.weapon) {
			const min = calcSkillDamage(character, enemy, 40 + character.Q_LEVEL.selectedIndex * 60, 0.5, 1);
			const max = calcSkillDamage(character, enemy, 75 + character.Q_LEVEL.selectedIndex * 75, 0.5, 1);
			return min + ' - ' + max;
		}
		return '-';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		if (character.weapon) {
			return calcSkillDamage(character, enemy, 25 + character.W_LEVEL.selectedIndex * 25, 0.3, 1);
		}
		return '-';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		if (character.weapon) {
			return calcSkillDamage(character, enemy, 80 + character.E_LEVEL.selectedIndex * 30, 0.5, 1);
		}
		return '-';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		if (character.weapon) {
			const damage = calcSkillDamage(character, enemy, 60 + character.R_LEVEL.selectedIndex * 90, 0.5, 1);
			const add = calcSkillDamage(character, enemy, 30 + character.R_LEVEL.selectedIndex * 45, 0.5, 1);
			return damage + add * 4 + ' ( ' + damage + ' + ' + add + ' x 4 )';
		}
		return '-';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
			const type = character.weapon.Type;
			if (type === 'Throws') {
				return '-';
			}
			if (type === 'Shuriken') {
				const damage = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 110 : 180, 0.3, 1);
				const add = calcSkillDamage(character, enemy, (character.WEAPON_MASTERY.selectedIndex < 13 ? 110 : 180) * 0.3, 0.3 * 0.3, 1);
				return damage + add * 11 + ' ( ' + damage + ' + ' + add + ' x 11 )';
			}
		}
		return '-';
	}
	,D_Option: (character, enemy) => {
		return '';
	}
	,T_Skill: (character, enemy) => {
		if (character.weapon) {
			return calcSkillDamage(character, enemy, 10 + character.T_LEVEL.selectedIndex * 25, 0.3, 1);
		}
		return '-';
	}
	,T_Option: ''
};
const Nadine = {
	 Attack_Power: 32
	,Attack_Power_Growth: 2.2
	,Health: 520
	,Health_Growth: 60
	,Health_Regen: 0.4
	,Health_Regen_Growth: 0.03
	,Stamina: 350
	,Stamina_Growth: 13
	,Stamina_Regen: 1.9
	,Stamina_Regen_Growth: 0.05
	,Defense: 21
	,Defense_Growth: 1.5
	,Atk_Speed: 0.12
	,Crit_Rate: 0
	,Move_Speed: 3
	,Sight_Range: 8
	,Attack_Range: 0.4
	,weapons: [Bow, Crossbow]
	,correction: {
		Bow: [
			[0, -11, -17],
			[0, 0, 0]
		],
		Crossbow: [
			[0, -9, -17],
			[0, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		if (character.weapon) {
			const stack = parseInt(character.DIV.querySelector('.nadine_t').value);
			const min = calcSkillDamage(character, enemy, 70 + character.Q_LEVEL.selectedIndex * 45 + stack, 0.6, 1);
			const max = calcSkillDamage(character, enemy, 140 + character.Q_LEVEL.selectedIndex * 90 + stack, 1.2, 1);
			return min + ' - ' + max;
		}
		return '-';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		if (character.weapon) {
			const damage1 = calcSkillDamage(character, enemy, 100 + character.W_LEVEL.selectedIndex * 70, 0.6, 1);
			const damage2 = calcSkillDamage(character, enemy, 100 + character.W_LEVEL.selectedIndex * 40, 0.6, 1);
			return damage1 * 2 + damage2 + ' ( ' + damage1 + ', ' + damage1 + ', ' + damage2 + ' )';
		}
		return '-';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		return '';
	}
	,E_Option: "<b>_use</b><input type='checkbox' class='nadine_e' onchange='updateDisplay()'>"
	,R_Skill: (character, enemy) => {
		if (character.weapon) {
			const stack = parseInt(character.DIV.querySelector('.nadine_t').value);
			const damage = calcSkillDamage(character, enemy, 50 + character.R_LEVEL.selectedIndex * 50 + stack, 0.5, 1);
			const dps = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) + damage / 3) * character.attack_speed * 100 | 0) / 100;
			return damage + '<b> __d/s: </b>' + dps;
		}
		return '-';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
			const type = character.weapon.Type;
			if (type === 'Bow') {
				const min = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 150 : 250, 1, 1);
				const max = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 300 : 500, 2, 1);
				return min + ' - ' + max;
			}
			if (type === 'Crossbow') {
				const damage = calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 0.6 : 1, 1);
				return damage * 2 + ' ( ' + damage + ', ' + damage + ' )';
			}
		}
		return '-';
	}
	,D_Option: (character, enemy) => {
		return '';
	}
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: "<input type='number' class='stack nadine_t' value='0' onchange='fixLimitNum(this, 999)'><b>Stack"
};
const Hyunwoo = {
	 Attack_Power: 40
	,Attack_Power_Growth: 3.1
	,Health: 500
	,Health_Growth: 85
	,Health_Regen: 0.8
	,Health_Regen_Growth: 0.04
	,Stamina: 350
	,Stamina_Growth: 16
	,Stamina_Regen: 1.8
	,Stamina_Regen_Growth: 0.04
	,Defense: 26
	,Defense_Growth: 2.2
	,Atk_Speed: 0.12
	,Crit_Rate: 0
	,Move_Speed: 3.15
	,Sight_Range: 8
	,Attack_Range: 0.45
	,weapons: [Glove, Tonfa]
	,correction: {
		Glove: [
			[0, -3, -3],
			[0, -2, -5]
		],
		Tonfa: [
			[0, -3, -3],
			[0, -2, -5]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		if (character.weapon) {
			return calcSkillDamage(character, enemy, 100 + character.Q_LEVEL.selectedIndex * 50, 0.4, 1);
		}
		return '-';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		return '';
	}
	,W_Option: "<b>_use</b><input type='checkbox' class='hyunwoo_w' onchange='updateDisplay()'>"
	,E_Skill: (character, enemy) => {
		if (character.weapon) {
			const min = calcSkillDamage(character, enemy, character.defense, 0, 1);
			const max = calcSkillDamage(character, enemy, (enemy.max_hp ? enemy.max_hp * (0.05 + character.E_LEVEL.selectedIndex * 0.03) : 0) + character.defense, 0, 1);
			const bonus = calcSkillDamage(character, enemy, 60 + character.E_LEVEL.selectedIndex * 35, 0, 1);
			return max + bonus + ' ( ' + min + ' - ' + max + ', ' + bonus + ' )';
		}
		return '-';
	}
	,E_Option: "<b> __use</b><input type='checkbox' class='hyunwoo_e' onchange='updateDisplay()'>"
	,R_Skill: (character, enemy) => {
		if (character.weapon) {
			const min = calcSkillDamage(character, enemy, 200 + character.R_LEVEL.selectedIndex * 100, 0.7, 1);
			const max = calcSkillDamage(character, enemy, 600 + character.R_LEVEL.selectedIndex * 300, 2.1, 1);
			return min + ' - ' + max;
		}
		return '-';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
			const type = character.weapon.Type;
			if (type === 'Glove') {
				if (character.weapon) {
					const damage = gloveAttackDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 1 : 2, character.critical_strike_chance, character.WEAPON_MASTERY.selectedIndex < 13 ? 50 : 100);
					const min = gloveAttackDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 1 : 2, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 50 : 100);
					const max = gloveAttackDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 1 : 2, 100, character.WEAPON_MASTERY.selectedIndex < 13 ? 50 : 100);
					return damage + ' ( ' +  min + ' - ' + max + ' ) ';
				}
				return '-';
			}
			if (type === 'Tonfa') {
				const percent = calcSkillDamage(character, enemy, (character.WEAPON_MASTERY.selectedIndex < 13 ? 5000 : 7000) | 0, 0, 0) / 100;
				const bonus = calcSkillDamage(character, enemy, 0, 0, 1);
				return percent + '% + ' + bonus;
			}
		}
		return '-';
	}
	,D_Option: (character, enemy) => {
		return '';
	}
	,T_Skill: (character, enemy) => {
		if (character.weapon) {
			return character.max_hp * (0.07 + character.T_LEVEL.selectedIndex * 0.04) | 0;
		}
		return '-';
	}
	,T_Option: ''
};
const Hart = {
	 Attack_Power: 22
	,Attack_Power_Growth: 3
	,Health: 500
	,Health_Growth: 66
	,Health_Regen: 0.8
	,Health_Regen_Growth: 0.04
	,Stamina: 420
	,Stamina_Growth: 16
	,Stamina_Regen: 1.7
	,Stamina_Regen_Growth: 0.04
	,Defense: 20
	,Defense_Growth: 1.9
	,Atk_Speed: 0.12
	,Crit_Rate: 0
	,Move_Speed: 3
	,Sight_Range: 8
	,Attack_Range: 0.4
	,weapons: [Guitar]
	,correction: {
		Guitar: [
			[0, -3, -3],
			[0, -2, -5]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			if (character.DIV.querySelector('.hart_t').checked) {
				const damage2 = baseAttackDamage(character, enemy, 0, 0.15, character.critical_strike_chance, 1);
				const min2 = baseAttackDamage(character, enemy, 0, 0.15, 0, 1);
				const max2 = baseAttackDamage(character, enemy, 0, 0.15, 100, 1);
				if (character.DIV.querySelector('.hart_tt').checked) {
					return damage + damage2 * 2 + ' ( ' +  min + ', ' + min2 + ', ' + min2 + ' - ' + max + ', ' + max2 + ', ' + max2 + ' )';
				}
				return damage + damage2 + ' ( ' +  min + ', ' + min2 + ' - ' + max + ', ' + max2 + ' )';
			}
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage1 = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life1 = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			if (character.DIV.querySelector('.hart_t').checked) {
				const damage2 = (baseAttackDamage(character, enemy, 0, 0.15, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
				const life2 = ((baseAttackDamage(character, enemy, 0, 0.15, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
				if (character.DIV.querySelector('.hart_tt').checked) {
					return damage1 + damage2 * 2 + '<b> __h/s: </b>' + ((life1 + life2 * 2) * 100 | 0) / 100;
				}
				return damage1 + damage2 + '<b> __h/s: </b>' + ((life1 + life2) * 100 | 0) / 100;
			}
			return damage1 + '<b> __h/s: </b>' + life1;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		const min = calcSkillDamage(character, enemy, 80 + character.Q_LEVEL.selectedIndex * 20, 0.3, 1);
		const max = calcSkillDamage(character, enemy, 160 + character.Q_LEVEL.selectedIndex * 40, 0.6, 1);
		return min + ' - ' + max;
	}
	,Q_Option:  "<b> __up</b><input type='checkbox' class='hart_q' onchange='hartUp(0, 0)'/><input type='checkbox' class='hart_qq' onchange='hartUp(0, 1)'/>"
	,W_Skill: (character, enemy) => {
		return '';
	}
	,W_Option:  "<b> __up</b><input type='checkbox' class='hart_w' onchange='hartUp(1, 0)'/><input type='checkbox' class='hart_ww' onchange='hartUp(1, 1)'/>" + 
		"<b> _use</b><input type='checkbox' class='hart_w_u' onchange='updateDisplay()'>"
	,E_Skill: (character, enemy) => {
		if (character.weapon) {
			const sap = character.DIV.querySelector('.hart_ee').checked ? 25 : character.DIV.querySelector('.hart_e').checked ? 15 : 0;
			const stack = character.DIV.querySelector('.hart_e_s').value;
			character.skill_amplification_percent -= sap * (stack - 1);
			const damage1 = calcSkillDamage(character, enemy, 20 + character.E_LEVEL.selectedIndex * 10, 0.4, 1);
			character.skill_amplification_percent += sap;
			const damage2 = calcSkillDamage(character, enemy, 20 + character.E_LEVEL.selectedIndex * 10, 0.4, 1);
			character.skill_amplification_percent += sap;
			const damage3 = calcSkillDamage(character, enemy, 20 + character.E_LEVEL.selectedIndex * 10, 0.4, 1);
			character.skill_amplification_percent -= sap * (3 - stack);
			return damage1 + damage2 + damage3 + ' ( ' + damage1 + ', ' + damage2 + ', ' + damage3 + ' )';
		}
		return '-';
	}
	,E_Option:  "<b> __up</b><input type='checkbox' class='hart_e' onchange='hartUp(2, 0)'/><input type='checkbox' class='hart_ee' onchange='hartUp(2, 1)'/>" + 
		"_ <input type='number' class='stack hart_e_s' value='0' onchange='fixLimitNum(this, 3)'><b>Stack"
	,R_Skill: (character, enemy) => {
		if (character.weapon) {
			const heal = 30 + character.R_LEVEL.selectedIndex * 10 + (character.max_hp * (0.02 + character.R_LEVEL.selectedIndex * 0.01) | 0);
			return '<b>_h: </b>' + heal * 5 + ' ( ' + heal + ' x 5 )';
		}
		return '-';
	}
	,R_Option: "<b> __up</b><input type='checkbox' class='hart_r' onchange='hartUp(3, 0)'/><input type='checkbox' class='hart_rr' onchange='hartUp(3, 1)'/>"
	,D_Skill: (character, enemy) => {
		return '';
	}
	,D_Option: (character, enemy) => {
		if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
			if (type === 'Guitar') {
				return calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 1.5 : 2.5, 1);
			}
		}
		return '-'
	}
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: "<b> __up</b><input type='checkbox' class='hart_t' onchange='hartUp(4, 0)'/><input type='checkbox' class='hart_tt' onchange='hartUp(4, 1)'/>"
};
const Isol = {
	 Attack_Power: 32
	,Attack_Power_Growth: 2.6
	,Health: 500
	,Health_Growth: 60
	,Health_Regen: 0.5
	,Health_Regen_Growth: 0.03
	,Stamina: 400
	,Stamina_Growth: 21
	,Stamina_Regen: 1.8
	,Stamina_Regen_Growth: 0.03
	,Defense: 23
	,Defense_Growth: 1.6
	,Atk_Speed: 0.14
	,Crit_Rate: 0
	,Move_Speed: 3.05
	,Sight_Range: 8
	,Attack_Range: 0.45
	,weapons: [Pistol, AssaultRifle]
	,correction: {
		Pistol: [
			[0, -8, -18],
			[0, 0, 0]
		],
		AssaultRifle: [
			[0, -8, -18],
			[0, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			if (character.weapon.Type === 'AssaultRifle') {
				const damage1 = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1);
				const damage2 = baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
				const min1 = baseAttackDamage(character, enemy, 0, 0.32, 0, 1);
				const min2 = baseAttackDamage(character, enemy, 0, 0.48, 0, 1);
				const max1 = baseAttackDamage(character, enemy, 0, 0.32, 100, 1);
				const max2 = baseAttackDamage(character, enemy, 0, 0.48, 100, 1);
				return damage1 * 2 + damage2 + ' ( ' + min1 + ', ' + min1 + ', ' + min2 + ' - ' + max1 + ', ' + max1 + ', ' + max2 + ' )';
			}
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			return damage + ' ( ' +  min + ' - ' + max + ' )';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			let as, shot;
			if (character.weapon.Type === 'AssaultRifle') {
				as = 10 / (9.5 / character.attack_speed + 2);
				shot = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1) * 2 + 
					baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
			} else {
				as = character.weapon.Ammo / ((character.weapon.Ammo - 1) / character.attack_speed + 2);
				shot = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			}
			const damage1 = (shot * as * 100 | 0) / 100;
			const damage2 = (shot * character.attack_speed * 100 | 0) / 100;
			const life1 = ((shot * (character.life_steal / 100) | 0) * as * 100 | 0) / 100;
			const life2 = ((shot * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			return damage1 + ' - ' + damage2 + '<b> __h/s: </b>' + life1 + ' - ' + life2;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		if (character.weapon) {
			const stack = parseInt(character.DIV.querySelector('.isol_q').value);
			const min = calcSkillDamage(character, enemy, 50 + character.Q_LEVEL.selectedIndex * 25, 0.5, 1);
			const max = calcSkillDamage(character, enemy, 50 + character.Q_LEVEL.selectedIndex * 25 + 
				(8 + character.Q_LEVEL.selectedIndex * 4) * stack, 0.5 + stack * 0.3, 1);
			return min + ' - ' + max;
		}
		return '-';
	}
	,Q_Option: "<span> </span><input type='number' class='stack isol_q' value='0' onchange='fixLimitNum(this, 10)'><b>Stack</b>"
	,W_Skill: (character, enemy) => {
		if (character.weapon) {
			const damage = calcSkillDamage(character, enemy, 20 + character.W_LEVEL.selectedIndex * 10, 0.5, 1);
			return damage * 4 + ' ( ' + damage + ' x 4 )';
		}
		return '-';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		return '-';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		return (100 + character.R_LEVEL.selectedIndex * 50 + character.attack_power * 0.3) * (1.04 + character.TRAP_MASTERY.selectedIndex * 0.04) | 0;
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
			const type = character.weapon.Type;
			if (type === 'Pistol') {
				return '-';
			}
			if (type === 'AssaultRifle') {
				const as2 = calcAttackSpeed(character, character.WEAPON_MASTERY.selectedIndex < 13 ? 40 : 60);
				const as1 = 10 / (9.5 / as2 + 2);
				const shot = baseAttackDamage(character, enemy, 0, 0.32, character.critical_strike_chance, 1) * 2 + 
					baseAttackDamage(character, enemy, 0, 0.48, character.critical_strike_chance, 1);
				const damage1 = (shot * as1 * 100 | 0) / 100;
				const damage2 = (shot * as2 * 100 | 0) / 100;
				const life1 = ((shot * (character.life_steal / 100) | 0) * as1 * 100 | 0) / 100;
				const life2 = ((shot * (character.life_steal / 100) | 0) * as2 * 100 | 0) / 100;
				return '<b>_d/s: </b>' + damage1 + ' - ' + damage2 + '<b> __h/s: </b>' + life1 + ' - ' + life2
			}
		}
		return '-';
	}
	,D_Option: (character, enemy) => {
		return '';
	}
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: "<b> _use</b><input type='checkbox' class='isol_t' onchange='updateDisplay()'>"
};
const Li_Dailin = {
	 Attack_Power: 33
	,Attack_Power_Growth: 1.9
	,Health: 550
	,Health_Growth: 89
	,Health_Regen: 1.1
	,Health_Regen_Growth: 0.07
	,Stamina: 420
	,Stamina_Growth: 16
	,Stamina_Regen: 0.2
	,Stamina_Regen_Growth: 0.01
	,Defense: 20
	,Defense_Growth: 2.5
	,Atk_Speed: 0.07
	,Crit_Rate: 0
	,Move_Speed: 3.1
	,Sight_Range: 8
	,Attack_Range: 0.4
	,weapons: [Glove, Nunchaku]
	,correction: {
		Glove: [
			[0, 0, 0],
			[0, 0, 0]
		],
		Nunchaku: [
			[3, 3, 0],
			[0, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		if (character.weapon) {
			const min = calcSkillDamage(character, enemy, 20 + character.Q_LEVEL.selectedIndex * 20, 0.5, 1);
			const max = calcSkillDamage(character, enemy, 28 + character.Q_LEVEL.selectedIndex * 28, 0.7, 1);
			return max * 3 + ' ( ' + min + ', ' + min + ', ' + min + ' - ' + max + ', ' + max + ', ' + max + ' )';
		}
		return '-';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		if (character.weapon) {
			const damage1 = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const damage2 = baseAttackDamage(character, enemy, 0, 0.5 + character.T_LEVEL.selectedIndex * 0.25, character.critical_strike_chance, 1);
			const dps = ((damage1 + damage2) * character.attack_speed * 100 | 0) / 100;
			const life = (((damage1 + damage2) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;	
			return '<b>_d/s: </b>' + dps + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,W_Option: "<b> _use</b><input type='checkbox' class='lida_w' onchange='updateDisplay()'>"
	,E_Skill: (character, enemy) => {
		if (character.weapon) {
			return calcSkillDamage(character, enemy, 80 + character.E_LEVEL.selectedIndex * 55, 0.5, 1);
		}
		return '-';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		if (character.weapon) {
			const min = calcSkillDamage(character, enemy, 40 + character.Q_LEVEL.selectedIndex * 30, 0.2, 1);
			const max = calcSkillDamage(character, enemy, 120 + character.Q_LEVEL.selectedIndex * 90, 0.6, 1);
			const over = calcSkillDamage(character, enemy, 132 + character.Q_LEVEL.selectedIndex * 99, 0.66, 1);
			return min * 4 + ' - ' + max * 4 + ' / ' + over * 4 + ' ( [ ' + min + ' x 4 ] - [ ' + max + ' x 4 ] / [ ' + over + ' x 4 ] )';
		}
		return '-';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
			const type = character.weapon.Type;
			if (type === 'Glove') {
				if (character.weapon) {
					const coe = character.WEAPON_MASTERY.selectedIndex < 13 ? 1 : 2;
					const bonus = character.WEAPON_MASTERY.selectedIndex < 13 ? 50 : 100;
					const damage = gloveAttackDamage(character, enemy, coe, character.critical_strike_chance, bonus);
					const min = gloveAttackDamage(character, enemy, coe, 0, bonus);
					const max = gloveAttackDamage(character, enemy, coe, 100, bonus);
					const over = gloveAttackDamage(character, enemy, coe * 1.1, 100, bonus);
					const life = (damage * (character.life_steal / 100) | 0);
					return damage + ' ( ' +  min + ' - ' + max + ' / ' + over + ' )<b> __h: </b>' + life;
				}
				return '-';
			}
			if (type === 'Nunchaku') {
				const min = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 125 : 250, 0.5, 1);
				const max = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 300 : 600, 1.5, 1);
				return min + ' - ' + max;
			}
		}
		return '-';
	}
	,D_Option: (character, enemy) => {
		return '';
	}
	,T_Skill: (character, enemy) => {
		if (character.weapon) {
			const coe = 0.5 + character.T_LEVEL.selectedIndex * 0.25;
			const damage1 = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const damage2 = baseAttackDamage(character, enemy, 0, coe, character.critical_strike_chance, 1);
			const min1 = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const min2 = baseAttackDamage(character, enemy, 0, coe, 0, 1);
			const max1 = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			const max2 = baseAttackDamage(character, enemy, 0, coe, 100, 1);
			const over1 = baseAttackDamage(character, enemy, 0, 1.1, 100, 1);
			const over2 = baseAttackDamage(character, enemy, 0, coe * 1.1, 100, 1);
			return damage1 + damage2 + ' ( ' +  min1 + ', ' + min2 + ' - ' + max1 + ', ' + max2 + ' / ' + over1 + ', ' + over2 + ' ) ';
		}
		return '-';
	}
	,T_Option: ''
};
const Yuki = {
	 Attack_Power: 32
	,Attack_Power_Growth: 2.2
	,Health: 550
	,Health_Growth: 81
	,Health_Regen: 0.2
	,Health_Regen_Growth: 0.05
	,Stamina: 410
	,Stamina_Growth: 20
	,Stamina_Regen: 2.2
	,Stamina_Regen_Growth: 0.06
	,Defense: 26
	,Defense_Growth: 2
	,Atk_Speed: 0.06
	,Crit_Rate: 0
	,Move_Speed: 3.1
	,Sight_Range: 8
	,Attack_Range: 0.45
	,weapons: [TwoHandedSword, DualSwords]
	,correction: {
		TwoHandedSword: [
			[0, -8, -8],
			[0, 0, 0]
		],
		DualSwords: [
			[9, 1, 1],
			[0, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + ' ( ' +  min + ', ' + min + ' - ' + max + ', ' + max + ' )';
			}
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + '<b> __h/s: </b>' + life * 2;
			}
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		if (character.weapon) {
			const base = 20 + character.Q_LEVEL.selectedIndex * 25;
			const coe = character.weapon.Type === 'DualSwords' ? 2 : 1;
			const damage = baseAttackDamage(character, enemy, base, coe, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, base, coe, 0, 1);
			const max = baseAttackDamage(character, enemy, base, coe, 100, 1);
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		return '';
	}
	,W_Option: "<b> _use</b><input type='checkbox' class='yuki_w' onchange='updateDisplay()'>"
	,E_Skill: (character, enemy) => {
		if (character.weapon) {
			return calcSkillDamage(character, enemy, 70 + character.E_LEVEL.selectedIndex * 50, 0.4, 1);
		}
		return '-';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		if (character.weapon) {
			const damage1 = calcSkillDamage(character, enemy, 250 + character.R_LEVEL.selectedIndex * 125, 1.5, 1);
			const damage2 = (enemy.max_hp ? enemy.max_hp * (0.15 + character.R_LEVEL.selectedIndex * 0.05) : 0) | 0;
			return damage1 + damage2 + ' ( ' + damage1 + ', ' + damage2 + ' )';
		}
		return '-';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
			const type = character.weapon.Type;
			if (type === 'TwoHandedSword') {
				return calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 2 : 2.5, 1);
			}
			if (type === 'DualSwords') {
				const min = calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 0.3 : 0.5, 1);
				const max = calcSkillDamage(character, enemy, 0, (character.WEAPON_MASTERY.selectedIndex < 13 ? 0.3 : 0.5) + 0.1 + character.W_LEVEL.selectedIndex * 0.025, 1);
				return min * 12 + ' - ' + (max * 12) + ' ( ' + min + ' x 12 - ' + max + ' x 12 )';
			}
		}
		return '-';
	}
	,D_Option: (character, enemy) => {
		return '';
	}
	,T_Skill: (character, enemy) => {
		if (character.weapon) {
			const damage = 15 + 15 * character.T_LEVEL.selectedIndex;
			return damage * 4 + ' ( ' + damage + ' x 4 )';
		}
		return '-';
	}
	,T_Option: ''
};
const Hyejin = {
	 Attack_Power: 29
	,Attack_Power_Growth: 2.5
	,Health: 500
	,Health_Growth: 64
	,Health_Regen: 0.6
	,Health_Regen_Growth: 0.03
	,Stamina: 400
	,Stamina_Growth: 26
	,Stamina_Regen: 2
	,Stamina_Regen_Growth: 0.08
	,Defense: 22
	,Defense_Growth: 1.7
	,Atk_Speed: 0.12
	,Crit_Rate: 0
	,Move_Speed: 3
	,Sight_Range: 8
	,Attack_Range: 0.4
	,weapons: [Shuriken, Bow]
	,correction: {
		Shuriken: [
			[8, 0, -6],
			[-3, 0, 0]
		],
		Bow: [
			[0, -10, -18],
			[-3, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		if (character.weapon) {
			return calcSkillDamage(character, enemy, 100 + character.Q_LEVEL.selectedIndex * 25, 0.4, 1);
		}
		return '-';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		if (character.weapon) {
			const min = calcSkillDamage(character, enemy, 15 + character.W_LEVEL.selectedIndex * 5, 0.5, 1);
			const max = calcSkillDamage(character, enemy, 140 + character.W_LEVEL.selectedIndex * 65, 0.5, 1);
			return min + ' - ' + max;
		}
		return '-';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		if (character.weapon) {
			const damage1 = calcSkillDamage(character, enemy, 45 + character.E_LEVEL.selectedIndex * 25, 0.3, 1);
			const damage2 = calcSkillDamage(character, enemy, 50 + character.E_LEVEL.selectedIndex * 25, 0.5, 1);
			return damage1 + damage2 + ' ( ' + damage1 + ', ' + damage2 + ' )';
		}
		return '-';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		if (character.weapon) {
			const damage1 = calcSkillDamage(character, enemy, 150 + character.R_LEVEL.selectedIndex * 125, 0.7, 1);
			const damage2 = calcSkillDamage(character, enemy, 80 + character.R_LEVEL.selectedIndex * 50, 0.5, 1);
			return damage1 + damage2 * 5 + ' ( ' + damage1 + ', ' + damage2 + ' x 5 )';
		}
		return '-';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
			const type = character.weapon.Type;
			if (type === 'Shuriken') {
				const damage = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 110 : 180, 0.3, 1);
				const add = calcSkillDamage(character, enemy, (character.WEAPON_MASTERY.selectedIndex < 13 ? 110 : 180) * 0.3, 0.3 * 0.3, 1);
				return damage + add * 11 + ' ( ' + damage + ' + ' + add + ' x 11 )';
			}
			if (type === 'Bow') {
				const min = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 150 : 250, 1, 1);
				const max = calcSkillDamage(character, enemy, character.WEAPON_MASTERY.selectedIndex < 13 ? 300 : 500, 2, 1);
				return min + ' - ' + max;
			}
		}
		return '-';
	}
	,D_Option: (character, enemy) => {
		return '';
	}
	,T_Skill: (character, enemy) => {
		return '-';
	}
	,T_Option: ''
};
const Xiukai = {
	 Attack_Power: 40
	,Attack_Power_Growth: 2.2
	,Health: 530
	,Health_Growth: 80
	,Health_Regen: 1
	,Health_Regen_Growth: 0.06
	,Stamina: 420
	,Stamina_Growth: 14
	,Stamina_Regen: 0.3
	,Stamina_Regen_Growth: 0.01
	,Defense: 34
	,Defense_Growth: 1.7
	,Atk_Speed: 0.16
	,Crit_Rate: 0
	,Move_Speed: 3.1
	,Sight_Range: 8
	,Attack_Range: 0.48
	,weapons: [Dagger, Spear]
	,correction: {
		Dagger: [
			[0, -6, -7],
			[0, 0, 0]
		],
		Spear: [
			[0, -12, -12],
			[0, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		if (character.weapon) {
			return calcSkillDamage(character, enemy, 80 + character.Q_LEVEL.selectedIndex * 40, 0.5, 1);
		}
		return '-';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		return '';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		return '';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		return '';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		if (character.weapon && character.WEAPON_MASTERY.selectedIndex > 5) {
			const type = character.weapon.Type;
			if (type === 'Dagger') {
				const damage = baseAttackDamage(character, enemy, 0, 1, 100, 1);
				return damage + ' - ' + ((damage + (enemy.max_hp ? enemy.max_hp / 10 : 0)) | 0);
			}
			if (type === 'Spear') {
				const damage = calcSkillDamage(character, enemy, 0, character.WEAPON_MASTERY.selectedIndex < 13 ? 1 : 1.5, 1);
				return damage * 2 + ' ( ' + damage + ', ' + damage + ' )';
			}
		}
		return '-';
	}
	,D_Option: (character, enemy) => {
		return '';
	}
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: "<input type='number' class='stack xiukai_t' value='0' onchange='fixLimitNum(this, 999)'><b>Stack"
};
const Chiara = {
	 Attack_Power: 34
	,Attack_Power_Growth: 2
	,Health: 500
	,Health_Growth: 60
	,Health_Regen: 0.5
	,Health_Regen_Growth: 0.02
	,Stamina: 410
	,Stamina_Growth: 13
	,Stamina_Regen: 1.8
	,Stamina_Regen_Growth: 0.03
	,Defense: 24
	,Defense_Growth: 1.5
	,Atk_Speed: 0.12
	,Crit_Rate: 0
	,Move_Speed: 3.15
	,Sight_Range: 8
	,Attack_Range: 0.4
	,weapons: [Rapier]
	,correction: {
		Rapier: [
			[0, -5, -3],
			[0, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + ' ( ' +  min + ', ' + min + ' - ' + max + ', ' + max + ' )';
			}
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + '<b> __h/s: </b>' + life * 2;
			}
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		return '';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		return '';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		return '';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		return '';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		return '';
	}
	,D_Option: (character, enemy) => {return '';}
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: ''
};
const Sissela = {
	 Attack_Power: 23
	,Attack_Power_Growth: 2.4
	,Health: 480
	,Health_Growth: 60
	,Health_Regen: 0.4
	,Health_Regen_Growth: 0.02
	,Stamina: 400
	,Stamina_Growth: 16
	,Stamina_Regen: 1.1
	,Stamina_Regen_Growth: 0.02
	,Defense: 19
	,Defense_Growth: 1.7
	,Atk_Speed: 0.12
	,Crit_Rate: 0
	,Move_Speed: 3
	,Sight_Range: 8
	,Attack_Range: 0.4
	,weapons: [Throws, Shuriken]
	,correction: {
		Throws: [
			[0, -15, -18],
			[0, 0, 0]
		],
		Shuriken: [
			[0, -15, -18],
			[0, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + ' ( ' +  min + ', ' + min + ' - ' + max + ', ' + max + ' )';
			}
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + '<b> __h/s: </b>' + life * 2;
			}
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		return '';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		return '';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		return '';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		return '';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		return '';
	}
	,D_Option: (character, enemy) => {return '';}
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: ''
};
const Adriana = {
	 Attack_Power: 31
	,Attack_Power_Growth: 2.4
	,Health: 530
	,Health_Growth: 65
	,Health_Regen: 0.5
	,Health_Regen_Growth: 0.03
	,Stamina: 480
	,Stamina_Growth: 9
	,Stamina_Regen: 1
	,Stamina_Regen_Growth: 0.01
	,Defense: 27
	,Defense_Growth: 1.7
	,Atk_Speed: 0.04
	,Crit_Rate: 0
	,Move_Speed: 3
	,Sight_Range: 8
	,Attack_Range: 0.4
	,weapons: [Throws]
	,correction: {
		Throws: [
			[3, -9, -18],
			[0, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + ' ( ' +  min + ', ' + min + ' - ' + max + ', ' + max + ' )';
			}
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + '<b> __h/s: </b>' + life * 2;
			}
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		return '';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		return '';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		return '';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		return '';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		return '';
	}
	,D_Option: (character, enemy) => {return '';}
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: ''
};
const Shoichi = {
	 Attack_Power: 30
	,Attack_Power_Growth: 2.9
	,Health: 550
	,Health_Growth: 78
	,Health_Regen: 0.8
	,Health_Regen_Growth: 0.04
	,Stamina: 370
	,Stamina_Growth: 13
	,Stamina_Regen: 1.6
	,Stamina_Regen_Growth: 0.04
	,Defense: 27
	,Defense_Growth: 2.2
	,Atk_Speed: 0.12
	,Crit_Rate: 0
	,Move_Speed: 3.1
	,Sight_Range: 8
	,Attack_Range: 0.43
	,weapons: [Dagger]
	,correction: {
		Dagger: [
			[0, -5, -6],
			[0, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + ' ( ' +  min + ', ' + min + ' - ' + max + ', ' + max + ' )';
			}
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + '<b> __h/s: </b>' + life * 2;
			}
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		return '';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		return '';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		return '';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		return '';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		return '';
	}
	,D_Option: (character, enemy) => {return '';}
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: ''
};
const Silvia = {
	 Attack_Power: 28
	,Attack_Power_Growth: 2.3
	,Health: 500
	,Health_Growth: 63
	,Health_Regen: 0.4
	,Health_Regen_Growth: 0.03
	,Stamina: 440
	,Stamina_Growth: 22
	,Stamina_Regen: 2.1
	,Stamina_Regen_Growth: 0.06
	,Defense: 20
	,Defense_Growth: 1.4
	,Atk_Speed: 0.12
	,Crit_Rate: 0
	,Move_Speed: 3
	,Sight_Range: 8
	,Attack_Range: 0.4
	,weapons: [Pistol]
	,correction: {
		Pistol: [
			[3, -9, -18],
			[0, 0, 0],
			[10, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + ' ( ' +  min + ', ' + min + ' - ' + max + ', ' + max + ' )';
			}
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + '<b> __h/s: </b>' + life * 2;
			}
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		return '';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		return '';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		return '';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		return '';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		return '';
	}
	,D_Option: (character, enemy) => {return '';}
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: ''
};
const Emma = {
		Attack_Power: 40
	,Attack_Power_Growth: 2.5
	,Health: 550
	,Health_Growth: 60
	,Health_Regen: 0.4
	,Health_Regen_Growth: 0.02
	,Stamina: 430
	,Stamina_Growth: 18
	,Stamina_Regen: 1.1
	,Stamina_Regen_Growth: 0.02
	,Defense: 28
	,Defense_Growth: 1.6
	,Atk_Speed: 0.12
	,Crit_Rate: 0
	,Move_Speed: 3
	,Sight_Range: 8
	,Attack_Range: 0.4
	,weapons: [Shuriken]
	,correction: {
		Shuriken: [
			[0, -4, -8],
			[0, 0, 0]
		]
	}
	,Base_Attack: (character, enemy) => {
		if (character.weapon) {
			const damage = baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1);
			const min = baseAttackDamage(character, enemy, 0, 1, 0, 1);
			const max = baseAttackDamage(character, enemy, 0, 1, 100, 1);
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + ' ( ' +  min + ', ' + min + ' - ' + max + ', ' + max + ' )';
			}
			return damage + ' ( ' +  min + ' - ' + max + ' ) ';
		}
		return '-';
	}
	,Base_Attack_Option: ''
	,DPS: (character, enemy) => {
		if (character.weapon) {
			const damage = (baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * character.attack_speed * 100 | 0) / 100;
			const life = ((baseAttackDamage(character, enemy, 0, 1, character.critical_strike_chance, 1) * (character.life_steal / 100) | 0) * character.attack_speed * 100 | 0) / 100;
			if (character.weapon.Type === 'DualSwords') {
				return damage * 2 + '<b> __h/s: </b>' + life * 2;
			}
			return damage + '<b> __h/s: </b>' + life;
		}
		return '-';
	}
	,DPS_Option: ''
	,Q_Skill: (character, enemy) => {
		return '';
	}
	,Q_Option: ''
	,W_Skill: (character, enemy) => {
		return '';
	}
	,W_Option: ''
	,E_Skill: (character, enemy) => {
		return '';
	}
	,E_Option: ''
	,R_Skill: (character, enemy) => {
		return '';
	}
	,R_Option: ''
	,D_Skill: (character, enemy) => {
		return '';
	}
	,D_Option: (character, enemy) => {return '';}
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: ''
}