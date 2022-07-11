const mongoose = require( "mongoose" );
const Review = require( "./Review" );

// https://res.cloudinary.com/dj1pime6o/image/upload/w_200/v1657305709/VenueImg/u2uuapfjze9mbq1d8r0d.jpg

const ImageSchema = new mongoose.Schema( {
    url: String,
    filename: String
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
} );

ImageSchema.virtual( "thumbnail" ).get( function () {
    return this.url.replace( "/upload", "/upload/w_200" );
} );

const VenueSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: [ true, "title cannot be blank." ]
    },

    images: [ ImageSchema ],

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    geometry: {
        type: {
            type: String,
            enum: [ "Point" ],
            required: true
        },
        coordinates: {
            type: [ Number ],
            required: true
        }
    },

    location: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    reviews: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    } ]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
} );

VenueSchema.virtual( "properties.popUpMarkup" ).get( function () {
    return `
    <strong><h5>${this.title}</h5><strong>
    <p>${this.description.substring(0,20)}...</p>

    `;
} );
VenueSchema.post( "findOneAndDelete", async ( doc ) => {
    if ( doc ) {
        await Review.deleteMany( {
            _id: {
                $in: doc.reviews
            }
        } )
    }
} );
module.exports = mongoose.model( "Venue", VenueSchema );