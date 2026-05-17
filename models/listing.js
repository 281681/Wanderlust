const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    category:{
        type:String,
        required:true,
    },
    image: {
        // type: String,
        // default: "https://t3.ftcdn.net/jpg/03/22/06/68/360_F_322066808_CANrp7u5Cdiz7700TJReqKD299d2AZtD.jpg",
        // set: (v) =>
        //     v === ""
        //         ? "https://t3.ftcdn.net/jpg/03/22/06/68/360_F_322066808_CANrp7u5Cdiz7700TJReqKD299d2AZtD.jpg"
        //         : v,
        filename: {
            type: String,
            default: "default-image"
        },
        url: {
            type: String,
            default: "https://t3.ftcdn.net/jpg/03/22/06/68/360_F_322066808_CANrp7u5Cdiz7700TJReqKD299d2AZtD.jpg"
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews:
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            }
        ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },    
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews }});
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;