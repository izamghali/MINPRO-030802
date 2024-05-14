import { chevronDownSVG, minusSVG, plusSVG } from "@/helpers/svg"
import React from "react"

export default function EventAdmissionTicket() {

    const testTicketType = ['Reguler', 'VVIP', 'Nasabah Prioritas']

    return (
        <div className="flex flex-col gap-2 lg:gap-4">
            <div className="flex items-center justify-between">
                <span>Admission</span>
                <div className="flex gap-4 items-center">
                    <button className={"p-2 border-2 rounded-md"}>{ plusSVG }</button>
                    <span>1</span>
                    <button className={"p-2 border-2 rounded-md"}>{ minusSVG }</button>
                </div>
            </div>
            
            <div className="flex justify-between items-center">
                <span>Ticket type</span>
                <div className="dropdown dropdown-end">
                    <div className="flex items-center gap-2 text-slate-300 border-2 border-slate-300 p-2 rounded-md" tabIndex={0} role="button">
                        { chevronDownSVG }
                        <span className="text-black">{ 'ticket type' }</span>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-20 relative menu p-2 shadow bg-base-100 rounded-box w-52">
                        { testTicketType.map((item, idx) => {
                                return <div key={idx}>
                                    <li><a>{ item }</a></li>
                                </div>
                        }) }
                    </ul>
                </div>
            </div>
        </div>
    )
};

