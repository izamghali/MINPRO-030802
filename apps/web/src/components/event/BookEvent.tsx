import { plusSVG, minusSVG, chevronDownSVG, heartSVG, shareSVG } from "@/helpers/svg"
import React from "react"
import Button from "../Button"
import EventAdmissionTicket from "./EventAdmissionTicket"

export default function BookEvent({ buttonText, buttonFunc, className }: { buttonText: string, buttonFunc: any, className: string }) {


    return (
        <div className={`${className} flex-col gap-20 border-2  rounded-md w-96 lg:h-full p-6`}>
            <div className="flex flex-col gap-6">
                <h3 className="font-semibold text-xl">Purchasing: event title</h3>
                <div className="flex flex-col gap-4 mt-4">
                    <EventAdmissionTicket />
                </div>
            
            </div>
            <div className="flex flex-col gap-2 justify-between">
                <div className="flex justify-between">
                    <span>Total</span>
                    <span>IDR 100</span>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer flex justify-start gap-2">
                        <input type="checkbox" defaultChecked className="checkbox" />
                        <span className="label-text">I aggre to terms and condition.</span> 
                    </label>
                </div>

                <Button className="w-full bg-accent border-0" optionalFunc={buttonFunc} >{ buttonText }</Button>

                <div className="flex justify-end p-2 gap-8">
                    <div className="flex items-center gap-2">
                        { heartSVG } Like
                    </div>
                    <div className="flex items-center gap-2">
                        { shareSVG } Share
                    </div>
                </div>

            </div>
        </div>
    )
};

