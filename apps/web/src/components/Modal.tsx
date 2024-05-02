'use client'
import React from "react"
import Button from "./Button"
import { showCloseModal } from "@/helpers/modal.function";
import { usePathname } from "next/navigation";

export default function Modal(
    { 
        children, textBtn, 
        modalID, modalTitle, 
        modalClassName, buttonClassName, modalIDToClose,
        btnSvg
    } : 
    { 
        children: any, textBtn?: string, 
        modalID: string, modalTitle: string, 
        modalClassName?: string, btnSvg?: any
        buttonClassName?: string, 
        modalIDToClose?: string | any
    }) {
    

    const pathname = usePathname();
        

    function showModal() {
        showCloseModal(modalID, modalIDToClose)
    }

    return (
        <div className="">
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            {
                pathname === '/dashboard' ?
                    ''
                :
                    <Button text={textBtn} onClickFunc={showModal} className={`${ buttonClassName }`} svg={btnSvg} />
            }

            <dialog id={`${ modalID }`} className="modal">
                <div className={`modal-box ${ modalClassName }`}>
                    <h3 className="font-bold text-lg mb-8">{ modalTitle }</h3>
                    { children }
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
};

