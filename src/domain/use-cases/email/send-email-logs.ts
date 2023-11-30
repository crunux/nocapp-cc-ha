import { EmailService } from "../../../presentation/email"
import { LogRepository } from '../../repositories/log.repository';
import { LogEntity, LogSeverityLevel } from "../../../domain/entities/log.entity";



interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) { }


    async execute(to: string | string[]): Promise<boolean> {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to)
            if (!sent) {
                throw new Error('Error sending email log')
            }
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `log email sent`,
                origin: 'send-email-logs.ts'
            })
            this.logRepository.saveLog(log)
            return true
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `${error}`,
                origin: 'send-email-logs.ts'
            })
            this.logRepository.saveLog(log)

            return false
        }
    }
}