import React,{useEffect,useState} from "react";
import {Routes,Route,Link,useNavigate} from "react-router-dom";
import {request} from "./api";

function Nav(){
 const nav=useNavigate(); const user=JSON.parse(localStorage.getItem("user")||"null");
 const logout=()=>{localStorage.removeItem("user");nav("/login")};
 return <nav><Link className="brand" to="/">CourseHub</Link><div className="links">
 <Link to="/courses">Courses</Link>{user&&<Link to="/dashboard">Dashboard</Link>}{user&&<Link to="/assignments">Assignments</Link>}
 {user?<><Link to="/profile">Profile</Link><button onClick={logout}>Logout</button></>:<><Link to="/login">Login</Link><Link to="/register">Register</Link></>}</div></nav>
}

function Layout({children}){return <><Nav/><main>{children}</main><footer>Smart Course Management System • MERN College Project</footer></>}

function Register(){
 const [f,setF]=useState({name:"",email:"",password:"",confirm:""});const [msg,setMsg]=useState("");const nav=useNavigate();
 const submit=async e=>{e.preventDefault();if(f.password!==f.confirm)return setMsg("Passwords do not match");try{await request("/users/register",{method:"POST",body:JSON.stringify(f)});nav("/login")}catch(e){setMsg(e.message)}};
 return <div className="auth card"><h1>Create Account</h1><p>Register as a student</p><form onSubmit={submit}>{["name","email","password","confirm"].map(k=><input key={k} type={k.includes("password")||k==="confirm"?"password":"text"} placeholder={k==="confirm"?"Confirm Password":k[0].toUpperCase()+k.slice(1)} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} required/>)}<button className="primary">Register</button></form>{msg&&<p className="error">{msg}</p>}<p>Already registered? <Link to="/login">Login</Link></p></div>
}

function Login(){
 const [f,setF]=useState({email:"",password:""});const [msg,setMsg]=useState("");const nav=useNavigate();
 const submit=async e=>{e.preventDefault();try{const d=await request("/users/login",{method:"POST",body:JSON.stringify(f)});localStorage.setItem("user",JSON.stringify(d.user));nav("/dashboard")}catch(e){setMsg(e.message)}};
 return <div className="auth card"><h1>Welcome Back</h1><p>Login to your course dashboard</p><form onSubmit={submit}><input type="email" placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})} required/><input type="password" placeholder="Password" value={f.password} onChange={e=>setF({...f,password:e.target.value})} required/><button className="primary">Login</button></form>{msg&&<p className="error">{msg}</p>}<p>New student? <Link to="/register">Create account</Link></p></div>
}

function Home(){return <section className="hero"><div><span className="pill">MERN COLLEGE PROJECT</span><h1>Learn. Practice.<br/><b>Grow.</b></h1><p>A modern course management platform for students to discover courses, enroll, complete assignments and track progress.</p><Link className="primary btn" to="/courses">Explore Courses</Link></div><div className="hero-card"><h3>Student Learning</h3><div className="stat">📚 Courses</div><div className="stat">📝 Assignments</div><div className="stat">🏆 Progress</div><div className="stat">🧠 Quizzes</div></div></section>}

function Courses(){
 const [courses,setCourses]=useState([]);const [q,setQ]=useState("");const user=JSON.parse(localStorage.getItem("user")||"null");
 useEffect(()=>{request("/courses").then(setCourses).catch(console.error)},[]);
 const enroll=async id=>{if(!user)return alert("Please login first");try{await request("/enrollments",{method:"POST",body:JSON.stringify({userId:user.id,courseId:id})});alert("Enrolled successfully")}catch(e){alert(e.message)}};
 const filtered=courses.filter(c=>(c.title+" "+c.category).toLowerCase().includes(q.toLowerCase()));
 return <><div className="page-head"><div><h1>Explore Courses</h1><p>Build skills with structured learning.</p></div><input className="search" placeholder="Search courses..." value={q} onChange={e=>setQ(e.target.value)}/></div><div className="grid">{filtered.map(c=><article className="course card" key={c._id}><div className="course-icon">📘</div><span className="tag">{c.category}</span><h2>{c.title}</h2><p>{c.description}</p><small>👨‍🏫 {c.instructor} • ⏱ {c.duration} • {c.level}</small><button className="primary" onClick={()=>enroll(c._id)}>Enroll Now</button></article>)}</div></>
}

function Dashboard(){
 const user=JSON.parse(localStorage.getItem("user")||"null");const [en,setEn]=useState([]);
 useEffect(()=>{if(user)request("/enrollments/user/"+user.id).then(setEn)},[]);
 if(!user)return <div className="card"><h2>Please login</h2><Link to="/login">Login</Link></div>;
 return <><div className="welcome"><div><p className="pill">STUDENT DASHBOARD</p><h1>Hello, {user.name} 👋</h1><p>Keep learning and complete your courses.</p></div><div className="big-number">{en.length}<small>Enrolled Courses</small></div></div><h2>Your Learning</h2><div className="grid">{en.length?en.map(e=><article className="card" key={e._id}><span className="tag">{e.courseId.category}</span><h2>{e.courseId.title}</h2><p>{e.courseId.description}</p><div className="progress"><i style={{width:e.progress+"%"}}/></div><p>{e.progress}% completed</p></article>):<div className="card"><p>No courses yet. <Link to="/courses">Explore courses</Link></p></div>}</div></>
}

function Assignments(){
 const [a,setA]=useState([]);useEffect(()=>{request("/assignments").then(setA)},[]);
 return <><h1>Assignments</h1><p>Practice tasks for your enrolled courses.</p><div className="grid">{a.map(x=><article className="card" key={x._id}><span className="tag">{x.courseId?.title}</span><h2>{x.title}</h2><p>{x.description}</p><p>📅 Due: {x.dueDate}</p><button className="primary" onClick={()=>alert("Submission UI demo: connect this button to a file-upload API for your final deployment.")}>Submit Assignment</button></article>)}</div></>
}

function Profile(){
 const u=JSON.parse(localStorage.getItem("user")||"null");return <div className="profile card"><div className="avatar">{u?.name?.[0]?.toUpperCase()}</div><h1>{u?.name}</h1><p>{u?.email}</p><p className="tag">Student Account</p></div>
}

function App(){return <Layout><Routes><Route path="/" element={<Home/>}/><Route path="/register" element={<Register/>}/><Route path="/login" element={<Login/>}/><Route path="/courses" element={<Courses/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="/assignments" element={<Assignments/>}/><Route path="/profile" element={<Profile/>}/></Routes></Layout>}
export default App;