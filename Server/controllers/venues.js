const Venue = require( "../db/Model/Venue" );
const { cloudinary } = require( "../cloudinary" );
const mbxGeocoding = require( '@mapbox/mapbox-sdk/services/geocoding' );
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding( { accessToken: mapboxToken } );

module.exports.getVenues = async ( req, res ) => {
    // get all venues
    const venues = await Venue.find( {} ); //find all
    res.status( 200 ).send( venues );
};

module.exports.addVenue = async ( req, res ) => {
    // add new venue
    const geoData = await geocoder.forwardGeocode( {
        query: req.body.location,
        limit: 1
    } ).send();

    const venue = new Venue( req.body );
    venue.author = req.user._id;
    venue.images = req.files.map( f => ( { url: f.path, filename: f.filename } ) );
    venue.geometry = geoData.body.features[ 0 ].geometry;
    console.log( venue );
    await venue.save();
    res.status( 200 ).send( venue );
};

module.exports.getVenue = async ( req, res, next ) => {
    // get a venue
    const venue = await Venue.findById( req.params.id ).populate( {
        path: "reviews",
        populate: {
            path: "author"
        }
    } ).populate( "author" );
    if ( !venue ) {
        throw new Error( "venue not found!" );
    }
    res.status( 200 ).send( venue );
};

module.exports.deleteVenue = async ( req, res ) => {
    // delete a venue
    const { id } = req.params;
    await Venue.findByIdAndDelete( id );
    res.status( 200 ).send( "Deleted!" );
};

module.exports.updateVenue = async ( req, res ) => {
    // update the venue
    const { id } = req.params;
    const { title, location, description, price } = req.body;
    const venue = await Venue.findByIdAndUpdate( id, { title, location, description, price } );
    const newImgs = req.files.map( f => ( { url: f.path, filename: f.filename } ) );
    venue.images.push( ...newImgs );
    await venue.save();

    if ( req.body.deleteImages ) {
        if ( typeof ( req.body.deleteImages ) === "string" ) {
            req.body.deleteImages = [ req.body.deleteImages ];
        }

        for ( let filename of req.body.deleteImages ) {
            await cloudinary.uploader.destroy( filename );
        }

        await venue.updateOne( { $pull: { images: { filename: { $in: req.body.deleteImages } } } } );
    }
    res.status( 200 ).send( "Updated!" );
};