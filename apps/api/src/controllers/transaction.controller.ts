import { serverResponse } from "@/helpers/apiResponse";
import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express";
import prisma from "@/prisma";

export const createTransaction = (req:Request, res: Response) => {
    try {
        // TODO:  check if the same user has reviewed the same event
        // TODO:  check if the transaction is completed & the date has passed, if yes, they can r

        serverResponse(res, 200, 'ok', 'review has been created!')
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

// get multiple transactions from one user
export const getTransactionsByUser = async (req: Request, res: Response) => {
    try {
        serverResponse(res, 200, 'ok', 'fetching review from user')
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

// get multiple transactions from one event
export const getTransactionsByEvent = async (req: Request, res: Response) => {
    try {
        serverResponse(res, 200, 'ok', 'fetching review from user')
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}
