const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        category:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null),

    }).required(),
})

// module.exports.listingSchema = Joi.object({
//     title: Joi.string().min(3).required(),
//     description: Joi.string().allow("").optional(),
//     location: Joi.string().allow("").optional(),
//     country: Joi.string().allow("").optional(),
//     price: Joi.number().min(0).optional(),
//     image: Joi.object({
//         filename: Joi.string().default("default-image"),
//         url: Joi.string().uri().default("https://t3.ftcdn.net/jpg/03/22/06/68/360_F_322066808_CANrp7u5Cdiz7700TJReqKD299d2AZtD.jpg")
//     }).optional()
// });


module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().min(1).max(5).required(),
        comment:Joi.string().required(),
    }).required(),
})

