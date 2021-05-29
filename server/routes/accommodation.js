const express = require ('express');
const router = express.Router();
const Accommodation = require( '../models/accommodation');
const {normalizeErrors} = require ('../helper/mongoose');
const User = require( '../models/user');

const userControl = require( '../controllers/user');

router.get('/secret', userControl.authMiddleware, function(request, result){
    result.json({"secret":true});
})
router.get('', function (request, result){
    const place = request.query.place;
    const query = place ? {place: place.toLowerCase ()} : {}

Accommodation.find(query).select('-feedback').exec(function (error, feedbackAccommodation){
    if(error){
        return result.status(422).send({errors: normalizeErrors(error.errors)});
    }
if(place && feedbackAccommodation.length === 0){
    return result.status(422).send({errors: [{title: "No feedback has been found", detail: `No feedback has been left for this place ${place}`}]});
}
return result.json(feedbackAccommodation);
});
});
router.post('', userControl.authMiddleware, function(request, result){
    const {type, description, shared} = request.body;
    const user = result.locals.user;
    const accommodation = new Accommodation({type, description, shared});
    accommodation.user = user;
    Accommodation.create(accommodation, function(error, newAccommodation){
        if(error){
            return result.status(422).send({errors: normalizeErrors(error.errors)});
        }
        User.update({booking_id:booking.id}, {$push: {accommodation: newAccommodation}}, function () { });
        return result.json(newAccommodation);
    })
})
router.get('/manage', userControl.authMiddleware, function(request, result){
    const user = result.locals.user;
    Accommodation.where({user}).populate('feedback').exec(function(error,feedbackAccommodation){
        if(error){
            return result.status(422).send
({errors: normalizeErrors(error.errors)});     
 }
 return result.json(feedbackAccommodation)
    })
})
router.delete('/:id', userControl.authMiddleware, function(request, result){
    const user = result.locals.user;
    Accommodation.findbyId(request.params.id).populate('user', '_id').populate({
        path: 'feedback',
    }).exec(function (error, feedbackAccommodation){
        if(error){
            return result.status(422).send({errors: normalizeErrors(error.errors)});
        }
        if(user !== feedbackAccommodation.user)
        {
            return result.status(422).send({
                errors: [{title: 'Invalid User giving feedback', detail: 'You are not allowed to leave feedback on this accommodation'}]
            });
        }
            if(feedbackAccommodation.feedback.length > 0){
                return result.status(422).send({errors: [{title: 'Feedback', detail: 'No feedback has been left for this accommodation'}]});
            }
            feedbackAccommodation.remove(function(error){
                if(error){
                    return result.status(422).send({errors:normalizeErrors(error.errors)});
                }
                return result.json({ 'status':'feedback not left'})            
            });
    });
});
module.exports = router;