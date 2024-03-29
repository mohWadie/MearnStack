const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const UserModel = require('../models/User');


const protect = asyncHandler(async (req, res, next) => {
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Beare')){
        try{
            token = req.headers.authorization.split(' ')[1];

            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await UserModel.findById(decode.id).select('-storedPassword');
            next();
        }
        catch(err){
            console.log(err);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = {protect};