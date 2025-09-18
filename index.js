import express from "express";
import users from "./MOCK_DATA.json" with { type: "json" };
import { routes } from "./Routes.js";
import fs from 'fs';
import { error } from "console";
const PORT = 8000;
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
// app.use((req,res,next)=>{
//   console.log("success");
//   req.myUserName = "Mohsin Bashir"
//   next();
  
// })
// app.use((req,res,next)=>{
//   console.log("My Name :",req.myUserName);
//   return res.end("ended")
// })

app.route(routes.users).get( (req, res) => {
  return res.json(users);
  
}).post((req,res)=>{
  const body =req.body;
  users.push({...body,id : users.length + 1});
  fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error,data)=>{
    res.json({status : 'succes' , id : users.length ,body : body }) 
  })
  console.log(body);
})

app.route(routes.id).get((req,res)=>{
  const id = Number(req.params.id);
  const user = users.find(user=>user.id===id);
   console.log(req.headers );
  return res.json(user)
}).patch((req,res)=>{
  //TODO :  edit user data with id 
  res.json({status : 'pending'}) 
}).delete((req,res)=>{
  //TODO :  delete user data with id 
  res.json({status : 'pending'}) 
});
app.get(routes.username,(req,res)=>{
  const first_name = req.params.first_name;
  const user = users.find(user=>user.first_name === first_name);
   if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
});
app.post(routes.users,(req,res)=>{
  //TODO : create user 
  res.json({status : 'pending'}) 
});
app
app.listen(PORT, () => {
  console.log("started", );
});


