'use strict';
const Arm = [
    {
         Type: "Arm"
        ,Name: "Watch"
        ,Attack_Speed: 10
        ,Title: "Watch\n\nAttack Speed +10%"
        ,Rarity: "Common"
    }
    ,{
         Type: "Arm"
        ,Name: "Bandage"
        ,HP_Regen: 0.8
        ,Title: "Bandage\n\nHP Regen +0.8"
        ,Rarity: "Common"
    }
    ,{
         Type: "Arm"
        ,Name: "Bracelet"
        ,Max_SP: 220
        ,Title: "Bracelet\n\nMax SP +220"
        ,Rarity: "Common"
    }
    ,{
         Type: "Arm"
        ,Name: "Leather_Shield"
        ,Attack_Power: 8
        ,Defense: 12
        ,Title: "Leather Shield\n\nAttack Power +8\nDefense +12"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Arm"
        ,Name: "Squad_Leader_Armband"
        ,HP_Regen: 1.5
        ,Critical_Damage: 15
        ,Title: "Squad Leader Armband\n\nHP Regen +1.5\nCritical Damage +15%"
        ,Rarity: "Uncommon"
    }
    ,{
         Type: "Arm"
        ,Name: "Bracer"
        ,Defense: 13
        ,HP_Regen: 1
        ,Title: "Bracer\n\nDefense +13\nHP Regen +1"
        ,Rarity: "Uncommon"
    }
    ,{
        Type: "Arm"
       ,Name: "Broken_Watch"
       ,Cooldown_Reduction: 5
       ,Title: "Broken Watch\n\nCooldown Reduction +5%"
       ,Rarity: "Uncommon"
   }
    ,{
         Type: "Arm"
        ,Name: "Sheath"
        ,Attack_Power: 18
        ,Normal_Attack_Damage_Reduction: 2
        ,Title: "Sheath\n\nAttack Power +18\nNormal Attack Damage Reduction +2"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Arm"
        ,Name: "Golden_Bracelet"
        ,Max_SP: 220
        ,Skill_Amplification_Percent: 12
        ,Title: "Golden Bracelet\n\nMax SP +220\nSkill Amplification +12%"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Arm"
        ,Name: "Bazuband"
        ,Defense: 25
        ,Critical_Damage_Reduction: 6
        ,Normal_Attack_Damage_Reduction: 8
        ,Title: "Bazuband\n\nDefense +25\nCritical Damage Reduction + 6%\nNormal Attack Damage Reduction +8"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Arm"
        ,Name: "Crimson_Bracelet"
        ,Max_HP: 200
        ,Max_SP: 250
        ,Title: "Crimson Bracelet\n\nMax HP +200\nMax SP +250"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Arm"
        ,Name: "Steel_Shield"
        ,Attack_Power: 23
        ,Defense: 20
        ,Movement_Speed: -0.05
        ,Title: "Steel Shield\n\nAttack Power +23\nDefense +20\nMovement Speed -0.05"
        ,Rarity: "Rare"
    }
    ,{
         Type: "Arm"
        ,Name: "Sword_Stopper"
        ,Defense: 33
        ,Critical_Damage_Reduction: 8
        ,Normal_Attack_Damage_Reduction: 8
        ,Title: "Sword Stopper\n\nDefense +33\nCritical Damage Reduction + 8%\nNormal Attack Damage Reduction +8\nHealing Reduction (Normal Attacks) -40%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Arm"
        ,Name: "Draupnir"
        ,Defense: 10
        ,Max_SP: 240
        ,HP_Regen: 1
        ,Skill_Amplification_Percent: 17
        ,Title: "Draupnir\n\nDefense +10\nMax SP +240\nHP Regen +1\nSkill Amplification +17%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Arm"
        ,Name: "Mithril_Shield"
        ,Attack_Power: 30
        ,Defense: 30
        ,Attack_Speed: 12
        ,Movement_Speed: 0.1
        ,Title: "Mithril Shield\n\nAttack Power +30\nDefense +30\nAttack Speed +12%\nMovement Speed +0.1"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Arm"
        ,Name: "Vital_Sign_Sensor"
        ,Defense: 15
        ,Attack_Speed: 30
        ,Title: "Vital Sign Sensor\n\nDefense +15\nAttack Speed +30%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Arm"
        ,Name: "Creed_of_the_Knight"
        ,Attack_Power: 30
        ,Defense: 20
        ,HP_Regen: 1.5
        ,Movement_Speed: -0.03
        ,Critical_Damage: 25
        ,Title: "Creed pf the Knight\n\nAttack Power +30\nDefense +20\nHP Regen +1.5\nMovement Speed -0.03\nCritical Damage +25%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Arm"
        ,Name: "Sword_of_Shah_Jahan"
        ,Attack_Power: 30
        ,Max_HP: 300
        ,Normal_Attack_Damage_Reduction: 2
        ,Title: "Sword of Shah Jahan\n\nAttack Power +30\nMax HP +300\nNormal Attack Damage Reduction +2"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Arm"
        ,Name: "Cube_Watch"
        ,Defense: 20
        ,Attack_Speed: 50
        ,Cooldown_Reduction: 8
        ,Title: "Cube Watch\n\nDefense +20\nAttack Speed +50%\nCooldown Reduction +8%"
        ,Rarity: "Epic"
    }
    ,{
         Type: "Arm"
        ,Name: "Burnished_Aegis"
        ,Attack_Power: 8
        ,Defense: 12
        ,Max_HP: 320
        ,Max_SP: 250
        ,Title: "Burnished Aegis\n\nAttack Power +8\nDefense +12\nMax HP +320\nMax SP +250"
        ,Rarity: "Epic"
    }
    ,{
        Type: "Arm"
       ,Name: "Tindalos_Band"
       ,Skill_Amplification_Percent: 12
       ,Cooldown_Reduction: 12
       ,Title: "Tindalos Band\n\nCooldown Reduction +12%\nSkill Amplification +12%"
       ,Rarity: "Epic"
   }
    ,{
         Type: "Arm"
        ,Name: "Bracelet_of_Skadi"
        ,Max_HP: 200
        ,Max_SP: 250
        ,HP_Regen: 1.5
        ,SP_Regen: 1.5
        ,Skill_Amplification: 27
        ,Title: "Bracelet of Skadi\n\nMax HP +200\nMax SP +250\nHP Regen +1.5\nSP Regen +1.5\nSkill Amplification +27"
        ,Rarity: "Legendary"
    }
    ,{
         Type: "Arm"
        ,Name: "Radar"
        ,Defense: 15
        ,Attack_Speed: 40
        ,Critical_Strike_Chance: 24
        ,Title: "Radar\n\nDefense +15\nAttack Speed +40%\nCritical Strike Chance +24%"
        ,Rarity: "Legendary"
    }
    ,{
         Type: "Arm"
        ,Name: "Auto-arms"
        ,Attack_Power:45
        ,Defense: 35
        ,HP_Regen: 1
        ,Title: "Auto-arms\n\nAttack Power +45\nDefense +35\nHP Regen +1"
        ,Rarity: "Legendary"
    }
];
