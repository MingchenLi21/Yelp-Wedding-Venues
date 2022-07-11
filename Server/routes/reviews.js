const express = require( "express" );
const reviews = require( "../controllers/reviews" );
const { validateReview, isLoggedin } = require( "../middlewares" );

const router = express.Router( { mergeParams: true } );

router.post( "/", isLoggedin, validateReview, reviews.addReview );

router.delete( "/:reviewId", isLoggedin, reviews.deleteReview );

module.exports = router;