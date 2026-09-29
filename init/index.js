const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to Database");

        await initDB();

    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed");
    }
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);

    console.log("Data was initialized");
};

main();