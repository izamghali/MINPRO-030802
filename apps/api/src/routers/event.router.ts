import { createEvent, fetchEventByOrganizerID, getEvents } from '@/controllers/event.controller';
import { checkOrganizer } from '@/middlewares/account.middleware';
import { Router } from 'express'

const eventRouter = Router();

eventRouter.post('/', createEvent) // NOTE:  test 
// eventRouter.post('/', checkOrganizer, createEvent)
eventRouter.get('/:orgID', fetchEventByOrganizerID)
eventRouter.get('/', getEvents)

export { eventRouter }