const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/ListDB",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
if(err)
console.log(err);
else{    
console.log(mongoose.connection.readyState);
console.log("connected");
}
})
const ListSchema=new mongoose.Schema({
    name:String
})
const item=new mongoose.model("Item",ListSchema);
var currenttime=date.getDay();
app.use(express.static("public"));
app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.listen("3000",(req,res)=>{
    console.log("Server started");
});
const Custom=new mongoose.Schema({
    customtitle:String,
    defaultitems:[ListSchema]
})
const customtable=new mongoose.model("Customtable",Custom);
app.post("/delete",(req,res)=>{
    let id=req.body.checkbox;
    item.deleteOne({_id:id},(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("deleted");
        }
    })
    res.redirect("/");
})
app.get("/",(req,res)=>{
    item.find({},(err,result)=>{
  //      console.log(result);
        res.render("list",{heading:currenttime,item:result});
    })  
   })
app.post("/",(req,res)=>{
    const newitem=req.body.items;
    console.log(newitem);
    const head=req.body.b;
    // console.log(head);
    const item1=new item({
        name:newitem 
      })
    //   console.log(currenttime);
    if(head===currenttime){
          item1.save();
          res.redirect("/");          
    }
    else{
    customtable.findOne({customtitle:head},(err,citem)=>{
       console.log(citem.defaultitems);
        citem.defaultitems.push(item1);
        citem.save();
    res.redirect("/"+head);
    }) 
    }
    })
app.get("/:list",(req,res)=>{
    const listname=req.params.list;
    customtable.findOne({customtitle:listname},(err,result)=>{
    //    console.log(result);
        if(!result){
            const custom1=new customtable({
                customtitle:listname,
                defaultitems:[]
            });
            custom1.save();
            res.redirect("/"+listname);
              }
              else{
                  res.render("list",{heading:result.customtitle,item:result.defaultitems} )
              }
    })
});
// app.get("/work",(req,res)=>{
//     res.render("list",{item:worklist,heading:"worklist"})
// })
