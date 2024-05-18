import { serverResponse } from "@/helpers/apiResponse";
import { Request, Response } from "express";
import prisma from "@/prisma";
import { v4 as uuid } from 'uuid'

export const createMedia = async (req: Request, res: Response) => {
    try {
        // const { mediaURL, eventID } = req.body;
        
        // console.log('(api) media - body', req.body)
        // console.log('(api) media - eventID', eventID)
        // console.log('(api) media - mediaURL', mediaURL)

        // const event = await prisma.event.findFirst({
        //     where: { id: eventID }
        // })

        // console.log('(api) media - event', event)

        // if (event) {
        //     const media = await prisma.eventMedia.create({
        //         data: {
        //             id: uuid(),
        //             eventID: eventID,
        //             url: mediaURL
        //         }
        //     })
        // } else {
        //     return serverResponse(res, 404, 'ok', 'event not found')
        // }
        
        serverResponse(res, 201, 'ok', 'media has been added!')

    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}
