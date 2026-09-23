const router = require("express").Router();
const Assignment = require("../models/Assignment");
router.get("/", async (req,res)=>{ try { res.json(await Assignment.find().populate("courseId")); } catch(e){res.status(500).json({message:e.message});}});
router.post("/", async (req,res)=>{ try { res.status(201).json(await Assignment.create(req.body)); } catch(e){res.status(400).json({message:e.message});}});
module.exports = router;