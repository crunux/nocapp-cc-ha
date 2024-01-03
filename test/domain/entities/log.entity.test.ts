import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity"





describe('Log Entity', () => {

    test('should create a LogEntity instance', () => {

        const data = {
            message: 'test log entity',
            level: LogSeverityLevel.high,
            origin: ' log.entity.test.ts'
        }

        const log = new LogEntity(data)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(data.message)
        expect(log.level).toBe(data.level)
        expect(log.origin).toBe(data.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })
})