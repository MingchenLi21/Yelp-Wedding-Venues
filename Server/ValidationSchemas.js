const Joi = require( 'joi' );

const venueSchema = Joi.object( {
    title: Joi.string().required(),
    price: Joi.number().required().min( 0 ),
    location: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.optional(),
    _id: Joi.optional(),
    deleteImages: Joi.optional()
} )


const reviewSchema = Joi.object( {
    rating: Joi.number().required().min( 1 ).max( 5 ),
    body: Joi.string().required(),
    _id: Joi.optional()
} );

const reviewBodySchema = Joi.object( {
    review: reviewSchema.required()
} );


module.exports = { venueSchema, reviewBodySchema };