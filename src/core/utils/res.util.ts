import { HttpError, InternalServerError } from 'http-errors';

export function handleError(res: any, error: any) {
    if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ error: error.message });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).send({ error: 'This object existed' });
    }
    return res.status(500).send({ error: 'Internal Server Error' });
}