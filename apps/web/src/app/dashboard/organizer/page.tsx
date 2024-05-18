'use client'
import Card from "@/components/Card"
import DashboardContentWrapper from "@/components/DashboardContentWrapper"
import Transition from "@/components/Transition"
import { eventsTest } from "@/helpers/dummyData"
import { setDashboardTitle } from "@/redux/features/dashboardTitle-slice"
import { useAppSelector } from "@/redux/store"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"


// /dashboard/organizer
export default function Page() {
    
    // TODO:  fetch events and map it here
    // TODO:  activate button
    
    const dispatch = useDispatch();
    useEffect(() => {  
        dispatch(setDashboardTitle('Events'))
    }, [])

    const currentPath = usePathname()
    const nextPath = useAppSelector((state) => state.pageNavReducer.value.current)

    return (
        <Transition>
            <main className="">
                <DashboardContentWrapper
                    contentClassName={""}>

                    <div className="flex flex-wrap gap-4 h-screen overflow-y-scroll duration-200">
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
                    
                </DashboardContentWrapper>

            </main>
        </Transition>
    )
};


