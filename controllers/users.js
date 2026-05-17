const User = require("../models/user")

module.exports.renderSignupForm=(req, res) => {
    res.render("users/signup.ejs")
};

module.exports.signup=async (req, res) => { // agar hum yha par wrapAsync ka use karte to err.message ek new page pe print hota so we use try
    //catch , try catch use karne ke baad hum hamare signup page par hi flash message aa rha h 
    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            email, username
        });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
             req.flash("success", "Register Successfully");
             res.redirect("/listings");
        })
    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect("/user/signup")
    }
};

module.exports.renderLoginForm= (req, res) => {
    res.render("users/login.ejs")
};

module.exports.loginUser=async (req, res) => {
        req.flash("success", "Welcome back to wanderlust");
        let redirectUrl=res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    };


module.exports.logoutUser=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
        return next(err);
        }
        req.flash("success","You are logged out!")
        res.redirect("/listings");
    })

};    