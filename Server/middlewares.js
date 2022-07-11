const {venueSchema, reviewBodySchema} = require("./ValidationSchemas")
const Venue = require("./db/Model/Venue");

module.exports.isLoggedin = (req, res, next) =>{

    if (!req.isAuthenticated()){
        return res.status(401).send("you need to log in first!");
    }

    return next();
};

module.exports.isAuthor = async (req, res, next) => {
    // check if the user own the venue post
    const {id} = req.params;
    const venue = await Venue.findById(id);
    if ( !venue ) {
        throw new Error( "venue not found!" );
    }
    if (!venue.author.equals(req.user._id)){
        throw new Error("You do not have the permission to do that!");
    }

    return next();
};

module.exports.validateReview = ( req, res, next ) => {
    const { error } = reviewBodySchema.validate( req.body );

    if ( error ) {
        const msg = error.details.map( el => el.message ).join( "," )
        throw new Error( msg );
    }
    next();
}; 

module.exports.validateVenue = ( req, res, next ) => {

    const { error } = venueSchema.validate( req.body );

    if ( error ) {
        const msg = error.details.map( el => el.message ).join( "," )
        throw new Error( msg );
    }
    next();
};