const router = require("express").Router();
const Course = require("../models/Course");

router.get("/", async (req, res) => {
  try { res.json(await Course.find().sort({ createdAt: -1 })); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get("/:id", async (req, res) => {
  try { res.json(await Course.findById(req.params.id)); }
  catch (e) { res.status(404).json({ message: "Course not found" }); }
});

router.post("/", async (req, res) => {
  try { res.status(201).json(await Course.create(req.body)); }
  catch (e) { res.status(400).json({ message: e.message }); }
});

router.put("/:id", async (req, res) => {
  try { res.json(await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (e) { res.status(400).json({ message: e.message }); }
});

router.delete("/:id", async (req, res) => {
  try { await Course.findByIdAndDelete(req.params.id); res.json({ message: "Course deleted" }); }
  catch (e) { res.status(400).json({ message: e.message }); }
});

module.exports = router;