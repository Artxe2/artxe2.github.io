'use strict';
const Accessory = [
    {
         Type: "Accessory"
        ,Name: "Feather"
        ,Movement_Speed: 0.06
        ,Title: "Feather\n\nMovement Speed +0.06"
        ,Rarity: "Common"
    }
    ,{
         Type: "Accessory"
        ,Name: "Flower"
        ,Cooldown_Reduction: 7
        ,Title: "Flower\n\nCooldown Reduction +7%"
        ,Rarity: "Common"
    }
    ,{
         Type: "Accessory"
        ,Name: "Ribbon"
        ,Life_Steal: 5
        ,Title: "Ribbon\n\nLife Steal +5%"
        ,Rarity: "Common"
    }
    ,{
         Type: "Accessory"
        ,Name: "Fan"
        ,Extra_Skill_Damage: 9
        ,Title: "Fan\n\nExtra Skill Damage +9"
        ,Rarity: "Common"
    }
    ,{
         Type: "Accessory"
        ,Name: "Buddhist_Scripture"
        ,Skill_Amplification_Percent: 7
        ,Title: "Buddhist Scripture\n\nSkill Amplification +7%"
        ,Rarity: "Common"
    }
    ,{
         Type: "Accessory"
        ,Name: "Box"
        ,Max_HP: 90
        ,Title: "Box\n\nMax HP +90"
        ,Rarity: "Common"
    }
    ,{
         Type: "Accessory"
        ,Name: "Holy_Grail"
        ,HP_Regen_Percent: 120
        ,Title: "Holy Grail\n\nHP Regen +120%"
        ,Rarity: "Common"
    }
    ,{
         Type: "Accessory"
        ,Name: "Cross"
        ,Extra_Normal_Attack_Damage: 7
        ,Title: "Cross\n\nExtra Normal Attack Damage +7"
        ,Rarity: "Common"
    }
    ,{
         Type: "Accessory"
        ,Name: "Binoculars"
        ,Attack_Power: 2
        ,Vision_Range: 1.5
        ,Title: "Binoculars\n\nAttack Power +2\nVision Range +1.5"
        ,Rarity: "Common"
    }
    ,{
         Type: "Accessory"
        ,Name: "Saint`s_Relic"
        ,HP_Regen_Percent: 150
        ,Extra_Normal_Attack_Damage: 8
        ,Title: "Saint`s Relic\n\nHP Regen +150%\nExtra Normal Attack Damage +8"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "Flower_of_Fate"
        ,Critical_Strike_Chance: 15
        ,Cooldown_Reduction: 8
        ,Title: "Flower of Fate\n\nCritical Strike Chance +15%\nCooldown Reduction +8%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "Glass_Pieces"
        ,Critical_Strike_Chance: 13
        ,Title: "Glass Pieces\n\nCritical Strike Chance +13%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "Doll"
        ,SP_Regen_Percent: 80
        ,Life_Steal: 12
        ,Title: "Doll\n\nSP Regen +80%\nLife Steal +12%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "Sniping_Scope"
        ,Attack_Power: 8
        ,Vision_Range: 3.5
        ,Title: "Sniper Scope\n\nAttack Power +8\nVision Range +3.5"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "Buddha_Sarira"
        ,Cooldown_Reduction: 8
        ,Skill_Amplification_Percent: 8
        ,Title: "Buddha Sarira\n\nCooldown Reduction +8%\nSkill Amplification +8%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "Quiver"
        ,Attack_Speed: 25
        ,Title: "Quiver\n\nAttack Speed +25%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "Feather_Duster"
        ,Attack_Power: 9
        ,Movement_Speed: 0.1
        ,Title: "Feather Duster\n\nAttack Power +9\nMovement Speed +0.1"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "Gilded_Quill_Fan"
        ,Extra_Skill_Damage: 12
        ,Title: "Gilded Quill Fan\n\nExtra Skill Damage +12\nHealing Reductions (Skills) -30%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "Shaman`s_Bronze"
        ,Attack_Power: 5
        ,Skill_Amplification_Percent: 8
        ,Title: "Shaman`s Bronze\n\nAttack Power +5\nSkill Amplification +8%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "Decorative_Flintlock"
        ,Attack_Power: 10
        ,Life_Steal: 6
        ,Title: "Decorative Flintlock\n\nAttack Power +10\nLife Steal +6%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "Marksman_Handbook"
        ,Attack_Power: 8
        ,Attack_Range: 0.35
        ,Title: "Marksman Handbook\n\nAttack Power +8\nAttack Range +0.35"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "White_Crane_Fan"
        ,Movement_Speed: 0.1
        ,Extra_Skill_Damage: 18
        ,Title: "White Crane Fan\n\nMovement Speed +0.1\nExtra Skill Damage +18\nHealing Reduction (Skills) -40 / 25%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Powder_of_Life"
        ,HP_Regen: 1.5
        ,SP_Regen: 1.5
        ,Title: "Powder of Life\n\nHP Regen +1.5\nSP Regen +1.5"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Uchiwa"
        ,SP_Regen_Percent: 80
        ,Life_Steal: 14
        ,Extra_Skill_Damage: 23
        ,Title: "Uchiwa\n\nSP Regen +80%\nLife Steal +14%\nExtra Skill Damage +23"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Magazine"
        ,Max_HP: 300
        ,Normal_Attack_Damage_Reduction: 6
        ,Title: "Magazine\n\nMax HP +300\nNormal Attack Damage Reduction +6"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Laced_Quiver"
        ,Attack_Power: 13
        ,Attack_Speed: 30
        ,Movement_Speed: 0.1
        ,Title: "Laced Quiver\n\nAttack Power +13\nAttack Speed +30%\nMovement Speed +0.1"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Revenge_of_Goujian"
        ,Attack_Power: 15
        ,Skill_Amplification_Percent: 15
        ,Title: "Revenge of Goujian\n\nAttack Power +15\nSkill Amplification +15%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Buccaneer_Doubloon"
        ,Attack_Power: 15
        ,Critical_Strike_Chance: 12
        ,Life_Steal: 6
        ,Title: "Buccaneer Doubloon\n\nAttack Power +15\nCritical Strike Chance +12%\nLife Steal +6%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Hawkeye"
        ,Attack_Power: 10
        ,Vision_Range: 2
        ,Attack_Range: 0.5
        ,Title: "Hawkeye\n\nAttack Power +10\nVision_Range +2\nAttack Range +0.5"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Jolly_Roger"
        ,Attack_Power: 12
        ,Life_Steal: 12
        ,Swift_Strides: [ 120, 24 ]
        ,Title: "Jolly Roger\n\nAttack Power +12\nLife Steal +12%\nSwift Strides 120 / 24m"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Moonlight_Pendant"
        ,Attack_Power: 24
        ,Vision_Range: 1.5
        ,Life_Steal: 16
        ,Title: "Moonlight Pendant\n\nAttack Power +24\nVision Range +1.5\nLife Steal +16%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Schrodinger`s_Box"
        ,Max_HP: 360
        ,Extra_Skill_Damage: 7
        ,Title: "Schrodinger`s Box\n\nMax HP +360\nExtra Skill Damage +7"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Veritas_Lux_Mea"
        ,HP_Regen_Percent: 150
        ,Cooldown_Reduction: 10
        ,Extra_Normal_Attack_Damage: 12
        ,Skill_Amplification_Percent: 10
        ,Title: "Veritas Lux Mea\n\nHP Regen +150%\nCooldown Reduction +10%\nExtra Normal Attack Damage +12\nSkill Amplification +10%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Glacial_Ice"
        ,HP_Regen: 1.5
        ,SP_Regen: 1.5
        ,Extra_Skill_Damage: 18
        ,Title: "Glacial Ice\n\nHP Regen +1.5\nSP Regen +1.5\n Extra Skill Damage +18"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Accessory"
        ,Name: "True_Samadhi_Fire"
        ,Attack_Power: 10
        ,Defense: 10
        ,Extra_Normal_Attack_Damage: 15
        ,Title: "True Samadhi Fire\n\nAttack Power +10\nDefense +10\nExtra Normal Attack Damage +15"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Accessory"
        ,Name: "Lunar_Embrace"
        ,Defense: 20
        ,SP_Regen_Percent: 100
        ,Vision_Range: 1.5
        ,Skill_Damage_Reduction: 20
        ,Title: "Lunar Embrace\n\nDefense +20\nSP Regen +100%\nVision Range +1.5\nSkill Damage Reduction +20"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Accessory"
        ,Name: "Emerald_Tablet"
        ,Attack_Power: 18
        ,Defense: 18
        ,Critical_Strike_Chance: 15
        ,Cooldown_Reduction: 12
        ,Title: "Emerald Tablet\n\nAttack Power +18\nDefense +18\nCritical Strike Chance +15%\nCooldown Reduction +12%"
        ,Rarity: "Legendary"
    }
    ,{
         Type: "Accessory"
        ,Name: "Sanguine_Gunbai"
        ,Cooldown_Reduction: 12
        ,Swift_Strides: [ 200, 20 ]
        ,Title: "Sanguine Gunbai\n\nCooldown Reduction +12%"
        ,Rarity: "Legendary"
    }
];
