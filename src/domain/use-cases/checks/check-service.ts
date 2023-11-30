import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";


interface CheckServicesUseCase {
    execute(url: string): Promise<boolean>

}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;


export class CheckService implements CheckServicesUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }
    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`)
            }
            const log = new LogEntity({ message: `Service ${url} working`, level: LogSeverityLevel.low, createdAt: new Date(), origin: "check-service.ts" })
            this.logRepository.saveLog(log)
            this.successCallback && this.successCallback();
            return true
        } catch (error) {
            const errorMessage = `${url} - ${error}`
            const log = new LogEntity({ message: errorMessage, level: LogSeverityLevel.high, createdAt: new Date(), origin: "check-service.ts" })
            this.logRepository.saveLog(log)
            this.errorCallback && this.errorCallback(errorMessage)
            return false
        }
    }
}