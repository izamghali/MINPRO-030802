import { Router, Request, Response } from "express";
import { serverResponse } from "./helpers/apiResponse";
import { userRouter } from "./routers/user.router";
import { eventRouter } from "./routers/event.router";
import { organizerRouter } from "./routers/organizer.router";
import { accountRouter } from "./routers/account.router";
import { mediaRouter } from "./routers/media.router";

const apiRouter = Router();

apiRouter.get('/', (req: Request, res: Response) => {
    try {
        serverResponse(res, 200, 'ok', 'welcome to API!')
    } catch (error: any) {
        serverResponse(res, 400, 'this is error', error)
    }
})

apiRouter.use('/users', userRouter)
apiRouter.use('/events', eventRouter)
apiRouter.use('/organizers', organizerRouter)
apiRouter.use('/accounts', accountRouter)
apiRouter.use('/media', mediaRouter)

export default apiRouter