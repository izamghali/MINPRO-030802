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
import Drawer from "@/components/Drawer"
import SidebarMenuBtn from "@/components/SidebarMenuBtn"
import Button from "@/components/Button"

export default function Template({ children } : Readonly<{ children : React.ReactNode}>) {

    const pathname = usePathname();

    function showSignUpModal() {
        showCloseModal('sign-up-as-modal')
    }

    function showLoginModal() {
        showCloseModal('login-modal')
    }

    const plusSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>
    const logoutSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/><path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/></svg>

    return (
        <div>
            <Navbar >
                {
                    pathname === '/' ?
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
                    :
                        <div>
                            <Button className="" text="Log Out" svg={logoutSvg} />
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

