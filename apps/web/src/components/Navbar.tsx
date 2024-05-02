"use client"
import React from "react"
import Modal from "./Modal"
import Button from "./Button"
import LoginForm from "./auth-components/LoginForm"
import SignUpForm from "./auth-components/SignUpForm"
import { usePathname } from "next/navigation"
import Dropdown from "./Dropdown"
import EventForm from "./EventForm"
import { showCloseModal } from '../helpers/modal.function'
import Drawer from "./Drawer"
import SidebarMenuBtn from "./SidebarMenuBtn"

export default function Navbar() {

    const pathname = usePathname();

    function showSignUpModal() {
        showCloseModal('sign-up-as-modal')
    }

    function showLoginModal() {
        showCloseModal('login-modal')
    }

    function showAccountModal() {
        showCloseModal('account-modal')
    }

    const profileSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>
    const keySvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16"><path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>

    return (
        <div className="navbar bg-base-100 border-b-2 border-slate-500">

            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Website</a>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">

                    {/* <li><a>Sign Up</a></li> */}

                    {/* TODO:  make this responsive */}
                    <div className="flex gap-4"> 

                        {
                            // Dashboard Menu
                            pathname === '/' ? 
                                
                                // Home Menu
                                <div className="">
                                    
                                    <div className="gap-4 flex">
                                        
                                        {/* Sign Up Modal */}
                                        <Modal modalTitle="Sign Up As" textBtn="Sign Up"
                                            modalID="sign-up-as-modal"
                                            modalClassName="w-96 text-center"
                                            buttonClassName="px-8 hidden md:flex"
                                        >
                                            <div className="flex flex-col gap-4">

                                                {/* Sign Up as Organizer Modal */}
                                                <Modal modalTitle="Sign Up as Organizer" textBtn="Organizer"
                                                    modalID="sign-up-modal-organizer"
                                                    modalClassName="w-96"
                                                    buttonClassName="w-full"
                                                    modalIDToClose="sign-up-as-modal"
                                                >
                                                    <SignUpForm className="flex flex-col gap-4" role="organizer"  />
                                                </Modal>
                                                <p className="text-center">or</p>

                                                {/* Sign Up as User Modal */}
                                                <Modal modalTitle="Sign Up as Adventurer" textBtn="Adventurer"
                                                    modalID="sign-up-modal-adventurer"
                                                    modalClassName="w-96"
                                                    buttonClassName="w-full"
                                                    modalIDToClose="sign-up-as-modal"
                                                >
                                                    <SignUpForm className="flex flex-col gap-4" role="adventurer" />
                                                </Modal>
                                            </div>
                                        </Modal>   

                                        {/* Login Modal */}
                                        <Modal modalTitle="Login" textBtn="Login"
                                            modalID="login-modal"
                                            modalClassName="w-96"
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
                            :
                                <div className="flex gap-4">

                                    {/* create new event */}
                                    <Modal
                                        textBtn="Create New Event"
                                        btnSvg={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                        </svg>}
                                        buttonClassName="hidden md:flex bg-accent"
                                        modalID="create-event-modal"
                                        modalTitle="Create New Event"
                                        modalClassName=" max-w-[70rem]"
                                    >
                                        <EventForm className="flex flex-col gap-4" />

                                    </Modal>

                                    <Dropdown 
                                        className="dropdown-end"
                                        buttonSvg={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                                        </svg>}
                                    >
                                        <li className="md:hidden"><a> {/* create new event */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                            </svg>
                                            Create new event
                                        </a></li>

                                        <li onClick={showAccountModal}><a> {/* profile */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                            </svg>
                                            Account
                                        </a></li>

                                        <li><a> {/* TODO:  logout from back-end */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                            </svg>
                                            Log Out
                                        </a></li>

                                    </Dropdown>

                                    {/* profile modal */}
                                    <Modal 
                                        modalID="account-modal"
                                        modalTitle="Account"
                                        textBtn="Profile"
                                        modalClassName="max-w-[70rem] border-2 border-violet-400"
                                    >

                                        <div className="flex flex-col justify-between border-2 border-red-400 h-[30rem]">
                                            <div className="flex">
                                                <Drawer

                                                    classNameChildrenMenu="border-2 border-red-400h h-fit"
                                                    childrenMenu={
                                                        <div className="border-2 border-green-400 h-full">
                                                            <SidebarMenuBtn text="Account" svg={profileSvg} redirect="/"/>
                                                            <SidebarMenuBtn text="Password" svg={keySvg} redirect="/"/>
                                                        </div>
                                                    }
                                                    
                                                    classNameContent="border-2 border-blue-700"
                                                >
                                                <div className="">
                                                    Hello World!
                                                </div>
                                                </Drawer>

                                                <div>

                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <Button text="Save"className="px-10"/>
                                            </div>

                                        </div>

                                    </Modal>

                                </div>
                        }

                    </div>
                </ul>
            </div>
        </div>
    )
};

