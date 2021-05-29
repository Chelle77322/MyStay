const User = require( '../models/user');
const mongooseHelper = require('../helper/mongoose');
const jwt = require ('jsonwebtoken');
const config = require( '../config');

exports.auth = function(request, result){
    const {booking_id, password } = request.body;
    
    if(!password || !booking_id){
        return result.status(422).send({errors: [{title: 'Data is missing!', detail: 'You need to provide your booking_id and password'}]});
    }
    User.findOne({booking_id}, function(error,user){
        if(error){
            return result.status(422).send({errors: mongooseHelper.normalizeErrors(error.errors)});
        }
        if(!user){
            return result.status(422).send({errors:[{title: 'User is invalid', detail:'User doesnt exist'}]});
        }
        if(user.hasSamePassword(password)){
            const token = jwt.sign({
                booking_id: user.booking.id,
                fullname: user.fullname
            }, config.SECRET, {expiresIn: '1hr'});
            return result.json(token);
        } else {
            return result.status(422).send({errors: [{title: 'Wrong Information', detail: 'Wrong booking_id or password used'}]});
        }
    });
}
exports.register = function(request, result){
    const {booking_id, fullname, password, passwordConfirmation} = request.body;
    if(!password || !booking_id){
        return result.status(422).send({errors: [{title: 'Missing Data', detail: 'Please provide booking_id and password!'}]});
    }
    if(password !== passwordConfirmation){
        return result.status(422).send({errors: [{title: 'Password is Invalid', detail: 'Password entered doesnt match the confirmation password'}]});
    }
    User.findOne({booking_id}, (error, existingUser) => {
        if(error){
            return result.status(422).send({errors: mongooseHelper.normalizeErrors(error.errors)});
        }
        if(existingUser){
            return result.status(422).send({errors:[{title: "Invalid Booking ID,", detail: "Booking ID is already in use!"}]});
        }
        const user = newUser({
            booking_id,
            fullname,
            password
        });

        user.save((error) => {
            if(error){
                return result.status(422).send({errors: mongooseHelper.normalizeErrors(error.errors)});
            }
            return result.json({'Registered': true});
        });
    })
}
exports.authMiddleware = function(request, result, next) {
    const token = request.headers.authorization;
    if (token){
        const user = parseToken(token);
        User.findById(user.booking_id, function (error, user){
            if(error){
                return result.status(422).send ({errors: mongooseHelper.normalizeErrors(error.errors)});
            }
            if(user){
                result.locals.user = user;
                next();
            } else{
                return notAuthorized(result);
            }
        })
    }else{
        return notAuthorized(result);
    }

        function parseToken(token){
            return jwt.verify(token.split(' ')[1],config.SECRET);
        }
        function notAuthorized(result){
            return result.status(401).send({errors: [{title: 'Authorization Not Found', detail: 'You need to login to give your feedback!'}]});
        }
  
    }