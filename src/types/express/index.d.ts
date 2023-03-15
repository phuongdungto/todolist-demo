import { ReqUser } from '../../core/interfaces/user.interface';

// declare global {
//     namespace Express {
//         interface Request {
//             user?: ReqUser;
//         }
//     }
// }

declare namespace Express {
    export interface Request {
        user?: ReqUser;
    }
}