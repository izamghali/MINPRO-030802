import React, { useState } from "react"
import Button from "../Button"
import { closeModal, showCloseModal } from "@/helpers/modal.function"
import { postRequest } from "@/helpers/request/fetchRequests"
import { cleanUpForms, orgCleanUpForm } from "@/helpers/formHandling"
import { arrowLeftSVG } from "@/helpers/svg"
import Image from "next/image"
import regFailed from '../../../public/illustrations/error.png'

export default function SignUpOrganizerForm({ 
    className, handleChangeFunc, passwordArr, refs, countriesArray, loading, setLoading,
    signupBtnRef
    } : { 
    className: string, handleChangeFunc: any, passwordArr: any, refs: any, 
    countriesArray: string[], loading: boolean, setLoading : any,
    signupBtnRef: any
    }) {

    const [ statusCode, setStatusCode ] = useState(0)
    const [ emailRef, nameRef, passwordRef, confirmPasswordRef, domainRef ] = refs

    async function handleSubmit(e: any) {
        e.preventDefault()
        setLoading(true)
        const orgData = {
            organizerName: nameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            domain: domainRef.current?.value,
        }

        try {
            const res = await postRequest(orgData, 'organizers')
        
            if (res.ok) {
                setLoading(false)
                showCloseModal('sign-up-success-modal', 'sign-up-modal-organizer');
                closeModal('sign-up-failed-modal-org');
                orgCleanUpForm()
            } else {
                setStatusCode(res.status)
                setLoading(false)
                showCloseModal('sign-up-failed-modal-org', 'sign-up-modal-organizer');
            }

        } catch (error) {
            console.log(error)
        }
    }

    function showLoginModal(e: any) {
        e.preventDefault()
        showCloseModal('login-modal',`sign-up-modal-organizer`)
    }
    
    function closeAndCleanFailedModal() {
        cleanUpForms();
        showCloseModal('', 'sign-up-failed-modal')
    }

    return (
        <div className={``}>
            <form id="sign-up-form-organizer" className={` ${className} `}>

                {/* promotor name */}
                <label className="input input-bordered flex items-center gap-2 w-full sign-up-form-parent-label">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 opacity-70" viewBox="0 0 16 16"><path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"/></svg>
                        <input ref={nameRef} onChange={handleChangeFunc} type="text" className="grow " placeholder="Promotor Name" />
                    </div>
                    <div className="label w-full sm:justify-end justify-start sign-up-form-outer-label">
                        <span id="org-name-guard" className="label-text-alt text-black hidden">minimum 6 characters</span>
                    </div>
                </label>

                {/* email */}
                <label className="input input-bordered flex items-center gap-2 sign-up-form-parent-label">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input onChange={handleChangeFunc} ref={emailRef} type="text" className="grow" placeholder="Email" />
                    </div>
                    <div className="label w-full sm:justify-end justify-start sign-up-form-outer-label">
                        <span id="org-email-valid" className="label-text-alt text-green-400 hidden">Valid Email</span>
                    </div>
                </label>

                {/* domain */}
                <div>
                    <label className="input input-bordered flex items-center gap-2 pr-0 sign-up-form-parent-label">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 opacity-70" viewBox="0 0 16 16">
                            <path d="m10.495 6.92 1.278-.619a.483.483 0 0 0 .126-.782c-.252-.244-.682-.139-.932.107-.23.226-.513.373-.816.53l-.102.054c-.338.178-.264.626.1.736a.48.48 0 0 0 .346-.027ZM7.741 9.808V9.78a.413.413 0 1 1 .783.183l-.22.443a.6.6 0 0 1-.12.167l-.193.185a.36.36 0 1 1-.5-.516l.112-.108a.45.45 0 0 0 .138-.326M5.672 12.5l.482.233A.386.386 0 1 0 6.32 12h-.416a.7.7 0 0 1-.419-.139l-.277-.206a.302.302 0 1 0-.298.52z"/>
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1.612 10.867l.756-1.288a1 1 0 0 1 1.545-.225l1.074 1.005a.986.986 0 0 0 1.36-.011l.038-.037a.88.88 0 0 0 .26-.755c-.075-.548.37-1.033.92-1.099.728-.086 1.587-.324 1.728-.957.086-.386-.114-.83-.361-1.2-.207-.312 0-.8.374-.8.123 0 .24-.055.318-.15l.393-.474c.196-.237.491-.368.797-.403.554-.064 1.407-.277 1.583-.973.098-.391-.192-.634-.484-.88-.254-.212-.51-.426-.515-.741a7 7 0 0 1 3.425 7.692 1 1 0 0 0-.087-.063l-.316-.204a1 1 0 0 0-.977-.06l-.169.082a1 1 0 0 1-.741.051l-1.021-.329A1 1 0 0 0 11.205 9h-.165a1 1 0 0 0-.945.674l-.172.499a1 1 0 0 1-.404.514l-.802.518a1 1 0 0 0-.458.84v.455a1 1 0 0 0 1 1h.257a1 1 0 0 1 .542.16l.762.49a1 1 0 0 0 .283.126 7 7 0 0 1-9.49-3.409Z"/>
                        </svg>
                        <select ref={domainRef} onChange={handleChangeFunc} className="select select-bordered pl-0 w-full focus:outline-0 border-l-0 rounded-tl-none rounded-bl-none">
                            <option id="domain-placeholder-organizer" placeholder="Domain" className="">Domain</option>
                            
                            {
                                countriesArray.map((item, idx) => {
                                    return <option key={idx}>{ item }</option>
                                })
                            }
                        </select>
                    </label>
                </div>

                {/* password */}
                <label className="input input-bordered flex items-center gap-2 sign-up-form-parent-label">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input ref={passwordRef} onChange={handleChangeFunc} type="password" className="grow" placeholder="Password" />
                    </div>
                    <div id="org-password-strength" className="
                    label w-full sign-up-form-outer-label justify-start sm:justify-end
                    ">
                        { passwordArr.map((item: { status: string, style: string }, idx: number) => {
                            return <span key={idx} className={`label-text-alt hidden ${item.style}`}>{ item.status }</span>
                        }) }
                    </div>
                </label>
                
                {/* confirm password */}
                <label className="input input-bordered flex items-center gap-2 sign-up-form-parent-label">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 opacity-70 fill-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input ref={confirmPasswordRef} onChange={handleChangeFunc} type="password" className="grow" placeholder="Confirm Password" />
                    </div>
                    <div className="label w-full sign-up-form-outer-label justify-start sm:justify-end">
                        <span id="org-confirm-password" className="label-text-alt text-green-400 hidden">Match</span>
                    </div>
                </label>

                <p className="mt-4">By signing up, you agree to the&nbsp;
                    <a className="underline cursor-pointer">Terms of Service</a>&nbsp; and&nbsp;
                    <a className="underline cursor-pointer">Privacy Policy</a>, including&nbsp;
                    <a className="underline cursor-pointer">Cookie Use</a>.
                </p>

                {/* submit button */}
                <div className="flex flex-col justify-end mt-8 gap-2">
                    <Button buttonID="org-sign-up-submit-btn" refName={signupBtnRef} optionalFunc={handleSubmit} className="w-full bg-accent btn-disabled" >
                        { loading ? 
                            <span className="loading loading-spinner loading-md"></span>
                            :
                            ''
                        }
                        Sign Up
                    </Button>
                    <p>Already have an account?&nbsp;
                        <button onClick={showLoginModal} className="underline cursor-pointer">Login</button>
                    </p>
                </div>

            </form>

            {/* registration failed modal */}
            <dialog id="sign-up-failed-modal-org" className="modal">
                <div className="modal-box flex flex-col items-center gap-4">
                    <div onClick={() => showCloseModal(`sign-up-modal-organizer`, 'sign-up-failed-modal')} className="absolute left-6 text-black/60 scale-125 cursor-pointer">
                        { arrowLeftSVG } 
                    </div>
                    <h3 className="font-bold text-lg">Registration failed!</h3>
                    <Image className="w-64" src={regFailed} alt={'registration failed'} />
                    <p className="text-black/60">{ statusCode !== 409 ? 'Please try again later.' : 'Email has been existed or username has been taken!' }</p>
                    <Button optionalFunc={closeAndCleanFailedModal} className={'px-10 bg-black text-white/80 hover:text-black/80'}>Browse Instead</Button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeAndCleanFailedModal}>close</button>
                </form>
            </dialog>
        </div>
    )
};

