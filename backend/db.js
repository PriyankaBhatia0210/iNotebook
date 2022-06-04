const mongoose = require('mongoose');

const connectToMongoDB = () => {
    mongoose.connect('mongodb://localhost:27017/inotebook', ()=> {
        console.log('Connected to Mongoose')
    })
}

module.exports = connectToMongoDB;