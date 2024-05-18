import { createMedia } from '@/controllers/media.controller';
import { verifyToken } from '@/middlewares/account.middleware';
import { Router } from 'express'

const mediaRouter = Router();

mediaRouter.post('/', createMedia)


export { mediaRouter }