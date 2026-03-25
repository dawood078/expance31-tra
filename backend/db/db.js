const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error:', error.message);
        console.log('Attempting to use in-memory database...');
        try {
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            await mongoose.connect(uri);
            console.log('Connected to in-memory database');
        } catch (innerError) {
            console.log('In-memory DB Connection Error:', innerError.message);
            process.exit(1);
        }
    }
}

module.exports = { db }