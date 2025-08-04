const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        // type: String,
        // default: "https://pixabay.com/photos/man-graffiti-urban-city-scene-7260571/",
        // set: (v) =>
        //     v === ""
        //         ? "https://pixabay.com/photos/man-graffiti-urban-city-scene-7260571/"
        //         : v,
        filename: {
            type: String,
            default: "default-image"
        },
        url: {
            type: String,
            default: "https://pixabay.com/photos/man-graffiti-urban-city-scene-7260571/"
        }
    },
    price: Number,
    location: String,
    country: String,

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;