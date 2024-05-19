'use client'
import { calendarSVG, profileSVG, analyticsSVG, percentSVG, plusSVG, headsetSVG } from "@/helpers/svg"
import React, { useState } from "react"
import Drawer from "../../Drawer"
import SidebarMenuBtn from "../../SidebarMenuBtn"
import { usePathname } from "next/navigation"
import { ButtonStyleChange } from "@/helpers/button.function"
import Modal from "../../Modal"
import PromoForm from "../../promo/PromoForm"
import OrganizerNav from "../navbar/OrganizerNav"
import { useAppSelector } from "@/redux/store"
import { cleanUpPromoForm } from "@/helpers/formHandling"

export default function OrganizerDrawer({ children }: { children: React.ReactNode }) {

    const [ file, setFile ] = useState<File|null>(null);
    const testNumberEvent = 88
    const pathname = usePathname();
    const title = useAppSelector((state) => state.dashboardTitleReducer.value.title)

    const orgEventsBtnActive = new ButtonStyleChange(pathname, '/dashboard/organizer', 'org-drawer-menu-is-active', 'org-drawer-menu-not-active')
    const orgPromosBtnActive = new ButtonStyleChange(pathname, '/dashboard/organizer/promos', 'org-drawer-menu-is-active', 'org-drawer-menu-not-active')
    const orgAnalyticsBtnActive = new ButtonStyleChange(pathname, '/dashboard/organizer/analytics', 'org-drawer-menu-is-active', 'org-drawer-menu-not-active')
    const orgAccountBtnActive = new ButtonStyleChange(pathname, '/dashboard/organizer/account', 'org-drawer-menu-is-active', 'org-drawer-menu-not-active')
    const orgHelpCenterBtnActive = new ButtonStyleChange(pathname, '/dashboard/organizer/help', 'org-drawer-menu-is-active', 'org-drawer-menu-not-active')

    // underwater
    const srcDrawerImgBgOrganizer = 'https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

    function cleanUpForm() {
        cleanUpPromoForm()
        setFile(null)
    }

    return (
        <Drawer 
            classNameDrawer="absolute top-0 overflow-hidden -z-10"
            classNameContent=""
            classNameChildrenMenu=""
            childrenMenu={
            <ul className={`menu p-4 w-80 min-h-full bg-base-200 text-base-content`}>
                <div className="relative">
                    <img className="h-screen fixed top-0 left-0 object-cover" src={srcDrawerImgBgOrganizer} alt="" />
                    <h1 className="text-white font-semibold text-2xl z-10 relative mb-10">Organizer Dashboard</h1>
                    <div>
                        <SidebarMenuBtn
                                redirect="/dashboard/organizer"
                                className={`${orgEventsBtnActive.isActive} duration-300
                            focus:text-black focus:bg-white/55 active:blur-sm hover:ring-2 ring-white/55 hover:bg-transparent hover:text-white`}
                                buttonID="org-drawer-btn-events"
                                title="Events"
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
                            className={`${orgPromosBtnActive.isActive} duration-300
                            focus:text-black focus:bg-white/55 active:blur-sm hover:ring-2 ring-white/55 hover:bg-transparent hover:text-white`}
                            buttonID="org-drawer-btn-promos"
                        />
                        <SidebarMenuBtn
                            text="Analytics" svg={analyticsSVG}
                            redirect="/dashboard/organizer/analytics"
                            className={`${orgAnalyticsBtnActive.isActive} duration-300
                            focus:text-black focus:bg-white/55 active:blur-sm hover:ring-2 ring-white/55 hover:bg-transparent hover:text-white`}
                            buttonID="org-drawer-btn-analytics"
                        />
                        <div className="w-full bg-white/90 h-[0.1rem] z-10 relative translate-y-10"></div>
                        <div className="translate-y-20">
                            <SidebarMenuBtn
                                text="Account" svg={profileSVG}
                                redirect="/dashboard/organizer/account"
                                className={`${orgAccountBtnActive.isActive} duration-300
                                focus:text-black focus:bg-white/55 active:blur-sm hover:ring-2 ring-white/55 hover:bg-transparent hover:text-white`}
                                buttonID="org-drawer-btn-account"
                            />
                            <SidebarMenuBtn
                                text="Help Center" svg={headsetSVG}
                                redirect="/dashboard/organizer/help"
                                className={`${orgHelpCenterBtnActive.isActive} duration-300
                                focus:text-black focus:bg-white/55 active:blur-sm hover:ring-2 ring-white/55 hover:bg-transparent hover:text-white`}
                                buttonID="org-drawer-btn-help"
                            />

                        </div>
                    </div>
                    <Modal 
                        textBtn="Create New Promo" btnSvg={plusSVG}
                        buttonClassName="z-10 relative w-full bg-white border-none mt-80" 
                        modalClassName="lg:max-w-[60rem]"
                        modalID={"create-promo-modal"} modalTitle={"New Promo"}
                        cleanUpFunc={cleanUpForm}
                    >
                        <PromoForm file={file} setFile={setFile}  className={""} cleanUpFunc={cleanUpPromoForm} />
                    </Modal>
                </div>
            </ul>
            }
        >
            <div className="h-screen overflow-scroll">
                <div className={`flex p-4 lg:p-6 items-center`}>
                    <h1 className="font-bold text-3xl w-full">{ title }</h1>
                    <OrganizerNav />
                </div>
                { children }
            </div>
        </Drawer>
    )
};

