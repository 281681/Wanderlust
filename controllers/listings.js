const Listing = require("../models/listing")


module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.deleteListing=async (req, res) => {
    // console.log("luck");
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

module.exports.renderNewForm=(req, res) => {
    // console.log(req.user);
    // if(!req.isAuthenticated()){
    //     req.flash("error", "you must be logged in to create listing");
    //     return res.redirect("/user/login");
    // }
    res.render("listings/new.ejs");
};

module.exports.showListing= async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
           .populate({
            path:"reviews",
            populate:{
                path:"author",
            }
            })
            .populate("owner");
    if (!listing) {
        req.flash("error", " Listing you requested for does not exist");
         return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing=async (req, res, next) => {//isloggedIn likhne baad hum hoppscotch se direct data nhi bhej skte hume phle loggedin hona padega
    // (let result=listingSchema.validate(req.body); Joi validation(Joi ne individual fields ke uppar validation lga diya without written contional statement for every field)
    // console.log(result);
    // if(result.error){
    //     throw new ExpressError(400,result.error);
    // }
    // if (!req.body.listing) {    //this loop only run when we have not listing object but we can send listing(only with few fields) from hoppscotch by request so we need server-side-validations
    //     throw new ExpressError(400, "send valid data for listing");
    // })=> iske liye middleware bna diya "validateListing""
    //let {title,description,image,price,location,country}=req.body;
    // let listing=req.body;(yha par listing ek javascript object h )
    //let listing= req.body.listing;

    // const newListing = new Listing(req.body.listing); The image `src` was empty in this case because `listing.image` 
    // was a string, not an object, so `listing.image.url` returned `undefined`. As a result, the image tag became 
    // `<img src="">`, which doesn't load anything. You should either use `listing.image` directly or store `image`
    //  as an object with a `url` field.
    // try {
    const url=req.file.path;
    const filename=req.file.filename;

    const newListing =new Listing(req.body.listing);               // 1const { title, description, image, price, location, country } = req.body.listing;
                     //2const newListing = new Listing({ title, description, image, price, location, country });
     // ek ek feild ko validate karna tds task h so we use Joi package for schema validation
    // if (!newListing.title) {
    //     throw new ExpressError(400, "title is not present");
    // }
    // if (!newListing.description) {
    //     throw new ExpressError(400, "description is not present");
    // }
    // if (!newListing.country) {
    //     throw new ExpressError(400, "country is not present");
    // }
    newListing.image={url,filename};
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
    // }
    // catch (err) {
    //     next(err);
    // }  
};

module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", " Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    let oroginalImageUrl=listing.image.url;
    oroginalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", { listing ,oroginalImageUrl});

};

module.exports.updateListing=async (req, res) => {
    // if (!req.body.listing) {
    //     throw new ExpressError(400, "send valid data for listing");
    // }
    let { id } = req.params;
    const listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file!="undefined"){
         const url=req.file.path;
    const filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect("/listings");
    //res.redirect(`/listings/${id}`);(to redirect on show page)
};



