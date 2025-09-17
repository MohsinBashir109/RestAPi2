import express from "express";
import users from "./MOCK_DATA.json" with { type: "json" };;
// what if the server is hybird app.get('/users',(req,res)=>{
//   const html =`
//   <ul>
//   ${users.map((users)=><li>FirstName :{users.first_name} </li>).join("")}
//   </ul>
//   `
//   return res.send(html)
// })

const PORT = 8000;

const app = express();
app.get("/api/users", (req, res) => {
  return res.json(users);
  
});
// to get a particular user 
// : for dynamic paraneters 
//.json for thw responce in json 

app.get('/api/users/:id',(req,res)=>{
  const id = Number(req.params.id);
  const user = users.find(user=>user.id===id);
  return res.json(user)
  
});
app.get('/api/users/name/:first_name',(req,res)=>{
  const first_name = req.params.first_name;
  const user = users.find(user=>user.first_name === first_name);
   if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
});
app.post('/api/users',(req,res)=>{
  //TODO : create user 
  res.json({status : 'pending'}) 

});
app.patch('/api/users/:id',(req,res)=>{
  //TODO :  edit user data with id 
  res.json({status : 'pending'}) 

});
app.delete('/api/users/:id',(req,res)=>{
  //TODO :  delete user data with id 
  res.json({status : 'pending'}) 

});
app.listen(PORT, () => {
  console.log("started",);
});


