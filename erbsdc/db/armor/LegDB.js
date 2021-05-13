'use strict';
const Leg = [
    {
         Type: "Leg"
        ,Name: "Slippers"
        ,SP_Regen: 0.5
        ,Movement_Speed: 0.04
        ,Title: "Slippers\n\nSP Regen +0.5\nMovement Speed +0.04"
        ,Rarity: "Common"
    }
    ,{
         Type: "Leg"
        ,Name: "Running_Shoes"
        ,Movement_Speed: 0.08
        ,Title: "Running Shoes\n\nMovement Speed +0.08"
        ,Rarity: "Common"
    }
    ,{
         Type: "Leg"
        ,Name: "Tights"
        ,Defense: 5
        ,Movement_Speed: 0.04
        ,Title: "Tights\n\nDefense +5\nMovement Speed +0.04"
        ,Rarity: "Common"
    }
    ,{
         Type: "Leg"
        ,Name: "Knee_Pads"
        ,Defense: 8
        ,Movement_Speed: 0.16
        ,Title: "Knee Pads\n\nDefense +0.8\nMovement Speed +0.16"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Leg"
        ,Name: "Chain_Leggings"
        ,Defense: 10
        ,Movement_Speed: 0.14
        ,Title: "Chain Leggings\n\nDefense +10\nMovement Speed +0.14"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Leg"
        ,Name: "High_Heels"
        ,SP_Regen: 0.8
        ,Movement_Speed: 0.17
        ,Title: "High Heels\n\nSP Regen +0.8\nMovement Speed +0.17"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Leg"
        ,Name: "Heelys"
        ,Movement_Speed: 0.09
        ,Movement_speed_while_not_in_combat: 0.2
        ,Title: "Heelys\n\nMovement Speed +0.09\nMovement speed while not in combat +0.2"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Leg"
        ,Name: "Repaired_Slippers"
        ,SP_Regen: 0.5
        ,SP_Regen_Percent: 30
        ,Movement_Speed: 0.16
        ,Title: "Repaired Slippers\n\nSP Regen +0.5\nSP Regen +30%\nMovement Speed +0.16"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Leg"
        ,Name: "Boots"
        ,HP_Regen: 0.6
        ,Attack_Speed: 2
        ,Movement_Speed: 0.22
        ,Title: "Boots\n\nHP Regen +0.6\nAttack Speed +2%\nMovement Speed +0.22"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Leg"
        ,Name: "Steel_Knee_Pads"
        ,Defense: 20
        ,Movement_Speed: 0.24
        ,Title: "Steel Knee Pads\n\nDefense +20\nMovement Speed +0.24"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Leg"
        ,Name: "Maverick_Runner"
        ,Attack_Power: -8
        ,Movement_Speed: 0.35
        ,Movement_speed_while_not_in_combat: 0.25
        ,Title: "Maverick Runner\n\nAttack Power -8\nMovement Speed +0.35\nMovement Speed while not in combat +0.25"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Leg"
        ,Name: "Combat_Boots"
        ,HP_Regen: 0.6
        ,Attack_Speed: 7
        ,Movement_Speed: 0.27
        ,Title: "Combat Boots\n\nHP Regen +0.6\nAttack Speed +7%\nMovement Speed +0.27"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Leg"
        ,Name: "Killer_Heels"
        ,Attack_Power: 5
        ,SP_Regen: 0.8
        ,Movement_Speed: 0.18
        ,Critical_Strike_Chance: 10
        ,Title: "Killer Heels\n\nAttack Power +5\nSP Regen +0.8\nMovement Speed +0.18\nCritical Strike Chance +10%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Leg"
        ,Name: "Feather_Boots"
        ,HP_Regen: 1
        ,Attack_Speed: 35
        ,Movement_Speed: 0.4
        ,Title: "Feather Boots\n\nHP Regen +1\nAttack Speed +35%\nMovement Speed +0.4"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Leg"
        ,Name: "Straitjacket_Sneakers"
        ,SP_Regen: 0.5
        ,SP_Regen_Percent: 50
        ,Movement_Speed: 0.33
        ,Skill_Amplification: 14
        ,Title: "Straitjacket Sneakers\n\nSP Regen +0.5\nSP Regen +50%\nMovement Speed +0.33\nSkill Amplification +14"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Leg"
        ,Name: "Mithril_Boots"
        ,Defense: 18
        ,Attack_Speed: 12
        ,Movement_Speed: 0.5
        ,Title: "Mithril Boots\n\nDefense +18\nAttack Speed +12%\nMovement Speed +0.5"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Leg"
        ,Name: "Bucephalus"
        ,Attack_Power: 10
        ,Defense: 10
        ,SP_Regen: 1
        ,Movement_Speed: 0.33
        ,Critical_Strike_Chance: 15
        ,Title: "Bucephalus\n\nAttack Power +10\nDefense +10\nSP Regen +1\nMovement Speed +0.33\nCriticall Strike Chance +15%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Leg"
        ,Name: "White_Rhinos"
        ,HP_Regen: 0.7
        ,Attack_Speed: 15
        ,Movement_Speed: 0.35
        ,Title: "White Rhinos\n\nHP Regen +0.7\nAttack Speed +15%\nMovement Speed +0.35\nHealing Reduction (Normal Attacks) -40%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Leg"
        ,Name: "Tachyon_Brace"
        ,Defense: 15
        ,Movement_Speed: 0.38
        ,Cooldown_Reduction: 10
        ,Title: "Tachyon Brace\n\nDefense +15\nMovement Speed +0.38\nCooldown Reduction +10%"
        ,Rarity: "Epic"
   }
    ,{
         Type: "Leg"
        ,Name: "EOD_Boots"
        ,Defense: 20
        ,HP_Regen: 1
        ,SP_Regen: 0.5
        ,Movement_Speed: 0.35
        ,Title: "EOD Boots\n\nDefense +20\nHP Regen +1\nSP Regen +0.5\nMovement Speed +0.35\nTrap Damage Reduction (%) +8%"
        ,Rarity: "Legendary"
    }
    ,{
         Type: "Leg"
        ,Name: "Glacial_Shoes"
        ,HP_Regen: 1.5
        ,SP_Regen: 1.5
        ,SP_Regen_Percent: 60
        ,Movement_Speed: 0.3
        ,Movement_speed_while_not_in_combat: 0.35
        ,Skill_Amplification: 22
        ,Title: "Glacial Shoes\n\nHP Regen +1.5\nSP Regen +1.5\n SP Regen +60%\nMovement Speed +0.3\nMovement speed while not in combat +0.35\nSkill Amplification +22"
        ,Rarity: "Legendary"
    }
    ,{
         Type: "Leg"
        ,Name: "Boots_of_Hermes"
        ,Defense: 35
        ,Movement_Speed: 0.4
        ,Movement_speed_while_not_in_combat: 0.2
        ,Title: "Boots of Hermes\n\nDefense +35\nMovement Speed +0.4\nMovement speed while not in combat +0.2"
        ,Rarity: "Legendary"
    }
    ,{
         Type: "Leg"
        ,Name: "Red_Shoes"
        ,Attack_Power: 5
        ,SP_Regen: 1
        ,Movement_Speed: 0.4
        ,Critical_Strike_Chance: 15
        ,Life_Steal: 12
        ,Title: "Red Shoes\n\nAttack Power +5\nSP Regen +1\n Movement Speed +0.4\nCritical Strike Chance +15%\nLife Steal +12%"
        ,Rarity: "Legendary"
    }
];
