const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected Successfully at:${connect.connection.host}`);
    } catch (error) {
        console.log('Could not connect to MongoDB', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

