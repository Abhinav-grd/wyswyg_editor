var express= require("express");
var app =express();
var bodyParser  =require("body-parser");
var mongoose    =require("mongoose");

mongoose.connect("mongodb://localhost:27017/wyswyg_editor", { useNewUrlParser: true });

app.set("view engine","ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


var docSchema=new mongoose.Schema({
    name:String,
    owner:String,
    content:String
});

//model fromation
var Doc= mongoose.model("Doc",docSchema);


app.get("/",function(req, res){
    res.render("index");
});



app.get('/docs',function(req,res){
    Doc.find(function(err ,docs){
        if(err)
            console.log(err);
        else 
        res.render("doc_list",{docs:docs});
    });
});


var num=1;
app.post("/docs",function(req, res){
    var new_doc=req.body;
    console.log(new_doc);
    if(req.body.name=="")
        new_doc.name="doc"+(num++);
    Doc.create(new_doc, function(err,newly_created){
        if(err)
        console.log(err);
        else{
        console.log("data saved in db");
        console.log(newly_created);
        res.redirect("/");
    }
    });
});


/*
app.get("/campgrounds/:id" ,function(req, res){
    Camp.findById(req.params.id,function(err ,matched_camp){
        if(err){
            console.log(err);
        }
        else{
            res.render("show" ,{camp:matched_camp});
        }
    });
    
})
*/

app.get("/docs/:name",function(req,res){
    Doc.find({name:req.params.name},function(err,matched_doc){
        if(err){
            console.log(err);
        }
        else{
            console.log(matched_doc);
            res.render("preview",{doc:matched_doc});
        }
    });
});
app.listen(process.env.PORT , process.env.IP ,function(){
    console.log(" Server Started!!....");
});