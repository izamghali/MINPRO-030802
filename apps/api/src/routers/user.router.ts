import { createUser, getUserByReferral, getUsers } from '@/controllers/user.controller';
import { Router } from 'express'

const userRouter = Router();

userRouter.post('/', createUser)
userRouter.get('/', getUsers)
userRouter.post('/referral', getUserByReferral)

export { userRouter }