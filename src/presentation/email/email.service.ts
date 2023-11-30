import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins'
import { LogEntity, LogRepository, LogSeverityLevel } from '../../domain';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[];
}


interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAIL_SERVICE,
        auth: {
            user: envs.MAIL_EMAIL,
            pass: envs.MAIL_SECRET_KEY,
        }
    });

    constructor(
    ) { }

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;

        try {

            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            })
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Email send to ${to}`,
                origin: 'email.service.ts'
            })

            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `Email not send to ${to}`,
                origin: 'email.service.ts'
            })
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
        const subject = "Logs de sistema";
        const htmlBody = `
        <h3>Log de sistema - NOC 200</h3>
        <b>Teste send email</b>
        <p>PD: ver archivos adjuntos</p>
        `;

        const attachements: Attachement[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ]

        return this.sendEmail({ to, subject, htmlBody, attachements });
    }
}