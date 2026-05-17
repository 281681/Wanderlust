const express=require("express");
const router=express.Router({mergeParams:true});

const wrapAsync = require("../util/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isreviewAuthor}= require("../middleware.js")
const reviewController=require("../controllers/reviews.js")


// const validateReview=(req,res,next)=>{
//     let {error}=reviewSchema.validate(req.body);
//     if(error){
//         let errmsg = error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,error);
//     }
//     else{
//         next()
//     }
// }

//Reviews post route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Reviews delete route
router.delete("/:reviewId",isLoggedIn,isreviewAuthor,reviewController.deleteReview)
module.exports=router;



// const express=require("express");
// const router=express.Router({mergeParams:true});

// const wrapAsync = require("../util/wrapAsync.js");
// const Review = require("../models/review.js");
// const Listing = require("../models/listing.js");
// const {validateReview,isLoggedIn,isreviewAuthor}= require("../middleware.js")


// // const validateReview=(req,res,next)=>{
// //     let {error}=reviewSchema.validate(req.body);
// //     if(error){
// //         let errmsg = error.details.map((el)=>el.message).join(",");
// //         throw new ExpressError(400,error);
// //     }
// //     else{
// //         next()
// //     }
// // }

// //Reviews post route
// router.post("/",isLoggedIn, validateReview, wrapAsync(async(req,res)=>{
//      let listing= await Listing.findById(req.params.id);
//      let newReview = new Review(req.body.review);
//      newReview.author=req.user._id;
//      console.log(newReview);

//      listing.reviews.push(newReview);

//      await newReview.save();
//      await listing.save();

//      console.log("new review was saved");
//      req.flash("success","New Review Created!");
//      res.redirect(`/listings/${listing._id}`);
// }));

// //Reviews delete route
// router.delete("/:reviewId",isLoggedIn,isreviewAuthor,async(req,res)=>{
//     let {id,reviewId}=req.params;
//     console.log(reviewId);
//     await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     req.flash("success","Review Deleted!");
//     res.redirect(`/listings/${id}`);
// })
// module.exports=router;