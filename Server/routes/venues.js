const express = require( "express" );
const venues = require( "../controllers/venues" );
const router = express.Router();
const { validateVenue } = require( "../middlewares" );
const { isLoggedin, isAuthor } = require( "../middlewares" );
const { storage } = require( "../cloudinary" );
const multer = require( 'multer' );
const upload = multer( { storage } );

router.route( "/" )
    .get( venues.getVenues )
    .post( isLoggedin, upload.array( "images" ), validateVenue, venues.addVenue );

router.route( "/:id" )
    .get( venues.getVenue )
    .delete( isLoggedin, isAuthor, venues.deleteVenue )
    .patch( isLoggedin, isAuthor, upload.array( "images" ), validateVenue, venues.updateVenue );

module.exports = router;