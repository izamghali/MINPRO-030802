import React from "react"
import { eventsTest } from "@/helpers/dummyData"
import Card from "@/components/Card"

export default function Page() {
    return (
        <div>
            <div className="flex flex-wrap gap-4 h-screen overflow-y-scroll p-4 sm:p-8 duration-200">
                {
                    eventsTest.map((item, idx) => {
                        return <div key={idx}>
                            <Card 
                                idx={idx}
                                title={item.title} desc={item.desc} 
                                currentSeat={item.currentSeat} maxSeat={item.maxSeat}
                            />
                        </div>

                    })
                }
            </div>
        </div>
    )
};

