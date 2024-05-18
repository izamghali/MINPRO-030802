'use client'
import Card from "@/components/Card"
import DashboardContentWrapper from "@/components/DashboardContentWrapper"
import Transition from "@/components/Transition"
import { dispatchRouteEffect } from "@/helpers/dispatchRoute"
import { eventsTest } from "@/helpers/dummyData"
import React from "react"

// /dashboard/user
export default function Page() {

    dispatchRouteEffect('Upcoming Events')

    return (
        <Transition>
            <main>
                <DashboardContentWrapper
                    contentClassName={""}>

                    <div className="flex flex-wrap gap-4 overflow-y-scroll duration-200">
                        {
                            eventsTest.map((item, idx) => {
                                return <div key={idx} className="">
                                    <div className="flex items-center justify-between border-t-2 border-x-2 border-black/15 p-2 pb-4 rounded-tr-md rounded-tl-md translate-y-2">
                                        <div className="flex items-center gap-2">
                                            { idx === 2 ? 
                                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                                :
                                                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div> 
                                            }
                                            { idx === 2 ? 
                                                <span>Paid</span>
                                                :
                                                <span>Pending</span>
                                            }
                                        </div>
                                        <div>20:18:34</div>
                                    </div>
                                    <Card 
                                        idx={idx}
                                        title={item.title} desc={item.desc} 
                                        currentSeat={item.currentSeat} maxSeat={item.maxSeat}
                                    />
                                </div>

                            })
                        }
                    </div>
                    
                </DashboardContentWrapper>
            </main>
        </Transition>
        
    )
};

