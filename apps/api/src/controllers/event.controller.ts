import { serverResponse } from "@/helpers/apiResponse";
import { Request, Response } from "express";
import prisma from "@/prisma";
import { v4 as uuid } from 'uuid'

export const createEvent = async (req: Request, res: Response) => {
    try {
        // TODO: 
        const {
            eventID, orgID, eventTitle, 
            category, location, date,
            details, seats, thumbnailURL, tickets
        } = req.body

        // creating event
        const event = await prisma.event.create({
            data: {
                id: eventID,
                organizerID: orgID,
                eventName: eventTitle,
                category: category,
                location: location,
                date: new Date(date),
                details: details,
                availableSeats: seats,
                thumbnailUrl: thumbnailURL
            }
        })

        // creating ticket types for this event
        for (const ticket of tickets) {
            await prisma.eventTypePrice.create({
                data: {
                    id: uuid(),
                    eventType: ticket.ticketType, 
                    price: ticket.price, 
                    eventID: event.id
                }
            });
        }

        console.log('(api): event', event)

        serverResponse(res, 201, 'Event Created!', req.body)

    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

export const getEvents = async (req: Request, res: Response) => {
    try {
        // TODO: 
        // get data from req.body
        // get organizerID
        // add event to the database
        // get organizerId from token
        // allow event to be created if organizer is logged in

        console.log(req.body)

        // const organizerID = req.organizer?.id
        serverResponse(res, 200, 'Fething all events')

    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

export const getEventById = async (req: Request, res: Response) => {
    try {
        const event = await prisma.event.findFirst({
            where: { id: req.body.event.id }
        })

        if (!event) {
            serverResponse(res, 400, 'error', 'event not found!')
        } else {
            serverResponse(res, 200, 'ok', 'event found!', event);
        }

        
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

// FIX:  work on these controllers
// get multiple events by name
export const getEventsByName = async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

// get multiple events by filter
export const getEventsByFilter = async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

export const updateEvent = async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

export const removeEvent = async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

