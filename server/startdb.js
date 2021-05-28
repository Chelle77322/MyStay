const Accommodation = require( './models/accommodation');
const User = require ('./models/user');
const StartDbData = require ( './data.json');
const Feedback = require( './models/feedback');

class StartDb {
    constructor (){
        this.accommodation = StartDbData.accommodation
        this.users = StartDbData.users
        this.feedback = StartDbData.feedback
    }
async cleanDb() {
    await User.remove({});
    await Accommodation.remove({});
    await Feedback.remove({});
}
pushDatatoDb() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[2]);

    this.accommodation.forEach((accommodation) => {
        const newAccommodation = new Accommodation(accommodation);
        newAccommodation.user = user;
        user.accommodation.push(newAccommodation);
        newAccommodation.save();
    });
    this.feedback.forEach((feedback) => {
        const newFeedback = new Feedback(feedback);
        newFeedback.user = User;
        user.feedback.push(newFeedback);
        newFeedback.save();
    });
    user.save();
    user2.save();
}
async seedDb() {
    await this.cleanDb();
    this.pushDatatoDb();
}
}
module.exports = StartDb;