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
	,weapons: ['Dagger', 'TwoHandedSword', 'Axe', 'DualSwords']
	,BASE_ATTACK: (selector, character, enemy) => {
		return '';
	}
	,DPS: (selector, character, enemy) => {
		return '';
	}
	,Q_Skill: (selector, character, enemy) => {
		return '';
	}
	,Q_Option: ''
	,W_Skill: (selector, character, enemy) => {
		return '';
	}
	,W_Option: ''
	,E_Skill: (selector, character, enemy) => {
		return '';
	}
	,E_Option: ''
	,R_Skill: (selector, character, enemy) => {
		return '';
	}
	,R_Option: ''
	,D_Skill: (selector, character, enemy) => {
		return '';
	}
	,D_Option: ''
	,T_Skill: (selector, character, enemy) => {
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
}