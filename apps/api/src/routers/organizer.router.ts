import { createOrganizer } from '@/controllers/organizer.controller';
import { Router } from 'express'

const organizerRouter = Router();

organizerRouter.post('/', createOrganizer)

export { organizerRouter }