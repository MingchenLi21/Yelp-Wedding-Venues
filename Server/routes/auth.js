const express = require( "express" );
const passport = require( "passport" );
const auth = require( "../controllers/auth" );
const router = express.Router();
const { isLoggedin } = require( "../middlewares" );

router.post( "/register", auth.register );

router.post( "/login", passport.authenticate( "local" ), auth.login );

router.get( "/isLoggedin", auth.isLoggedin );

router.post( "/logout", isLoggedin, auth.logout );

module.exports = router;