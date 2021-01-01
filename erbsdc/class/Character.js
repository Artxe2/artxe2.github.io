class Character {
    updateDisplay() {
        if (this.character) {
            this.BASE_ATTACK_DAMAGE.innerHTML = this.character.Base_Attack(this, this.enemy);
            this.DPS_DAMAGE.innerHTML = this.character.DPS(this, this.enemy);
            this.HPS_DAMAGE.innerHTML = this.character.HPS(this, this.enemy);
            this.Q_DAMAGE.innerHTML = this.character.Q_Skill(this, this.enemy);
            this.W_DAMAGE.innerHTML = this.character.W_Skill(this, this.enemy);
            this.E_DAMAGE.innerHTML = this.character.E_Skill(this, this.enemy);
            this.R_DAMAGE.innerHTML = this.character.R_Skill(this, this.enemy);
            this.D_DAMAGE.innerHTML = this.character.D_Skill(this, this.enemy);
            this.T_DAMAGE.innerHTML = this.character.T_Skill(this, this.enemy);
        }
    }
    
    constructor(index, DIV, MODE) {
        this.index = index;
        this. DIV = DIV;
        this.WEAPON = DIV.querySelector('.weapon');
        this.CHEST = DIV.querySelector('.chest');
        this.HEAD = DIV.querySelector('.head');
        this.ARM = DIV.querySelector('.arm');
        this.LEG = DIV.querySelector('.leg');
        this.ACCESSORY = DIV.querySelector('.accessory');
        this.FOOD = DIV.querySelector('.food');

        this.I_CHARACTER = DIV.querySelector('.i_character');
        this.CHARACTER = DIV.querySelector('.character');
        this.LEVEL = DIV.querySelector('.level');

        this.WEAPON_MASTERY = DIV.querySelector('.weapon_mastery');
        this.HUNT_MASTERY = DIV.querySelector('.hunt_mastery');
        this.CRAFT_MASTERY = DIV.querySelector('.craft_mastery');
        this.SEARCH_MASTERY = DIV.querySelector('.search_mastery');
        this.MOVE_MASTERY = DIV.querySelector('.move_mastery');
        this.HEALTH_MASTERY = DIV.querySelector('.health_mastery');
        this.DEFENSE_MASTERY = DIV.querySelector('.defense_mastery');
        this.MEDITATION_MASTERY = DIV.querySelector('.meditation_mastery'); 
        this.TRAP_MASTERY = DIV.querySelector('.trap_mastery');

        this.Q_LEVEL = DIV.querySelector('.q_level');
        this.W_LEVEL = DIV.querySelector('.w_level');
        this.E_LEVEL = DIV.querySelector('.e_level');
        this.R_LEVEL = DIV.querySelector('.r_level');
        this.T_LEVEL = DIV.querySelector('.t_level');

        this.ITEM_LIST = DIV.querySelector('.item_list');

        this.ATTACK_POWER = DIV.querySelector('.attack_power');
        this.ATTACK_SPEED = DIV.querySelector('.attack_speed');
        this.CRITICAL_STRIKE_CHANCE = DIV.querySelector('.critical_strike_chance');
        this.CRITICAL_STRIKE_DAMAGE = DIV.querySelector('.critical_strike_damage');
        this.LIFE_STEAL = DIV.querySelector('.life_steal');
        this.EXTRA_NORMAL_ATTACK_DAMAGE = DIV.querySelector('.extra_normal_attack_damage');
        this.SKILL_AMPLIFICATION = DIV.querySelector('.skill_amplification');
        this.COOLDOWN_REDUCTION = DIV.querySelector('.cooldown_reduction');
        this.SP_REGEN = DIV.querySelector('.sp_regen');
        this.SKILL_DAMAGE_REDUCTION = DIV.querySelector('.skill_damage_reduction');
        
        this.DEFENSE = DIV.querySelector('.defense');
        this.MAX_HP = DIV.querySelector('.max_hp');
        this.MAX_SP = DIV.querySelector('.max_sp');
        this.HP_REGEN = DIV.querySelector('.hp_regen');
        this.NORMAL_ATTACK_DAMAGE_REDUCTION = DIV.querySelector('.normal_attack_damage_reduction');
        this.MOVEMENT_SPEED = DIV.querySelector('.movement_speed');
        this.OUT_OF_COMBAT_MOVEMENT_SPEED = DIV.querySelector('.out_of_combat_movement_speed');
        this.VISION_RANGE = DIV.querySelector('.vision_range');
        this.ATTACK_RANGE = DIV.querySelector('.attack_range');

        this.BASE_ATTACK_DAMAGE = DIV.querySelector('.base_attack_damage');
        this.BASE_ATTACK_OPTION = DIV.querySelector('.base_attack_option');
        this.DPS_DAMAGE = DIV.querySelector('.dps_damage');
        this.DPS_OPTION = DIV.querySelector('.dps_option');
        this.HPS_DAMAGE = DIV.querySelector('.hps_damage');
        this.Q_DAMAGE = DIV.querySelector('.q_damage');
        this.Q_OPTION = DIV.querySelector('.q_option');
        this.W_DAMAGE = DIV.querySelector('.w_damage');
        this.W_OPTION = DIV.querySelector('.w_option');
        this.E_DAMAGE = DIV.querySelector('.e_damage');
        this.E_OPTION = DIV.querySelector('.e_option');
        this.R_DAMAGE = DIV.querySelector('.r_damage');
        this.R_OPTION = DIV.querySelector('.r_option');
        this.D_DAMAGE = DIV.querySelector('.d_damage');
        this.D_OPTION = DIV.querySelector('.d_option');
        this.T_DAMAGE = DIV.querySelector('.t_damage');
        this.T_OPTION = DIV.querySelector('.t_option');

        this.MODE = MODE;

        this.WEAPON.addEventListener('click', (e) => {
        	if (!this.character) {
                alert('select character plz');
            } else {
                let list = '';
                let br = 0;
                for (let i = 0, j; i < this.character.weapons.length; i++) {
                    const w = this.character.weapons[i];
                    for (j = 0; j < w.length; j++) {
                        list += "<img class='" + w[j].Rarity + "' title='" + w[j].Title + "' onclick='characters[" + this.index + "].setWeapon (" + i + ", " + j + ")' src='./img/weapon/" + w[j].Name + ".png' width='128px' height='71px' border='1'>";
                        if (++br == 3) {
                            br = 0;
                            list += '<br>';
                        }
                    }
                }
                list += "<img title='remove weapon' onclick='characters[" + this.index + "].removeWeapon()' src='./img/weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.CHEST.addEventListener('click', (e) => {
        	if (!this.character) {
                alert('select character plz');
            } else {
                let list = '';
                let br = 0;
                for (let i = 0; i < Chest.length; i++) {
                    list += "<img class='" + Chest[i].Rarity + "' title='" + Chest[i].Title + "' onclick='characters[" + this.index + "].setChest(" + i + ")' src='./img/armors/" + Chest[i].Name + ".png' width='128px' height='71px' border='1'>";
                    if (++br == 3) {
                        br = 0;
                        list += '<br>';
                    }
                }
                list += "<img title='remove chest' onclick='characters[" + this.index + "].removeChest()' src='./img/weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.HEAD.addEventListener('click', (e) => {
        	if (!this.character) {
                alert('select character plz');
            } else {
                let list = '';
                let br = 0;
                for (let i = 0; i < Head.length; i++) {
                    list += "<img class='" + Head[i].Rarity + "' title='" + Head[i].Title + "' onclick='characters[" + this.index + "].setHead(" + i + ")' src='./img/armors/" + Head[i].Name + ".png' width='128px' height='71px' border='1'>";
                    if (++br == 3) {
                        br = 0;
                        list += '<br>';
                    }
                }
                list += "<img title='remove head' onclick='characters[" + this.index + "].removeHead()' src='./img/weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.ARM.addEventListener('click', (e) => {
        	if (!this.character) {
                alert('select character plz');
            } else {
                let list = '';
                let br = 0;
                for (let i = 0; i < Arm.length; i++) {
                    list += "<img class='" + Arm[i].Rarity + "' title='" + Arm[i].Title + "' onclick='characters[" + this.index + "].setArm(" + i + ")' src='./img/armors/" + Arm[i].Name + ".png' width='128px' height='71px' border='1'>";
                    if (++br == 3) {
                        br = 0;
                        list += '<br>';
                    }
                }
                list += "<img title='remove arm' onclick='characters[" + this.index + "].removeArm()' src='./img/weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.LEG.addEventListener('click', (e) => {
        	if (!this.character) {
                alert('select character plz');
            } else {
                let list = '';
                let br = 0;
                for (let i = 0; i < Leg.length; i++) {
                    list += "<img class='" + Leg[i].Rarity + "' title='" + Leg[i].Title + "' onclick='characters[" + this.index + "].setLeg(" + i + ")' src='./img/armors/" + Leg[i].Name + ".png' width='128px' height='71px' border='1'>";
                    if (++br == 3) {
                        br = 0;
                        list += '<br>';
                    }
                }
                list += "<img title='remove leg' onclick='characters[" + this.index + "].removeLeg()' src='./img/weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.ACCESSORY.addEventListener('click', (e) => {
        	if (!this.character) {
                alert('select character plz');
            } else {
                let list = '';
                let br = 0;
                for (let i = 0; i < Accessory.length; i++) {
                    list += "<img class='" + Accessory[i].Rarity + "' title='" + Accessory[i].Title + "' onclick='characters[" + this.index + "].setAccessory(" + i + ")' src='./img/armors/" + Accessory[i].Name + ".png' width='128px' height='71px' border='1'>";
                    if (++br == 3) {
                        br = 0;
                        list += '<br>';
                    }
                }
                list += "<img title='remove accessory' onclick='characters[" + this.index + "].removeAccessory()' src='./img/weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.FOOD.addEventListener('click', (e) => {
        	if (!this.character) {
                alert('select character plz');
            } else {	
                let list = '';
                let br = 0;
                for (let i = 0; i < Food.length; i++) {
                    list += "<img class='" + Food[i].Rarity + "' title='" + Food[i].Title + "' onclick='characters[" + this.index + "].setFood(" + i + ")' src='./img/foods/" + Food[i].Name + ".png' width='128px' height='71px' border='1'>";
                    if (++br == 3) {
                        br = 0;
                        list += '<br>';
                    }
                }
                list += "<img title='remove accessory' onclick='characters[" + this.index + "].removeFood()' src='./img/weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.CHARACTER.addEventListener('change', (e) => {
            const select = e.target.value;
            if (select === '') {
                this.character = null;
                this.weapon = null;
                this.chest = null;
                this.head = null;
                this.arm = null;
                this.leg = null;
                this.accessory = null;
                this.I_CHARACTER.innerHTML = "<div class='margin'></div>";
                this.WEAPON.innerHTML = '';
                this.CHEST.innerHTML = '';
                this.HEAD.innerHTML = '';
                this.ARM.innerHTML = '';
                this.LEG.innerHTML = '';
                this.ACCESSORY.innerHTML = '';
                this.BASE_ATTACK_OPTION.innerHTML = '';
                this.DPS_OPTION.innerHTML = '';
                this.Q_OPTION.innerHTML = '';
                this.W_OPTION.innerHTML = '';
                this.E_OPTION.innerHTML = '';
                this.R_OPTION.innerHTML = '';
                this.D_OPTION.innerHTML = '';
                this.T_OPTION.innerHTML = '';
            } else {
                this.I_CHARACTER.innerHTML = "<img class='character_image' src='./img/character/" + select + ".png'>";
                this.character = eval(select);
                if (this.weapon != null) {
                    let isEquipable = false;
                    this.character.weapons.forEach(w => {
                        if (this.weapon.Type === w[0].Type) {
                            isEquipable = true;
                            return;
                        }
                    });
                    if (!isEquipable) {
                        this.weapon = null;
                        this.WEAPON.innerHTML = '';
                    }
                }
                this.BASE_ATTACK_OPTION.innerHTML = this.character.Base_Attack_Option;
                this.DPS_OPTION.innerHTML = this.character.DPS_Option;
                this.Q_OPTION.innerHTML = this.character.Q_Option;
                this.W_OPTION.innerHTML = this.character.W_Option;
                this.E_OPTION.innerHTML = this.character.E_Option;
                this.R_OPTION.innerHTML = this.character.R_Option;
                this.D_OPTION.innerHTML = this.character.D_Option(this, this.enemy);
                this.T_OPTION.innerHTML = this.character.T_Option;
            }
            updateDisplay();
        });

        this.LEVEL.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.WEAPON_MASTERY.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.HUNT_MASTERY.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.CRAFT_MASTERY.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.SEARCH_MASTERY.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.MOVE_MASTERY.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.HEALTH_MASTERY.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.DEFENSE_MASTERY.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.MEDITATION_MASTERY.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.TRAP_MASTERY.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.Q_LEVEL.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.W_LEVEL.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.E_LEVEL.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.R_LEVEL.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.T_LEVEL.addEventListener('change', (e) => {
            updateDisplay();
        });

        this.ITEM_LIST.querySelector('.close_button').addEventListener('click', (e) => {
            this.ITEM_LIST.querySelector('.item_view').innerHTML = '';
            this.ITEM_LIST.style.display = 'none';
        });
    }

    setEnemy(enemy) {
        this.enemy = enemy;
    }

	setWeapon(i, j) {
        this.weapon = this.character.weapons[i][j];
        this.weapon_mastery_attack_speed = WeaponInfo[this.weapon.Type][0];
        this.weapon_mastery_extra_normal_attack_damage_percent = WeaponInfo[this.weapon.Type][1];
        this.weapon_mastery_skill_amplification_percent = WeaponInfo[this.weapon.Type][2];
        this.WEAPON.innerHTML = "<img class = '" + this.weapon.Rarity + "' title = '" + this.weapon.Title + "' src = './img/weapon/" + this.weapon.Name + ".png' width = '80px' height = '44px'>";
        this.ITEM_LIST.style.display = 'none';
        this.D_OPTION.innerHTML = this.character.D_Option(this, this.enemy);
        updateDisplay();
    }
    removeWeapon() {
        this.weapon = null;
        this.WEAPON.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        this.D_OPTION.innerHTML = '';
        updateDisplay();
    }
    setChest(i) {
        this.chest = Chest[i];
        this.CHEST.innerHTML = "<img class = '" + this.chest.Rarity + "' title = '" + this.chest.Title + "' src = './img/armors/" + this.chest.Name + ".png' width = '80px' height = '44px'>";
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    removeChest() {
        this.chest = null;
        this.CHEST.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    setHead(i) {
        this.head = Head[i];
        this.HEAD.innerHTML = "<img class = '" + this.head.Rarity + "' title = '" + this.head.Title + "' src = './img/armors/" + this.head.Name + ".png' width = '80px' height = '44px'>";
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    removeHead() {
        this.head = null;
        this.HEAD.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    setArm(i) {
        this.arm = Arm[i];
        this.ARM.innerHTML = "<img class = '" + this.arm.Rarity + "' title = '" + this.arm.Title + "' src = './img/armors/" + this.arm.Name + ".png' width = '80px' height = '44px'>";
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    removeArm() {
        this.arm = null;
        this.ARM.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    setLeg(i) {
        this.leg = Leg[i];
        this.LEG.innerHTML = "<img class = '" + this.leg.Rarity + "' title = '" + this.leg.Title + "' src = './img/armors/" + this.leg.Name + ".png' width = '80px' height = '44px'>";
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    removeLeg() {
        this.leg = null;
        this.LEG.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    setAccessory(i) {
        this.accessory = Accessory[i];
        this.ACCESSORY.innerHTML = "<img class = '" + this.accessory.Rarity + "' title = '" + this.accessory.Title + "' src = './img/armors/" + this.accessory.Name + ".png' width = '80px' height = '44px'>";
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    removeAccessory() {
        this.accessory = null;
        this.ACCESSORY.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    setFood(i) {
        this.food = Food[i];
        this.FOOD.innerHTML = "<img class = '" + this.food.Rarity + "' title = '" + this.food.Title + "' src = './img/foods/" + this.food.Name + ".png' width = '80px' height = '44px'>";
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    removeFood() {
        this.food = null;
        this.FOOD.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }

    calcStat() {
        if (this.character) {
            const craftBonus = 0.007;
            
            this.heal_reduction = 
                this.weapon && (
                    this.weapon.Name === 'Harpe' || 
                    this.weapon.Name === 'Divine_Dual_Swords' ||
                    this.weapon.Name === 'Fangtian_Huaji' ||
                    this.weapon.Name === 'Goblin_Bat' || this.weapon.Name === 'Mallet' ||
                    this.weapon.Name === 'Spiky_Bouncy_Ball' || this.weapon.Name === 'Ruthenium_Marble' ||
                    this.weapon.Name === 'Composite_Bow' || this.weapon.Name === 'Twinbow' || this.weapon.Name === 'Elemental_Bow' ||
                    this.weapon.Name === 'The_Smiting_Dragon') ||
                this.chest && this.chest.Name === 'Rocker`s_Jacket' ||
                this.arm && this.arm.Name === 'Sword_Stopper' ||
                this.leg && this.leg.Name === 'White_Rhinos' ||
                this.accessory && (this.accessory.Name === 'Gilded_Quill_Fan' || this.accessory.Name === 'White_Crane_Fan');

            const jackie_tw = [0.03, 0.08, 0.15];
            const jackie_ts = [0.05, 0.12, 0.25];
            const jackie_t_w = this.DIV.querySelector('.jackie_t_w');
            const jackie_t_s = this.DIV.querySelector('.jackie_t_s');
            const axe_d_s = this.DIV.querySelector('.axe_d_s');
            const axe_d_u = this.DIV.querySelector('.axe_d_u');
            var hart_w_u = this.DIV.querySelector('.hart_w_u');
            const attack_power_percent = 1 + (jackie_t_w ? (jackie_t_w.checked ? jackie_tw[this.T_LEVEL.selectedIndex] : 0) + 
                (jackie_t_s.checked ? jackie_ts[this.T_LEVEL.selectedIndex] : 0) : 0) + 
                (axe_d_s ? axe_d_s.value * (axe_d_u.checked ? 0.05 + this.DIV.querySelector('.axe_d_hp').value * 0.001 : 0.02) : 0) + 
                (hart_w_u && hart_w_u.checked ? 0.12 + this.W_LEVEL.selectedIndex * 0.07 : 0);
            this.attack_power = 
                (this.character.Attack_Power + 
                this.character.Attack_Power_Growth * this.LEVEL.selectedIndex + 
                ((!this.weapon ? 0 : this.weapon.Attack_Power) + 
                (!this.chest ? 0 : this.chest.Attack_Power) + 
                (!this.head ? 0 : this.head.Attack_Power) + 
                (!this.arm ? 0 : this.arm.Attack_Power) + 
                (!this.leg ? 0 : this.leg.Attack_Power) + 
                (!this.accessory ? 0 : this.accessory.Attack_Power)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * attack_power_percent | 0;
            this.ATTACK_POWER.innerText = this.attack_power;

            this.base_attack_speed = this.character.Atk_Speed + (!this.weapon ? 0 : this.weapon.Atk_Speed);

            const jackie_r = this.DIV.querySelector('.jackie_r');
            const nadine_e = this.DIV.querySelector('.nadine_e');
            const lida_w = this.DIV.querySelector('.lida_w');
            const silvia_t = this.DIV.querySelector('.silvia_t');
            const attack_speed_bonus = (jackie_r && jackie_r.checked ? 20 + this.R_LEVEL.selectedIndex * 5 : 0) + 
                (nadine_e ? (10 + this.E_LEVEL.selectedIndex * 5) * (nadine_e.checked ? 2 : 1) : 0) + 
                (lida_w && lida_w.checked ? 10 + this.T_LEVEL.selectedIndex * 15 : 0) + 
                (silvia_t ? silvia_t.value * (1 + this.T_LEVEL.selectedIndex * 1) : 0);
            this.attack_speed = 
                (((this.base_attack_speed) * 
                (100 + attack_speed_bonus + 
                (!this.weapon ? 0 : this.weapon_mastery_attack_speed + 
                this.WEAPON_MASTERY.selectedIndex * this.weapon_mastery_attack_speed) + 
                ((!this.weapon ? 0 : this.weapon.Attack_Speed) + 
                (!this.chest ? 0 : this.chest.Attack_Speed) + 
                (!this.head ? 0 : this.head.Attack_Speed) + 
                (!this.arm ? 0 : this.arm.Attack_Speed) + 
                (!this.leg ? 0 : this.leg.Attack_Speed) + 
                (!this.accessory ? 0 : this.accessory.Attack_Speed)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus))) | 0) / 100;			
            this.ATTACK_SPEED.innerText = this.attack_speed;

            const shoichi_t = this.DIV.querySelector('.shoichi_t');
            const cri_bonus = (shoichi_t ? shoichi_t.value * (3 + this.T_LEVEL.selectedIndex * 3) : 0);
            this.critical_strike_chance = 
                (((!this.weapon ? 0 : this.weapon.Critical_Strike_Chance) + 
                (!this.chest ? 0 : this.chest.Critical_Strike_Chance) + 
                (!this.head ? 0 : this.head.Critical_Strike_Chance) + 
                (!this.arm ? 0 : this.arm.Critical_Strike_Chance) + 
                (!this.leg ? 0 : this.leg.Critical_Strike_Chance) + 
                (!this.accessory ? 0 : this.accessory.Critical_Strike_Chance)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) + cri_bonus | 0;
            if (this.critical_strike_chance > 100) {
                this.critical_strike_chance = 100;
            }
            this.CRITICAL_STRIKE_CHANCE.innerText = this.critical_strike_chance + '%';

            this.critical_strike_damage = 
                (((!this.weapon ? 0 : this.weapon.Critical_Strike_Damage) + 
                (!this.chest ? 0 : this.chest.Critical_Strike_Damage) + 
                (!this.head ? 0 : this.head.Critical_Strike_Damage) + 
                (!this.arm ? 0 : this.arm.Critical_Strike_Damage) + 
                (!this.leg ? 0 : this.leg.Critical_Strike_Damage) + 
                (!this.accessory ? 0 : this.accessory.Critical_Strike_Damage)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.CRITICAL_STRIKE_DAMAGE.innerText = this.critical_strike_damage + '%';

            this.life_steal = 
                (((!this.weapon ? 0 : this.weapon.Life_Steal) + 
                (!this.chest ? 0 : this.chest.Life_Steal) + 
                (!this.head ? 0 : this.head.Life_Steal) + 
                (!this.arm ? 0 : this.arm.Life_Steal) + 
                (!this.leg ? 0 : this.leg.Life_Steal) + 
                (!this.accessory ? 0 : this.accessory.Life_Steal)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.LIFE_STEAL.innerText = this.life_steal + '%';

            this.extra_normal_attack_damage = 
                (((!this.weapon ? 0 : this.weapon.Extra_Normal_Attack_Damage) + 
                (!this.chest ? 0 : this.chest.Extra_Normal_Attack_Damage) + 
                (!this.head ? 0 : this.head.Extra_Normal_Attack_Damage) + 
                (!this.arm ? 0 : this.arm.Extra_Normal_Attack_Damage) + 
                (!this.leg ? 0 : this.leg.Extra_Normal_Attack_Damage) + 
                (!this.accessory ? 0 : this.accessory.Extra_Normal_Attack_Damage)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.extra_normal_attack_damage_percent = 
                (this.weapon == null ? 0 : this.weapon_mastery_extra_normal_attack_damage_percent + 
                this.WEAPON_MASTERY.selectedIndex * this.weapon_mastery_extra_normal_attack_damage_percent) | 0;
            this.EXTRA_NORMAL_ATTACK_DAMAGE.innerText = 
                this.extra_normal_attack_damage + '| ' + this.extra_normal_attack_damage_percent + '%';
                
            const hart_e = this.DIV.querySelector('.hart_e');
            const hart_ee = this.DIV.querySelector('.hart_ee');
            const hart_e_s = this.DIV.querySelector('.hart_e_s');
            const sissela_t = this.DIV.querySelector('.sissela_t');
            const skill_amplification_bonus = (sissela_t ? (2 + this.T_LEVEL.selectedIndex * 3) * 
                (sissela_t.value < 10 ? 0 : (sissela_t.value >= 90 ? 5 : sissela_t.value / 20 + 0.5)) * 
                (this.DIV.querySelector('.sissela_r').checked ? 2 : 1) : 0) + 
                (silvia_t && silvia_t.value == 15 ? 15 : 0);
            const skill_amplification_percent_bonus = (hart_e ? hart_e_s.value * (hart_ee.checked ? 25 : hart_e.checked ? 15 : 0) : 0);
            this.skill_amplification = 
            Math.round((((!this.weapon ? 0 : this.weapon.Skill_Amplification) + 
                (!this.chest ? 0 : this.chest.Skill_Amplification) + 
                (!this.head ? 0 : this.head.Skill_Amplification) + 
                (!this.arm ? 0 : this.arm.Skill_Amplification) + 
                (!this.leg ? 0 : this.leg.Skill_Amplification) + 
                (!this.accessory ? 0 : this.accessory.Skill_Amplification)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus) + 
                skill_amplification_bonus) * 10) / 10;
            this.skill_amplification_percent = 
                ((!this.weapon ? 0 : this.weapon_mastery_skill_amplification_percent + 
                this.WEAPON_MASTERY.selectedIndex * this.weapon_mastery_skill_amplification_percent) + 
                ((!this.weapon ? 0 : this.weapon.Skill_Amplification_Percent) + 
                (!this.chest ? 0 : this.chest.Skill_Amplification_Percent) + 
                (!this.head ? 0 : this.head.Skill_Amplification_Percent) + 
                (!this.arm ? 0 : this.arm.Skill_Amplification_Percent) + 
                (!this.leg ? 0 : this.leg.Skill_Amplification_Percent) + 
                (!this.accessory ? 0 : this.accessory.Skill_Amplification_Percent)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) + 
                skill_amplification_percent_bonus | 0;
            this.SKILL_AMPLIFICATION.innerText = 
                this.skill_amplification + '| ' + this.skill_amplification_percent + '%';

            this.cooldown_reduction = 
                (((!this.weapon ? 0 : this.weapon.Cooldown_Reduction) + 
                (!this.chest ? 0 : this.chest.Cooldown_Reduction) + 
                (!this.head ? 0 : this.head.Cooldown_Reduction) + 
                (!this.arm ? 0 : this.arm.Cooldown_Reduction) + 
                (!this.leg ? 0 : this.leg.Cooldown_Reduction) + 
                (!this.accessory ? 0 : this.accessory.Cooldown_Reduction)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            if (this.cooldown_reduction > 40) {
                this.cooldown_reduction = 40;
            }
            this.COOLDOWN_REDUCTION.innerText = this.cooldown_reduction + '%';

            this.sp_regen = 
            Math.round((this.character.Stamina_Regen + 
                this.character.Stamina_Regen_Growth * this.LEVEL.selectedIndex + 
                ((!this.weapon ? 0 : this.weapon.SP_Regen) + 
                (!this.chest ? 0 : this.chest.SP_Regen) + 
                (!this.head ? 0 : this.head.SP_Regen) + 
                (!this.arm ? 0 : this.arm.SP_Regen) + 
                (!this.leg ? 0 : this.leg.SP_Regen) + 
                (!this.accessory ? 0 : this.accessory.SP_Regen)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 10) / 10;
            this.sp_regen_percent = 
                (((!this.weapon ? 0 : this.weapon.SP_Regen_Percent) + 
                (!this.chest ? 0 : this.chest.SP_Regen_Percent) + 
                (!this.head ? 0 : this.head.SP_Regen_Percent) + 
                (!this.arm ? 0 : this.arm.SP_Regen_Percent) + 
                (!this.leg ? 0 : this.leg.SP_Regen_Percent) + 
                (!this.accessory ? 0 : this.accessory.SP_Regen_Percent)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.SP_REGEN.innerText = 
                this.sp_regen + '| ' + this.sp_regen_percent + '%';

            this.skill_damage_reduction = 
                (((!this.weapon ? 0 : this.weapon.Skill_Damage_Reduction) + 
                (!this.chest ? 0 : this.chest.Skill_Damage_Reduction) + 
                (!this.head ? 0 : this.head.Skill_Damage_Reduction) + 
                (!this.arm ? 0 : this.arm.Skill_Damage_Reduction) + 
                (!this.leg ? 0 : this.leg.Skill_Damage_Reduction) + 
                (!this.accessory ? 0 : this.accessory.Skill_Damage_Reduction)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.skill_damage_reduction_percent = 
                (1 + this.DEFENSE_MASTERY.selectedIndex * 1 + 
                ((!this.weapon ? 0 : this.weapon.Skill_Damage_Reduction_Percent) + 
                (!this.chest ? 0 : this.chest.Skill_Damage_Reduction_Percent) + 
                (!this.head ? 0 : this.head.Skill_Damage_Reduction_Percent) + 
                (!this.arm ? 0 : this.arm.Skill_Damage_Reduction_Percent) + 
                (!this.leg ? 0 : this.leg.Skill_Damage_Reduction_Percent) + 
                (!this.accessory ? 0 : this.accessory.Skill_Damage_Reduction_Percent)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.SKILL_DAMAGE_REDUCTION.innerText = 
                this.skill_damage_reduction + '| ' + this.skill_damage_reduction_percent + '%';

            const magnus_t = this.DIV.querySelector('.magnus_t');
            const hammer_d = this.enemy.DIV.querySelector('.hammer_d');
            const hyunwoo_w = this.DIV.querySelector('.hyunwoo_w');
            const hyunwoo_e = this.enemy.DIV.querySelector('.hyunwoo_e');
            hart_w_u = this.enemy.DIV.querySelector('.hart_w_u');
            const hart_w = this.enemy.DIV.querySelector('.hart_w');
            const hart_ww = this.enemy.DIV.querySelector('.hart_ww');
            const isol_t = this.enemy.DIV.querySelector('.isol_t');
            const yuki_w = this.DIV.querySelector('.yuki_w');
            const xiukai_r = this.enemy.DIV.querySelector('.xiukai_r');
            var chiara_t = this.enemy.DIV.querySelector('.chiara_t');
            const silvia_r = this.DIV.querySelector('.silvia_r');
            const defense_percent = 1 + (magnus_t ? magnus_t.value * (0.002 + this.T_LEVEL.selectedIndex * 0.0015) : 0) + 
                (hyunwoo_w && hyunwoo_w.checked ? 0.1 : 0) + (yuki_w && yuki_w.checked ? 0.5 : 0);
            const defense_minus = 1 - (hammer_d && hammer_d.checked && this.enemy.WEAPON_MASTERY.selectedIndex > 5? this.enemy.WEAPON_MASTERY.selectedIndex < 13 ? 0.25 : 0.4 : 0) - 
                (hyunwoo_e && hyunwoo_e.checked ? 0.07 + this.enemy.E_LEVEL.selectedIndex * 0.02 : 0) - 
                (hart_w_u && hart_w_u.checked ? hart_ww.checked ? 0.3 : hart_w.checked ? 0.15 : 0 : 0) - 
                (isol_t && isol_t.checked ? 0.05 + this.enemy.T_LEVEL.selectedIndex * 0.1 : 0) - 
                (xiukai_r && xiukai_r.checked ? 0.1 + this.enemy.R_LEVEL.selectedIndex * 0.05 : 0) - 
                (chiara_t ? chiara_t.value * (0.02 + this.enemy.T_LEVEL.selectedIndex * 0.02) : 0);
            const defense_bonus = (hyunwoo_w && hyunwoo_w.checked ? 4 + this.W_LEVEL.selectedIndex * 14 : 0) + 
                (silvia_r && silvia_r.checked ? 10 + this.R_LEVEL.selectedIndex * 7 : 0)
            this.defense = 
                ((this.character.Defense + this.character.Defense_Growth * this.LEVEL.selectedIndex + 
                ((!this.weapon ? 0 : this.weapon.Defense) + 
                (!this.chest ? 0 : this.chest.Defense) + 
                (!this.head ? 0 : this.head.Defense) + 
                (!this.arm ? 0 : this.arm.Defense) + 
                (!this.leg ? 0 : this.leg.Defense) + 
                (!this.accessory ? 0 : this.accessory.Defense)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 
                defense_percent + defense_bonus) * defense_minus | 0;
            this.DEFENSE.innerText = this.defense;

            const xiukai_t = this.DIV.querySelector('.xiukai_t');
            const chiara_r = this.DIV.querySelector('.chiara_r');
            const hp_bonus = (xiukai_t ? xiukai_t.value * 8 : 0) + 
                (chiara_r && chiara_r.checked ? 100 + this.R_LEVEL.selectedIndex * 100 : 0);
            this.max_hp = 
                ((this.character.Health + this.character.Health_Growth * this.LEVEL.selectedIndex + hp_bonus + 
                ((!this.weapon ? 0 : this.weapon.Max_HP) + 
                (!this.chest ? 0 : this.chest.Max_HP) + 
                (!this.head ? 0 : this.head.Max_HP) + 
                (!this.arm ? 0 : this.arm.Max_HP) + 
                (!this.leg ? 0 : this.leg.Max_HP) + 
                (!this.accessory ? 0 : this.accessory.Max_HP)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 
                (1.012 + this.HEALTH_MASTERY.selectedIndex * 0.012)) | 0;
            this.MAX_HP.innerText = this.max_hp;

            this.max_sp = 
                ((this.character.Stamina + this.character.Stamina_Growth * this.LEVEL.selectedIndex + 
                ((!this.weapon ? 0 : this.weapon.Max_SP) + 
                (!this.chest ? 0 : this.chest.Max_SP) + 
                (!this.head ? 0 : this.head.Max_SP) + 
                (!this.arm ? 0 : this.arm.Max_SP) + 
                (!this.leg ? 0 : this.leg.Max_SP) + 
                (!this.accessory ? 0 : this.accessory.Max_SP)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 
                (1.017 + this.MEDITATION_MASTERY.selectedIndex * 0.017)) | 0;
            this.MAX_SP.innerText = this.max_sp;

            this.hp_regen = 
            Math.round((this.character.Health_Regen + this.character.Health_Regen_Growth * this.LEVEL.selectedIndex + 
                ((!this.weapon ? 0 : this.weapon.HP_Regen) + 
                (!this.chest ? 0 : this.chest.HP_Regen) + 
                (!this.head ? 0 : this.head.HP_Regen) + 
                (!this.arm ? 0 : this.arm.HP_Regen) + 
                (!this.leg ? 0 : this.leg.HP_Regen) + 
                (!this.accessory ? 0 : this.accessory.HP_Regen)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 10) / 10;
            this.hp_regen_percent = 
                (((!this.weapon ? 0 : this.weapon.HP_Regen_Percent) + 
                (!this.chest ? 0 : this.chest.HP_Regen_Percent) + 
                (!this.head ? 0 : this.head.HP_Regen_Percent) + 
                (!this.arm ? 0 : this.arm.HP_Regen_Percent) + 
                (!this.leg ? 0 : this.leg.HP_Regen_Percent) + 
                (!this.accessory ? 0 : this.accessory.HP_Regen_Percent)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.HP_REGEN.innerText = 
                this.hp_regen + '| ' + this.hp_regen_percent + '%';

            this.normal_attack_damage_reduction = 
                (((!this.weapon ? 0 : this.weapon.Normal_Attack_Damage_Reduction) + 
                (!this.chest ? 0 : this.chest.Normal_Attack_Damage_Reduction) + 
                (!this.head ? 0 : this.head.Normal_Attack_Damage_Reduction) + 
                (!this.arm ? 0 : this.arm.Normal_Attack_Damage_Reduction) + 
                (!this.leg ? 0 : this.leg.Normal_Attack_Damage_Reduction) + 
                (!this.accessory ? 0 : this.accessory.Normal_Attack_Damage_Reduction)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.normal_attack_damage_reduction_percent = 
                (1.2 + this.DEFENSE_MASTERY.selectedIndex * 1.2) | 0;
            this.NORMAL_ATTACK_DAMAGE_REDUCTION.innerText = 
                this.normal_attack_damage_reduction + '| ' + this.normal_attack_damage_reduction_percent + '%';

            const jackie_w = this.DIV.querySelector('.jackie_w');
            chiara_t = this.DIV.querySelector('.chiara_t');
            const move_percent = 1 + 
                    (jackie_w && jackie_w.checked ? 0.06 + this.W_LEVEL.selectedIndex * 0.03 : 0) + 
                    (chiara_t && chiara_t.value == 4 ? 0.04 + this.T_LEVEL.selectedIndex * 0.02 : 0) + 
                    (silvia_r && silvia_r.checked ? 0.7 : 0);
            const move_bonus = (silvia_r && silvia_r.checked ? 0.2 + this.R_LEVEL.selectedIndex * 0.05 : 0);
            this.movement_speed = 
            Math.round((this.character.Move_Speed + move_bonus + 
                0.01 + this.MOVE_MASTERY.selectedIndex * 0.01 + 
                ((!this.weapon ? 0 : this.weapon.Move_Speed) + 
                (!this.chest ? 0 : this.chest.Move_Speed) + 
                (!this.head ? 0 : this.head.Move_Speed) + 
                (!this.arm ? 0 : this.arm.Move_Speed) + 
                (!this.leg ? 0 : this.leg.Move_Speed) + 
                (!this.accessory ? 0 : this.accessory.Move_Speed)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 100 * move_percent) / 100;
            if (this.movement_speed > 7) {
                this.movement_speed = 7;
            }
            this.MOVEMENT_SPEED.innerText = this.movement_speed;

            this.out_of_combat_movement_speed = 
            Math.round((0.02 + this.MOVE_MASTERY.selectedIndex * 0.02 + 
                ((!this.weapon ? 0 : this.weapon.Out_of_Combat_Movement_Speed) + 
                (!this.chest ? 0 : this.chest.Out_of_Combat_Movement_Speed) + 
                (!this.head ? 0 : this.head.Out_of_Combat_Movement_Speed) + 
                (!this.arm ? 0 : this.arm.Out_of_Combat_Movement_Speed) + 
                (!this.leg ? 0 : this.leg.Out_of_Combat_Movement_Speed) + 
                (!this.accessory ? 0 : this.accessory.Out_of_Combat_Movement_Speed)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 100 * move_percent) / 100;
            if (this.movement_speed + this.out_of_combat_movement_speed > 7) {
                this.out_of_combat_movement_speed = 7 - this.movement_speed;
            }
            this.OUT_OF_COMBAT_MOVEMENT_SPEED.innerText = Math.round((this.movement_speed + this.out_of_combat_movement_speed) * 100) / 100;

            this.vision_range = 
            Math.round((this.character.Sight_Range + 0.1 + 
                this.SEARCH_MASTERY.selectedIndex * 0.1 + 
                ((!this.weapon ? 0 : this.weapon.Vision_Range) + 
                (!this.chest ? 0 : this.chest.Vision_Range) + 
                (!this.head ? 0 : this.head.Vision_Range) + 
                (!this.arm ? 0 : this.arm.Vision_Range) + 
                (!this.leg ? 0 : this.leg.Vision_Range) + 
                (!this.accessory ? 0 : this.accessory.Vision_Range)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 10) / 10;
            this.VISION_RANGE.innerText = this.vision_range;

            const attack_range_bonus = (chiara_r && chiara_r.checked ? 3.65 : 0);
            this.attack_range = 
            Math.round((this.character.Attack_Range + (this.weapon == null ? 0 : this.weapon.Base_Range) + 
                attack_range_bonus + 
                ((!this.weapon ? 0 : this.weapon.Attack_Range) + 
                (!this.chest ? 0 : this.chest.Attack_Range) + 
                (!this.head ? 0 : this.head.Attack_Range) + 
                (!this.arm ? 0 : this.arm.Attack_Range) + 
                (!this.leg ? 0 : this.leg.Attack_Range) + 
                (!this.accessory ? 0 : this.accessory.Attack_Range)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 100) / 100;
            this.ATTACK_RANGE.innerText = this.attack_range;
        } else {
            this.heal_reduction = '';

            this.attack_power = '';
            this.ATTACK_POWER.innerText = '';

            this.attack_speed = '';		
            this.ATTACK_SPEED.innerText = '';

            this.critical_strike_chance = '';
            this.CRITICAL_STRIKE_CHANCE.innerText = '%';

            this.critical_strike_damage = '';
            this.CRITICAL_STRIKE_DAMAGE.innerText = '%';

            this.life_steal = '';
            this.LIFE_STEAL.innerText = '%';

            this.extra_normal_attack_damage = '';
            this.extra_normal_attack_damage_percent = '';
            this.EXTRA_NORMAL_ATTACK_DAMAGE.innerText = '| %';
                
            this.skill_amplification = '';
            this.skill_amplification_percent = '';
            this.SKILL_AMPLIFICATION.innerText = '| %';

            this.cooldown_reduction = '';
            this.COOLDOWN_REDUCTION.innerText = this.cooldown_reduction + '%';

            this.sp_regen = '';
            this.sp_regen_percent = '';
            this.SP_REGEN.innerText = '| %';

            this.skill_damage_reduction = '';
            this.skill_damage_reduction_percent = '';
            this.SKILL_DAMAGE_REDUCTION.innerText = '| %';

            this.defense = '';
            this.DEFENSE.innerText = '';

            this.max_hp = '';
            this.MAX_HP.innerText = '';

            this.max_sp = '';
            this.MAX_SP.innerText = '';

            this.hp_regen = '';
            this.hp_regen_percent = '';
            this.HP_REGEN.innerText = '| %';

            this.normal_attack_damage_reduction = '';
            this.normal_attack_damage_reduction_percent = '';
            this.NORMAL_ATTACK_DAMAGE_REDUCTION.innerText = '| %';

            this.movement_speed = '';
            this.MOVEMENT_SPEED.innerText = '';

            this.out_of_combat_movement_speed = '';
            this.OUT_OF_COMBAT_MOVEMENT_SPEED.innerText = '';

            this.vision_range = '';
            this.VISION_RANGE.innerText = '';

            this.attack_range = '';
            this.ATTACK_RANGE.innerText = '';
        }
    }
}