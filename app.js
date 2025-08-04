const express = require("express")
const app= express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
} 
main()
.then(()=>{
    console.log("connection successful")
})
.catch((err)=>{
    console.log("err");
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    console.log("hi, i am root")
    res.send("hi,i am root");
});

// app.get("/testListing",async (req,res)=>{
//     const sampleListing = new Listing({
//         title:"my new villa",
//         description:"by the beach",
//         price:"12000",
//         location:"Calangute,Goa",
//         country:"India",
//     });

//     await sampleListing.save();
//     console.log("ddata was saved");
//     res.send("successful testing");  
// });

//index route
app.get("/listings",async (req,res)=>{
     const allListings= await Listing.find({}) ;
     res.render("listings/index.ejs",{allListings});
});

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});


//show route
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//create route
app.post("/listings",async (req,res)=>{
    //let {title,description,image,price,location,country}=req.body;
   // let listing=req.body;(yha par listing ek javascript object h )
    //let listing= req.body.listing;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
   res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

})

//update route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
    //res.redirect(`/listings/${id}`);(to redirect on show page)
});

//delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

app.listen(8080,()=>{
    console.log("Listening to port 8080");
});