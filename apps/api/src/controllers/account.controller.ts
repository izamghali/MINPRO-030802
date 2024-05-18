import { serverResponse } from "@/helpers/apiResponse";
import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import prisma from "@/prisma";

export const verifyAccount = async (req: Request, res: Response) => {
    try {

        const accountID = req.body.account.id

        const user = await prisma.user.findFirst({ where: { id: accountID } })
        const organizer = await prisma.organizer.findFirst({ where: { id: accountID } })

        if (user) {
            await prisma.user.update({
                where: { id: accountID }, 
                data: { accountActive: true }
            })
        } 
        
        if (organizer) {
            await prisma.organizer.update({
                where: { id: accountID }, 
                data: { accountActive: true }
            })
        } 
        
        serverResponse(res, 200, 'ok', 'Account has been verified!')

    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

export const keepLogin = async (req: Request, res: Response) => {
    try {
        const organizer = await prisma.organizer.findFirst({
            where: { id: req.body.organizer?.id }
        })

        if (!organizer) {
            const user = await prisma.user.findFirst({
                where: { id: req.body.user?.id }
            })
            serverResponse(res, 200, 'ok', 'keep login', user)
        } else {
            serverResponse(res, 200, 'ok', 'keep login', organizer)
        }

    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

export const loginAccount = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body

        const organizer = await prisma.organizer.findFirst({ where: { email } })
        const user = await prisma.user.findFirst({ where: { email } })
        
        if (user) {
            const passwordValid = await compare(password, user.password);
            if (passwordValid == false) return serverResponse(res, 401, 'ok', 'password incorrect!')
            const payload = { id: user.id, isOrg: user.isOrg }
            const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h'});
            return serverResponse(res, 200, 'ok', 'login success', { user, token })
        } else if (organizer) {
            const passwordValid = await compare(password, organizer.password);
            if (passwordValid == false) return serverResponse(res, 401, 'ok', 'password incorrect!')
            const payload = { id: organizer.id, isOrg: organizer.isOrg }
            const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h'});
            return serverResponse(res, 200, 'ok', 'login success', { organizer, token })
        } else {
            return serverResponse(res, 404, 'error', 'account not found')
        }

    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

// export const imageAccount = async (req: Request, res: Response) => {
//     try {
//         const { file } = req
//         if (!file) throw "No File Uploaded!"
//         const imageUrl = `http://localhost:8000/public/images/${file.filename}`

//         await prisma.author.update({
//             data: {
//                 image: imageUrl
//             },
//             where: {
//                 id: req.author?.id
//             }
//         })

//         res.status(200).send({
//             status: 'ok',
//             message: 'Upload image success'
//         })

//     } catch (err) {
//         console.log(err);
//         res.status(400).send({
//             status: 'error',
//             message: err
//         })
//     }
// }