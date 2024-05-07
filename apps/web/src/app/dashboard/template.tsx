'use client'
import React from "react"
import Drawer from "@/components/Drawer"
import SidebarMenuBtn from "@/components/SidebarMenuBtn"
import { eventsTest } from "@/helpers/dummyData";

export default function Template({ children }: { children: any }) {

    const testNumberEvent = 88
    const analyticsSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart-line" viewBox="0 0 16 16"><path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z"/></svg>
    const eventSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16"><path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/></svg>;

    function handleIsActive(buttonID: string) {
        const sidebar = document.getElementById(buttonID)
        sidebar?.classList.add('is-active')
        console.log(sidebar)
    }

    return (
        <div>
            <Drawer 
                classNameDrawer="absolute top-0 overflow-hidden -z-10"
                classNameContent="mt-20"
                classNameChildrenMenu="translate-y-[5rem]"
                childrenMenu={
                <ul className={`menu p-4 w-80 min-h-full bg-base-200 text-base-content`}>
                    <h3 className="font-bold mb-10">Drawer</h3>
                    <SidebarMenuBtn
                        redirect="/dashboard/events"
                        className="active:bg-transparent"
                        func={handleIsActive}
                        buttonID="events-btn"
                    >
                        {/* NOTE:  async/await fetching number of events */}
                        <div className="flex items-center justify-between w-full group">
                            <div className="flex items-center gap-2">
                                { eventSvg }
                                Events
                            </div>
                            { testNumberEvent > 99 ? '99+' : testNumberEvent }
                        </div>
                    </SidebarMenuBtn>
                    <SidebarMenuBtn
                        text="Analytics" svg={analyticsSvg}
                        redirect="/dashboard/analytics"
                        className="active:bg-transparent"
                        func={handleIsActive}
                        buttonID="analytics-btn"
                    />
                </ul>
                }
            >
                { children }
            </Drawer>
        </div>
    )
};

