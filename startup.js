import mongoose from 'mongoose';

export default (server) => {
    // initialize mongo db
    function connectDB() {
        try {
            const mongoURL = process.env.MONGO_URL;
            mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});
            console.log("Mongo Database Connected")
        } catch (error) {
            throw new Error(error.message);
        }
    }

    connectDB();
}