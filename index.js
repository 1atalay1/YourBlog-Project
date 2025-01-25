import express from "express";
import bodyParser from "body-parser";

const app=express();
const port=3000;
var topic=[];
var content=[];
var date=[];
var months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(port,()=>{
    console.log("Port is running");
});

app.get("/",(req,res)=>{
        res.render("index.ejs");

});
app.get("/create",(req,res)=>{
        res.render("create.ejs");
});

app.post("/submit",(req,res)=>{
    var valid_post=1;
    var day=new Date().getDate();
    var month=months[new Date().getMonth()];
    var year=new Date().getFullYear();
    var post_date=day+"/"+month+"/"+year
    const i_topic=req.body.topic;
    const i_content=req.body.content;
    if(i_topic.trim()==="" || i_content.trim()===""){
        valid_post=0;
    }
    else{
        topic.push(i_topic);
        content.push(i_content);
        date.push(post_date);
    }
    res.render("feedback.ejs",{
        state:valid_post,
        topic:i_topic
        
    });
});


app.get("/view",(req,res)=>{
        res.render("view.ejs",{
            topic:topic,
            content:content,
            date:date
        });
});

app.get("/update",(req,res)=>{
        res.render("update.ejs",{
            topic:topic,
            content:content,
            date:date
        });

});

app.post("/updatepost",(req,res)=>{
    const postID = req.body.postId;
    const i_topic=topic[postID];
    const i_content=content[postID];
    topic.splice(postID,1);
    content.splice(postID,1);
    date.splice(postID,1);
    
    res.render("create.ejs",{
            topic:i_topic,
            content:i_content
    });

});

app.post("/deletepost",(req,res)=>{
    const postID = req.body.postId;
    console.log(postID);
    topic.splice(postID,1);
    content.splice(postID,1);
    date.splice(postID,1);
    res.render("update.ejs",{
        topic:topic,
        content:content,
        date:date
    });
});