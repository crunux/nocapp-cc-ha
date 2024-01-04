import { LogDatasource } from '../../../src/domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../src/domain/repositories/log.repository';

const newLog = new LogEntity({
    origin: 'log.repository.test.ts',
    message: 'test-message',
    level: LogSeverityLevel.high,
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

describe('log.repository.ts LogRepository', () => {

    

    class mockLogRepository implements LogRepository {

        constructor(
            private readonly logDatasource: LogDatasource,
        ) {

        }
        saveLog(log: LogEntity): Promise<void> {
            return this.logDatasource.saveLog(log);
        }
        getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return this.logDatasource.getLogs(severityLevel);
        }

    }

    test('should test the abstract class', async () => {
        const logDatasource = new mockLogDatasource()
        const logRepository = new mockLogRepository(logDatasource)

        await logRepository.saveLog(newLog)
        expect(logRepository).toBeInstanceOf(mockLogRepository);
        const logs = await logRepository.getLogs(LogSeverityLevel.high)
        expect(typeof logRepository.saveLog).toBe('function');
        expect(typeof logRepository.getLogs).toBe('function');
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf( LogEntity)
        expect(logs[0].message).toBe(newLog.message);
    })
})