import { Injectable, Logger } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

// Definindo cores personalizadas para cada nível de log
const colors = {
    error: '\x1b[31m',  // Vermelho
    warning: '\x1b[33m', // Amarelo
    info: '\x1b[32m',    // Verde
    debug: '\x1b[34m',   // Azul
    http: '\x1b[36m',    // Ciano
    reset: '\x1b[0m'     // Resetar cor
};

const customFormat = format.printf(({ timestamp, level, message }) => {
    const color = colors[level] || colors.reset;
    const formattedTimestamp = new Date(timestamp).toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    return `${color}${formattedTimestamp} | [${level.toUpperCase()}] | ${message}${colors.reset}`;
});

@Injectable()
export class CustomLogger extends Logger {
    private logger = createLogger({
        level: 'debug',
        format: format.combine(
            format.timestamp(),
            customFormat
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'logs/combined.log' }),
        ],
    });

    info(message: string) {
        this.logger.info(message);
    }

    error(message: string, trace: string) {
        this.logger.error(message, { trace });
    }

    warning(message: string) {
        this.logger.warn(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }

    http(message: string) {
        this.logger.http(message);
    }
}
