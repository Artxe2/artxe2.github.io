'use strict';
class Character {
    IMG_PATH = 'https://cdn.jsdelivr.net/gh/artxe2/Artxe2.github.io/erbsdc/img/';
    CHR_PATH = 'https://Artxe2.github.io/erbsdc/img/';

    calcTrapDamage() {
        return this.trap ? "<b class='damage'>" + floor(this.trap.Trap_Damage * (1.04 + this.TRAP_MASTERY.selectedIndex * 0.04)) + '</b>' : '-';
    }

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
            this.TRAP_DAMAGE.innerHTML = this.calcTrapDamage();
            this.CHAR.innerHTML = this.CHARACTER.value;
            if (this.enemy.character) {
                this.ENEMY.innerHTML = ' vs ' + this.enemy.CHARACTER.value;
            } else {
                this.ENEMY.innerHTML = '';
            }
        } else {
            this.BASE_ATTACK_DAMAGE.innerHTML = '';
            this.DPS_DAMAGE.innerHTML = '';
            this.HPS_DAMAGE.innerHTML = '';
            this.Q_DAMAGE.innerHTML = '';
            this.W_DAMAGE.innerHTML = '';
            this.E_DAMAGE.innerHTML = '';
            this.R_DAMAGE.innerHTML = '';
            this.D_DAMAGE.innerHTML = '';
            this.T_DAMAGE.innerHTML = '';
            this.TRAP_DAMAGE.innerHTML = '';
            this.COMBO_DAMAGE.innerHTML = '';
            this.CHAR.innerHTML = 'select character';
            this.ENEMY.innerHTML = '';
        }
    }

    constructor(index, DIV, MODE) {
        this.index = index;
        this. DIV = DIV;

        this.INFO = DIV.querySelector('.info');
        this.HELP = DIV.querySelector('.help');
        this.COMBO = DIV.querySelector('.combo');

        this.SUB_WEAPON = DIV.querySelector('.sub_weapon');
        this.WEAPON = DIV.querySelector('.weapon');
        this.CHEST = DIV.querySelector('.chest');
        this.HEAD = DIV.querySelector('.head');
        this.ARM = DIV.querySelector('.arm');
        this.LEG = DIV.querySelector('.leg');
        this.ACCESSORY = DIV.querySelector('.accessory');
        this.FOOD = DIV.querySelector('.food');
        this.TRAP = DIV.querySelector('.trap');

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
        this.PRESET = DIV.querySelector('.preset');

        this.ITEM_LIST = DIV.querySelector('.item_list');

        this.ATTACK_POWER = DIV.querySelector('.attack_power');
        this.ATTACK_SPEED = DIV.querySelector('.attack_speed');
        this.CRITICAL_STRIKE_CHANCE = DIV.querySelector('.critical_strike_chance');
        this.CRITICAL_DAMAGE = DIV.querySelector('.critical_damage');
        this.LIFE_STEAL = DIV.querySelector('.life_steal');
        this.EXTRA_NORMAL_ATTACK_DAMAGE = DIV.querySelector('.extra_normal_attack_damage');
        this.EXTRA_SKILL_DAMAGE = DIV.querySelector('.extra_skill_damage');
        this.COOLDOWN_REDUCTION = DIV.querySelector('.cooldown_reduction');
        this.SP_REGEN = DIV.querySelector('.sp_regen');
        this.SKILL_DAMAGE_REDUCTION = DIV.querySelector('.skill_damage_reduction');

        this.DEFENSE = DIV.querySelector('.defense');
        this.MAX_HP = DIV.querySelector('.max_hp');
        this.MAX_SP = DIV.querySelector('.max_sp');
        this.HP_REGEN = DIV.querySelector('.hp_regen');
        this.NORMAL_ATTACK_DAMAGE_REDUCTION = DIV.querySelector('.normal_attack_damage_reduction');
        this.MOVEMENT_SPEED = DIV.querySelector('.movement_speed');
        this.MOVEMENT_SPEED_WHILE_NOT_IN_COMBAT = DIV.querySelector('.movement_speed_while_not_in_combat');
        this.VISION_RANGE = DIV.querySelector('.vision_range');
        this.ATTACK_RANGE = DIV.querySelector('.attack_range');
        this.CRITICAL_DAMAGE_REDUCTION = DIV.querySelector('.critical_damage_reduction');

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
        this.TRAP_DAMAGE = DIV.querySelector('.trap_damage');
        this.COMBO_DAMAGE = DIV.querySelector('.combo_damage');
        this.COMBO_OPTION = DIV.querySelector('.combo_option');
        this.COMBO_TIME = DIV.querySelector('.combo_time');
        this.AUTO_CRI = DIV.querySelector('.auto_cri');
        this.CHAR = DIV.querySelector('.char');
        this.ENEMY = DIV.querySelector('.enemy');

        this.MODE = MODE;

        this.weapon_mastery_attack_speed = 0;
        this.weapon_mastery_extra_normal_attack_damage_percent = 0;
        this.weapon_mastery_skill_amplification = 0;
        this.weapon_attack_range = 0;
        this.weapon_attack_speed = 0;

        this.INFO.addEventListener('click', (e) => {
            if (!this.character) {
                alert('select character plz');
            } else {
                this.ITEM_LIST.querySelector('.item_view').innerHTML = '<b>' +
                    (this.CHARACTER.value + '\n- - -\n' +
                    (this.weapon ? this.weapon.Title + '\n- - -\n' : '') +
                    (this.chest ? this.chest.Title + '\n- - -\n' : '') +
                    (this.head ? this.head.Title + '\n- - -\n' : '') +
                    (this.arm ? this.arm.Title + '\n- - -\n' : '') +
                    (this.leg ? this.leg.Title + '\n- - -\n' : '') +
                    (this.accessory ? this.accessory.Title : '')).replaceAll(/\n/g, '<br/>') + '</b>';
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.HELP.addEventListener('click', (e) => {
            if (!this.character) {
                alert('select character plz');
            } else {
                this.ITEM_LIST.querySelector('.item_view').innerHTML = '<b>' + this.character.Help(this).replaceAll(/\n/g, '<br/>') + '</b>';
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.COMBO.addEventListener('click', (e) => {
            if (!this.character) {
                alert('select character plz');
            } else {
                this.ITEM_LIST.querySelector('.item_view').innerHTML = '<b>' + this.character.COMBO_Help(this).replaceAll(/\n/g, '<br/>') + '</b>';
				this.ITEM_LIST.style.display = 'block';
            }
        });

        this.SUB_WEAPON.addEventListener('click', (e) => {
        	if (!this.character) {
                alert('select character plz');
            } else if (this.character != Alex) {
                alert('select Alex plz');
            } else {
                let list = '';
                let br = 0;
                for (let i = 0, j; i < this.character.weapons.length; i++) {
                    const w = this.character.weapons[i];
                    for (j = 0; j < w.length; j++) {
                        list += "<img class='" + w[j].Rarity + "' title='" + w[j].Title + "' onclick='characters[" + this.index + "].setSubWeapon (" + i + ", " + j + ")' src = '" + this.IMG_PATH + "weapon/" + w[j].Name + ".png' width='128px' height='71px' border='1'>";
                        if (++br == 3) {
                            br = 0;
                            list += '<br>';
                        }
                    }
                }
                list += "<img title='remove weapon' onclick='characters[" + this.index + "].removeSubWeapon()' src = '" + this.IMG_PATH + "weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.WEAPON.addEventListener('click', (e) => {
        	if (!this.character) {
                alert('select character plz');
            } else {
                let list = '';
                let br = 0;
                for (let i = 0, j; i < this.character.weapons.length; i++) {
                    const w = this.character.weapons[i];
                    for (j = 0; j < w.length; j++) {
                        list += "<img class='" + w[j].Rarity + "' title='" + w[j].Title + "' onclick='characters[" + this.index + "].setWeapon (" + i + ", " + j + ")' src = '" + this.IMG_PATH + "weapon/" + w[j].Name + ".png' width='128px' height='71px' border='1'>";
                        if (++br == 3) {
                            br = 0;
                            list += '<br>';
                        }
                    }
                }
                list += "<img title='remove weapon' onclick='characters[" + this.index + "].removeWeapon()' src = '" + this.IMG_PATH + "weapon/blank.png' width='128px' height='71px' border='1'>";
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
                    list += "<img class='" + Chest[i].Rarity + "' title='" + Chest[i].Title + "' onclick='characters[" + this.index + "].setChest(" + i + ")' src = '" + this.IMG_PATH + "armors/" + Chest[i].Name + ".png' width='128px' height='71px' border='1'>";
                    if (++br == 3) {
                        br = 0;
                        list += '<br>';
                    }
                }
                list += "<img title='remove chest' onclick='characters[" + this.index + "].removeChest()' src = '" + this.IMG_PATH + "weapon/blank.png' width='128px' height='71px' border='1'>";
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
                    list += "<img class='" + Head[i].Rarity + "' title='" + Head[i].Title + "' onclick='characters[" + this.index + "].setHead(" + i + ")' src = '" + this.IMG_PATH + "armors/" + Head[i].Name + ".png' width='128px' height='71px' border='1'>";
                    if (++br == 3) {
                        br = 0;
                        list += '<br>';
                    }
                }
                list += "<img title='remove head' onclick='characters[" + this.index + "].removeHead()' src = '" + this.IMG_PATH + "weapon/blank.png' width='128px' height='71px' border='1'>";
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
                    list += "<img class='" + Arm[i].Rarity + "' title='" + Arm[i].Title + "' onclick='characters[" + this.index + "].setArm(" + i + ")' src = '" + this.IMG_PATH + "armors/" + Arm[i].Name + ".png' width='128px' height='71px' border='1'>";
                    if (++br == 3) {
                        br = 0;
                        list += '<br>';
                    }
                }
                list += "<img title='remove arm' onclick='characters[" + this.index + "].removeArm()' src = '" + this.IMG_PATH + "weapon/blank.png' width='128px' height='71px' border='1'>";
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
                    list += "<img class='" + Leg[i].Rarity + "' title='" + Leg[i].Title + "' onclick='characters[" + this.index + "].setLeg(" + i + ")' src = '" + this.IMG_PATH + "armors/" + Leg[i].Name + ".png' width='128px' height='71px' border='1'>";
                    if (++br == 3) {
                        br = 0;
                        list += '<br>';
                    }
                }
                list += "<img title='remove leg' onclick='characters[" + this.index + "].removeLeg()' src = '" + this.IMG_PATH + "weapon/blank.png' width='128px' height='71px' border='1'>";
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
                    list += "<img class='" + Accessory[i].Rarity + "' title='" + Accessory[i].Title + "' onclick='characters[" + this.index + "].setAccessory(" + i + ")' src = '" + this.IMG_PATH + "armors/" + Accessory[i].Name + ".png' width='128px' height='71px' border='1'>";
                    if (++br == 3) {
                        br = 0;
                        list += '<br>';
                    }
                }
                list += "<img title='remove accessory' onclick='characters[" + this.index + "].removeAccessory()' src = '" + this.IMG_PATH + "weapon/blank.png' width='128px' height='71px' border='1'>";
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
                    list += "<img class='" + Food[i].Rarity + "' title='" + Food[i].Title + "' onclick='characters[" + this.index + "].setFood(" + i + ")' src = '" + this.IMG_PATH + "foods/" + Food[i].Name + ".png' width='128px' height='71px' border='1'>";
                    if (++br == 3) {
                        br = 0;
                        list += '<br>';
                    }
                }
                list += "<img title='remove trap' onclick='characters[" + this.index + "].removeFood()' src = '" + this.IMG_PATH + "weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.TRAP.addEventListener('click', (e) => {
        	if (!this.character) {
                alert('select character plz');
            } else {
                let list = '';
                let br = 0;
                for (let i = 0; i < Trap.length; i++) {
                    list += "<img class='" + Trap[i].Rarity + "' title='" + Trap[i].Title + "' onclick='characters[" + this.index + "].setTrap(" + i + ")' src = '" + this.IMG_PATH + "traps/" + Trap[i].Name + ".png' width='128px' height='71px' border='1'>";
                    if (++br == 3) {
                        br = 0;
                        list += '<br>';
                    }
                }
                list += "<img title='remove trap' onclick='characters[" + this.index + "].removeTrap()' src = '" + this.IMG_PATH + "weapon/blank.png' width='128px' height='71px' border='1'>";
				this.ITEM_LIST.querySelector('.item_view').innerHTML = list;
				this.ITEM_LIST.style.display = 'block';
            }
        });
        this.CHARACTER.addEventListener('change', (e) => {
            const select = e.target.value;
            if (select === '') {
                this.character = null;
                this.subWeapon = null;
                this.weapon = null;
                this.chest = null;
                this.head = null;
                this.arm = null;
                this.leg = null;
                this.accessory = null;
                this.I_CHARACTER.innerHTML = "<div class='margin'></div>";
                this.SUB_WEAPON.innerHTML = '';
                this.WEAPON.innerHTML = '';
                this.CHEST.innerHTML = '';
                this.HEAD.innerHTML = '';
                this.ARM.innerHTML = '';
                this.LEG.innerHTML = '';
                this.ACCESSORY.innerHTML = '';
                this.FOOD.innerHTML = '';
                this.TRAP.innerHTML = '';
                this.BASE_ATTACK_OPTION.innerHTML = '';
                this.DPS_OPTION.innerHTML = '';
                this.Q_OPTION.innerHTML = '';
                this.W_OPTION.innerHTML = '';
                this.E_OPTION.innerHTML = '';
                this.R_OPTION.innerHTML = '';
                this.D_OPTION.innerHTML = '';
                this.T_OPTION.innerHTML = '';
                this.COMBO_OPTION.value = '';
                this.COMBO_DAMAGE.innerHTML = '';
                comboTime(0, true);
            } else {
                this.I_CHARACTER.innerHTML = "<img class='character_image' src = '" + this.CHR_PATH + "character/" + select + ".png'>";
                this.character = eval(select);
                const level = this.LEVEL.selectedIndex;
                if (this.character === Rio && this.Q_LEVEL.selectedIndex === 0) {
                    let skills = this.Q_LEVEL.selectedIndex +
                    this.W_LEVEL.selectedIndex +
                    this.E_LEVEL.selectedIndex +
                    this.R_LEVEL.selectedIndex +
                    this.T_LEVEL.selectedIndex - 1;
                    while (skills-- > level) {
                        if (this.W_LEVEL.selectedIndex) {
                            this.W_LEVEL.selectedIndex--;
                        } else if (this.E_LEVEL.selectedIndex) {
                            this.E_LEVEL.selectedIndex--;
                        }
                    }
                    this.Q_LEVEL.selectedIndex++;
                }
                if (this.subWeapon != null && this.character != Alex) {
                    // this.removeSubWeapon();
                    this.subWeapon = null;
                    this.SUB_WEAPON.innerHTML = '';
                    this.ITEM_LIST.style.display = 'none';
                }
                if (this.weapon != null) {
                    this.character.weapons.some(w => {
                        if (this.weapon.Type === w[0].Type) {
                            return true;
                        }
                    });
                    if (!this.character.weapons.some(w => {
                        if (this.weapon.Type === w[0].Type) {
                            return true;
                        }
                    })) {
                        // this.removeWeapon();
                        this.weapon = null;
                        this.weapon_mastery_attack_speed = 0;
                        this.weapon_mastery_extra_normal_attack_damage_percent = 0;
                        this.weapon_mastery_skill_amplification = 0;
                        this.weapon_attack_range = 0;
                        this.weapon_attack_speed = 0;
                        this.WEAPON.innerHTML = '';
                        this.ITEM_LIST.style.display = 'none';
                        this.D_OPTION.innerHTML = '';
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
                this.COMBO_OPTION.value = this.character.COMBO_Option;
                comboTime(7, true);
            }
            updateDisplay();
        });

        this.LEVEL.addEventListener('change', (e) => {
            const level = this.LEVEL.selectedIndex;
            while (this.R_LEVEL.selectedIndex > floor(level / 5)) {
                this.R_LEVEL.selectedIndex--;
            }
            while (this.T_LEVEL.selectedIndex > floor(level / 4)) {
                this.T_LEVEL.selectedIndex--;
            }
            let skills = this.Q_LEVEL.selectedIndex +
                this.W_LEVEL.selectedIndex +
                this.E_LEVEL.selectedIndex +
                this.R_LEVEL.selectedIndex +
                this.T_LEVEL.selectedIndex - 1;
            while (skills-- > level) {
                if (this.W_LEVEL.selectedIndex > 1) {
                    this.W_LEVEL.selectedIndex--;
                } else if (this.E_LEVEL.selectedIndex > 1) {
                    this.E_LEVEL.selectedIndex--;
                } else if (this.Q_LEVEL.selectedIndex > 1) {
                    this.Q_LEVEL.selectedIndex--;
                } else if (this.W_LEVEL.selectedIndex) {
                    this.W_LEVEL.selectedIndex--;
                } else if (this.E_LEVEL.selectedIndex) {
                    this.E_LEVEL.selectedIndex--;
                } else {
                    this.Q_LEVEL.selectedIndex--;
                }
            }
            this.savePreset()
            updateDisplay();
        });
        this.WEAPON_MASTERY.addEventListener('change', (e) => {
            this.savePreset()
            updateDisplay();
        });
        this.HUNT_MASTERY.addEventListener('change', (e) => {
            this.savePreset()
            updateDisplay();
        });
        this.CRAFT_MASTERY.addEventListener('change', (e) => {
            this.savePreset()
            updateDisplay();
        });
        this.SEARCH_MASTERY.addEventListener('change', (e) => {
            this.savePreset()
            updateDisplay();
        });
        this.MOVE_MASTERY.addEventListener('change', (e) => {
            this.savePreset()
            updateDisplay();
        });
        this.HEALTH_MASTERY.addEventListener('change', (e) => {
            this.savePreset()
            updateDisplay();
        });
        this.DEFENSE_MASTERY.addEventListener('change', (e) => {
            this.savePreset()
            updateDisplay();
        });
        this.MEDITATION_MASTERY.addEventListener('change', (e) => {
            this.savePreset()
            updateDisplay();
        });
        this.TRAP_MASTERY.addEventListener('change', (e) => {
            this.savePreset()
            updateDisplay();
        });
        this.Q_LEVEL.addEventListener('change', (e) => {
            const level = this.LEVEL.selectedIndex
            let skills = this.Q_LEVEL.selectedIndex +
                this.W_LEVEL.selectedIndex +
                this.E_LEVEL.selectedIndex +
                this.R_LEVEL.selectedIndex +
                this.T_LEVEL.selectedIndex - 1;
            while (skills-- > level) {
                e.target.selectedIndex--;
            }
            while (e.target.selectedIndex > floor(level / 2) + 1) {
                e.target.selectedIndex--;
            }
            if (this.character === Rio && this.Q_LEVEL.selectedIndex === 0) {
                this.Q_LEVEL.selectedIndex = 1;
            }
            this.savePreset()
            updateDisplay();
        });
        this.W_LEVEL.addEventListener('change', (e) => {
            const level = this.LEVEL.selectedIndex
            let skills = this.Q_LEVEL.selectedIndex +
                this.W_LEVEL.selectedIndex +
                this.E_LEVEL.selectedIndex +
                this.R_LEVEL.selectedIndex +
                this.T_LEVEL.selectedIndex - 1;
            while (skills-- > level) {
                e.target.selectedIndex--;
            }
            while (e.target.selectedIndex > floor(level / 2) + 1) {
                e.target.selectedIndex--;
            }
            this.savePreset()
            updateDisplay();
        });
        this.E_LEVEL.addEventListener('change', (e) => {
            const level = this.LEVEL.selectedIndex
            let skills = this.Q_LEVEL.selectedIndex +
                this.W_LEVEL.selectedIndex +
                this.E_LEVEL.selectedIndex +
                this.R_LEVEL.selectedIndex +
                this.T_LEVEL.selectedIndex - 1;
            while (skills-- > level) {
                e.target.selectedIndex--;
            }
            while (e.target.selectedIndex > floor(level / 2) + 1) {
                e.target.selectedIndex--;
            }
            this.savePreset()
            updateDisplay();
        });
        this.R_LEVEL.addEventListener('change', (e) => {
            const level = this.LEVEL.selectedIndex
            let skills = this.Q_LEVEL.selectedIndex +
                this.W_LEVEL.selectedIndex +
                this.E_LEVEL.selectedIndex +
                this.R_LEVEL.selectedIndex +
                this.T_LEVEL.selectedIndex - 1;
            while (skills-- > level) {
                e.target.selectedIndex--;
            }
            while (e.target.selectedIndex > floor(level / 5)) {
                e.target.selectedIndex--;
            }
            this.savePreset()
            updateDisplay();
        });
        this.T_LEVEL.addEventListener('change', (e) => {
            const level = this.LEVEL.selectedIndex
            let skills = this.Q_LEVEL.selectedIndex +
                this.W_LEVEL.selectedIndex +
                this.E_LEVEL.selectedIndex +
                this.R_LEVEL.selectedIndex +
                this.T_LEVEL.selectedIndex - 1;
            while (skills-- > level) {
                e.target.selectedIndex--;
            }
            while (e.target.selectedIndex > floor(level / 4)) {
                e.target.selectedIndex--;
            }
            this.savePreset()
            updateDisplay();
        });
        this.COMBO_OPTION.addEventListener('change', (e) => {
            updateDisplay();
        });
        this.COMBO_TIME.addEventListener('change', (e) => {
            comboTime(e.target.value, false);
        });
        this.AUTO_CRI.addEventListener('change', (e) => {
            updateDisplay();
        });

        this.ITEM_LIST.querySelector('.close_button').addEventListener('click', (e) => {
            this.ITEM_LIST.querySelector('.item_view').innerHTML = '';
            this.ITEM_LIST.style.display = 'none';
        });

        this.PRESET.addEventListener('change', (e) => {
            const preset = decodeURIComponent(getCookie('preset' + e.target.selectedIndex));
            setCookie('lastPreset', e.target.selectedIndex, 7);
            if (preset) {
                this.setPreset(JSON.parse(preset));
            } else {
                this.savePreset();
            }
            updateDisplay();
        });
    }

    savePreset() {
        setCookie('preset' + this.PRESET.selectedIndex,
            JSON.stringify([
                this.LEVEL.selectedIndex,
                this.WEAPON_MASTERY.selectedIndex,

                this.HUNT_MASTERY.selectedIndex,
                this.CRAFT_MASTERY.selectedIndex,
                this.SEARCH_MASTERY.selectedIndex,
                this.MOVE_MASTERY.selectedIndex,

                this.HEALTH_MASTERY.selectedIndex,
                this.DEFENSE_MASTERY.selectedIndex,
                this.MEDITATION_MASTERY.selectedIndex,
                this.TRAP_MASTERY.selectedIndex,

                this.Q_LEVEL.selectedIndex,
                this.W_LEVEL.selectedIndex,
                this.E_LEVEL.selectedIndex,
                this.R_LEVEL.selectedIndex,
                this.T_LEVEL.selectedIndex,
            ]),
        7);
    }

    setPreset(preset) {
        this.LEVEL.selectedIndex = preset[0];
        this.WEAPON_MASTERY.selectedIndex = preset[1];

        this.HUNT_MASTERY.selectedIndex = preset[2];
        this.CRAFT_MASTERY.selectedIndex = preset[3];
        this.SEARCH_MASTERY.selectedIndex = preset[4];
        this.MOVE_MASTERY.selectedIndex = preset[5];

        this.HEALTH_MASTERY.selectedIndex = preset[6];
        this.DEFENSE_MASTERY.selectedIndex = preset[7];
        this.MEDITATION_MASTERY.selectedIndex = preset[8];
        this.TRAP_MASTERY.selectedIndex = preset[9];

        this.Q_LEVEL.selectedIndex = preset[10];
        this.W_LEVEL.selectedIndex = preset[11];
        this.E_LEVEL.selectedIndex = preset[12];
        this.R_LEVEL.selectedIndex = preset[13];
        this.T_LEVEL.selectedIndex = preset[14];
    }

    setEnemy(enemy) {
        this.enemy = enemy;
    }

	setSubWeapon(i, j) {
        this.subWeapon = this.character.weapons[i][j];

        this.SUB_WEAPON.innerHTML = "<img class = '" + this.subWeapon.Rarity + "' title = '" + this.subWeapon.Title + "' src = '" + this.IMG_PATH + "weapon/" + this.subWeapon.Name + ".png' width = '78px' height = '42px'>";
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    removeSubWeapon() {
        this.subWeapon = null;
        this.SUB_WEAPON.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
	setWeapon(i, j) {
        this.weapon = this.character.weapons[i][j];
        this.weapon_mastery_attack_speed = WeaponInfo[this.weapon.Type][0];
        this.weapon_mastery_extra_normal_attack_damage_percent = WeaponInfo[this.weapon.Type][1];
        this.weapon_mastery_skill_amplification = WeaponInfo[this.weapon.Type][2];
        this.weapon_attack_range = WeaponInfo[this.weapon.Type][3];
        this.weapon_attack_speed = WeaponInfo[this.weapon.Type][4];

        this.WEAPON.innerHTML = "<img class = '" + this.weapon.Rarity + "' title = '" + this.weapon.Title + "' src = '" + this.IMG_PATH + "weapon/" + this.weapon.Name + ".png' width = '78px' height = '42px'>";
        this.ITEM_LIST.style.display = 'none';
        this.D_OPTION.innerHTML = this.character.D_Option(this, this.enemy);
        updateDisplay();
    }
    removeWeapon() {
        this.weapon = null;
        this.weapon_mastery_attack_speed = 0;
        this.weapon_mastery_extra_normal_attack_damage_percent = 0;
        this.weapon_mastery_skill_amplification = 0;
        this.weapon_attack_range = 0;
        this.weapon_attack_speed = 0;
        this.WEAPON.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        this.D_OPTION.innerHTML = '';
        updateDisplay();
    }
    setChest(i) {
        this.chest = Chest[i];
        this.CHEST.innerHTML = "<img class = '" + this.chest.Rarity + "' title = '" + this.chest.Title + "' src = '" + this.IMG_PATH + "armors/" + this.chest.Name + ".png' width = '78px' height = '42px'>";
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
        this.HEAD.innerHTML = "<img class = '" + this.head.Rarity + "' title = '" + this.head.Title + "' src = '" + this.IMG_PATH + "armors/" + this.head.Name + ".png' width = '78px' height = '42px'>";
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
        this.ARM.innerHTML = "<img class = '" + this.arm.Rarity + "' title = '" + this.arm.Title + "' src = '" + this.IMG_PATH + "armors/" + this.arm.Name + ".png' width = '78px' height = '42px'>";
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
        this.LEG.innerHTML = "<img class = '" + this.leg.Rarity + "' title = '" + this.leg.Title + "' src = '" + this.IMG_PATH + "armors/" + this.leg.Name + ".png' width = '78px' height = '42px'>";
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
        this.ACCESSORY.innerHTML = "<img class = '" + this.accessory.Rarity + "' title = '" + this.accessory.Title + "' src = '" + this.IMG_PATH + "armors/" + this.accessory.Name + ".png' width = '78px' height = '42px'>";
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
        this.FOOD.innerHTML = "<img class = '" + this.food.Rarity + "' title = '" + this.food.Title + "' src = '" + this.IMG_PATH + "foods/" + this.food.Name + ".png' width = '78px' height = '42px'>";
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    removeFood() {
        this.food = null;
        this.FOOD.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    setTrap(i) {
        this.trap = Trap[i];
        this.TRAP.innerHTML = "<img class = '" + this.trap.Rarity + "' title = '" + this.trap.Title + "' src = '" + this.IMG_PATH + "traps/" + this.trap.Name + ".png' width = '78px' height = '42px'>";
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }
    removeTrap() {
        this.trap = null;
        this.TRAP.innerHTML = '';
        this.ITEM_LIST.style.display = 'none';
        updateDisplay();
    }

    calcStat() {
        if (this.character) {
            const level = this.LEVEL.selectedIndex;
            const w = this.W_LEVEL.selectedIndex - 1;
            const e = this.E_LEVEL.selectedIndex - 1;
            const r = this.R_LEVEL.selectedIndex - 1;
            const t = this.T_LEVEL.selectedIndex;
            const wm = this.WEAPON_MASTERY.selectedIndex;
            const eq = this.enemy.Q_LEVEL.selectedIndex - 1;
            const ew = this.enemy.W_LEVEL.selectedIndex - 1;
            const ee = this.enemy.E_LEVEL.selectedIndex - 1;
            const er = this.enemy.R_LEVEL.selectedIndex - 1;
            const et = this.enemy.T_LEVEL.selectedIndex;
            const ewm = this.enemy.WEAPON_MASTERY.selectedIndex;

            this.isMelee = !this.weapon || (this.weapon.Type === 'Axe' ||
                this.weapon.Type === 'Bat' || this.weapon.Type === 'Dagger' ||
                this.weapon.Type === 'DualSwords' || this.weapon.Type === 'Glove' ||
                this.weapon.Type === 'Hammer' || this.weapon.Type === 'Nunchaku' ||
                this.weapon.Type === 'Rapier' || this.weapon.Type === 'Spear' ||
                this.weapon.Type === 'Tonfa' || this.weapon.Type === 'TwoHandedSword' ||
                this.weapon.Type === 'Whip');

            let rozzi_w = this.DIV.querySelector('.rozzi_w');
            this.pure_heal_reduction =
                this.weapon && (
                    this.weapon.Name === 'Damascus_Steel_Thorn' ||
                    this.weapon.Name === 'Harpe' ||
                    this.weapon.Name === 'Divine_Dual_Swords' ||
                    this.weapon.Name === 'Fangtian_Huaji' ||
                    this.weapon.Name === 'Goblin_Bat' || this.weapon.Name === 'Mallet' ||
                    this.weapon.Name === 'Composite_Bow' ||
                    this.weapon.Name === 'The_Smiting_Dragon' || this.weapon.Name === 'Cerberus' ||
                    this.weapon.Name === 'Gleipnir'
                    ) ? 45 :
                    this.weapon && (
                        this.weapon.Name === 'Spiky_Bouncy_Ball' || this.weapon.Name === 'Ruthenium_Marble' ||
                        this.weapon.Name === 'Twinbow' || this.weapon.Name === 'Elemental_Bow') ||
                    this.chest && this.chest.Name === 'Rocker`s_Jacket' ||
                    this.head && this.head.Name === 'Mohawk_Headgear' ||
                    this.arm && this.arm.Name === 'Sword_Stopper' ||
                    this.leg && this.leg.Name === 'White_Rhinos' ||
                    this.accessory && this.accessory.Name === 'White_Crane_Fan' ? this.isMelee ? 45 : 30 :
                    this.accessory && this.accessory.Name === 'Gilded_Quill_Fan' ? 30 : 0;
            this.heal_reduction =
                rozzi_w && rozzi_w.checked ? 40 : this.pure_heal_reduction;

            this.critical_damage_reduction = calcEquip(this, 'Critical_Damage_Reduction');
            this.CRITICAL_DAMAGE_REDUCTION.innerText = this.critical_damage_reduction + '%';

            const jackie_r = this.DIV.querySelector('.jackie_r');
            const nadine_e = this.DIV.querySelector('.nadine_e');
            const lida_w = this.DIV.querySelector('.lida_w');
            const silvia_t = this.DIV.querySelector('.silvia_t');
            const luke_w_u = this.DIV.querySelector('.luke_w_u');
            const sua_t = this.DIV.querySelector('.sua_t');
            const leon_t = this.DIV.querySelector('.leon_t');
            const rio_q = this.DIV.querySelector('.rio_q');
            const attack_speed_bonus =
                (jackie_r && jackie_r.checked && r >= 0 ? 15 + r * 5 : 0) +
                (nadine_e && e >= 0 ? (10 + e * 5) * (nadine_e.checked ? 2 : 1) : 0) +
                (lida_w && lida_w.checked && w >= 0 ? 20 + t * 10 : 0) +
                (silvia_t ? (silvia_t.value == 15 ? 10 : 0) + silvia_t.value * (0.4 + t * 0.4) : 0) +
                (luke_w_u && luke_w_u.checked && w >= 0 ? this.DIV.querySelector('.luke_w_s').value * 8 : 0) +
                (this.character === Alex && this.weapon && !this.isMelee && e >= 0 ? 6 + e * 3 : 0) +
                (sua_t && sua_t.checked ? 40 : 0) +
                (leon_t && leon_t.checked ? 10 + t * 5 : 0);
            const attack_speed_percent =
                attack_speed_bonus + calcEquip(this, 'Attack_Speed') +
                calcEquip(this, 'Attack_Speed_per_level') * (level + 1) +
                (!this.weapon ? 0 : (1 + wm) * this.weapon_mastery_attack_speed);
            this.attack_speed =
                round((this.character === Eleven ? 0.9 : 1) *
                    (this.character.Atk_Speed + this.weapon_attack_speed - (rio_q && rio_q.checked ? 0.25 : 0)) *
                    (100 + attack_speed_percent)) / 100;
            if (this.attack_speed < 0) {
                this.attack_speed = 0;
            } else if (this.attack_speed > 2.5) {
                this.attack_speed = 2.5;
            }

            const jackie_tw = [0.04, 0.08, 0.12];
            const jackie_ts = [0.10, 0.15, 0.20];
            const jackie_t_w = this.DIV.querySelector('.jackie_t_w');
            const jackie_t_s = this.DIV.querySelector('.jackie_t_s');
            const axe_d_s = this.DIV.querySelector('.axe_d_s');
            const axe_d_u = this.DIV.querySelector('.axe_d_u');
            var hart_w_u = this.DIV.querySelector('.hart_w_u');
            const alex_q = this.DIV.querySelector('.alex_q');
            const attack_power_percent = 1 +
                (jackie_t_w ? (jackie_t_w.checked ? jackie_tw[ t ] : 0) +
                (jackie_t_s.checked ? jackie_ts[ t ] : 0) : 0) +
                (axe_d_s ? axe_d_s.value * (axe_d_u.checked ? 0.06 + this.DIV.querySelector('.axe_d_hp').value * 0.0012 : 0.02) : 0) +
                (hart_w_u && hart_w_u.checked && w >= 0 ? 0.12 + w * 0.07 : 0) +
                (alex_q ? alex_q.value * 0.04 : 0);
            const attack_power_bonus =
                (this.character === Adela && this.attack_speed > 0.66 ? floor((this.attack_speed - 0.66) * 100) * (0.2 + t * 0.3) : 0);
            this.attack_power =
                floor((this.character.Attack_Power + this.character.Attack_Power_Growth * level +
                    calcEquip(this, 'Attack_Power', 2) + calcEquip(this, 'Attack_Power_per_level', 2) * (level + 1) +
                    attack_power_bonus) * attack_power_percent);
            if (this.character === Adela) {
                this.attack_speed = 0.66;
            }
            this.ATTACK_SPEED.innerText = this.attack_speed;
            this.ATTACK_POWER.innerText = this.attack_power;
            this.pure_attack_power =
                this.character.Attack_Power + this.character.Attack_Power_Growth * level +
                calcEquip(this, 'Attack_Power', 2) + calcEquip(this, 'Attack_Power_per_level', 2) * (level + 1) +
                attack_power_bonus;

            const shoichi_t = this.DIV.querySelector('.shoichi_t');
            const cri_bonus =
                (shoichi_t ? shoichi_t.value * (5 + t * 2) : 0) +
                (this.character === Adela ? 4 + t * 4 : 0) +
                (this.character === Alex && this.weapon && this.isMelee && e >= 0 ? 6 + e * 3 : 0);
            this.critical_strike_chance =
                calcEquip(this, 'Critical_Strike_Chance') + cri_bonus;
                if (this.critical_strike_chance > 100) {
                    this.critical_strike_chance = 100;
                }
            this.CRITICAL_STRIKE_CHANCE.innerText = this.critical_strike_chance + '%';
            this.pure_critical_strike_chance = this.critical_strike_chance -
                (shoichi_t ? shoichi_t.value * (5 + t * 2) : 0);

            const cathy_t = this.DIV.querySelector('.cathy_t');
            const critical_damage_bonus = (cathy_t && cathy_t.checked ? 10 + t * 15 : 0);
            this.critical_damage =
                calcEquip(this, 'Critical_Damage') + critical_damage_bonus;
            this.CRITICAL_DAMAGE.innerText = this.critical_damage + '%';
            this.pure_critical_damage = calcEquip(this, 'Critical_Damage');

            this.life_steal =
                calcEquip(this, 'Life_Steal');
            this.LIFE_STEAL.innerText = this.life_steal + '%';

            this.extra_normal_attack_damage = calcEquip(this, 'Extra_Normal_Attack_Damage') +
                calcEquip(this, 'Extra_Normal_Attack_Damage_per_level') * (level + 1) +
                (this.character === Eleven ? 10 + t * 5 : 0);
            this.extra_normal_attack_damage_percent =
                !this.weapon ? 0 : (1 + wm) * this.weapon_mastery_extra_normal_attack_damage_percent;
            this.EXTRA_NORMAL_ATTACK_DAMAGE.innerText =
                (this.extra_normal_attack_damage - (this.character === Eleven ? 10 + t * 5 : 0)) + '| ' + round(this.extra_normal_attack_damage_percent) + '%';

            const hart_e = this.DIV.querySelector('.hart_e');
            const hart_ee = this.DIV.querySelector('.hart_ee');
            const hart_e_s = this.DIV.querySelector('.hart_e_s');
            const sissela_t = this.DIV.querySelector('.sissela_t');
            const extra_skill_damage_bonus =
                (sissela_t ? (2 + t * 3) *
                    (sissela_t.value < 10 ? 0 : (sissela_t.value >= 90 ? 5 : sissela_t.value / 20 + 0.5)) *
                    (this.DIV.querySelector('.sissela_r').checked ? 2 : 1) : 0);
            const skill_amplification_bonus = (hart_e && e >= 0 ? hart_e_s.value * (hart_ee.checked ? 23 : hart_e.checked ? 16 : 0) : 0);
            this.extra_skill_damage =
                round(calcEquip(this, 'Extra_Skill_Damage', 2) +
                calcEquip(this, 'Extra_Skill_Damage_per_level', 2) * (level + 1) + extra_skill_damage_bonus, 1);
            this.skill_amplification =
                (!this.weapon ? 0 : (1 + wm) * this.weapon_mastery_skill_amplification) +
                    calcEquip(this, 'Skill_Amplification_Percent') +
                    calcEquip(this, 'Skill_Amplification_Percent_per_level') * (level + 1) +
                    (silvia_t ? (silvia_t.value == 15 ? 10 : 0) + silvia_t.value * (0.4 + t * 0.4) : 0) +
                    skill_amplification_bonus;
            this.EXTRA_SKILL_DAMAGE.innerText =
                this.extra_skill_damage + '| ' + round(this.skill_amplification) + '%';
            this.pure_extra_skill_damage = calcEquip(this, 'Extra_Skill_Damage', 2) + calcEquip(this, 'Extra_Skill_Damage_per_level', 2) * (level + 1);
            this.pure_skill_amplification =
                (!this.weapon ? 0 : (1 + wm) * this.weapon_mastery_skill_amplification) +
                    calcEquip(this, 'Skill_Amplification_Percent') + calcEquip(this, 'Extra_Skill_Damage_per_level', 2) + (silvia_t ? (silvia_t.value == 15 ? 10 : 0) + silvia_t.value * (0.4 + t * 0.4) : 0);

            this.cooldown_reduction = calcEquip(this, 'Cooldown_Reduction');
            if (this.chest && this.chest.Name === 'Queen_of_Hearts') {
                if (this.cooldown_reduction > 45) {
                    this.cooldown_reduction = 45;
                }
            } else if (this.chest && this.chest.Name === 'High_Priest_Robes') {
                if (this.cooldown_reduction > 40) {
                    this.cooldown_reduction = 40;
                }
            } else if (this.cooldown_reduction > 35) {
                this.cooldown_reduction = 35;
            }
            this.COOLDOWN_REDUCTION.innerText = this.cooldown_reduction + '%';

            this.sp_regen =
                round(this.character.Stamina_Regen + this.character.Stamina_Regen_Growth * level +
                    calcEquip(this, 'SP_Regen', 2), 1);

            this.sp_regen_percent =
                calcEquip(this, 'SP_Regen_Percent');
            this.SP_REGEN.innerText =
                this.sp_regen + '| ' + this.sp_regen_percent + '%';

            this.skill_damage_reduction =
                calcEquip(this, 'Skill_Damage_Reduction');
            this.skill_damage_reduction_percent =
                round((1 + this.DEFENSE_MASTERY.selectedIndex) * 0.8 +
                    calcEquip(this, 'Skill_Damage_Reduction_Percent'));
            this.SKILL_DAMAGE_REDUCTION.innerText =
                this.skill_damage_reduction + '| ' + this.skill_damage_reduction_percent + '%';

            const magnus_t = this.DIV.querySelector('.magnus_t');
            const hammer_d = this.enemy.DIV.querySelector('.hammer_d');
            const zahir_q = this.enemy.DIV.querySelector('.zahir_q');
            const hyunwoo_w = this.DIV.querySelector('.hyunwoo_w');
            const hyunwoo_e = this.enemy.DIV.querySelector('.hyunwoo_e');
            hart_w_u = this.enemy.DIV.querySelector('.hart_w_u');
            const hart_w = this.enemy.DIV.querySelector('.hart_w');
            const hart_ww = this.enemy.DIV.querySelector('.hart_ww');
            const isol_t = this.enemy.DIV.querySelector('.isol_t');
            rozzi_w = this.enemy.DIV.querySelector('.rozzi_w');
            const yuki_w = this.DIV.querySelector('.yuki_w');
            const xiukai_r = this.enemy.DIV.querySelector('.xiukai_r');
            var chiara_t = this.enemy.DIV.querySelector('.chiara_t');
            const silvia_r = this.DIV.querySelector('.silvia_r');
            const defense_percent = 1 +
                (magnus_t ? magnus_t.value * (0.002 + t * 0.002) : 0) +
                (yuki_w && w >= 0 && yuki_w.checked ? 0.5 : 0);
            const defense_minus = 1 -
                (hammer_d && hammer_d.checked && ewm > 5? ewm < 13 ? 0.2 : 0.35 : 0) -
                (zahir_q && eq >= 0 ? 0.1 * zahir_q.value : 0) -
                (hyunwoo_e && ee >= 0 && hyunwoo_e.checked ? 0.04 + ee * 0.02 : 0) -
                (hart_w_u && ew >= 0 && hart_w_u.checked ? hart_ww.checked ? 0.45 : hart_w.checked ? 0.3 : 0 : 0) -
                (isol_t && isol_t.checked ? 0.05 + et * 0.1 : 0) -
                (rozzi_w && rozzi_w.checked && ew >= 0 ? 0.09 + ew * 0.02 : 0) -
                (xiukai_r && xiukai_r.checked ? 0.1 + er * 0.05 : 0) -
                (chiara_t ? chiara_t.value * (0.03 + et * 0.02) : 0);
            const defense_bonus =
                (hyunwoo_w && hyunwoo_w.checked ? 6 + w * 14 + this.defense * 0.1 : 0) +
                (silvia_r && r >= 0 && silvia_r.checked ? 2 + er * 14 : 0) +
                (this.character === Alex && this.weapon && this.isMelee ? 10 + t * 7 : 0);
            this.defense =
                floor((this.character.Defense + this.character.Defense_Growth * level +
                    calcEquip(this, 'Defense', 2) + calcEquip(this, 'Defense_per_level', 2) * (level + 1) +
                    (this.food && this.food.Name === 'Holy_Water' ? 10 : 0) + defense_bonus) * defense_percent * defense_minus);
            this.DEFENSE.innerText = this.defense;
            this.pure_defense =
                this.character.Defense + this.character.Defense_Growth * level +
                    calcEquip(this, 'Defense', 2) + calcEquip(this, 'Defense_per_level', 2) * (level + 1) +
                    (this.food && this.food.Name === 'Holy_Water' ? 10 : 0);

            const xiukai_t = this.DIV.querySelector('.xiukai_t');
            const chiara_r = this.DIV.querySelector('.chiara_r');
            const hp_bonus =
                (xiukai_t ? xiukai_t.value * 7 : 0) +
                (chiara_r && chiara_r.checked ? 150 + r * 75 : 0);
                // (this.character === Alex && this.weapon && this.isMelee ? 50 + t * 50 : 0);
            this.max_hp =
                floor((this.character.Health + this.character.Health_Growth * level + hp_bonus +
                    calcEquip(this, 'Max_HP', 2) + calcEquip(this, 'Max_HP_per_level', 2) * (level + 1)) *
                    (1 + (1 + this.HEALTH_MASTERY.selectedIndex) * 0.01));
            this.MAX_HP.innerText = this.max_hp;
            this.pure_max_hp =
                floor((this.character.Health + this.character.Health_Growth * level + hp_bonus -
                    (chiara_r && chiara_r.checked ? 150 + r * 75 : 0) +
                    calcEquip(this, 'Max_HP', 2) + calcEquip(this, 'Max_HP_per_level', 2) * (level + 1)) *
                    (1 + (1 + this.HEALTH_MASTERY.selectedIndex) * 0.01));

            this.max_sp =
                floor((this.character.Stamina + this.character.Stamina_Growth * level +
                    calcEquip(this, 'Max_SP', 2)) * (1 + (1 + this.MEDITATION_MASTERY.selectedIndex) * 0.017));
            this.MAX_SP.innerText = this.max_sp;

            this.hp_regen =
                round(this.character.Health_Regen + this.character.Health_Regen_Growth * level +
                    calcEquip(this, 'HP_Regen', 2), 1);

            this.hp_regen_percent =
                calcEquip(this, 'HP_Regen_Percent');
            this.HP_REGEN.innerText =
                this.hp_regen + '| ' + this.hp_regen_percent + '%';

            this.normal_attack_damage_reduction =
                calcEquip(this, 'Normal_Attack_Damage_Reduction');
            this.normal_attack_damage_reduction_percent =
                round((1 + this.DEFENSE_MASTERY.selectedIndex) * 0.8);
            this.NORMAL_ATTACK_DAMAGE_REDUCTION.innerText =
                this.normal_attack_damage_reduction + '| ' + this.normal_attack_damage_reduction_percent + '%';

            const jackie_w = this.DIV.querySelector('.jackie_w');
            const bernice_e = this.DIV.querySelector('.bernice_e');
            chiara_t = this.DIV.querySelector('.chiara_t');
            const barbara_e = this.DIV.querySelector('.barbara_e');
            const move_percent = 1 +
                (jackie_w && jackie_w.checked ? 0.08 + w * 0.04 : 0) +
                (bernice_e && bernice_e.checked ? 0.12 + w * 0.02 : 0) +
                (chiara_t && chiara_t.value == 4 ? 0.04 + t * 0.02 : 0) +
                (silvia_r && silvia_r.checked ? 0.7 : 0) +
                (barbara_e && barbara_e.checked ? 0.2 : 0) +
                (leon_t && leon_t.checked ? 0.08 + t * 0.08 : 0);
            const move_bonus =
                (silvia_r && silvia_r.checked ? 0.3 + r * 0.075 : 0);
            this.movement_speed =
                (this.character.Movement_Speed + move_bonus +
                    (1 + this.MOVE_MASTERY.selectedIndex) * 0.01 +
                    calcEquip(this, 'Movement_Speed', 2)) * move_percent;
            if (this.movement_speed > 7) {
                this.movement_speed = 7;
            }
            this.MOVEMENT_SPEED.innerText = round(this.movement_speed, 2);
            this.pure_movement_speed =
                (this.character.Movement_Speed +
                (1 + this.MOVE_MASTERY.selectedIndex) * 0.01 +
                calcEquip(this, 'Movement_Speed', 2));

            this.movement_speed_while_not_in_combat =
                (1 + this.MOVE_MASTERY.selectedIndex) * 0.02 + calcEquip(this, 'Movement_speed_while_not_in_combat', 2);
            if (this.movement_speed + this.movement_speed_while_not_in_combat > 7) {
                this.movement_speed_while_not_in_combat = 7 - this.movement_speed;
            }
            this.MOVEMENT_SPEED_WHILE_NOT_IN_COMBAT.innerText = round(this.movement_speed + this.movement_speed_while_not_in_combat, 2);

            this.vision_range =
                round(this.character.Sight_Range + 0.1 +
                    this.SEARCH_MASTERY.selectedIndex * 0.1 +
                    calcEquip(this, 'Vision_Range', 2), 2);
            this.VISION_RANGE.innerText = this.vision_range;

            const attack_range_bonus =
                (chiara_r && chiara_r.checked ? 3.65 : 0);
            this.attack_range =
                round((rio_q ? rio_q.checked ? 6.8 : 4.2 :
                    this.character.Attack_Range + this.weapon_attack_range) +
                    attack_range_bonus + calcEquip(this, 'Attack_Range', 2), 2);
            this.ATTACK_RANGE.innerText = this.attack_range;

            this.armer_penetration_percent = calcEquip(this, 'Armor_penetration_percent') +
                (this.character === Rio ? 5 + t * 2.5 + this.critical_strike_chance * 0.25 : 0);
        } else {
            this.heal_reduction = '';

            this.attack_power = '';
            this.ATTACK_POWER.innerText = '';
            this.pure_attack_power = '';

            this.attack_speed = '';
            this.ATTACK_SPEED.innerText = '';

            this.critical_strike_chance = '';
            this.CRITICAL_STRIKE_CHANCE.innerText = '%';
            this.pure_critical_strike_chance = '';

            this.critical_damage = '';
            this.CRITICAL_DAMAGE.innerText = '%';
            this.pure_critical_damage = '';

            this.life_steal = '';
            this.LIFE_STEAL.innerText = '%';

            this.extra_normal_attack_damage = '';
            this.extra_normal_attack_damage_percent = '';
            this.EXTRA_NORMAL_ATTACK_DAMAGE.innerText = '| %';

            this.extra_skill_damage = '';
            this.skill_amplification = '';
            this.EXTRA_SKILL_DAMAGE.innerText = '| %';
            this.pure_extra_skill_damage = '';
            this.pure_skill_amplification = '';

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
            this.pure_defense = '';

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

            this.movement_speed_while_not_in_combat = '';
            this.MOVEMENT_SPEED_WHILE_NOT_IN_COMBAT.innerText = '';

            this.vision_range = '';
            this.VISION_RANGE.innerText = '';

            this.attack_range = '';
            this.ATTACK_RANGE.innerText = '';
        }
    }
}
