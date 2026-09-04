const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");







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








//create api
app.get("/" ,(req, res) =>{
    res.send("route is workin");
});


app.get("/testListing", async(req,res) =>{
    let sampleListing = new Listing({
        title: "my new villa",
        description: "by the beach",
        price: 15000,
        location: "ghaziabad",
        country: "india"
    });
    await sampleListing.save();
    console.log("saple was saved");
    res.send("successful testing");
});

//create a server
app.listen(8080 ,() => {
    console.log("server is listen to port");
});