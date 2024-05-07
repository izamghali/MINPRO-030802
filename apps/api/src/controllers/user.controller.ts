import { serverResponse } from "@/helpers/apiResponse";
import { PrismaClient } from "@prisma/client"
import { genSalt, hash } from "bcrypt";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    try { 

        const { username, email, referralCode, password, dob } = req.body

        const totalUsers = await prisma.user.findMany();

        const initial = String(username[0]).toUpperCase() + String(username[1]).toUpperCase() + String(username[username.length - 1]).toUpperCase()
        const id = totalUsers.length + 1
        const padID = String(id).padStart(3, '0')
        const newReferral = initial + padID;
        
        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        // const existingUser = await prisma.user.findUnique({ where: { email: email } })
        // if (existingUser) {
        //     serverResponse(res, 400, 'error', 'email has been existed!')
        // }

        const newUser = await prisma.user.create({
            data: {
                id,
                ...req.body,
                dob: new Date(),
                password: hashedPassword,
                referralCode: newReferral
            }
        })

        // console.log(existingUser)
        console.log(newUser)

        // const existingReferralCode = await prisma.user.findUnique({ where: { referralCode: referralCode } });
        // if (existingReferralCode) {
        //     await prisma.balance.create({ // add 10.000 points to those who has referral code
        //         data: {
        //             userID: existingReferralCode.id,
        //             balance: 10000,
        //             ...req.body
        //         }
        //     })

        //     await prisma.user.update({
        //         where: { id: newUser.id },
        //         data : { usedReferral: true }
        //     })
        // }

        serverResponse(res, 200, 'ok', 'user created!')

    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        serverResponse(res, 200, 'ok', 'fetching users success', users)
    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

export const getUserByReferral = async (req: Request, res: Response) => {
    try {
        let code = req.body.refferalCode
        const existingReferralCode = await prisma.user.findUnique({ where: { referralCode: code } });

        if (!existingReferralCode) {
            serverResponse(res, 200, 'not really oke', 'user not found with that referral')    
        } else {
            serverResponse(res, 200, 'ok', 'fetching users by referral code...', existingReferralCode)
        }

    } catch (error: any) {
        console.log('ada error bang')
        serverResponse(res, 400, 'error', error)
    }
}
