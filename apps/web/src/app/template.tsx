'use client'
import { Footer } from "@/components/Footer"
import Navbar from "@/components/Navbar"
import React from "react"
import { usePathname } from "next/navigation"
import Dropdown from "@/components/Dropdown"
import Modal from "@/components/Modal"
import LoginForm from "@/components/auth-components/LoginForm"
import SignUpForm from "@/components/auth-components/SignUpForm"
import { showCloseModal } from "@/helpers/modal.function"
import Button from "@/components/Button"
import EventForm from "@/components/EventForm"
import MenuList from "@/components/MenuList"
import { calendarSVG, billSVG, starSVG, heartBoxSVG, profileSVG, logoutSVG, searchSVG, plusSVG } from "@/helpers/svg"
import { isUserLoggedNavbar, isUserLoggedNavbarHome } from '@/helpers/dummyData'

export default function Template({ children } : Readonly<{ children : React.ReactNode}>) {

    const pathname = usePathname();

    function showSignUpModal() {
        showCloseModal('sign-up-as-modal')
    }

    function showLoginModal() {
        showCloseModal('login-modal')
    }

    return (
        <div>
            <Navbar className="border-b-2">
                {
                    pathname === '/' ? 
                        <div>
                            {
                                isUserLoggedNavbarHome ? 
                                    // if user is logged in
                                    <div className="flex gap-4">
                                        <Dropdown 
                                            className="dropdown-end" 
                                            ulClassName=" flex gap-4"
                                            buttonSvg={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg>}>
                                            <MenuList svg={calendarSVG}>Events</MenuList>
                                            <MenuList svg={billSVG}>Transaction</MenuList>
                                            <MenuList svg={starSVG}>Review</MenuList>
                                            <MenuList svg={heartBoxSVG}>Wishlist</MenuList>
                                            <Button className="" text="Account" svg={profileSVG} />
                                            <Button className="bg-slate-800 text-slate-50 hover:text-slate-800" text="Logout" svg={logoutSVG} />
                                        </Dropdown>
                                    </div>
                                :
                                    // if user is logged out
                                    <div>
                                        <div className="gap-4 flex">
                            
                                            {/* Sign Up Modal */}
                                            <Modal modalTitle="Sign Up As" textBtn="Sign Up"
                                                modalID="sign-up-as-modal"
                                                modalClassName="max-w-96 text-center"
                                                buttonClassName="px-8 hidden md:flex"
                                            >
                                                <div className="flex flex-col gap-4">

                                                    {/* Sign Up as Organizer Modal */}
                                                    <Modal modalTitle="Sign Up as Organizer" textBtn="Organizer"
                                                        modalID="sign-up-modal-organizer"
                                                        modalClassName="max-w-96"
                                                        buttonClassName="w-full"
                                                        modalIDToClose="sign-up-as-modal"
                                                        formID="sign-up-form-organizer"
                                                    >
                                                        <SignUpForm className="flex flex-col sm:gap-4 gap-2" role="organizer"  />
                                                    </Modal>
                                                    <p className="text-center">or</p>

                                                    {/* Sign Up as User Modal */}
                                                    <Modal modalTitle="Sign Up as Adventurer" textBtn="Adventurer"
                                                        modalID="sign-up-modal-adventurer"
                                                        modalClassName="max-w-96"
                                                        buttonClassName="w-full"
                                                        modalIDToClose="sign-up-as-modal"
                                                        formID="sign-up-form-user"
                                                    >
                                                        <SignUpForm className="flex flex-col sm:gap-4 gap-2" role="adventurer" />
                                                    </Modal>
                                                </div>
                                            </Modal>   

                                            {/* Login Modal */}
                                            <Modal modalTitle="Login" textBtn="Login"
                                                modalID="login-modal"
                                                modalClassName="max-w-96"
                                                buttonClassName="px-8 hidden md:flex"
                                            >
                                                <LoginForm className="flex flex-col gap-4" />
                                            </Modal>

                                        </div>
                                    
                                        <Dropdown 
                                            className="md:hidden dropdown-end" 
                                            ulClassName=" flex gap-4"
                                            buttonSvg={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg>}>
                                            <li onClick={showSignUpModal}><a>Sign Up</a></li>
                                            <li onClick={showLoginModal}><a>Login</a></li>
                                        </Dropdown>
                                    </div>
                                    
                            }
                            
                        </div>
                    :
                        // dashboard
                        <div className="">
                            
                            {
                                isUserLoggedNavbar ? // if user is logged in
                                    
                                    <div className=""> 
                                        <div className="hidden lg:flex gap-4">
                                            <div className="">
                                                <Button className="bg-accent" text="Browse Festivites" svg={searchSVG} />
                                            </div>
                                            <div className="">
                                                <Button className="" text="Log Out" svg={logoutSVG} />
                                            </div>
                                        </div>

                                        <Dropdown 
                                            className="dropdown-end lg:hidden" 
                                            ulClassName=" flex gap-4"
                                            buttonSvg={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg>}>
                                            <Button className="" text="Browse Festivities" svg={searchSVG} />
                                            <MenuList svg={calendarSVG}>Events</MenuList>
                                            <MenuList svg={billSVG}>Transaction</MenuList>
                                            <MenuList svg={starSVG}>Review</MenuList>
                                            <MenuList svg={heartBoxSVG}>Wishlist</MenuList>
                                            <Button className="" text="Account" svg={profileSVG} />
                                            <Button className="bg-slate-800 text-slate-50 hover:text-slate-800" text="Logout" svg={logoutSVG} />
                                        </Dropdown>

                                    </div>
                                :   
                                    // if organizer is logged in
                                    <div className="flex gap-4">
                                        <Modal 
                                            modalID={"event-modal"} 
                                            modalTitle={"Create New Event"} 
                                            textBtn="Create New Event"
                                            buttonClassName="bg-accent hidden lg:flex"
                                            modalClassName=" max-w-[60rem]"
                                            btnSvg={plusSVG}
                                        >
                                            <EventForm className={""} />
                                        </Modal>
                                        
                                        <Dropdown 
                                            className="dropdown-end lg:hidden" 
                                            ulClassName="flex gap-4"
                                            buttonSvg={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg>}>
                                            <Button className="" text="Create New Event" svg={plusSVG} />
                                            <MenuList svg={calendarSVG}>Events</MenuList>
                                            <MenuList svg={billSVG}>Promos</MenuList>
                                            <MenuList svg={starSVG}>Analytics</MenuList>
                                            <Button className="" text="Account" svg={profileSVG} />
                                            <Button className="bg-slate-800 text-slate-50 hover:text-slate-800" text="Logout" svg={logoutSVG} />
                                        </Dropdown>

                                        <div>
                                            <Button className="hidden lg:flex" text="Log Out" svg={logoutSVG} />
                                        </div>
                                    </div>
                            }

                        </div>
                }
            </Navbar>

            { children }

            {
                pathname === '/' ?
                    <Footer />
                :
                    ''
            }
            
        </div>
    )
};

