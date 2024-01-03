import { MongoDatabase } from '../../../src/data/mongo'
import mongoose from 'mongoose';



describe('init MongoDB', () => {

    afterAll(() => {
        mongoose.connection.close()
    })

    test('should connect to MongoDB', async () => {

        const connect = await MongoDatabase.connect({ mongoURL: process.env.MONGO_URI!, dbName: process.env.MONGO_DB_NAME! });

        expect(connect).toBeTruthy();
        expect(connect).toBe(true);
    })

    test('should throw an error', async () => {
        try {
            const connect = await MongoDatabase.connect({ mongoURL: 'mongodb://alumno:123456@10.0.0.5:27017/?authMechanism=DEFAULT', dbName: process.env.MONGO_DB_NAME! });
            expect(connect).toBe(false);
        } catch (error) {
            expect(error).toBeTruthy();
        }
    })
})