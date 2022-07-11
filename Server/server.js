if ( process.env.NODE_ENV !== "production" ) {
    require( "dotenv" ).config();
}

const express = require( "express" );
const session = require( "express-session" );
const morgan = require( "morgan" );
const passport = require( "passport" );
const LocalStrategy = require( "passport-local" );
const User = require( "./db/Model/User" );
const helmet = require( "helmet" );
const venueRoutes = require( "./routes/venues" );
const reviewRoutes = require( "./routes/reviews" );
const authRoutes = require( "./routes/auth" );
const app = express();
const path = require('path');
const bodyParser = require( "body-parser" );
const MongoStore = require( 'connect-mongo' );
const mongoose = require( "mongoose" );

const handleErr = ( err ) => {
    console.log( "db connection error:" );
    console.log( err );
}
const db_url = process.env.DB_URL || 'mongodb://localhost:27017/weddingVenues';

mongoose.connect( db_url )
    .then( () => console.log( "Database connected!" ) )
    .catch( handleErr );

const secret = process.env.SECRET || "thisisasectret";
const store = MongoStore.create( {
    mongoUrl: db_url,
    secret,
    touchAfter: 24 * 3600 // 24 hours
} );

store.on( "error", ( e ) => {
    console.log( "There's an error on seesion store" );
    console.log( e );
} );

const sessionConfig = {
    name: "session",
    secret,
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
        httpOnly: true,
        secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //expires in one week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use( session( sessionConfig ) );
app.use( passport.initialize() );
app.use( passport.session() );
passport.use( new LocalStrategy( User.authenticate() ) );

passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy( {
        directives: {
            defaultSrc: [],
            connectSrc: [ "'self'", ...connectSrcUrls ],
            scriptSrc: [ "'unsafe-inline'", "'self'", ...scriptSrcUrls ],
            styleSrc: [ "'self'", "'unsafe-inline'", ...styleSrcUrls ],
            workerSrc: [ "'self'", "blob:" ],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dj1pime6o/",
                "https://images.unsplash.com/",
            ],
            fontSrc: [ "'self'", ...fontSrcUrls ],
        },
    } )
);



// app.use(helmet({contentSecurityPolicy: false}));
app.use( morgan( 'tiny' ) );
app.use( bodyParser.json() ); // for parsing application/json
app.use( bodyParser.urlencoded( { extended: true } ) ); // for parsing application/x-www-form-urlencoded

app.use( "/venues", venueRoutes );
app.use( "/venues/:id/reviews", reviewRoutes );
app.use( "/auth", authRoutes )

app.all( "*", ( req, res ) => {
    throw new Error( "Unknow API!" );
} );
app.use(express.static(path.join(__dirname, '../build')));

app.use( ( err, req, res, next ) => {
    // error handler
    console.error( err );
    res.status( 500 ).send( err.message )
} )
// app.use( AppErrorHandler ); //error-handling middleware should be last,
// after other app.use() and routes calls;

const server_port = process.env.SERVER_PORT || 5000;
app.listen( server_port, () => {
    console.log( `Listening on port ${ server_port }!` );
} )