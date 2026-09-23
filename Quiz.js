const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  questions: [{
    question: String,
    options: [String],
    answer: Number
  }]
});
module.exports = mongoose.model("Quiz", quizSchema);