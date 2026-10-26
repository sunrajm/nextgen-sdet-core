import {createLogger,format,transports,Logger as WinstonLogger} from 'winston';
import * as fs from 'fs';
import * as path from 'path';

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const customFormat = format.combine(
    format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    format.errors({stack: true}),
    format.printf(({timestamp, level, message, stack}) => {
      return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })
);

export class Logger{
    private logger: WinstonLogger;

    constructor(private context:string='Engine'){
        this.logger = createLogger({
            level: process.env.LOG_LEVEL||'info',
            format: customFormat,
            transports: [
                new transports.Console({
                    format:format.combine(
                        format.colorize({all:true}),
                        customFormat
                    ),
                }),
                new transports.File({
                    filename: path.join(logDir, 'execution.log'),
                    maxsize:5242880,
                    maxFiles:5
                }),
                new transports.File({
                    filename: path.join(logDir, 'error.log'),
                    level: 'error',
                    maxsize:5242880,
                    maxFiles:5
                }),
            ]
        });
    }

    public info(message:string,...meta:any[]):void{
        this.logger.info(`[${this.context}] ${message}`,...meta);
    }

    public warn(message:string,...meta:any[]):void{
        this.logger.warn(`[${this.context}] ${message}`,...meta);
    }

    public error(message:string,...meta:any[]):void{
        this.logger.error(`[${this.context}] ${message}`,...meta);
    }

    public debug(message:string,...meta:any[]):void{
        this.logger.debug(`[${this.context}] ${message}`,...meta);
    }

}

export const logger = new Logger();