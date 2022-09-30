const mongoose = require("mongoose");

const SkillBadges = mongoose.model('SkillBadges', new mongoose.Schema({
  badgeURL: String,
}));

exports.SkillBadges = SkillBadges;