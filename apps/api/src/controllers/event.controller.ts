import { serverResponse } from "@/helpers/apiResponse";
import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express";
import prisma from "@/prisma";

export const createEvent = async (req: Request, res: Response) => {
    try {
        // TODO: 
        // get data from req.body
        // get organizerID
        // add event to the database
        // get organizerId from token
        // allow event to be created if organizer is logged in

        // const organizerID = req.organizer?.id

        // serverResponse(res, 201, 'Event Created!')

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

