import { CheckService, CheckServiceMultiple, SendEmailLogs } from "../domain";
import { FileSystemDatasource, MongoLogDatasource, PostgresLogDatasource } from "../infrastructure/";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email";


//Datasource
const fileSystemSource = new FileSystemDatasource();
const mongoLogDatasource = new MongoLogDatasource();
const postgresLogDatasource = new PostgresLogDatasource();

//Repository
const postgresLogRepository = new LogRepositoryImpl(postgresLogDatasource);
const fsLogRepository = new LogRepositoryImpl(fileSystemSource);
const mongoLogRepository = new LogRepositoryImpl(mongoLogDatasource);

const emailService = new EmailService();

export class ServerApp {

    public static async start() {

        console.log("Server Started.!");

        //Enviar email
        new SendEmailLogs(
            emailService,
            fsLogRepository
        ).execute(['joancruz0502@hotmail.com', 'joancruzccrc@gmail.com', 'animej48@gmail.com'])
        emailService.sendEmailWithFileSystemLogs(['joancruz0502@hotmail.com', 'joancruzccrc@gmail.com', 'animej48@gmail.com'])



        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url: string = 'https://googl6e.com'
                new CheckServiceMultiple(
                    [postgresLogRepository, mongoLogRepository, fsLogRepository],
                    () => console.log(`${url} is up`),
                    (error) => console.log(error),
                ).execute(url);
                //new CheckService().execute('http://localhost:3000');
            }
        );

    }

}