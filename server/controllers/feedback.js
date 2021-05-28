const Accommodation = require( '../models/accommodation');
const Feedback = require( '../models/feedback');
const User = require( '../models/user');
const {normalizeErrors} = require('../helper/mongoose');
const moment = require('moment');

exports.createFeedback = function(request,result){
    const{user, feedback, accommodation} = request.body;
    const user = result.locals.user;
    const feedback = new Feedback({user, feedback, accommodation});

    Feedback.findByID(booking._id).populate('feedback').populate('users').exec(function(error, foundFeedback){
        if(error){
            return result.status(422).send({errors:normalizeErrors(error.errors)});
        }
        if (foundFeedback.user.booking_id === user.booking_id) {
            return result.status(422).send({errors: [{title: 'Invalid User!', detail:'Cannot create feedback based on your status'}]});
        }
        if(isValidFeedback(feedback, foundFeedback)){
            feedback.user = user;
            feedback.feedback = foundFeedback;
            foundFeedback.feedback.push(feedback);
            feedback.save(function(error){
                if(error){
                    return result.status(422).send({errors:normalizeErrors(error.errors)});
                }
                foundFeedback.save()
                User.updateOne({booking_id}, {$push:{feedback: feedback}}, function () {});
                return result.json({feedback});
            });
        } else {
            return result.status(422).send({errors: [{title:'Invalid Feedback!', detail: 'Feedback doesnt meet requirements'}]});
        }
    })
}
exports.getUserFeedback = function(request, result) {
    const user = result.locals.user;
    Feedback.where({user}).populate('feedback').exec(function(error, foundFeedback){
        if(error){
            return result.status(422).send({errors: normalizeErrors(error.errors)});
        }
        return result.json(foundFeedback)
    })
}
