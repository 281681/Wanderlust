const express = require("express");
const router = express.Router();
const User = require("../models/user")
const wrapAsync = require("../util/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/users.js")

router
    .route("/signup")
    .get( userController.renderSignupForm)
    .post( wrapAsync(userController.signup));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl,
    passport.authenticate("local",
        {
            failureRedirect: "/user/login",
            failureFlash: true,
        }
    ),
    userController.loginUser
);

router.get("/logout",userController.logoutUser)

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const User = require("../models/user")
// const wrapAsync = require("../util/wrapAsync.js");
// const passport = require("passport");
// const { saveRedirectUrl } = require("../middleware.js");

// router.get("/signup", (req, res) => {
//     res.render("users/signup.ejs")
// });

// router.post("/signup", wrapAsync(async (req, res) => { // agar hum yha par wrapAsync ka use karte to err.message ek new page pe print hota so we use try
//     //catch , try catch use karne ke baad hum hamare signup page par hi flash message aa rha h 
//     try {
//         const { username, email, password } = req.body;
//         const newUser = new User({
//             email, username
//         });
//         const registerUser = await User.register(newUser, password);
//         console.log(registerUser);
//         req.login(registerUser,(err)=>{
//             if(err){
//                 return next(err);
//             }
//              req.flash("success", "Register Successfully");
//              res.redirect("/listings");
//         })
//     }
//     catch (err) {
//         req.flash("error", err.message);
//         res.redirect("/user/signup")
//     }
// }));

// router.get("/login", (req, res) => {
//     res.render("users/login.ejs")
// });

// router.post("/login",
//     saveRedirectUrl,
//     passport.authenticate("local",
//         {
//             failureRedirect: "/user/login",
//             failureFlash: true,
//         }
//     ),
//     async (req, res) => {
//         req.flash("success", "Welcome back to wanderlust");
//         let redirectUrl=res.locals.redirectUrl || "/listings";
//         res.redirect(redirectUrl);
//     }
// );

// router.get("/logout",(req,res,next)=>{
//     req.logout((err)=>{
//         if(err){
//         return next(err);
//         }
//         req.flash("success","You are logged out!")
//         res.redirect("/listings");
//     })

// })

// module.exports = router;