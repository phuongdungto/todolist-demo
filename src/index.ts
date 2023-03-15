import "reflect-metadata"
import express from "express";
import cors from "cors";
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { NotFound } from 'http-errors';
import { AppDataSource } from "./core/database";
import userRouter from "./users/user.router";
import * as resUtil from "./core/utils/res.util";
import * as dotenv from "dotenv";
dotenv.config();

async function App() {
    const app = express();
    const port: number = parseInt(process.env.SERVER_PORT || '3004', 10);

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('tiny'));
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    await AppDataSource.initialize().then(() => {
        console.log("Connecting database successfully");
    }).catch((error) => console.log(error))

    app.use('/users', userRouter);


    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        return next(new NotFound('Route not found'))
    });
    app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        return resUtil.handleError(res, error);
    })
    app.listen(port, () => {
        console.log('Listening at port: ' + port);
    })
}
App();