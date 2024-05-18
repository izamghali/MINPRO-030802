import { serverResponse } from "@/helpers/apiResponse";
import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express";
import prisma from "@/prisma";

export const createPromo = (req: Request, res: Response) => {
    try {
        serverResponse(res, 200, 'ok', 'creating promo...')
    } catch (error:any) {
        serverResponse(res, 400, 'error', error)
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