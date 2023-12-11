import { MongoDatabase } from '../../../src/data/mongo'



describe('init MongoDB', () => {


    test('should connect to MongoDB', async () => {

        await MongoDatabase.connect({ mongoURL: process.env.MONGO_URI, dbName: process.env.MONGO_DB_NAME });
        console.log(process.env.MONGO_URI, process.env.MONGO_DB_NAME);

    })
})