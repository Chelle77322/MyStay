const express = require( 'express');
const mongoose = require('mongoose');
const config = require('./config');
const StartDb = require('./startdb');
const path = require ('path');
const cors = require('cors');
require('dotenv');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/RateMyStay";

const userRoutes = require('./routes/user');
const accommodationRoutes =require('./routes/accommodation');
const feedbackRoutes = require( './routes/feedback');

//Mongoose Connection
mongoose.connect(MONGODB_URI , {
    useNewUrlParser: true,
    useFindAndModify: false
  }).then(()=>{
    if(process.env.NODE_ENV !== 'production'){
        const startDb = new StartDb();
        startDb.seedDb();
    }
});
const app = express();

//Adding this to deal with any possible CORS issues that may happen
app.use(cors());
app.use((request, result, next) => {
    result.header("Access-Control-Allow-Origin", "*");
    result.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Defines the middleware being used

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Uses the apiRoutes specified in the routes folder

app.use('/api/accommodation',accommodationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);


if(process.env.NODE_ENV === "production"){
    const appPath = path.join(__dirname, '..',build);
    app.use(express.static(appPath));
    app.get('*', function(request, result){
        result.sendFile(path.resolve(appPath, 'index.html'));
    });

}

//App is connected and listening on
const PORT = process.env.PORT || 4045;
app.listen(PORT, () => {
console.log(`🤓 ==> API server now on port ${PORT}!`);
})