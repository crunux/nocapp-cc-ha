import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource, LogEntity, LogSeverityLevel } from "../../domain";



const prisma = new PrismaClient();

export const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDatasource {


    async saveLog(log: LogEntity): Promise<void> {
        const { message, level, origin } = log
        await prisma.logModel.create({
            data: { message: message, level: severityEnum[level], origin }
        })
        console.log('Postgres Save');

    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const dbLogs = await prisma.logModel.findMany({
            where: { level: severityEnum[severityLevel] }
        })
        return dbLogs.map(LogEntity.fromObject)
    }

}

