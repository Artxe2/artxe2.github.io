'use strict';
const Chest = [
    {
         Type: "Chest"
        ,Name: "Windbreaker"
        ,Max_HP: 50
        ,Normal_Attack_Damage_Reduction: 3
        ,Title: "Windbreaker\n\nMax HP +50\nNormal Attack Damage Reduction +3"
        ,Rarity: "Common"
    }
    ,{
         Type: "Chest"
        ,Name: "Monk`s_Robe"
        ,Cooldown_Reduction: 5
        ,Defense: 5
        ,Title: "Monk`s Robe\n\nDefense +5\nCooldown Reduction +5%"
        ,Rarity: "Common"
    }
    ,{
         Type: "Chest"
        ,Name: "Wetsuit"
        ,Defense: 1
        ,Skill_Damage_Reduction_Percent: 5
        ,Title: "Wetsuit\n\nDefense +1\nSkill Damage Reduction +5%"
        ,Rarity: "Common"
    }
    ,{
         Type: "Chest"
        ,Name: "Fabric_Armor"
        ,Defense: 11
        ,Title: "Fabric Armor\n\nDefense +11"
        ,Rarity: "Common"
    }
    ,{
         Type: "Chest"
        ,Name: "Leather_Armor"
        ,Defense: 15
        ,Title: "Leather Armor\n\nDefense +15"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Chest"
        ,Name: "Leather_Jacker"
        ,Defense: 8
        ,Max_HP: 70
        ,Normal_Attack_Damage_Reduction: 6
        ,Title: "Leather Jacket\n\nDefense +8\nMax HP +70\nNormal Attack Damage Reduction +6"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Chest"
        ,Name: "Turtle_Dobok"
        ,Defense: 10
        ,Cooldown_Reduction: 10
        ,Title: "Turtle Donok\n\nDefense +10\nCooldown Reduction +10%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Chest"
        ,Name: "Military_Suit"
        ,Max_HP: 50
        ,Normal_Attack_Damage_Reduction: 10
        ,Title: "Military Suit\n\nMax HP +50\nNormal Attack Damage Reduction +10"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Chest"
        ,Name: "Patched_Robe"
        ,Defense: 5
        ,HP_Regen: 1
        ,Cooldown_Reduction: 7
        ,Title: "Patched Robe\n\nDefense +5\nHP Regen +1\nCooldown Reduction +7%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Chest"
        ,Name: "Dress"
        ,Attack_Power: 8
        ,Defense: 8
        ,SP_Regen_Percent: 100
        ,Title: "Dress\n\nAttack Power +8\nDefense +8\nSP Regen +100%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Chest"
        ,Name: "Bikini"
        ,Defense: 4
        ,Skill_Damage_Reduction_Percent: 11
        ,Title: "Bikini\n\nDefense +4\nSkill Damage Reduction +11%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Chest"
        ,Name: "Diving_Suit"
        ,Defense: 9
        ,Skill_Damage_Reduction_Percent: 10
        ,Title: "Diving Suit\n\nDefense +9\nSkill Damage Reduction +10%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Chest"
        ,Name: "Rider_Jacket"
        ,Defense: 11
        ,Max_HP: 70
        ,Normal_Attack_Damage_Reduction: 9
        ,Title: "Rider Jacket\n\nDefense +11\nMax HP +70\nNormal Attack Damage Reduction +9"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Chest"
        ,Name: "Chain_Armor"
        ,Defense: 30
        ,Title: "Chain Armor\n\nDefense +30"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Chest"
        ,Name: "Suit"
        ,Life_Steal: 5
        ,Normal_Attack_Damage_Reduction: 12
        ,Title: "Suit\n\nLife Steal +5\nNormal Attack Damage Reduction +12"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Chest"
        ,Name: "Qipao"
        ,Attack_Power: 10
        ,Defense: 10
        ,SP_Regen_Percent: 150
        ,Title: "Qipao\n\nAttack Power +10\nDefense +10\nSP Regen +150%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Chest"
        ,Name: "Sheet_Metal_Armor"
        ,Defense: 38
        ,Max_HP: 100
        ,Movement_Speed: -0.1
        ,Title: "Sheet Metal Armor\n\nDefense +38\nMax HP +100\nMovement Speed - 0.1"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Chest"
        ,Name: "Hanbok"
        ,Defense: 12
        ,HP_Regen: 1
        ,Cooldown_Reduction: 10
        ,Title: "Hanbok\n\nDefense +12\nHP Regen +1\nCooldown Reduction +10%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Chest"
        ,Name: "Bulletproof_Vest"
        ,Defense: 10
        ,Max_HP: 130
        ,Normal_Attack_Damage_Reduction: 10
        ,Title: "Bulletproof Vest\n\nDefense +10\nMax HP +130\nNormal Attack Damage Reduction +10"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Chest"
        ,Name: "Sunset_Armor"
        ,Defense: 22
        ,Max_HP: 360
        ,Title: "Sunset Armor\n\nDefense +22\nMax HP +360"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Chest"
        ,Name: "Covert_Agent_Uniform"
        ,Defense: 23
        ,HP_Regen: 2.5
        ,Vision_Range: 1
        ,Cooldown_Reduction: 15
        ,Title: "Convert Agent Uniform\n\nDefense +23\nHP Regen +2.5\nVision Range +1\nCooldown Reduction +15%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Chest"
        ,Name: "Optical_Camouflage_Suit"
        ,Attack_Power: 10
        ,Defense: 15
        ,Critical_Strike_Chance: 22
        ,Skill_Damage_Reduction_Percent: 10
        ,Title: "Optical Camouflage Suit\n\nAttack Power +10\nDefense +15\nCritical Strike Chance +22%\nSkill Damage Reduction +10%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Chest"
        ,Name: "Rocker`s_Jacket"
        ,Attack_Power: 30
        ,Defense: 18
        ,Movement_speed_while_not_in_combat: 0.1
        ,Normal_Attack_Damage_Reduction: 11
        ,Title: "Rocker`s Jacket\n\nAttack Power +30\nDefense +18\nMovement speed while not in combat +0.1\nNormal Attack Damage Reduction +11\nHealing Reduction (Skills) -40%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Chest"
        ,Name: "Mithril_Armor"
        ,Defense: 62
        ,Attack_Speed: 12
        ,Movement_Speed: 0.2
        ,Skill_Damage_Reduction: 10
        ,Title: "Mithril Armor\n\nDefense +62\nAttack Speed +12%\nMovement Speed +0.2\nSkill Damage Reduction +10"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Chest"
        ,Name: "Crusader_Armor"
        ,Defense: 38
        ,HP_Regen_Percent: 150
        ,Movement_Speed: -0.02
        ,Extra_Normal_Attack_Damage: 15
        ,Title: "Crusader Armor\n\nDefense +38\nHP Regen +150%\nMovement Speed - 0.02\nExtra Damage to Normal Attacks +15"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Chest"
        ,Name: "Amazoness_Armor"
        ,Defense: 28
        ,Max_HP: 140
        ,Skill_Damage_Reduction_Percent: 20
        ,Title: "Amazoness Armor\n\nDefense +28\nMax HP +140\nSkill Damage Reduction +20%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Chest"
        ,Name: "Dragon_Dobok"
        ,Attack_Power: 11
        ,Defense: 10
        ,SP_Regen_Percent: 150
        ,Cooldown_Reduction: 10
        ,Attack_Range: 1
        ,Title: "Dragon Dobok\n\nAttack Power +11\nDefense +10\nSP Regen +150%\nCooldown Reduction +10%\nAttack Range +1"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Chest"
        ,Name: "Commander`s_Armor"
        ,Defense: 24
        ,Skill_Amplification_Percent: 18
        ,Title: "Commander`s Armor\n\nDefense +24\nSkill Damage Increase +18%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Chest"
        ,Name: "Butler`s_Suit"
        ,Attack_Power: 30
        ,Movement_Speed: 0.1
        ,Life_Steal: 20
        ,Normal_Attack_Damage_Reduction: 10
        ,Title: "Butler`s Suit\n\nAttack Power +30\nMovement Speed +0.1\nLife Steal +20%\nNormal Attack Damage Reduction +10"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Chest"
        ,Name: "Battle_Suit"
        ,Defense: 25
        ,Max_HP: 170
        ,Normal_Attack_Damage_Reduction: 12
        ,Skill_Damage_Reduction_Percent: 12
        ,Title: "Battle Suit\n\nDefense +25\nMax HP +170\nNormal Attack Damage Reduction +12\nSkill Damage Reduction +12%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Chest"
        ,Name: "EOD_Suit"
        ,Defense: 25
        ,Max_HP: 270
        ,HP_Regen: 1
        ,Cooldown_Reduction: 10
        ,Normal_Attack_Damage_Reduction: 8
        ,Title: "EPD Siot\n\nDefense +25\nMax HP +270\nHP Regen +1\nCooldown Reduction +10%\nNormal Attack Damage Reduction +8"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Chest"
        ,Name: "Blazing_Dress"
        ,Attack_Power: 16
        ,Defense: 30
        ,HP_Regen: 2.5
        ,SP_Regen: 2
        ,SP_Regen_Percent: 75
        ,Extra_Normal_Attack_Damage: 18
        ,Title: "Blazing Dress\n\nAttack Power +16\nDefense +30\nHP Regen +2.5\nSP Regen +2\nSP Regen +75%\nExtra Normal Attack Damage +18"
        ,Rarity: "Legendary"
    }
    ,{
         Type: "Chest"
        ,Name: "Kabana"
        ,Defense: 36
        ,Skill_Amplification_Percent: 22
        ,Title: "Kabana\n\nDefense +36\nSkill Amplification +22%"
        ,Rarity: "Legendary"
    }
    ,{
         Type: "Chest"
        ,Name: "Queen_of_Hearts"
        ,Defense: 37
        ,HP_Regen: 3
        ,Cooldown_Reduction: 25
        ,Title: "Queen of Hearts\n\nDefense +37\nHP Regen +3\nCooldown Reduction +25%"
        ,Rarity: "Legendary"
    }
];
