const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
User: {
    type: String,
    required: [true, "Booking_id to identify customer is required"],
    minlength: [8, " Customer Booking id must match"]
},
feedbackDescription: {
    type: String,
    required: [true, "Description of feedback must be left"],
    minlength:[20, "Feedback description must be at least 20 characters or longer"]
},
feedback:{
    type: Number,
    required:[true, "Feedback is required"]
},

});
mongoose.model("Feedback", feedbackSchema);
module.exports = feedbackSchema;