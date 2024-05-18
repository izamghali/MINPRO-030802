import { chevronLeftSVG, singleChevronLeftSVG, singleChevronRightSVG } from "@/helpers/svg"
import React from "react"

export default function Calendar({ className }: { className: string }) {

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dates = [...Array(31).keys()]

    return (
        <div className={`bg-white rounded-md p-4 max-w-96 ${ className } `}>
            {/* month */}
            <div className="flex gap-6 items-center justify-center p-2">
                <div>
                    { singleChevronLeftSVG }
                </div>
                <div>
                    January
                </div>
                <div>
                    { singleChevronRightSVG }
                </div>
            </div>
            <div className="grid-rows-7 grid-cols-7 grid justify-between p-2">
                {
                    days.map((day, idx) => {
                        return <span key={idx} className="font-light flex items-center justify-center w-full p-1">{ day }</span>
                    })
                }
                <div></div>
                {
                    dates.map((item, idx) => {
                        return <span key={idx} className={`font-light  ${idx+1 === 11 ? 'bg-black/75 rounded-md text-white' : ''} flex items-center justify-center p-2`}>{ item + 1 }</span>
                    })
                }
            </div>
        </div>
    )
};

