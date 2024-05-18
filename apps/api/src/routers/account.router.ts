import { loginAccount, verifyAccount } from '@/controllers/account.controller';
import { verifyToken } from '@/middlewares/account.middleware';
import { Router } from 'express'

const accountRouter = Router();

accountRouter.get('/verify', verifyToken, verifyAccount)
accountRouter.post('/login', loginAccount)


export { accountRouter }