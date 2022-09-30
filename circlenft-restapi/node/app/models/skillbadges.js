const mongoose = require("mongoose");

const SkillBadges = mongoose.model('SkillBadges', new mongoose.Schema({
  badgeURL:{
    type: String
  } ,
  badgeName:{
    type:String
  }

}));

exports.SkillBadges = SkillBadges;