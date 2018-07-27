const mongoose = require('mongoose');

const dbCon = () => {
    if (process.env.NODE_ENV === 'production') {
        return 'mongodb://sikandar:(abc123+-0)@ds257241.mlab.com:57241/vidjot-prod1';
    } else {
        return 'mongodb://localhost:27017/vidjot-div';
    }
}
mongoose.Promise = global.Promise;
mongoose.connect(dbCon(), {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('connected to mongodb server!');
    })
    .catch((error) => {
        console.log('unable to connect to mongodb server!');
    });