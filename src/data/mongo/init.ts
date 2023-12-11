import mongoose from "mongoose";

interface ConnectionOptions {
    mongoURL: string;
    dbName: string;
}



export class MongoDatabase {


    static async connect(options: ConnectionOptions) {
        const { mongoURL, dbName } = options;

        try {
            await mongoose.connect(mongoURL, { dbName });
            //console.log('Mongo conected');
            return true
            //return mongoose.connection;
        } catch (err) {
            console.log('Mongo conection error');
            throw err
        }
    }
}