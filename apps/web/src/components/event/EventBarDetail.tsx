import React from "react"
import { clockSVG, dollarSVG, locationSVG, peopleSVG, puzzleSVG, ticketSVG } from "@/helpers/svg"

export default function EventBarDetail() {

    // TODO:  make this component dynamic

    return (
        <div className="gap-4 flex flex-col lg:flex-row lg:border-2 border-y-2 p-2 md:p-6 justify-between">
            <div className="flex gap-2 items-center">
                { locationSVG }
                Location
            </div>
            <div className="flex gap-2 items-center">
                { clockSVG }
                Date & Time
            </div>
            <div className="flex gap-2 items-center">
                { puzzleSVG }
                Category
            </div>
            <div className="flex gap-2 items-center">
                { ticketSVG }
                Ticket types
            </div>
            <div className="flex gap-2 items-center">
                { peopleSVG }
                Available Seats
            </div>
        </div>
    )
};

