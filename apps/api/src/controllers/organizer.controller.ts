import { serverResponse } from "@/helpers/apiResponse";
import { PrismaClient } from "@prisma/client"
import { genSalt, hash } from "bcrypt";
import { Request, Response } from "express";
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid'
import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'
import { transporter } from '../helpers/nodemailer'
import prisma from "@/prisma";

export const createOrganizer = async (req: Request, res: Response) => {
    try {
        
        const { email, password, organizerName } = req.body

        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        const existingUserEmail = await prisma.user.findUnique({ where: { email: email } })
        const existingUserName = await prisma.user.findUnique({ where: { username: organizerName }})
        const existingOrgEmail = await prisma.organizer.findUnique({ where: { email: email } })
        const existingOrgName = await prisma.organizer.findUnique({ where: { organizerName: organizerName }})
        if (existingUserEmail || existingOrgEmail) {
            return serverResponse(res, 409, 'error', 'email has been taken')
        } else if (existingOrgName || existingUserName) {
            return serverResponse(res, 409, 'error', 'organizer name has been taken')
        } 

        const organizer = await prisma.organizer.create({
            data: {
                id: uuid(),
                ...req.body,
                password: hashedPassword,
            }
        })

        const payload = {
            id: organizer.id,
            isOrg: organizer.isOrg 
        }

        const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' })
        const link = `http://localhost:3000/verify/${token}`;
        
        const templatePath = path.join(__dirname, "../templates", "register.html")
        const templateSource = fs.readFileSync(templatePath, 'utf-8')
        const compiledTemplate = handlebars.compile(templateSource)
        const html = compiledTemplate({ // NOTE:  variable to pass to html handlebars template
            name: organizer.organizerName,
            link
        })

        await transporter.sendMail({
            from: "izamghali18@gmail.com",
            to: organizer.email,
            subject: "Welcome to AdrenalineRush! Verify Your Email to Get Started",
            html
        })

        serverResponse(res, 201, 'ok', 'organizer created!')

    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
}

// export const findOrganizer = async (req: Request, res: Response) => {
//     try {

//         const org = await prisma.organizer.findUnique({
//             where: {
//                 email: req.body.email
//             }
//         })
        
//         serverResponse(res, 200, 'ok', 'found!')
//     } catch (error: any) {
//         serverResponse(res, 400, 'error', error)
//     }
// }