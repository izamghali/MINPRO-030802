'use client'
import React from "react"
import Button from "./Button"
import { showCloseModal } from "@/helpers/modal.function";

export default function Modal(
    { 
        children, textBtn, 
        modalID, modalTitle, 
        modalClassName, buttonClassName, modalIDToClose,
        btnSvg, cleanUpFunc
    } : 
    { 
        children: any, textBtn?: string, 
        modalID: string, modalTitle: string, 
        modalClassName?: string, btnSvg?: any
        buttonClassName?: string, 
        modalIDToClose?: string | any, cleanUpFunc?: any
    }) {
        
    function showModal() {
        if (modalIDToClose) {
            showCloseModal(modalID, modalIDToClose)
        } else {
            (document.getElementById(modalID) as HTMLFormElement)?.showModal();
        }
    }

    function handleResetForm(): void {
        if (cleanUpFunc) {
            cleanUpFunc()
        } else return
    }

    return (
        <div className="">

            <Button optionalFunc={showModal} className={`${ buttonClassName }`} svg={btnSvg} >
                { textBtn }
            </Button>
            
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