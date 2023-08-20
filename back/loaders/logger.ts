import winston from 'winston';
import 'winston-daily-rotate-file';
import config from '../config';
import path from 'path';

const customFormat = winston.format.combine(
  winston.format.cli(),
  winston.format.splat(),
  winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
  winston.format.align(),
  winston.format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`),
);

const defaultOptions = {
  format: customFormat,
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "7d",
};

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.DailyRotateFile({
      filename: path.join(config.systemLogPath, '%DATE%.log'),
      ...defaultOptions,
    })
  ],
});

export default LoggerInstance;
