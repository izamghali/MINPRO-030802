import { createEvent, getEvents } from '@/controllers/event.controller';
import { Router } from 'express'

const eventRouter = Router();

eventRouter.post('/', createEvent)
eventRouter.get('/', getEvents)

export { eventRouter }