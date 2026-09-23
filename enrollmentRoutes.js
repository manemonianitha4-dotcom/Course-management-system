const router = require("express").Router();
const Enrollment = require("../models/Enrollment");

router.post("/", async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const exists = await Enrollment.findOne({ userId, courseId });
    if (exists) return res.status(400).json({ message: "Already enrolled" });
    const enrollment = await Enrollment.create({ userId, courseId });
    res.status(201).json(enrollment);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const data = await Enrollment.find({ userId: req.params.userId }).populate("courseId");
    res.json(data);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put("/:id/progress", async (req, res) => {
  try {
    const value = Math.min(100, Math.max(0, Number(req.body.progress)));
    res.json(await Enrollment.findByIdAndUpdate(req.params.id, { progress: value }, { new: true }));
  } catch (e) { res.status(400).json({ message: e.message }); }
});

module.exports = router;