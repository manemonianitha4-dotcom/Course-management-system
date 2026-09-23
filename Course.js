const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  category: { type: String, default: "General" },
  duration: { type: String, default: "6 weeks" },
  level: { type: String, default: "Beginner" },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Course", courseSchema);