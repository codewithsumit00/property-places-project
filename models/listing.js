const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";

const listingSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },

    image: {
        type: String,
        default: DEFAULT_IMAGE,
        set: (value) => {
            return value === "" ? DEFAULT_IMAGE : value;
        },
    },

    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [1, "Price must be greater than 0"],
    },

    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
    },

    country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
    },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;