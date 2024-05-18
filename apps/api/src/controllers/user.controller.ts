import { serverResponse } from "@/helpers/apiResponse";
import { transporter } from "@/helpers/nodemailer";
import { PrismaClient } from "@prisma/client"
import { genSalt, hash } from "bcrypt";
import { Request, Response } from "express";
import handlebars from "handlebars";
import { sign } from "jsonwebtoken";
import path from 'path';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { generateExpireDate } from '../helpers/generateExpireDate'
import prisma from "@/prisma";

export const createUser = async (req: Request, res: Response) => {
    try { 

        const { username, email, referralCode, password } = req.body;
        console.log(req.body)
        
        const totalUsers = await prisma.user.findMany();
        const initial = String(username[0]).toUpperCase() + String(username[1]).toUpperCase() + String(username[username.length - 1]).toUpperCase()
        const id = totalUsers.length + 1
        const padID = String(id).padStart(3, '0')
        const newReferral = initial + padID;
        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        const existingUserEmail = await prisma.user.findUnique({ where: { email: email } })
        const existingUserName = await prisma.user.findUnique({ where: { username: username }})
        const existingOrgEmail = await prisma.organizer.findUnique({ where: { email: email } })
        const existingOrgName = await prisma.organizer.findUnique({ where: { organizerName: username }})
        if (existingUserEmail || existingOrgEmail) {
            return serverResponse(res, 409, 'error', 'email has been taken')
        } else if (existingOrgName || existingUserName) {
            return serverResponse(res, 409, 'error', 'organizer name has been taken')
        } 

        const user = await prisma.user.create({
            data: {
                id: uuid(),
                ...req.body, 
                dob: new Date(),
                password: hashedPassword,
                referralCode: newReferral
            }
        })

        console.log('creating user:', user)

        // token
        const payload = {
            id: user.id,
            isOrg: user.isOrg 
        }
        const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' })
        const link = `http://localhost:3000/verify/${token}`;

        // nodemailer FIX:  this is not working
        const templatePath = path.join(__dirname, "../templates", "register.html")
        const templateSource = fs.readFileSync(templatePath, 'utf-8')
        const compiledTemplate = handlebars.compile(templateSource)
        const html = compiledTemplate({ // NOTE:  variable to pass to html handlebars template
            name: user.username,
            link
        })

        await transporter.sendMail({
            from: "izamghali18@gmail.com",
            to: user.email,
            subject: "Welcome to AdrenalineRush! Verify Your Email to Get Started",
            html
        })

        if (referralCode) {
            const existingReferralCode = await prisma.user.findUnique({ where: { referralCode: referralCode } });
            if (existingReferralCode) {
                await prisma.balance.create({ // add 10.000 points to those who has referral code
                    data: {
                        id: uuid(),
                        userID: existingReferralCode.id,
                        balance: 10000,
                        expireAt: generateExpireDate()
                    }
                })
    
                await prisma.user.update({
                    where: { id: user.id },
                    data : { usedReferral: true }
                })
            }
        }
        
        serverResponse(res, 201, 'ok', 'user created!')

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
        const user = await prisma.user.findUnique({ where: { referralCode: code } });

        if (!user) {
            serverResponse(res, 200, 'not really oke', 'user not found with that referral')    
        } else {
            serverResponse(res, 200, 'ok', 'fetching users by referral code...', user)
        }

    } catch (error: any) {
        console.log('ada error bang')
        serverResponse(res, 400, 'error', error)
    }
}
