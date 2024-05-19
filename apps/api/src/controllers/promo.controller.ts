import { serverResponse } from "@/helpers/apiResponse";
import { Request, Response } from "express";
import prisma from "@/prisma";
import { v4 as uuid } from 'uuid'

export const createPromo = async (req: Request, res: Response) => {
    try {
        const { organizerID, eventID, promoName, details, discount, imgUrl, expireAt, startAt } = req.body;

        const promo = await prisma.promo.create({
            data: {
                id: uuid(),
                organizerID,
                promoName,
                details,
                discount: Number(discount),
                imgUrl,
                expireAt: new Date(expireAt), // Convert string to Date object
                startAt: new Date(startAt)     // Convert string to Date object
            }
        });

        if (eventID) {
            await prisma.event.update({
                where: { id: eventID}, 
                data: { promoID: promo.id }
            })

            await prisma.promo.update({
                where: { id: promo.id }, 
                data: { isAny: false }
            })
        }

        serverResponse(res, 200, 'ok', 'Promo created successfully', promo);
    } catch (error) {
        console.error("Error creating promo:", error);
        serverResponse(res, 500, 'error', 'Failed to create promo');
    }
}


export const getPromos = (req: Request, res: Response) => {

    // NOTE:  check if the promo is expired or not

    try {
        serverResponse(res, 200, 'ok', 'fethcing promos...')
    } catch (error:any) {
        serverResponse(res, 400, 'error', error)
    }
}

export const updatePromo = async (req: Request, res: Response) => {
    try {
        serverResponse(res, 200, 'ok', 'updating promo')
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

export const removePromo = async (req: Request, res: Response) => {
    try {
        serverResponse(res, 200, 'ok', 'removing promo')
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}