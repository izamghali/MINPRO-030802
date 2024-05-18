import { serverResponse } from "@/helpers/apiResponse";
import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express";
import prisma from "@/prisma";

export const createWishlist = (req:Request, res: Response) => {
    try {

        serverResponse(res, 200, 'ok', 'wishlist has been created!')
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

export const removeWishlist = async (req: Request, res: Response) => {
    try {
        serverResponse(res, 200, 'ok', 'removing wishlist...')
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

// get multiple wishlist by user
export const getWishlistByUser = async (req: Request, res: Response) => {
    try {
        serverResponse(res, 200, 'ok', 'fetching user wishlist')
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}
