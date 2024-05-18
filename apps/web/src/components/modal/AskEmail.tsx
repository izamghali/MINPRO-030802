import React from "react"
import Button from "../Button"
import Image from "next/image"
import emailImg from '../../../public/illustrations/email.png'

export default function AskEmail() {
    return (
        <div>
            <dialog id="ask-email-modal" className="modal">
            <div className="modal-box flex flex-col items-center gap-4 max-w-sm">
            <h3 className="font-bold text-lg">Forgot Password?</h3>
                <Image className="w-64" src={emailImg} alt={'registration success'} />
                <p>Lost your password? Please enter your email. You will recieve a link to create a new password!</p>
                <input type="email" placeholder="Email" className="input input-bordered w-full" />
                <Button className={""} >Reset Password</Button>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>
        </div>
    )
};

