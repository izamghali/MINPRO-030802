'use client'
import Hero from '@/components/Hero'
import Overview from '@/components/Overview'
import garbageImg1 from '../../public/pexels-kofoshotit-10370776.jpg'
import Events from '@/components/event/Events'
import { warningSVG } from '@/helpers/svg'
import PromoBlock from '@/components/promo/PromoBlock'
import { Footer } from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Modal from '@/components/Modal'
import LoginForm from '@/components/auth-components/LoginForm'
import Dropdown from '@/components/Dropdown'
import { showCloseModal } from '@/helpers/modal.function'
import { useEffect, useRef, useState } from 'react'
import { cleanUpForms, handleChange, orgCleanUpForm, orgEnableBtn, userCleanUpForm } from '@/helpers/formHandling'
import Button from '@/components/Button'
import Image from 'next/image'
import regSuc from '../../public/illustrations/task-done.png'
import SignUpOrganizerForm from '@/components/auth-components/SignUpOrganizerForm'
import { countriesArray, passwordStyleArr } from '@/helpers/dummyData'
import SignUpUserForm from '@/components/auth-components/SignUpUserForm'
import SpotifyPopUpCompact from '@/components/spotify/SpotifyPopUpCompact'

export default function Home() {

    const orgEmailRef = useRef<HTMLInputElement>(null)
    const orgNameRef = useRef<HTMLInputElement>(null)
    const orgPasswordRef = useRef<HTMLInputElement>(null)
    const orgConfirmPasswordRef = useRef<HTMLInputElement>(null)
    const orgDomainRef = useRef<HTMLSelectElement>(null)
    const orgSignupBtnRef = useRef<HTMLButtonElement>(null)
    const [ orgLoading, setOrgLoading ] = useState(false);
    
    const userEmailRef = useRef<HTMLInputElement>(null)
    const userNameRef = useRef<HTMLInputElement>(null)
    const userPasswordRef = useRef<HTMLInputElement>(null)
    const userConfirmPasswordRef = useRef<HTMLInputElement>(null)
    const userDomainRef = useRef<HTMLSelectElement>(null)
    const userGenderRef = useRef<HTMLSelectElement>(null)
    const userDobRef = useRef<HTMLInputElement>(null)
    const userReferralCodeRef = useRef<HTMLInputElement>(null)
    const userSignupBtnRef = useRef<HTMLButtonElement>(null)
    const [ userLoading, setUserLoading ] = useState(false);

    const loginEmailRef = useRef<HTMLInputElement>(null)
    const loginPasswordRef = useRef<HTMLInputElement>(null)
    const loginRefs = [ loginEmailRef, loginPasswordRef ]

    const orgRefs = [ orgEmailRef, orgNameRef, orgPasswordRef, orgConfirmPasswordRef, orgDomainRef, orgSignupBtnRef ]
    const userRefs = [ userEmailRef, userNameRef, userPasswordRef, userConfirmPasswordRef, userDomainRef, userGenderRef, userDobRef, userReferralCodeRef, userSignupBtnRef ]

    const pollutionText = "Discover the lasting impact of garbage pollution on ecosystems, wildlife, and human health. \
    Our collective actions matter—reduce waste, recycle more, embrace sustainable packaging, and advocate for better waste management policies. \
    Let’s work together for a cleaner, healthier planet. Join us in the fight against garbage pollution today!"

    function showLoginCloseSuccess() {
        showCloseModal('login-modal', 'sign-up-success-modal')
        cleanUpForms()
    }

    function handleOrganizerChange() {
        let allTrues = handleChange(orgEmailRef, orgPasswordRef, orgConfirmPasswordRef, orgDomainRef, orgNameRef, 'organizer')
        orgEnableBtn(allTrues, 'org-sign-up-submit-btn')
    }

    function handleUserChange() {
        handleChange(userEmailRef, userPasswordRef, userConfirmPasswordRef, userDomainRef, userNameRef, 'user')
    }

    function cleanUpLogin() {
        (document.getElementById('login-form') as HTMLFormElement)?.reset()
    }

    return (
        <main className={``}>
            
            <Navbar>
                <div className="gap-4 flex z-10 relative">         
                    <Modal modalTitle="Sign Up As" textBtn="Sign Up"
                    modalID="sign-up-as-modal"
                    modalClassName="max-w-96 text-center"
                    buttonClassName="px-8 hidden md:flex">
                        <div className="flex flex-col gap-4">

                            <Modal modalTitle="Sign Up as Organizer" textBtn="Organizer"
                                modalID="sign-up-modal-organizer"
                                modalClassName="max-w-96"
                                buttonClassName="w-full"
                                modalIDToClose="sign-up-as-modal"
                                cleanUpFunc={orgCleanUpForm}
                            >
                                <SignUpOrganizerForm
                                    loading={orgLoading} setLoading={setOrgLoading}
                                    className={`flex flex-col sm:gap-4 gap-2`}
                                    passwordArr={passwordStyleArr}
                                    handleChangeFunc={handleOrganizerChange}
                                    refs={orgRefs}
                                    countriesArray={countriesArray} signupBtnRef={orgSignupBtnRef}
                                    /> 
                            </Modal>
                            <div className="divider">OR</div>

                            <Modal modalTitle="Sign Up as User" textBtn="User"
                                modalID="sign-up-modal-user"
                                modalClassName="max-w-96"
                                buttonClassName="w-full"
                                modalIDToClose="sign-up-as-modal"
                                cleanUpFunc={userCleanUpForm}
                            >
                                <SignUpUserForm
                                    loading={userLoading} setLoading={setUserLoading}
                                    className={`flex flex-col sm:gap-4 gap-2`}
                                    signupBtnRef={userSignupBtnRef}
                                    passwordArr={passwordStyleArr}
                                    handleChangeFunc={handleUserChange}
                                    countriesArray={countriesArray}
                                    refs={userRefs}
                                />
                            </Modal>
                        </div>
                    </Modal>   
                    
                    {/* registration success modal */}
                    <dialog id="sign-up-success-modal" className="modal">
                        <div className="modal-box flex flex-col items-center gap-4">
                            <h3 className="font-bold text-lg">Registration Success</h3>
                            <Image priority className="w-64" src={regSuc} alt={'registration success'} />
                            <p className="text-black/60">Check your email to verify account.</p>
                            <Button optionalFunc={showLoginCloseSuccess} className={'px-10 bg-accent'}>Login Now</Button>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={cleanUpForms} >close</button>
                        </form>
                    </dialog>

                    <Modal modalTitle="Login" textBtn="Login"
                        modalID="login-modal"
                        modalClassName="max-w-96 overflow-visible"
                        buttonClassName="px-8 hidden md:flex"
                        cleanUpFunc={cleanUpLogin}
                    >
                        <LoginForm refs={loginRefs} className="flex flex-col gap-4" />
                    </Modal>

                    <Dropdown 
                        className="md:hidden dropdown-end" 
                        ulClassName=" flex gap-4"
                        buttonSvg={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg>}>
                        <li onClick={() => (document.getElementById('sign-up-as-modal') as HTMLFormElement ).showModal() }><a>Sign Up</a></li>
                        <li onClick={() => (document.getElementById('login-modal') as HTMLFormElement ).showModal() }><a>Login</a></li>
                    </Dropdown>
                </div>
            </Navbar>
            <Hero/>
            <Events />
            <SpotifyPopUpCompact 
                src={'https://open.spotify.com/embed/track/7AKxbxzkxm2ERWrd1ggniO?utm_source=generator&theme=0'} 
                iframeID={'spotify-track-ichiko'} 
                className={'bottom-4 left-4'} 
            />
            <PromoBlock title='Discover Promos' />
            <Overview 
                className={''} src={garbageImg1} 
                heading={'Beat Garbage Pollution!'} text={pollutionText}
                buttonClassName='bg-red-400' svg={warningSVG}
                altText='a picture of a kid hugging a pillow, standing on a garbage land'
            />
            <Footer />
        </main>
    )
}

