'use client'
import Button from "@/components/Button"
import Dropdown from "@/components/Dropdown"
import MenuList from "@/components/MenuList"
import Modal from "@/components/Modal"
import EventForm from "@/components/event/EventForm"
import { removeToken } from "@/helpers/auth/logout"
import { eventCleanUpForm } from "@/helpers/formHandling"
import { showCloseModal } from "@/helpers/modal.function"
import { plusSVG, logoutSVG, percentSVG, calendarSVG, billSVG, starSVG, profileSVG } from "@/helpers/svg"
import { clearCurrentAccount } from "@/redux/features/auth-slice"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

export default function OrganizerNav() {
    const [ ticketData, setTicketData ] = useState<{ ticketType: string, price: number }[]>([]);
    const [ files, setFiles ] = useState<File[]>([]);

    function showEventModal() {
        return showCloseModal('event-modal', '')
    }
    function showCreatePromoModal() {
        return showCloseModal('create-promo-modal', '')
    }
    
    const dispatch = useDispatch()
    const router = useRouter();

    function handleLogout() {
        removeToken()
        dispatch(clearCurrentAccount())
        router.push('/')
    }

    function cleanUpEventForm() {
        setTicketData([])
        setFiles([])
        eventCleanUpForm();
    }

    return (
        <div className="flex gap-4 w-full justify-end">
            <Modal
                modalID={"event-modal"}
                modalTitle={"Create New Event"}
                textBtn="Create New Event"
                buttonClassName="bg-accent hidden lg:flex"
                modalClassName="max-w-[60rem]"
                btnSvg={plusSVG}
                cleanUpFunc={cleanUpEventForm}
            >
                <EventForm cleanUpFunc={cleanUpEventForm} ticketData={ticketData} setTicketData={setTicketData} className={""} files={files} setFiles={setFiles} />
            </Modal>

            <div>
                <Button optionalFunc={handleLogout} className="hidden lg:flex" svg={logoutSVG} redirect={""} >
                    Log Out
                </Button>
            </div>

            <Dropdown
                className="dropdown-end lg:hidden z-10"
                ulClassName="flex gap-4"
                buttonSvg={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" /></svg>}>
                <Button className="" optionalFunc={showEventModal} svg={plusSVG}  >
                    Create New Event
                </Button>
                <Button className="" optionalFunc={showCreatePromoModal} svg={percentSVG}  >
                    Create New Promo
                </Button>
                <MenuList svg={calendarSVG} redirect={"/dashboard/organizer"} text={"Events"}>Events</MenuList>
                <MenuList svg={billSVG} redirect={""} text={"Promos"}>Promos</MenuList>
                <MenuList svg={starSVG} redirect={""} text={"Analytics"}>Analytics</MenuList>
                <MenuList svg={profileSVG} redirect={"/dashboard/organizer/account"} text={"Account"}>Account</MenuList>
                <Button optionalFunc={handleLogout} className="bg-slate-800 text-slate-50 hover:text-slate-800" svg={logoutSVG} redirect={""} >
                    Logout
                </Button>
            </Dropdown>
        </div>
    )
};

