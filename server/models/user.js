const bcrypt  = require( 'bcryptjs');
const  mongoose = require( 'mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema ({
    booking_id: {
        type: String,
        min: [8, 'Too short! minimum is 8 characters'],
        max: [12, 'Too long the maximum is 12 characters']
    },
    full_name: {
        type: String,
        min: [12,'Too short minimum characters for full name is 12 characters'],
        lowercase: true,
        required: 'Full name is required'
    },
    password: {
        type: String,
        min: [8, 'Too short!, minimum password length is 8 characters'],
        max: [20, 'Too long!, maximum password length is 20 characters'],
        required: 'A password is required'
    },
    //accommodation: [{type: Schema.Types.ObjectId, reference: 'Accommodation' }],
    //feedback: [{type: Schema.Types.ObjectId, reference: 'Feedback'}]
});

userSchema.methods.hasSamePassword = function (requestedPassword){
    return bcrypt.compareSync(requestedPassword,this.password);
}
userSchema.pre('save', function(next){
    const user = this;
    bcrypt.genSalt(10, function(error, salt){
        bcrypt.hash(user.password, salt, function(error, hash){
            user.password = hash;
            next();
        });
    });
})
module.exports = mongoose.model('User', userSchema);