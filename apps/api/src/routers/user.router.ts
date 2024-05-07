import { createUser, getUserByReferral, getUsers } from '@/controllers/user.controller';
import { serverResponse } from '@/helpers/apiResponse';
import { Router, Request, Response } from 'express'

const userRouter = Router();

userRouter.post('/', createUser)
userRouter.get('/', getUsers)
userRouter.post('/referral', getUserByReferral)

export { userRouter }