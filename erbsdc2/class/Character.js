class Character {
    constructor(CHARACTER, LEVEL, WEAPON_MASTERY,
            HUNT_MASTERY, CRAFT_MASTERY, SEARCH_MASTERY, MOVE_MASTERY,
            HEALTH_MASTERY, DEFENSE_MASTERY, MEDITATION_MASTERY, TRAP_MASTERY,
            Q_LEVEL, W_LEVEL, E_LEVEL, R_LEVEL, T_LEVEL) {
        this.CHARACTER = CHARACTER;
        this.LEVEL = LEVEL;
        this.WEAPON_MASTERY = WEAPON_MASTERY;
        this.HUNT_MASTERY = HUNT_MASTERY;
        this.CRAFT_MASTERY = CRAFT_MASTERY;
        this.SEARCH_MASTERY = SEARCH_MASTERY;
        this.MOVE_MASTERY = MOVE_MASTERY;
        this.HEALTH_MASTERY = HEALTH_MASTERY;
        this.DEFENSE_MASTERY = DEFENSE_MASTERY;
        this.MEDITATION_MASTERY = MEDITATION_MASTERY; 
        this.TRAP_MASTERY = TRAP_MASTERY;
        this.Q_LEVEL = Q_LEVEL;
        this.W_LEVEL = W_LEVEL;
        this.E_LEVEL = E_LEVEL;
        this.R_LEVEL = R_LEVEL;
        this.T_LEVEL = T_LEVEL;
        for (let i = 0; i < arguments.length; i++) {
            console.log(arguments[i]);
        }
    }

    setCharacter(character) {
        this.character = character;
    }
    // let character;
		
    // let weapon;
    // let chest;
    // let head;
    // let arm;
    // let leg;
    // let accessory;

    // let weapon_mastery_attack_speed;
    // let weapon_mastery_extra_normal_attack_damage_percent;
    // let weapon_mastery_skill_amplification_percent;

    // let attack_power;
    // let attack_speed;
    // let critical_strike_chance;
    // let critical_strike_damage;
    // let life_steal;
    // let extra_normal_attack_damage;
    // let extra_normal_attack_damage_percent;
    // let skill_amplification;
    // let skill_amplification_percent;
    // let cooldown_reduction;
    // let sp_regen;
    // let sp_regen_percent;
    // let skill_damage_reduction;
    // let skill_damage_reduction_percent;
    // let defense;
    // let max_hp;
    // let max_sp;
    // let hp_regen;
    // let hp_regen_percent;
    // let normal_attack_damage_reduction;
    // let normal_attack_damage_reduction_percent;
    // let movement_speed;
    // let out_of_combat_movement_speed;
    // let vision_range;
    // let attack_range;
}