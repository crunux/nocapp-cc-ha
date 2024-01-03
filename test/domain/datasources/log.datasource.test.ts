import exp from 'constants';
import { LogDatasource } from '../../../src/domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';



describe('log.datasource.ts LogDatasource', () => {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low,
    })

    class mockLogDatasource implements LogDatasource {
        saveLog(log: LogEntity): Promise<void> {
            return new Promise((resolve, reject) => {
                resolve()
            });
        }
        getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return new Promise((resolve, reject) => {
                resolve([newLog])
            })
        }
    }

    test('should test the abstract class', async () => {
        const logDatasource = new mockLogDatasource();

        expect(logDatasource).toBeInstanceOf(mockLogDatasource);
        expect(logDatasource).toHaveProperty('saveLog');
        expect(logDatasource).toHaveProperty('getLogs');
        expect(typeof logDatasource.getLogs).toBe('function');
        expect(typeof logDatasource.saveLog).toBe('function');

        await logDatasource.saveLog(newLog);
        const logs = await logDatasource.getLogs(LogSeverityLevel.low);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf( LogEntity)
        expect(logs[0].message).toBe(newLog.message);
    })
})