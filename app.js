const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride  =require("method-override");
const ejsMate =require("ejs-mate");





//connect database 
 const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

 main().then(() => {
    console.log("connect to Database");
 }).catch ((err) => {
    console.log(err);
 });


async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views",path.join (__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));




//create api for testing
app.get("/" ,(req, res) =>{
    res.send("route is workin");
});

// index route
app.get("/listings" , async(req, res) => {
const allListings = await Listing.find({});
res.render("listings/index.ejs", {allListings}); 
});



//Create new listing with the help this route
app.get("/listings/new",(req, res) =>{
res.render("listings/new.ejs");
});


//show route
app.get("/listings/:id", async(req, res) =>{
   let{id}  = req.params;
   const listing = await Listing.findById(id);
   res.render("listings/show.ejs",{listing});
});


//add new listing data show in my main pages web
app.post("/listings", async(req, res) =>{
    const newListing = new Listing(req.body.listing);
    await newListing.save(); 
    res.redirect("/listings");
});


//Edit route
app.get("/listings/:id/edit", async(req, res) =>{
    let{id} =req.params;
    const listing =await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

//show update route
app.put("/listings/:id/", async(req, res) =>{
    let{id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listing/${id}`);
});


//delete route 

app.delete("/listings/:id", async (req, res) => {
    let{id} = req.params;
     deletedListing = await Listing.findByIdAndDelete(id);
     console.log(deletedListing);
     res.redirect("/listings"); 
});

//use for test listing 
// app.get("/testListing", async(req,res) =>{
//     let sampleListing = new Listing({
//         title: "my new villa",
//         description: "by the beach",
//         price: 15000,
//         location: "ghaziabad",
//         country: "india"
//     });
//     await sampleListing.save();
//     console.log("saple was saved");
//     res.send("successful testing");
//});

//create a server
app.listen(8080 ,() => {
    console.log("server is listen to port");
});