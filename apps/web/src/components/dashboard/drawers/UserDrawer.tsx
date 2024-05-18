'use client'
import { calendarSVG, billSVG, starSVG, heartBoxSVG, profileSVG, headsetSVG } from "@/helpers/svg"
import React from "react"
import Drawer from "../../Drawer"
import SidebarMenuBtn from "../../SidebarMenuBtn"
import { usePathname } from "next/navigation"
import { ButtonStyleChange } from "@/helpers/button.function"
import UserNav from "../navbar/UserNav"
import { useAppSelector } from "@/redux/store"

export default function UserDrawer({ children }: { children: React.ReactNode }) {


    const pathname = usePathname();
    const title = useAppSelector((state) => state.dashboardTitleReducer.value.title)

    const eventsBtnActive = new ButtonStyleChange(pathname, '/dashboard/user', 'drawer-menu-is-active', 'drawer-menu-not-active')
    const transactionBtnActive = new ButtonStyleChange(pathname, '/dashboard/user/transaction', 'drawer-menu-is-active', 'drawer-menu-not-active')
    const reviewBtnActive = new ButtonStyleChange(pathname, '/dashboard/user/review', 'drawer-menu-is-active', 'drawer-menu-not-active')
    const wishlistBtnActive = new ButtonStyleChange(pathname, '/dashboard/user/wishlist', 'drawer-menu-is-active', 'drawer-menu-not-active')
    const accountBtnActive = new ButtonStyleChange(pathname, '/dashboard/user/account', 'drawer-menu-is-active', 'drawer-menu-not-active')
    const helpCenterBtnActive = new ButtonStyleChange(pathname, '/dashboard/user/help', 'drawer-menu-is-active', 'drawer-menu-not-active')

    // guitar
    const srcDrawerImgBgUser = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/ismael-paramo-QIqbX8VvCMo-unsplash.jpg?alt=media&token=6887d66e-8728-4aac-a83a-443405bd5eb5'

    return (
        <Drawer 
            classNameDrawer="absolute top-0 overflow-hidden -z-10"
            classNameContent=""
            classNameChildrenMenu=""
            childrenMenu={
            <ul className={`menu p-4 w-80 min-h-full bg-base-200 text-base-content`}>
                <div className="relative">
                    <img className="h-screen grayscale fixed top-0 left-0 object-cover " src={srcDrawerImgBgUser} alt="" />
                    <h1 className="text-white font-semibold text-2xl z-10 relative mb-10">User Dashboard</h1>
                    <SidebarMenuBtn
                        text="Upcoming Events" svg={calendarSVG}
                        redirect="/dashboard/user"
                        className={`${eventsBtnActive.isActive} duration-300
                        focus:text-black focus:bg-gradient-to-r from-white hover:ring-2 ring-white/55 hover:bg-transparent hover:text-white`}
                        buttonID="user-drawer-btn-events" // FIX:  change this IDs
                    />
                    <SidebarMenuBtn
                        text="Transaction" svg={billSVG}
                        redirect="/dashboard/user/transaction"
                        className={`${transactionBtnActive.isActive} duration-300
                        focus:text-black focus:bg-gradient-to-r from-white hover:ring-2 ring-white/55 hover:bg-transparent hover:text-white`}
                        buttonID="user-drawer-btn-transaction"
                    />
                    <SidebarMenuBtn
                        text="Review" svg={starSVG}
                        redirect="/dashboard/user/review"
                        className={`${reviewBtnActive.isActive} duration-300
                        focus:text-black focus:bg-gradient-to-r from-white hover:ring-2 ring-white/55 hover:bg-transparent hover:text-white`}
                        buttonID="event-btn"
                    />
                    <SidebarMenuBtn
                        text="Wish List" svg={heartBoxSVG}
                        redirect="/dashboard/user/wishlist"
                        className={`${wishlistBtnActive.isActive} duration-300
                        focus:text-black focus:bg-gradient-to-r from-white hover:ring-2 ring-white/55 hover:bg-transparent hover:text-white`}
                        buttonID="event-btn"
                    />
                    <div className="w-full bg-white/90 h-[0.1rem] z-10 relative translate-y-10"></div>
                        <div className="translate-y-20">
                            <SidebarMenuBtn
                                text="Account" svg={profileSVG}
                                redirect="/dashboard/user/account"
                                className={`${accountBtnActive.isActive} duration-300
                                focus:text-black focus:bg-gradient-to-r from-white hover:ring-2 ring-white/55 hover:bg-transparent hover:text-white`}
                                buttonID="event-btn"
                            />
                            <SidebarMenuBtn
                                text="Help Center" svg={headsetSVG}
                                redirect="/dashboard/user/help"
                                className={`${helpCenterBtnActive.isActive} duration-300
                                focus:text-black focus:bg-gradient-to-r from-white hover:ring-2 ring-white/55 hover:bg-transparent hover:text-white`}
                                buttonID="event-btn"
                            />
                        </div>
                </div>
            </ul>
            }
        >
            <div className="h-screen overflow-scroll">
                <div className={`flex p-4 lg:p-6 items-center`}>
                    <h1 className="font-bold text-3xl w-full">{ title }</h1>
                    <UserNav />
                </div>
                { children }
            </div>
        </Drawer>
    )
};

