'use strict';
const Head = [
    {
         Type: "Head"
        ,Name: "Hairband"
        ,Defense: 4
        ,Max_SP: 130
        ,Title: "Hairband\n\nDefense +4\nMax SP +130"
        ,Rarity: "Common"
    }
    ,{
         Type: "Head"
        ,Name: "Hat"
        ,Defense: 4
        ,Cooldown_Reduction: 5
        ,Title: "Hat\n\nDefense +4\nCooldown Reduction +5%"
        ,Rarity: "Common"
    }
    ,{
         Type: "Head"
        ,Name: "Bike_Helmet"
        ,Max_HP: 90
        ,Title: "Bike Helmet\n\nMax HP +90"
        ,Rarity: "Common"
    }
    ,{
         Type: "Head"
        ,Name: "Mask"
        ,Defense: 10
        ,Max_SP: 130
        ,Movement_Speed: 0.08
        ,Title: "Mask\n\nDefense +10\nMax SP +130\nMovement Speed +0.08"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Head"
        ,Name: "Circlet"
        ,Defense: 14
        ,Max_SP: 270
        ,Title: "Circlet\n\nDefense +14\nMax SP +270"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Head"
        ,Name: "Beret"
        ,Defense: 10
        ,Max_HP: 60
        ,Cooldown_Reduction: 7
        ,Title: "Beret\n\nDefense +10\nMax HP +60\nCooldown Reduction +7%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Head"
        ,Name: "Chain_Coif"
        ,Defense: 14
        ,Cooldown_Reduction: 6
        ,Title: "Chain Coif\n\nDefense +14\nCooldown Reduction +6%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Head"
        ,Name: "Safety_Helmet"
        ,Max_HP: 200
        ,Title: "Safety Helmet\n\nMax HP +200"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Head"
        ,Name: "Ballistic_Helmet"
        ,Defense: 15
        ,Max_HP: 90
        ,Cooldown_Reduction: 8
        ,Title: "Ballistic Helmet\n\nDefense +15\nMax HP +90\nCooldown Reduction +8%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Head"
        ,Name: "Fire_Helmet"
        ,Max_HP: 250
        ,Title: "Fire Helmet\n\nMax HP +250"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Head"
        ,Name: "Tiara"
        ,Defense: 16
        ,Max_SP: 400
        ,Title: "Tiara\n\nDefense +16\nMax SP +400"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Head"
        ,Name: "Crown"
        ,Defense: 16
        ,Max_HP: 160
        ,Skill_Amplification_Percent: 8
        ,Title: "Crown\n\nDefense +16\nMax HP +160\nSkill Amplification +8%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Head"
        ,Name: "Close_Helm"
        ,Defense: 20
        ,Max_SP: 130
        ,Movement_Speed: 0.08
        ,Cooldown_Reduction: 7
        ,Title: "Close Helm\n\nDefense +20\nMax SP +130\nMovement Speed +0.08\nCooldown Reduction +7%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Head"
        ,Name: "Motorcycle_Helmet"
        ,Attack_Power: 10
        ,Max_HP: 300
        ,Vision_Range: 1
        ,Title: "Motorcycle Helmet\n\nAttack Power +10\nMax HP +300\nVision Range +1"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Head"
        ,Name: "Mithril_Helm"
        ,Defense: 38
        ,Attack_Speed: 12
        ,Movement_Speed: 0.2
        ,Cooldown_Reduction: 15
        ,Title: "Mithril Helm\n\nDefense +38\nAttack Speed +12%\nMovement Speed +0.2\nCooldown Reduction +15%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Head"
        ,Name: "Crystal_Tiara"
        ,Defense: 24
        ,Max_SP: 500
        ,Critical_Strike_Chance: 22
        ,Title: "Crystal Tiara\n\nDefense +24\nMax SP +500\nCritical Strike Chance +22%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Head"
        ,Name: "Tactical_OPS_Helmet"
        ,Defense: 15
        ,Max_HP: 120
        ,Attack_Speed: 25
        ,Cooldown_Reduction: 12
        ,Title: "Tactical OPS Helmet\n\nDefense +15\nMax HP +120\nAttack Speed +25%\nCooldown Reduction +12%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Head"
        ,Name: "Helm_of_Banneret"
        ,Defense: 28
        ,Max_SP: 200
        ,Movement_Speed: 0.1
        ,Cooldown_Reduction: 8
        ,Skill_Damage_Reduction_Percent: 11
        ,Title: "Helm of Banneret\n\nDefense +28\nMax SP +200\nMovement Speed +0.1\nCooldown Reduction +8%\nSkill Damage Reduction +11%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Head"
        ,Name: "Imperial_Crown"
        ,Defense: 20
        ,Max_HP: 350
        ,Skill_Amplification_Percent: 10
        ,Title: "Imperial Crown\n\nDefense +20\nMax HP +350\nSkill Amplification +10%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Head"
        ,Name: "Imperial_Burgonet"
        ,Defense: 10
        ,Max_SP: 300
        ,Movement_Speed: 0.08
        ,Cooldown_Reduction: 8
        ,Skill_Amplification_Percent: 18
        ,Title: "Imperial Burgonet\n\nDefense +10\nMax SP +300\nMovement Speed +0.08\nCooldown Reduction +8%\nSkill Amplification +18%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Head"
        ,Name: "Chinese_Opera_Mask"
        ,Defense: 10
        ,Max_SP: 300
        ,Movement_Speed: 0.2
        ,Life_Steal: 22
        ,Movement_speed_while_not_in_combat: 0.3
        ,Title: "Chinese Opera Mask\n\nDefense +10\nMax SP +300\nMovement Speed +0.2\nLife Steal +22%\nMovement speed while not in combat +0.3"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Head"
        ,Name: "Laurel_Wreath"
        ,Defense: 20
        ,Max_SP: 580
        ,HP_Regen: 2
        ,SP_Regen: 2
        ,Extra_Normal_Attack_Damage: 21
        ,Title: "Laurel Wreath\n\nDefense +20\nMax SP +580\nHP Regen +2\nSP Regen +2\nExtra Normal Attack Damage +21"
        ,Rarity: "Legendary"
    }
    ,{
         Type: "Head"
        ,Name: "Elysian_Halo"
        ,Attack_Power:35
        ,Defense: 30
        ,Max_SP: 300
        ,Critical_Damage_Reduction: 8
        ,Title: "Elysian Halo\n\nAttack Power +35\nDefense +30\nMax SP +300\nCritical Damage Reduction +8%"
        ,Rarity: "Legendary"
    }
];
