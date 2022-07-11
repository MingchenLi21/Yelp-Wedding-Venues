const mongoose = require( "mongoose" );

const reviewSchema = new mongoose.Schema( {
    body: {
        type: String,
        required: [ true, "title cannot be blank." ]
    },
    
    rating: {
        type: Number,
        required: [ true, "title cannot be blank." ]
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
} );

module.exports = mongoose.model( "Review", reviewSchema );