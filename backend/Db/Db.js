const mongoose = require('mongoose');
const MongoDB_URL = process.env.MONGODB_URL;


function connectDB() {
    mongoose.connect(MongoDB_URL, { dbName: "devtrail" }).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
}
module.exports = connectDB;