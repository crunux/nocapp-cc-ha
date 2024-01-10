import { MongoDatabase } from '../../../src/data/mongo/init';
import { envs } from '../../../src/config/plugins/envs.plugin';
import mongoose from 'mongoose';
import { MongoLogDatasource } from '../../../src/infrastructure/datasources/mongo-log.datasource';
import { LogSeverityLevel } from '../../../src/domain';
import { LogModel } from '../../../src/data/mongo';




describe('MongoLogDatasource Test', () => {

    const logDataSource = new MongoLogDatasource()

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoURL: envs.MONGO_URI,
        })

    })

    afterEach(async () => {
        await LogModel.deleteMany()
    })

    afterAll(async () => {
        mongoose.connection.close()
    })

    test('should create a log in mongodb', async () => {

        const logSpy = jest.spyOn(console, 'log')
        const log = {
            level: LogSeverityLevel.medium,
            message: 'test mongodb logDatasource',
            origin: 'mongo-log.datasource.test.ts',
            createdAt: new Date(),
        }

        await logDataSource.saveLog(log);
        expect(logSpy).toHaveBeenCalledTimes(1)
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created:", expect.any(String))
    })

    test('should find a log in mongodb', async () => {

        const log = {
            level: LogSeverityLevel.medium,
            message: 'test mongodb logDatasource',
            origin: 'mongo-log.datasource.test.ts',
            createdAt: new Date(),
        }

        await logDataSource.saveLog(log);
        const logFound = await logDataSource.getLogs(LogSeverityLevel.medium)
        expect(logFound).toMatchObject([log])
        expect(logFound[0].level).toBe(LogSeverityLevel.medium)
        expect(logFound[0].message).toBe('test mongodb logDatasource')
        expect(logFound[0].origin).toBe('mongo-log.datasource.test.ts')
        expect(logFound.length).toBe(1)

    })
})