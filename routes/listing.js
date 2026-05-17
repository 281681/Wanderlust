const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Listing = require("../models/listing.js");
const wrapAsync = require("../util/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js")
const multer = require("multer");
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage });
// import {index} from "../controllers/listings.js"

// const validateListing = (req, res, next) => {
//     let { error } = listingSchema.validate(req.body);
//     if (error) {
//         let errmsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, error);
//     }
//     else {
//         next()
//     }
// }

router.get("/search", async (req, res) => {
    let allListings = await Listing.find({});
    const { search } = req.query;
    allListings = allListings.filter((item) => item.location.toLowerCase().includes(search.toLowerCase()));
    res.render("listings/index.ejs", { allListings });
})
router.get("/filter", async (req, res) => {
    let allListings = await Listing.find({});
    const category = req.query.category;
    if (category) {
        allListings = allListings.filter(item =>
            item.category.toLowerCase().includes(category.toLowerCase())
        );
        console.log("object");
    }

    // now send/render allListings safely
    res.render("listings", { allListings });
/////////////////////////////////////////////
  // get selected categories from query (can be one or multiple)
//   let selectedCategories = req.query.category; 

//   // make it an array if it's a single string
//   if (selectedCategories && !Array.isArray(selectedCategories)) {
//     selectedCategories = [selectedCategories];
//   }

//   if (selectedCategories) {
//     allListings = allListings.filter(listing =>
//       listing.category.some(cat =>
//         selectedCategories.includes(cat.toLowerCase())
//       )
//     );
//   }

//   res.render("listings", { allListings });
});



//index route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router
    .route("/:id")
    //show route
    .get(listingController.showListing)
    //update route/edit
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, listingController.updateListing)
    .delete(isLoggedIn, isOwner, listingController.deleteListing);

// //new route
// router.get("/new", isLoggedIn, listingController.renderNewForm);

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);




validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        req.flash("error", "Invalid Listing ID");
        return res.redirect("/listings");
    }
    next();
};
//delete route
// router.delete("/:id",isLoggedIn,validateObjectId ,isOwner, async (req, res) => {
//     console.log("fuck");
//     let { id } = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     req.flash("success", "Listing Deleted!");
//     res.redirect("/listings");
// });
module.exports = router;




















// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");

// const Listing = require("../models/listing.js");
// const wrapAsync = require("../util/wrapAsync.js");
// const { listingSchema, reviewSchema } = require("../schema.js");
// const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");


// // const validateListing = (req, res, next) => {
// //     let { error } = listingSchema.validate(req.body);
// //     if (error) {
// //         let errmsg = error.details.map((el) => el.message).join(",");
// //         throw new ExpressError(400, error);
// //     }
// //     else {
// //         next()
// //     }
// // }

// router.delete("/:id",isLoggedIn ,isOwner, async (req, res) => {
//     console.log("fuck");
//     let { id } = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     req.flash("success", "Listing Deleted!");
//     res.redirect("/listings");
// });

// //index route
// router.get("/", async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
// });

// //new route
// router.get("/new",isLoggedIn,(req, res) => {
//     // console.log(req.user);
//     // if(!req.isAuthenticated()){
//     //     req.flash("error", "you must be logged in to create listing");
//     //     return res.redirect("/user/login");
//     // }
//     res.render("listings/new.ejs");
// });


// //show route
// router.get("/:id", async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id)
//            .populate({
//             path:"reviews",
//             populate:{
//                 path:"author",
//             }
//             })
//             .populate("owner");
//     if (!listing) {
//         req.flash("error", " Listing you requested for does not exist");
//          return res.redirect("/listings");
//     }
//     console.log(listing);
//     res.render("listings/show.ejs", { listing });
// });

// //create route
// // Express 5 does catch errors thrown in async route handlers automatically — in theory.
// // But sometimes, depending on how your code is structured, if an error is thrown synchronously or
// //  inside a callback or validation (like Joi validation), Express may not catch it properly, leading to your app crashing.
// router.post("/",isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {//isloggedIn likhne baad hum hoppscotch se direct data nhi bhej skte hume phle loggedin hona padega
//     // (let result=listingSchema.validate(req.body); Joi validation(Joi ne individual fields ke uppar validation lga diya without written contional statement for every field)
//     // console.log(result);
//     // if(result.error){
//     //     throw new ExpressError(400,result.error);
//     // }
//     // if (!req.body.listing) {    //this loop only run when we have not listing object but we can send listing(only with few fields) from hoppscotch by request so we need server-side-validations
//     //     throw new ExpressError(400, "send valid data for listing");
//     // })=> iske liye middleware bna diya "validateListing""
//     //let {title,description,image,price,location,country}=req.body;
//     // let listing=req.body;(yha par listing ek javascript object h )
//     //let listing= req.body.listing;

//     // const newListing = new Listing(req.body.listing); The image `src` was empty in this case because `listing.image`
//     // was a string, not an object, so `listing.image.url` returned `undefined`. As a result, the image tag became
//     // `<img src="">`, which doesn't load anything. You should either use `listing.image` directly or store `image`
//     //  as an object with a `url` field.
//     // try {
//     const { title, description, image, price, location, country } = req.body.listing;
//     const newListing = new Listing({
//         title,
//         description,
//         price,
//         location,
//         country,
//         image,
//     });
//      // ek ek feild ko validate karna tds task h so we use Joi package for schema validation
//     // if (!newListing.title) {
//     //     throw new ExpressError(400, "title is not present");
//     // }
//     // if (!newListing.description) {
//     //     throw new ExpressError(400, "description is not present");
//     // }
//     // if (!newListing.country) {
//     //     throw new ExpressError(400, "country is not present");
//     // }
//     newListing.owner=req.user._id;
//     await newListing.save();
//     req.flash("success", "New Listing Created!");
//     res.redirect("/listings");
//     // }
//     // catch (err) {
//     //     next(err);
//     // }
// }));

// //edit route
// router.get("/:id/edit",isLoggedIn,isOwner, async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error", " Listing you requested for does not exist");
//         return res.redirect("/listings");
//     }
//     res.render("listings/edit.ejs", { listing });

// });

// //update route/edit
// router.put("/:id",isLoggedIn,isOwner, validateListing, async (req, res) => {
//     // if (!req.body.listing) {
//     //     throw new ExpressError(400, "send valid data for listing");
//     // }
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     req.flash("success", "Listing Updated!");
//     res.redirect("/listings");
//     //res.redirect(`/listings/${id}`);(to redirect on show page)
// });

// validateObjectId = (req, res, next) => {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         req.flash("error", "Invalid Listing ID");
//         return res.redirect("/listings");
//     }
//     next();
// };
// //delete route
// // router.delete("/:id",isLoggedIn,validateObjectId ,isOwner, async (req, res) => {
// //     console.log("fuck");
// //     let { id } = req.params;
// //     let deletedListing = await Listing.findByIdAndDelete(id);
// //     console.log(deletedListing);
// //     req.flash("success", "Listing Deleted!");
// //     res.redirect("/listings");
// // });
// module.exports = router;