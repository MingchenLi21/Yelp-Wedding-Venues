const Review = require( "../db/Model/Review" );
const Venue = require( "../db/Model/Venue" );

module.exports.addReview = async ( req, res ) => {

    const venue = await Venue.findById( req.params.id );
    const review = new Review( req.body.review );
    review.author = req.user._id;
    venue.reviews.push( review );
    await venue.save();
    await review.save();

    res.status( 200 ).send( "review saved!" );
}

module.exports.deleteReview =  async ( req, res ) => {
    const { id, reviewId } = req.params;

    const review = await Review.findById( reviewId );

    if ( !review ) {
        throw new Error( "venue not found!" );
    }

    if ( !review.author.equals( req.user._id ) ) {
        throw new Error( "You do not have the permission to do that!" );
    }

    await Venue.findByIdAndUpdate( id, { $pull: { reviews: reviewId } } );

    await Review.findByIdAndDelete( reviewId );

    res.status( 200 ).send( "Deleted!" );
} ;