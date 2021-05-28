const express = require('express');
const router = express.Router();
const Accommodation = require('../models/accommodation');
const {normalizeErrors} = require ('../helper/mongoose');

const User = require('../models/user');
const UserControl = require('../controllers/user');

router.get('/secret', UserControl.authMiddleware, function (request, result) {
    result.json({"secret": true});
})
router.get ('', function(request, result){
    const feedback = "";
})

router.get('/feedback', UserControl.authMiddleware, function(request, result){
    const User = result.locals.User;
    Feedback.where({User}).populate('feedback').exec(function(error, foundFeedback){
        if (error){
            return result.status(422).send({
                errors: normalizeErrors(error.errors)
            });
        }
        return result.json(foundFeedback)
    })
})
router.delete('/:id', UserControl.authMiddleware, function (request, result) {
    const User = result.locals.User;
    Feedback,findById(request.params.id).populate('User', '_id').populate ({
        path: 'feedback'
    }).exec(function (error, foundFeedback){
        if (error){
            return result.status(422).send({
                errors: normalizeErrors(error.errors)
            });
        }
       
        });
})
module.exports = router;
