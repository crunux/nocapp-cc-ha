import { create } from "domain"
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity"





describe('Log Entity', () => {
    const data = {
        message: 'test log entity',
        level: LogSeverityLevel.high,
        origin: ' log.entity.test.ts'
    }

    test('should create a LogEntity instance', () => {

        const log = new LogEntity(data)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(data.message)
        expect(log.level).toBe(data.level)
        expect(log.origin).toBe(data.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test('should create a LogEntity instance from Json', () => {
        const json = `{
            "message": "Service https://google.com working",
            "level": "low",
            "createdAt": "2022-01-01T00:00:00.000Z",
            "origin": "log.entity.test.ts"
        }`

        const log = LogEntity.fromJson(json)
        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe("Service https://google.com working")
        expect(log.level).toBe("low")
        expect(log.origin).toBe("log.entity.test.ts")
        expect(log.createdAt).toBeInstanceOf(Date)
        expect(log.createdAt.toISOString()).toBe("2022-01-01T00:00:00.000Z")
    })

    test('should create a LogEntity instance from Object', () => {
        const log = LogEntity.fromObject(data)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(data.message)
        expect(log.level).toBe(data.level)
        expect(log.origin).toBe(data.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })


})