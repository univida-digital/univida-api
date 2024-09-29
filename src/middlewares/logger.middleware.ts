import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from 'src/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: CustomLogger) {}

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req;
        let responseBody: any;

        const originalSend = res.send.bind(res);

        res.send = function (body: any) {
            responseBody = body;
            return originalSend(body);
        };

        if (req.method === 'GET') {
            const queryParams = Object.keys(req.query).length ? ` - Query Params: ${JSON.stringify(req.query)}` : '';
            this.logger.http(`Request: ${method} ${originalUrl}${queryParams}`);
        } else {
            this.logger.http(`Request: ${method} ${originalUrl} - Body: ${JSON.stringify(req.body)}`);
        }

        res.on('finish', () => {
            const logMessage = typeof responseBody === 'string' 
                ? responseBody 
                : JSON.stringify(responseBody);
            
            if (res.statusCode >= 400) {
                this.logger.error(`Response: ${method} ${originalUrl} - Status: ${res.statusCode} - Return: ${logMessage}`, '');
                return;
            }

            this.logger.http(`Response: ${method} ${originalUrl} - Status: ${res.statusCode}`);
        });

        next();
    }
}
