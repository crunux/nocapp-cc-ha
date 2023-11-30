import { LogModel } from "../../data/mongo";
import { LogDatasource, LogEntity, LogSeverityLevel } from "../../domain";





export class MongoLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log)
        await newLog.save()
        console.log('Mongo Log created:', newLog.id);

    };

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({ level: severityLevel })
        return logs.map(LogEntity.fromObject)
        //logs.map(mongoLog => LogEntity.fromObject(mongoLog))
        //logs.map(log => log.toObject()) as LogEntity[];
    };
}