class Character {
    updateDisplay() {
        this.calcStat();
    }
    constructor(index, DIV) {
        this.index = index;
        this.WEAPON = DIV.querySelector('.weapon');
        this.CHEST = DIV.querySelector('.chest');
        this.HEAD = DIV.querySelector('.head');
        this.ARM = DIV.querySelector('.arm');
        this.LEG = DIV.querySelector('.leg');
        this.ACCESSORY = DIV.querySelector('.accessory');
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
        this.E_LEVEL = DIV.querySelector('.w_level');
        this.R_LEVEL = DIV.querySelector('.w_level');
        this.T_LEVEL = DIV.querySelector('.w_level');
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

        this.WEAPON.addEventListener('click', (e) => {
        	if (this.character == null) {
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
                };
                list += "<img title='remove weapon' onclick='characters[" + this.index + "].removeWeapon' src='./img/weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.CHEST.addEventListener('click', (e) => {
        	if (this.character == null) {
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
                list += "<img title='remove chest' onclick='characters[" + this.index + "].removeChest' src='./img/weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.HEAD.addEventListener('click', (e) => {
        	if (this.character == null) {
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
                list += "<img title='remove head' onclick='characters[" + this.index + "].removeHead' src='./img/weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.ARM.addEventListener('click', (e) => {
        	if (this.character == null) {
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
                list += "<img title='remove arm' onclick='characters[" + this.index + "].removeArm' src='./img/weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.LEG.addEventListener('click', (e) => {
        	if (this.character == null) {
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
                list += "<img title='remove leg' onclick='characters[" + this.index + "].removeLeg' src='./img/weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.ACCESSORY.addEventListener('click', (e) => {
        	if (this.character == null) {
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
                list += "<img title='remove accessory' onclick='characters[" + this.index + "].removeAccessory' src='./img/weapon/blank.png' width='128px' height='71px' border='1'>";
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
            }
            this.ITEM_LIST.querySelector('.close_button').addEventListener('click', (e) => {
                this.ITEM_LIST.querySelector('.item_view').innerHTML = '';
                this.ITEM_LIST.style.display = 'none';
            });
            this.updateDisplay();
        });

        this.LEVEL.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.WEAPON_MASTERY.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.HUNT_MASTERY.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.CRAFT_MASTERY.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.SEARCH_MASTERY.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.MOVE_MASTERY.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.HEALTH_MASTERY.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.DEFENSE_MASTERY.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.MEDITATION_MASTERY.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.TRAP_MASTERY.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.Q_LEVEL.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.W_LEVEL.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.E_LEVEL.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.R_LEVEL.addEventListener('change', (e) => {
            this.updateDisplay();
        });
        this.T_LEVEL.addEventListener('change', (e) => {
            this.updateDisplay();
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
        this.updateDisplay();
    }
    removeWeapon() {
        this.weapon = null;
        this.WEAPON.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        this.updateDisplay();
    }
    setChest(i) {
        this.chest = Chest[i];
        this.CHEST.innerHTML = "<img class = '" + this.chest.Rarity + "' title = '" + this.chest.Title + "' src = './img/armors/" + this.chest.Name + ".png' width = '80px' height = '44px'>";
        this.ITEM_LIST.style.display = 'none';
        this.updateDisplay();
    }
    removeChest() {
        this.chest = null;
        this.CHEST.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        this.updateDisplay();
    }
    setHead(i) {
        this.head = Head[i];
        this.HEAD.innerHTML = "<img class = '" + this.head.Rarity + "' title = '" + this.head.Title + "' src = './img/armors/" + this.head.Name + ".png' width = '80px' height = '44px'>";
        this.ITEM_LIST.style.display = 'none';
        this.updateDisplay();
    }
    removeHead() {
        this.head = null;
        this.HEAD.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        this.updateDisplay();
    }
    setArm(i) {
        this.arm = Arm[i];
        this.ARM.innerHTML = "<img class = '" + this.arm.Rarity + "' title = '" + this.arm.Title + "' src = './img/armors/" + this.arm.Name + ".png' width = '80px' height = '44px'>";
        this.ITEM_LIST.style.display = 'none';
        this.updateDisplay();
    }
    removeArm() {
        this.arm = null;
        this.ARM.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        this.updateDisplay();
    }
    setLeg(i) {
        this.leg = Leg[i];
        this.LEG.innerHTML = "<img class = '" + this.leg.Rarity + "' title = '" + this.leg.Title + "' src = './img/armors/" + this.leg.Name + ".png' width = '80px' height = '44px'>";
        this.ITEM_LIST.style.display = 'none';
        this.updateDisplay();
    }
    removeLeg() {
        this.leg = null;
        this.LEG.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        this.updateDisplay();
    }
    setAccessory(i) {
        this.accessory = Accessory[i];
        this.ACCESSORY.innerHTML = "<img class = '" + this.accessory.Rarity + "' title = '" + this.accessory.Title + "' src = './img/armors/" + this.accessory.Name + ".png' width = '80px' height = '44px'>";
        this.ITEM_LIST.style.display = 'none';
        this.updateDisplay();
    }
    removeAccessory() {
        this.accessory = null;
        this.ACCESSORY.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        this.updateDisplay();
    }

    calcStat() {
        if (this.character == null) {
            alert('select character plz...');
        } else {
            const craftBonus = 0.007;
            this.attack_power = 
                (this.character.Attack_Power + 
                this.character.Attack_Power_Growth * this.LEVEL.selectedIndex + 
                ((this.weapon == null ? 0 : this.weapon.Attack_Power) + 
                (this.chest == null ? 0 : this.chest.Attack_Power) + 
                (this.head == null ? 0 : this.head.Attack_Power) + 
                (this.arm == null ? 0 : this.arm.Attack_Power) + 
                (this.leg == null ? 0 : this.leg.Attack_Power) + 
                (this.accessory == null ? 0 : this.accessory.Attack_Power)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.ATTACK_POWER.innerText = this.attack_power;

            this.attack_speed = 
                (((this.character.Atk_Speed + (this.weapon == null ? 0 : this.weapon.Atk_Speed)) * 
                (100 + (this.weapon == null ? 0 : this.weapon_mastery_attack_speed + 
                this.WEAPON_MASTERY.selectedIndex * this.weapon_mastery_attack_speed) + 
                ((this.weapon == null ? 0 : this.weapon.Attack_Speed) + 
                (this.chest == null ? 0 : this.chest.Attack_Speed) + 
                (this.head == null ? 0 : this.head.Attack_Speed) + 
                (this.arm == null ? 0 : this.arm.Attack_Speed) + 
                (this.leg == null ? 0 : this.leg.Attack_Speed) + 
                (this.accessory == null ? 0 : accessory.Attack_Speed)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus))) | 0) / 100;			
            this.ATTACK_SPEED.innerText = this.attack_speed;

            this.critical_strike_chance = 
                (((this.weapon == null ? 0 : this.weapon.Critical_Strike_Chance) + 
                (this.chest == null ? 0 : this.chest.Critical_Strike_Chance) + 
                (this.head == null ? 0 : this.head.Critical_Strike_Chance) + 
                (this.arm == null ? 0 : this.arm.Critical_Strike_Chance) + 
                (this.leg == null ? 0 : this.leg.Critical_Strike_Chance) + 
                (this.accessory == null ? 0 : this.accessory.Critical_Strike_Chance)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            if (this.critical_strike_chance > 100) {
                this.critical_strike_chance = 100;
            }
            this.CRITICAL_STRIKE_CHANCE.innerText = this.critical_strike_chance;

            this.critical_strike_damage = 
                (((this.tweapon == null ? 0 : this.weapon.Critical_Strike_Damage) + 
                (this.chest == null ? 0 : this.chest.Critical_Strike_Damage) + 
                (this.head == null ? 0 : this.head.Critical_Strike_Damage) + 
                (this.arm == null ? 0 : this.arm.Critical_Strike_Damage) + 
                (this.leg == null ? 0 : this.leg.Critical_Strike_Damage) + 
                (this.accessory == null ? 0 : this.accessory.Critical_Strike_Damage)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.CRITICAL_STRIKE_DAMAGE.innerText = this.critical_strike_damage + '%';

            this.life_steal = 
                (((this.life_stealweapon == null ? 0 : this.life_stealweapon.Life_Steal) + 
                (this.life_stealchest == null ? 0 : this.life_stealchest.Life_Steal) + 
                (this.life_stealhead == null ? 0 : this.life_stealhead.Life_Steal) + 
                (this.life_stealarm == null ? 0 : this.life_stealarm.Life_Steal) + 
                (this.life_stealleg == null ? 0 : this.life_stealleg.Life_Steal) + 
                (this.life_stealaccessory == null ? 0 : this.life_stealaccessory.Life_Steal)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.LIFE_STEAL.innerText = this.life_steal + '%';

            this.extra_normal_attack_damage = 
                (((this.weapon == null ? 0 : this.weapon.Extra_Normal_Attack_Damage) + 
                (this.chest == null ? 0 : this.chest.Extra_Normal_Attack_Damage) + 
                (this.head == null ? 0 : this.head.Extra_Normal_Attack_Damage) + 
                (this.arm == null ? 0 : this.arm.Extra_Normal_Attack_Damage) + 
                (this.leg == null ? 0 : this.leg.Extra_Normal_Attack_Damage) + 
                (this.accessory == null ? 0 : this.accessory.Extra_Normal_Attack_Damage)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.extra_normal_attack_damage_percent = 
                (this.weapon == null ? 0 : this.weapon_mastery_extra_normal_attack_damage_percent + 
                this.WEAPON_MASTERY.selectedIndex * this.weapon_mastery_extra_normal_attack_damage_percent) | 0;
            this.EXTRA_NORMAL_ATTACK_DAMAGE.innerText = 
                this.extra_normal_attack_damage + '| ' + this.extra_normal_attack_damage_percent + '%';
                
            this.skill_amplification = 
                (((this.weapon == null ? 0 : this.weapon.Skill_Amplification) + 
                (this.chest == null ? 0 : this.chest.Skill_Amplification) + 
                (this.head == null ? 0 : this.head.Skill_Amplification) + 
                (this.arm == null ? 0 : this.arm.Skill_Amplification) + 
                (this.leg == null ? 0 : this.leg.Skill_Amplification) + 
                (this.accessory == null ? 0 : this.accessory.Skill_Amplification)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.skill_amplification_percent = 
                ((this.weapon == null ? 0 : this.weapon_mastery_skill_amplification_percent + 
                this.WEAPON_MASTERY.selectedIndex * this.weapon_mastery_skill_amplification_percent) + 
                ((this.weapon == null ? 0 : this.weapon.Skill_Amplification_Percent) + 
                (this.chest == null ? 0 : this.chest.Skill_Amplification_Percent) + 
                (this.head == null ? 0 : this.head.Skill_Amplification_Percent) + 
                (this.arm == null ? 0 : this.arm.Skill_Amplification_Percent) + 
                (this.leg == null ? 0 : this.leg.Skill_Amplification_Percent) + 
                (this.accessory == null ? 0 : this.accessory.Skill_Amplification_Percent)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.innerText = 
                this.skill_amplification + '| ' + this.skill_amplification_percent + '%';

            this.cooldown_reduction = 
                (((this.weapon == null ? 0 : this.weapon.Cooldown_Reduction) + 
                (this.chest == null ? 0 : this.chest.Cooldown_Reduction) + 
                (this.head == null ? 0 : this.head.Cooldown_Reduction) + 
                (this.arm == null ? 0 : this.arm.Cooldown_Reduction) + 
                (this.leg == null ? 0 : this.leg.Cooldown_Reduction) + 
                (this.accessory == null ? 0 : this.accessory.Cooldown_Reduction)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            if (this.cooldown_reduction > 40) {
                this.cooldown_reduction = 40;
            }
            this.COOLDOWN_REDUCTION.innerText = this.cooldown_reduction + '%';

            this.sp_regen = 
                ((this.character.Stamina_Regen + 
                this.character.Stamina_Regen_Growth * this.LEVEL.selectedIndex + 
                ((this.weapon == null ? 0 : this.weapon.SP_Regen) + 
                (this.chest == null ? 0 : this.chest.SP_Regen) + 
                (this.head == null ? 0 : this.head.SP_Regen) + 
                (this.arm == null ? 0 : this.arm.SP_Regen) + 
                (this.leg == null ? 0 : this.leg.SP_Regen) + 
                (this.accessory == null ? 0 : this.accessory.SP_Regen)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 10 | 0) / 10;
            this.sp_regen_percent = 
                (((this.weapon == null ? 0 : this.weapon.SP_Regen_Percent) + 
                (this.chest == null ? 0 : this.chest.SP_Regen_Percent) + 
                (this.head == null ? 0 : this.head.SP_Regen_Percent) + 
                (this.arm == null ? 0 : this.arm.SP_Regen_Percent) + 
                (this.leg == null ? 0 : this.leg.SP_Regen_Percent) + 
                (this.accessory == null ? 0 : this.accessory.SP_Regen_Percent)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.SP_REGEN.innerText = 
                this.sp_regen + '| ' + this.sp_regen_percent + '%';

            this.skill_damage_reduction = 
                (((this.weapon == null ? 0 : this.weapon.Skill_Damage_Reduction) + 
                (this.chest == null ? 0 : this.chest.Skill_Damage_Reduction) + 
                (this.head == null ? 0 : this.head.Skill_Damage_Reduction) + 
                (this.arm == null ? 0 : this.arm.Skill_Damage_Reduction) + 
                (this.leg == null ? 0 : this.leg.Skill_Damage_Reduction) + 
                (this.accessory == null ? 0 : this.accessory.Skill_Damage_Reduction)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.skill_damage_reduction_percent = 
                (1 + this.DEFENSE_MASTERY.selectedIndex * 1 + 
                ((this.weapon == null ? 0 : this.weapon.Skill_Damage_Reduction_Percent) + 
                (this.chest == null ? 0 : this.chest.Skill_Damage_Reduction_Percent) + 
                (this.head == null ? 0 : this.head.Skill_Damage_Reduction_Percent) + 
                (this.arm == null ? 0 : this.arm.Skill_Damage_Reduction_Percent) + 
                (this.leg == null ? 0 : this.leg.Skill_Damage_Reduction_Percent) + 
                (this.accessory == null ? 0 : this.accessory.Skill_Damage_Reduction_Percent)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.SKILL_DAMAGE_REDUCTION.innerText = 
                this.skill_damage_reduction + '| ' + this.skill_damage_reduction_percent + '%';

            this.defense = 
                (this.character.Defense + this.character.Defense_Growth * this.LEVEL.selectedIndex + 
                ((this.weapon == null ? 0 : this.weapon.Defense) + 
                (this.chest == null ? 0 : this.chest.Defense) + 
                (this.head == null ? 0 : this.head.Defense) + 
                (this.arm == null ? 0 : this.arm.Defense) + 
                (this.leg == null ? 0 : this.leg.Defense) + 
                (this.accessory == null ? 0 : this.accessory.Defense)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.DEFENSE.innerText = this.defense;

            this.max_hp = 
                ((this.character.Health + this.character.Health_Growth * this.LEVEL.selectedIndex + 
                ((this.weapon == null ? 0 : this.weapon.Max_HP) + 
                (this.chest == null ? 0 : this.chest.Max_HP) + 
                (this.head == null ? 0 : this.head.Max_HP) + 
                (this.arm == null ? 0 : this.arm.Max_HP) + 
                (this.leg == null ? 0 : this.leg.Max_HP) + 
                (this.accessory == null ? 0 : this.accessory.Max_HP)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 
                (1.012 + this.HEALTH_MASTERY.selectedIndex * 0.012)) | 0;
            this.MAX_HP.innerText = this.max_hp;

            this.max_sp = 
                ((this.character.Stamina + this.character.Stamina_Growth * this.LEVEL.selectedIndex + 
                ((this.weapon == null ? 0 : this.weapon.Max_SP) + 
                (this.chest == null ? 0 : this.chest.Max_SP) + 
                (this.head == null ? 0 : this.head.Max_SP) + 
                (this.arm == null ? 0 : this.arm.Max_SP) + 
                (this.leg == null ? 0 : this.leg.Max_SP) + 
                (this.accessory == null ? 0 : this.accessory.Max_SP)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 
                (1.017 + this.MEDITATION_MASTERY.selectedIndex * 0.017)) | 0;
            this.MAX_SP.innerText = this.max_sp;

            this.hp_regen = 
                (this.character.Health_Regen + this.character.Health_Regen_Growth * this.LEVEL.selectedIndex + 
                ((this.weapon == null ? 0 : this.weapon.HP_Regen) + 
                (this.chest == null ? 0 : this.chest.HP_Regen) + 
                (this.head == null ? 0 : this.head.HP_Regen) + 
                (this.arm == null ? 0 : this.arm.HP_Regen) + 
                (this.leg == null ? 0 : this.leg.HP_Regen) + 
                (this.accessory == null ? 0 : this.accessory.HP_Regen)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.hp_regen_percent = 
                (((this.weapon == null ? 0 : this.weapon.HP_Regen_Percent) + 
                (this.chest == null ? 0 : this.chest.HP_Regen_Percent) + 
                (this.head == null ? 0 : this.head.HP_Regen_Percent) + 
                (this.arm == null ? 0 : this.arm.HP_Regen_Percent) + 
                (this.leg == null ? 0 : this.leg.HP_Regen_Percent) + 
                (this.accessory == null ? 0 : this.accessory.HP_Regen_Percent)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.HP_REGEN.innerText = 
                this.hp_regen + '| ' + this.hp_regen_percent + '%';

            this.normal_attack_damage_reduction = 
                (((this.weapon == null ? 0 : this.weapon.Normal_Attack_Damage_Reduction) + 
                (this.chest == null ? 0 : this.chest.Normal_Attack_Damage_Reduction) + 
                (this.head == null ? 0 : this.head.Normal_Attack_Damage_Reduction) + 
                (this.arm == null ? 0 : this.arm.Normal_Attack_Damage_Reduction) + 
                (this.leg == null ? 0 : this.leg.Normal_Attack_Damage_Reduction) + 
                (this.accessory == null ? 0 : this.accessory.Normal_Attack_Damage_Reduction)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) | 0;
            this.normal_attack_damage_reduction_percent = 
                (1.2 + this.DEFENSE_MASTERY.selectedIndex * 1.2) | 0;
            this.NORMAL_ATTACK_DAMAGE_REDUCTION.innerText = 
                this.normal_attack_damage_reduction + '| ' + this.normal_attack_damage_reduction_percent + '%';

            this.movement_speed = 
                ((this.character.Move_Speed + 
                0.01 + this.MOVE_MASTERY.selectedIndex * 0.01 + 
                ((this.weapon == null ? 0 : this.weapon.Move_Speed) + 
                (this.chest == null ? 0 : this.chest.Move_Speed) + 
                (this.head == null ? 0 : this.head.Move_Speed) + 
                (this.arm == null ? 0 : this.arm.Move_Speed) + 
                (this.leg == null ? 0 : this.leg.Move_Speed) + 
                (this.accessory == null ? 0 : this.accessory.Move_Speed)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 100 | 0) / 100;
            this.MOVEMENT_SPEED.innerText = this.movement_speed;

            this.out_of_combat_movement_speed = 
                ((0.02 + this.MOVE_MASTERY.selectedIndex * 0.02 + 
                ((this.weapon == null ? 0 : this.weapon.Out_of_Combat_Movement_Speed) + 
                (this.chest == null ? 0 : this.chest.Out_of_Combat_Movement_Speed) + 
                (this.head == null ? 0 : this.head.Out_of_Combat_Movement_Speed) + 
                (this.arm == null ? 0 : this.arm.Out_of_Combat_Movement_Speed) + 
                (this.leg == null ? 0 : this.leg.Out_of_Combat_Movement_Speed) + 
                (this.accessory == null ? 0 : this.accessory.Out_of_Combat_Movement_Speed)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 100 | 0) / 100;
            this.OUT_OF_COMBAT_MOVEMENT_SPEED.innerText = this.out_of_combat_movement_speed;

            this.vision_range = 
                ((this.character.Sight_Range + 0.1 + 
                this.SEARCH_MASTERY.selectedIndex * 0.1 + 
                ((this.weapon == null ? 0 : this.weapon.Vision_Range) + 
                (this.chest == null ? 0 : this.chest.Vision_Range) + 
                (this.head == null ? 0 : this.head.Vision_Range) + 
                (this.arm == null ? 0 : this.arm.Vision_Range) + 
                (this.leg == null ? 0 : this.leg.Vision_Range) + 
                (this.accessory == null ? 0 : this.accessory.Vision_Range)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 10 | 0) / 10;
            this.VISION_RANGE.innerText = this.vision_range;

            this.attack_range = 
                ((this.character.Attack_Range + (this.weapon == null ? 0 : this.weapon.Base_Range) + 
                ((this.weapon == null ? 0 : this.weapon.Attack_Range) + 
                (this.chest == null ? 0 : this.chest.Attack_Range) + 
                (this.head == null ? 0 : this.head.Attack_Range) + 
                (this.arm == null ? 0 : this.arm.Attack_Range) + 
                (this.leg == null ? 0 : this.leg.Attack_Range) + 
                (this.accessory == null ? 0 : this.accessory.Attack_Range)) * 
                (1 + craftBonus + this.CRAFT_MASTERY.selectedIndex * craftBonus)) * 100 | 0) / 100;
            this.ATTACK_RANGE.innerText = this.attack_range;
        }
    }
}