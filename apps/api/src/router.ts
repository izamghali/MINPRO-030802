import { Router, Request, Response } from "express";
import { serverResponse } from "./helpers/apiResponse";
import { userRouter } from "./routers/user.router";

const apiRouter = Router();

apiRouter.get('/', (req: Request, res: Response) => {
    try {
        serverResponse(res, 200, 'ok', 'welcome to API!')
    } catch (error: any) {
        serverResponse(res, 400, 'this is error', error)
    }
})

apiRouter.use('/users', userRouter)

export default apiRouter