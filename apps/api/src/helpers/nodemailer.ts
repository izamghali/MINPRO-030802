import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "izamghali18@gmail.com",
        pass: "tryc dnyf slcs aeia"
    }
})