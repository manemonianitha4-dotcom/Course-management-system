const router = require("express").Router();
const Quiz = require("../models/Quiz");
router.get("/", async (req,res)=>{ try { res.json(await Quiz.find().populate("courseId")); } catch(e){res.status(500).json({message:e.message});}});
router.post("/", async (req,res)=>{ try { res.status(201).json(await Quiz.create(req.body)); } catch(e){res.status(400).json({message:e.message});}});
module.exports = router;