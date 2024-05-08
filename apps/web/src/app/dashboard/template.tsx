'use client'
import React from "react"
import Drawer from "@/components/Drawer"
import SidebarMenuBtn from "@/components/SidebarMenuBtn"
import { isUserDrawer } from "@/helpers/dummyData";
import { analyticsSVG, calendarSVG, percentSVG, heartBoxSVG, starSVG, billSVG, profileSVG } from "@/helpers/svg";

export default function Template({ children }: { children: any }) {

    const testNumberEvent = 88

    function handleIsActive(buttonID: string) {
        const sidebar = document.getElementById(buttonID)
        sidebar?.classList.add('is-active')
        console.log(sidebar)
    }

    // guitar
    const srcDrawerImgBgUser = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/ismael-paramo-QIqbX8VvCMo-unsplash.jpg?alt=media&token=6887d66e-8728-4aac-a83a-443405bd5eb5'
    // underwater
    const srcDrawerImgBgOrganizer = 'https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

    return (
        <div>
            <Drawer 
                classNameDrawer="absolute top-0 overflow-hidden -z-10"
                classNameContent="mt-20"
                classNameChildrenMenu="translate-y-[5rem]"
                childrenMenu={
                <ul className={`menu p-4 w-80 min-h-full bg-base-200 text-base-content`}>
                    <h3 className="font-bold mb-10">Drawer</h3>
                    {
                        isUserDrawer ? // if user is logged in
                            <div className="relative">
                                <img className="h-screen saturate-[.25] fixed top-0 left-0" src={srcDrawerImgBgUser} alt="" />
                                <SidebarMenuBtn
                                    text="Events" svg={calendarSVG}
                                    redirect="/dashboard/user/events"
                                    className="active:bg-transparent text-white"
                                    func={handleIsActive}
                                    buttonID="event-btn"
                                />
                                <SidebarMenuBtn
                                    text="Transaction" svg={billSVG}
                                    redirect="/dashboard/user/transaction"
                                    className="active:bg-transparent text-white"
                                    func={handleIsActive}
                                    buttonID="event-btn"
                                />
                                <SidebarMenuBtn
                                    text="Review" svg={starSVG}
                                    redirect="/dashboard/user/review"
                                    className="active:bg-transparent text-white"
                                    func={handleIsActive}
                                    buttonID="event-btn"
                                />
                                <SidebarMenuBtn
                                    text="Wish List" svg={heartBoxSVG}
                                    redirect="/dashboard/user/wishlist"
                                    className="active:bg-transparent text-white"
                                    func={handleIsActive}
                                    buttonID="event-btn"
                                />
                                <SidebarMenuBtn
                                    text="Account" svg={profileSVG}
                                    redirect="/dashboard/user/account"
                                    className="active:bg-transparent text-white"
                                    func={handleIsActive}
                                    buttonID="event-btn"
                                />
                            </div>
                        : // if organizer is logged in
                            <div className="relative">
                                <img className="h-screen fixed top-0 left-0 object-cover saturate-[0.30]" src={srcDrawerImgBgOrganizer} alt="" />
                                <SidebarMenuBtn
                                    redirect="/dashboard/organizer/events"
                                    className="active:bg-transparent text-white"
                                    func={handleIsActive}
                                    buttonID="events-btn"
                                >
                                    {/* NOTE:  async/await fetching number of events */}
                                    <div className="flex items-center justify-between w-full group">
                                        <div className="flex items-center gap-2">
                                            { calendarSVG }
                                            Events
                                        </div>
                                        { testNumberEvent > 99 ? '99+' : testNumberEvent }
                                    </div>
                                </SidebarMenuBtn>
                                <SidebarMenuBtn
                                    text="Promos" svg={percentSVG}
                                    redirect="/dashboard/organizer/promos"
                                    className="active:bg-transparent text-white"
                                    func={handleIsActive}
                                    buttonID="promos-btn"
                                />
                                <SidebarMenuBtn
                                    text="Analytics" svg={analyticsSVG}
                                    redirect="/dashboard/organizer/analytics"
                                    className="active:bg-transparent text-white"
                                    func={handleIsActive}
                                    buttonID="analytics-btn"
                                />
                                <SidebarMenuBtn
                                    text="Account" svg={profileSVG}
                                    redirect="/dashboard/organizer/account"
                                    className="active:bg-transparent text-white"
                                    func={handleIsActive}
                                    buttonID="analytics-btn"
                                />
                            </div>
                    }
                </ul>
                }
            >
                { children }
            </Drawer>
        </div>
    )
};

