import express from "express";
import mysql from "mysql";
import cors from "cors";
const app= express();
const db= mysql.createConnection({host: "localhost", user:"root", password:"Ved@1234", database:"technical_course_db"});
db.connect((err)=>{
    if(err)
    {
        console.log(err+"error while connecting to db");
    }
    else
    {
        console.log("db is connected successfully");
    }
})

app.use(express.json());//for allowing incomeing data in json formate
app.use(cors());//this will allow accessing backend api by frontend;
app.get("/",(req,res)=>{
    res.json("hello this is our backend server");
})
//finding all the course info from server
app.get("/courses",(req,res)=>{
    const q="select * from  course";
    db.query(q,(err, data)=>{
        if(err) return res.json("error occured"+err);
        return res.json(data);
    })
})
//putting login info into the server
app.post("/register",(req,res)=>{
    const q= "Insert INTO user_info (`name`,`email`, `marks_10`,`marks_12`,`marks_aptitude`, `marks_computer`,`occupation`) values (?)";
    const values=[req.body.name,req.body.email,req.body.marks_10,req.body.marks_12,req.body.marks_aptitude,req.body.marks_computer,req.body.occupation];
    db.query(q,[values],(err, data)=>{
        if(err) return res.json(err);
        return res.json("data has been sent successfully");
    })
})
//getting user info
app.get("/get_user_info",(req,res)=>{
    const q="select * from user_info";
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.listen(8800,(err)=>{
    if(err) console.log("error while listening");
    console.log("server is running ");
})
