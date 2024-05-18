'use client'
import Card from "@/components/Card";
import DashboardContentWrapper from "@/components/DashboardContentWrapper";
import Transition from "@/components/Transition"
import { dispatchRouteEffect } from "@/helpers/dispatchRoute";
import { eventsTest } from "@/helpers/dummyData";
import React from "react"

export default function Page() {

    dispatchRouteEffect('Wish List')

    // TODO:  {/* if this clicked, it'l turn to heart-no-fill, and removed from wishlist database, & remove from display */}

    return (
        <Transition>
            <DashboardContentWrapper contentClassName={""}>

                    <div className="flex flex-wrap gap-4 overflow-y-scroll duration-200">
                        {
                            eventsTest.map((item, idx) => {
                                return <div key={idx} className="relative">
                                    <div className="text-red-400 absolute z-10 bottom-[8.5rem] right-[1rem] cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-heart-fill w-6" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/></svg>
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
        </Transition>
    )
};


