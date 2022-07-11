const User = require( "../db/Model/User" );

module.exports.register = async ( req, res ) => {
    const { email, username, password } = req.body.user;
    const user = new User( { email, username } );
    const registeredUser = await User.register( user, password );

    req.logIn( registeredUser, err => {
        if ( err ) throw err;
        res.send( { _id: user._id, email: user.email, username: user.username } )
    } );

};
module.exports.login = async ( req, res ) => {
    res.send( { _id: req.user._id, email: req.user.email, username: req.user.username } )
};
module.exports.isLoggedin = ( req, res ) => {
    if ( !req.user ) {
        return res.send();
    }
    res.send( { _id: req.user._id, email: req.user.email, username: req.user.username } );
};
module.exports.logout = ( req, res ) => {
    req.logout( () => {
        res.send( "logged out!" )
    } );

};