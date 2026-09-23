const mongoose = require("mongoose");
require("dotenv").config();
const Course = require("./models/Course");
const Assignment = require("./models/Assignment");
const Quiz = require("./models/Quiz");

async function seed(){
 await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/course_management");
 await Course.deleteMany({});
 const courses = await Course.insertMany([
  {title:"Full Stack Web Development",description:"Learn frontend, backend and database development.",instructor:"Dr. Priya",category:"Web Development",duration:"10 weeks",level:"Intermediate"},
  {title:"Python for Data Science",description:"Learn Python, data analysis and basic visualization.",instructor:"Prof. Rahul",category:"Data Science",duration:"8 weeks",level:"Beginner"},
  {title:"Database Management Systems",description:"Understand SQL, normalization, indexing and database design.",instructor:"Dr. Kiran",category:"DBMS",duration:"6 weeks",level:"Intermediate"}
 ]);
 await Assignment.deleteMany({});
 await Assignment.insertMany(courses.map((c,i)=>({courseId:c._id,title:`${c.title} Assignment ${i+1}`,description:"Complete the practical task and submit your solution.",dueDate:"2026-10-15"})));
 await Quiz.deleteMany({});
 await Quiz.create({courseId:courses[0]._id,title:"MERN Basics Quiz",questions:[
  {question:"What does M in MERN mean?",options:["MySQL","MongoDB","Microsoft","Markup"],answer:1},
  {question:"Which library is used for UI?",options:["React","Express","MongoDB","Node"],answer:0}
 ]});
 console.log("Sample data inserted");
 await mongoose.disconnect();
}
seed().catch(e=>{console.error(e);process.exit(1)});