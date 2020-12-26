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
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: ''
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
		AssultRifle: [
			[0, -15, -13],
			[0, 0, 0]
		],
		SniperRifle: [
			[0, -15, -15],
			[0, 0, 0]
		]
	}
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
	,T_Skill: (character, enemy) => {
		return '';
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
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
	,T_Skill: (character, enemy) => {
		return '';
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
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: ''
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
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
	,T_Skill: (character, enemy) => {
		return '';
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
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: ''
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
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
	,T_Skill: (character, enemy) => {
		return '';
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
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: ''
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
		Glove: [
			[0, -8, -18],
			[0, 0, 0]
		],
		Tonfa: [
			[0, -8, -18],
			[0, 0, 0]
		]
	}
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: ''
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
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
	,T_Skill: (character, enemy) => {
		return '';
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
			[5, -3, -3],
			[0, 0, 0]
		],
		DualSwords: [
			[0, -8, -8],
			[0, 0, 0]
		]
	}
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
	,T_Skill: (character, enemy) => {
		return '';
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
			[5, -4, -10],
			[-3, 0, 0]
		],
		Bow: [
			[0, -10, -18],
			[-3, 0, 0]
		]
	}
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
	,T_Skill: (character, enemy) => {
		return '';
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
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
	,T_Skill: (character, enemy) => {
		return '';
	}
	,T_Option: ''
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
	,Move_Speed: 3.2
	,Sight_Range: 8
	,Attack_Range: 0.4
	,weapons: [Rapier]
	,correction: {
		Rapier: [
			[0, -5, -3],
			[0, 0, 0]
		]
	}
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
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
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
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
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
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
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
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
	,BASE_ATTACK: (character, enemy) => {
		return '';
	}
	,BASE_ATTACK_Option: ''
	,DPS: (character, enemy) => {
		return '';
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
	,D_Option: ''
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
   ,BASE_ATTACK: (character, enemy) => {
	   return '';
   }
   ,BASE_ATTACK_Option: ''
   ,DPS: (character, enemy) => {
	   return '';
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
   ,D_Option: ''
   ,T_Skill: (character, enemy) => {
	   return '';
   }
   ,T_Option: ''
}