const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { SkillBadges } = require('../models/skillbadges');

router.get('/', async (req, res) =>{

// Skill Badges

var platformApprentice = "https://skillbadges.s3.ap-south-1.amazonaws.com/Platform/Collabera+Circle_Badge_Platform_Apprentice.png";
var platformCraftSmith = "https://skillbadges.s3.ap-south-1.amazonaws.com/Platform/Collabera+Circle_Badge_Platform_Craftsmith.png";
var platformArtisan = "https://skillbadges.s3.ap-south-1.amazonaws.com/Platform/Collabera+Circle_Badge_Platform_Artisan.png";
var platformMaster = "https://skillbadges.s3.ap-south-1.amazonaws.com/Platform/Collabera+Circle_Badge_Platform_Master.png";
var platformGrandMaster = "https://skillbadges.s3.ap-south-1.amazonaws.com/Platform/Collabera+Circle_Badge_Platform_Grandmaster.png";

var ExperienceApprentice = "https://skillbadges.s3.ap-south-1.amazonaws.com/Experience/Collabera+Circle_Badge_Experience_Apprentice.png";
var ExperienceCraftSmith = "https://skillbadges.s3.ap-south-1.amazonaws.com/Experience/Collabera+Circle_Badge_Experience_Craftsmith.png";
var ExperienceArtisan = "https://skillbadges.s3.ap-south-1.amazonaws.com/Experience/Collabera+Circle_Badge_Experience_Artisan.png";
var ExperienceMaster = "https://skillbadges.s3.ap-south-1.amazonaws.com/Experience/Collabera+Circle_Badge_Experience_Master.png";
var ExperienceGrandMaster = "https://skillbadges.s3.ap-south-1.amazonaws.com/Experience/Collabera+Circle_Badge_Experience_Grandmaster.png";

var CloudApprentice = "https://skillbadges.s3.ap-south-1.amazonaws.com/Cloud/Collabera+Circle_Badge_Cloud_Apprentice.png";
var CloudCraftSmith = "https://skillbadges.s3.ap-south-1.amazonaws.com/Cloud/Collabera+Circle_Badge_Cloud_Craftsmith.png";
var CloudArtisan = "https://skillbadges.s3.ap-south-1.amazonaws.com/Cloud/Collabera+Circle_Badge_Cloud_Artisan.png";
var CloudMaster = "https://skillbadges.s3.ap-south-1.amazonaws.com/Cloud/Collabera+Circle_Badge_Cloud_Master.png";
var CloudGrandMaster = "https://skillbadges.s3.ap-south-1.amazonaws.com/Cloud/Collabera+Circle_Badge_Cloud_Grandmaster.png";

var DataAndAIApprentice = "https://skillbadges.s3.ap-south-1.amazonaws.com/Data%26AI/Collabera+Circle_Badge_Data%26Ai_Apprentice.png";
var DataAndAICraftSmith = "https://skillbadges.s3.ap-south-1.amazonaws.com/Data%26AI/Collabera+Circle_Badge_Data%26Ai_Craftsmith.png";
var DataAndAIArtisan = "https://skillbadges.s3.ap-south-1.amazonaws.com/Data%26AI/Collabera+Circle_Badge_Data%26Ai_Artisan.png";
var DataAndAIMaster = "https://skillbadges.s3.ap-south-1.amazonaws.com/Data%26AI/Collabera+Circle_Badge_Data%26Ai_Master.png";
var DataAndAIGrandMaster = "https://skillbadges.s3.ap-south-1.amazonaws.com/Data%26AI/Collabera+Circle_Badge_Data%26Ai_Grandmaster.png";

var QualityEngineeringApprentice = "https://skillbadges.s3.ap-south-1.amazonaws.com/Quality+Engineering/Collabera+Circle_Badge_Quality+Engineering_Apprentice.png";
var QualityEngineeringCraftSmith = "https://skillbadges.s3.ap-south-1.amazonaws.com/Quality+Engineering/Collabera+Circle_Badge_Quality+Engineering_Craftsmith.png";
var QualityEngineeringArtisan = "https://skillbadges.s3.ap-south-1.amazonaws.com/Quality+Engineering/Collabera+Circle_Badge_Quality+Engineering_Artisan.png";
var QualityEngineeringMaster = "https://skillbadges.s3.ap-south-1.amazonaws.com/Quality+Engineering/Collabera+Circle_Badge_Quality+Engineering_Master.png";
var QualityEngineeringGrandMaster = "https://skillbadges.s3.ap-south-1.amazonaws.com/Quality+Engineering/Collabera+Circle_Badge_Quality+Engineering_Grandmaster.png";

var HelthTechApprentice = "https://skillbadges.s3.ap-south-1.amazonaws.com/Health+Tech/Collabera+Circle_Badge_Health+Tech_Apprentice.png";
var HelthTechCraftSmith = "https://skillbadges.s3.ap-south-1.amazonaws.com/Health+Tech/Collabera+Circle_Badge_Health+Tech_Craftsmith.png";
var HelthTechArtisan = "https://skillbadges.s3.ap-south-1.amazonaws.com/Health+Tech/Collabera+Circle_Badge_Health+Tech_Artisan.png";
var HelthTechMaster = "https://skillbadges.s3.ap-south-1.amazonaws.com/Health+Tech/Collabera+Circle_Badge_Health+Tech_Master.png";
var HelthTechGrandMaster = "https://skillbadges.s3.ap-south-1.amazonaws.com/Health+Tech/Collabera+Circle_Badge_Health+Tech_Grandmaster.png";

var Web3Apprentice = "https://skillbadges.s3.ap-south-1.amazonaws.com/Web3.0/Collabera+Circle_Badge_Web3.0_Apprentice.png";
var Web3CraftSmith = "https://skillbadges.s3.ap-south-1.amazonaws.com/Web3.0/Collabera+Circle_Badge_Web3.0_Craftsmith.png";
var Web3Artisan = "https://skillbadges.s3.ap-south-1.amazonaws.com/Web3.0/Collabera+Circle_Badge_Web3.0_Artisan.png";
var Web3Master = "https://skillbadges.s3.ap-south-1.amazonaws.com/Web3.0/Collabera+Circle_Badge_Web3.0_Master.png";
var Web3GrandMaster = "https://skillbadges.s3.ap-south-1.amazonaws.com/Web3.0/Collabera+Circle_Badge_Web3.0_Grandmaster.png";

var Objs = [platformApprentice, platformCraftSmith, platformArtisan, platformMaster, platformGrandMaster,
          ExperienceApprentice, ExperienceCraftSmith, ExperienceArtisan, ExperienceMaster, ExperienceGrandMaster,
          CloudApprentice, CloudCraftSmith, CloudArtisan, CloudMaster, CloudGrandMaster,
          DataAndAIApprentice, DataAndAICraftSmith, DataAndAIArtisan, DataAndAIMaster, DataAndAIGrandMaster,
          QualityEngineeringApprentice,QualityEngineeringCraftSmith, QualityEngineeringArtisan, QualityEngineeringMaster, QualityEngineeringGrandMaster,
          HelthTechApprentice, HelthTechCraftSmith, HelthTechArtisan, HelthTechMaster, HelthTechGrandMaster,
          Web3Apprentice, Web3CraftSmith, Web3Artisan, Web3Master, Web3GrandMaster]

var Names = ["platform Apprentice", "platform CraftSmith", "platform Artisan", "platform Master", "platform GrandMaster",
        "Experience Apprentice", "Experience CraftSmith", "Experience Artisan", "Experience Master", "Experience GrandMaster",
        "Cloud Apprentice", "Cloud CraftSmith", "Cloud Artisan", "Cloud Master", "Cloud GrandMaster",
        "DataAndAI Apprentice", "DataAndAI CraftSmith", "DataAndAI Artisan", "DataAndAI Master", "DataAndAI GrandMaster",
        "QualityEngineering Apprentice","QualityEngineering CraftSmith", "QualityEngineering Artisan", "QualityEngineering Master", "QualityEngineering GrandMaster",
        "HelthTech Apprentice", "HelthTech CraftSmith", "HelthTech Artisan", "HelthTech Master", "HelthTech GrandMaster",
        "Web3 Apprentice", "Web3 CraftSmith", "Web3 Artisan", "Web3 Master", "Web3 GrandMaster"]
// var result =[]

for (var i = 0; i < Objs.length; i++) {
let skillBadges = new SkillBadges({
  badgeURL: Objs[i],
  badgeName:Names[i]
  
});
// console.log(i)
skillBadges.save();

// result.push(skillBadges)
};
let result = await SkillBadges.find({ Objs});

console.log(result)
res.send(result)

});

module.exports = router; 

