
import { create } from 'domain';
import { LogEntity, LogRepository } from '../../../../src/domain';
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-email-logs';
import { EmailService } from '../../../../src/presentation/email';




describe('Send email logs', () => {

    const mockEmailServices = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),

    }

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const sendEmailLogs = new SendEmailLogs(mockEmailServices as any, mockLogRepository as LogRepository)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should create a new send email log and save', async () => {


        const result = await sendEmailLogs.execute('joancruz0502@hotmail.com')

        expect(result).toBe(true)
        expect(mockEmailServices.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: 'low',
            message: 'log email sent',
            origin: 'send-email-logs.ts',
        })
        expect(sendEmailLogs).toBeInstanceOf(SendEmailLogs)
    })

    test('should log in case of error', async () => {

        mockEmailServices.sendEmailWithFileSystemLogs.mockResolvedValue(false)
        const result = await sendEmailLogs.execute('joancruz0502@hotmail.com')

        expect(result).toBe(false)
        expect(mockEmailServices.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: 'high',
            message: 'Error: Error sending email log',
            origin: 'send-email-logs.ts',
        })
        expect(sendEmailLogs).toBeInstanceOf(SendEmailLogs)
    })
})