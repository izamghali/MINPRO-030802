'use client'
import React from "react"
import Button from "./Button"
import { showCloseModal } from "@/helpers/modal.function";

export default function Modal(
    { 
        children, textBtn, 
        modalID, modalTitle, 
        modalClassName, buttonClassName, modalIDToClose,
        btnSvg, formID
    } : 
    { 
        children: any, textBtn?: string, 
        modalID: string, modalTitle: string, 
        modalClassName?: string, btnSvg?: any
        buttonClassName?: string, 
        modalIDToClose?: string | any, formID?: string
    }) {
        
    function showModal() {
        showCloseModal(modalID, modalIDToClose)
    }

    function handleResetForm(): void {
        const form = (document.getElementById(`${ formID }`) as HTMLFormElement);
        form?.reset()
    }

    return (
        <div className="">
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <Button text={textBtn} onClickFunc={showModal} className={`${ buttonClassName }`} svg={btnSvg} />

            <dialog id={`${ modalID }`} className="modal">
                <div className={`modal-box ${ modalClassName } sm:p-6 p-4`}>
                    <h3 className="font-bold text-lg sm:mb-8 mb-4">{ modalTitle }</h3>
                    { children }
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={handleResetForm}>close</button>
                </form>
            </dialog>
        </div>
    )
};