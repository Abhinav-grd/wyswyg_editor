var express= require("express");
var app =express();
var bodyParser  =require("body-parser");
var mongoose    =require("mongoose");

// For Heroku
require('dotenv').config();

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("Connected to DB !!");
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}

InitiateMongoServer();

app.set("view engine","ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


var docSchema=new mongoose.Schema({
    content:String
});

//model formation
var Doc= mongoose.model("Doc",docSchema);


app.get("/",function(req, res){
    res.render("index");
});

app.post("/docs/save",function(req, res){
    var new_doc=req.body;
    Doc.create(new_doc, function(err,newly_created){
        if(err)
        console.log(err);
        else{
        var red_url="/docs/"+newly_created.id;
        res.send(red_url);
    }
    });
});

app.post("/docs/update",function(req, res){
    console.log(req.body);
    var update_data={
        content:req.body.content
    };
    Doc.findOneAndUpdate({_id:req.body.id},update_data,{new: true},function(err,updated_doc){
        if(err){
        console.log("error");
        }
        else{
        // console.log(updated_doc);
        res.send("success");
    }
    });
});

app.get("/docs/:id",function(req,res){
    
    Doc.findById(req.params.id,function(err,matched_doc){
        if(err){
            res.send("Document not found");
        }
        else{
            // console.log(matched_doc);
            res.render("preview",{doc:matched_doc});
        }
    });
});

app.listen(process.env.PORT || 3000,function(){
    console.log(" Server Started!!....");
});