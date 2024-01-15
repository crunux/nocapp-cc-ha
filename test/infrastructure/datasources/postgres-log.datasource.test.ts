import { PrismaClient } from '@prisma/client';
import { LogSeverityLevel } from '../../../src/domain';
import { PostgresLogDatasource, severityEnum } from '../../../src/infrastructure/datasources/postgres-log.datasource';


const prisma = new PrismaClient()


describe('PostgresLogDatasource Test', () => {

    const logDataSource = new PostgresLogDatasource()
    afterEach(async ()=>{
        await prisma.logModel.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
        jest.clearAllMocks()
    })

    test('should create a log in postgres', async () => {

        const logSpy = jest.spyOn(console, 'log')
        const log = {
            level: LogSeverityLevel.medium,
            message: 'test postgres logDatasource',
            origin: 'postgres-log.datasource.test.ts',
            createdAt: new Date(),
        }

        await logDataSource.saveLog(log);
        expect(logSpy).toHaveBeenCalledTimes(1)
        expect(logSpy).toHaveBeenCalledWith("Postgres Save")
    })

    test('should find a log in postgres', async () => {

        const log = {
            level: LogSeverityLevel.medium,
            message: 'test postgres logDatasource',
            origin: 'postgres-log.datasource.test.ts',
            createdAt: new Date(),
        }

        await logDataSource.saveLog(log);
        const logFound = await logDataSource.getLogs(LogSeverityLevel.medium)
        const medium = severityEnum[LogSeverityLevel.medium]
        expect(logFound).toMatchObject([{
            level: medium,
            message: 'test postgres logDatasource',
            origin: 'postgres-log.datasource.test.ts',
            createdAt: expect.any(Date),
        }])
        expect(logFound[0].level).toBe(medium)
        expect(logFound[0].message).toBe('test postgres logDatasource')
        expect(logFound[0].origin).toBe('postgres-log.datasource.test.ts')
        expect(logFound.length).toBe(1)

    })
})