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
        ,Skill_Amplification: 8
        ,Title: "Fan\n\nSkill Amplification +8"
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
        ,SP_Regen_Percent: 100
        ,Life_Steal: 12
        ,Title: "Doll\n\nSP Regen +100%\nLife Steal +12%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "Sniping_Scope"
        ,Attack_Power: 10
        ,Vision_Range: 4.5
        ,Title: "Sniper Scope\n\nAttack Power +10\nVision Range +4.5"
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
        ,Skill_Amplification: 10
        ,Title: "Gilded Quill Fan\n\nSkill Amplification +10\nHealing Reductions (Skills) -40%"
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
        ,Life_Steal: 8
        ,Title: "Decorative Flintlock\n\nAttack Power +10\nLife Steal +8%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Accessory"
        ,Name: "White_Crane_Fan"
        ,Movement_Speed: 0.1
        ,Skill_Amplification: 16
        ,Title: "White Crane Fan\n\nMovement Speed +0.1\nSkill Amplification +16\nHealing Reduction (Skills) -40%"
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
        ,Life_Steal: 17
        ,Skill_Amplification: 21
        ,Title: "Uchiwa\n\nSP Regen +80%\nLife Steal +17%\nSkill Amplification +21"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Magazine"
        ,Max_HP: 330
        ,Normal_Attack_Damage_Reduction: 6
        ,Title: "Magazine\n\nMax HP +330\nNormal Attack Damage Reduction +6"
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
        ,Skill_Amplification_Percent: 20
        ,Title: "Revenge of Goujian\n\nAttack Power +15\nSkill Amplification +20%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Buccaneer_Doubloon"
        ,Attack_Power: 15
        ,Critical_Strike_Chance: 12
        ,Life_Steal: 8
        ,Title: "Buccaneer Doubloon\n\nAttack Power +15\nCritical Strike Chance +12%\nLife Steal +8%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Moonlight_Pendant"
        ,Attack_Power: 20
        ,Life_Steal: 20
        ,Title: "Moonlight Pendant\n\nAttack Power +20\nLife Steal +20%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Schrodinger`s_Box"
        ,Max_HP: 360
        ,Skill_Amplification: 7
        ,Title: "Schrodinger`s Box\n\nMax HP +360\nSkill Amplification +7"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Veritas_Lux_Mea"
        ,HP_Regen_Percent: 150
        ,Cooldown_Reduction: 10
        ,Extra_Normal_Attack_Damage: 12
        ,Skill_Amplification_Percent: 8
        ,Title: "Veritas Lux Mea\n\nHP Regen +150%\nCooldown Reduction +10%\nExtra Normal Attack Damage +12\nSkill Amplification +8%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Accessory"
        ,Name: "Glacial_Ice"
        ,HP_Regen: 1.5
        ,SP_Regen: 1.5
        ,Skill_Amplification: 18
        ,Title: "Glacial Ice\n\nHP Regen +1.5\nSP Regen +1.5\n Skill Amplification +18"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Accessory"
        ,Name: "True_Samadhi_Fire"
        ,HP_Regen: 1.5
        ,SP_Regen: 1.5
        ,Extra_Normal_Attack_Damage: 13
        ,Title: "True Samadhi Fire\n\nHP Regen +1.5\nSP Regen +1.5\nExtra Normal Attack Damage +13"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Accessory"
        ,Name: "Lunar_Embrace"
        ,Defense: 14
        ,SP_Regen_Percent: 160
        ,Vision_Range: 1.5
        ,Skill_Damage_Reduction: 18
        ,Title: "Lunar Embrace\n\nDefense +14\nSP Regen +160%\nVision Range +1.5\nSkill Damage Reduction +18"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Accessory"
        ,Name: "Emerald_Tablet"
        ,Attack_Power: 10
        ,Defense: 10
        ,Critical_Strike_Chance: 15
        ,Cooldown_Reduction: 10
        ,Title: "Emerald Tablet\n\nAttack Power +10\nDefense +10\nCritical Strike Chance +15%\nCooldown Reduction +10%"
        ,Rarity: "Legendary"
    }
];
