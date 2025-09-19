import { User } from "./models/user.js";
import { connected } from "./config/db.js";
import express from "express";
import fs from "fs";
import { routes } from "./Routes.js";

const PORT = 8000;
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connected();

app
  .route(routes.users)
  .get(async (req, res) => {
    const user = await User.find();
    return res.status(200).json({ msg: "success", user: user });
  })
  .post(async (req, res) => {
    const body = req.body;
    if (
      !body ||
      !body.email ||
      !body.first_name ||
      !body.last_name ||
      !body.gender ||
      !body.job_title
    ) {
      return res.status(400).json({ msg: "all field are require" });
    }

    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      res.status(409).json({ msg: "User with this email already exists" });
      //  console.log(userExist);
    }

    const result = await User.create({
      firstName: body?.first_name,
      lastName: body?.last_name,
      email: body?.email,
      jobTitle: body?.job_title,
      gender: body?.gender,
    });
    console.log("result", result);
    return res.status(201).json({ msg: "success" });
  });

app
  .route(routes.id)
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: "user Doesnot Exits" });
    }

    return res.status(200).json({ msg: " success", user: user });
  })
  .patch(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstName: "hamza",
    });
    if (!user) {
      return res.status(404).json({ msg: "user Doesnot Exits" });
    }

    return res.status(200).json({ msg: " success", user: user });
  })
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ status: "success" });
  });
app.get(routes.username, (req, res) => {
  const first_name = req.params.first_name;
  const user = users.find((user) => user.first_name === first_name);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
});
app.post(routes.users, (req, res) => {
  //TODO : create user
  res.json({ status: "pending" });
});
app;
app.listen(PORT, () => {
  console.log("started");
});

// users.push({...body,id : users.length + 1});
// fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error,data)=>{
//   res.json({status : 'succes' , id : users.length ,body : body })
// app.use((req,res,next)=>{
//   console.log("success");
//   req.myUserName = "Mohsin Bashir"
//   next();

// })
// app.use((req,res,next)=>{
//   console.log("My Name :",req.myUserName);
//   return res.end("ended")
// })
