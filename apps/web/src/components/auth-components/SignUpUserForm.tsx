'use client'
import React, { useState } from "react"
import { cleanUpForms, handleChange } from "@/helpers/formHandling"
import { enableBtn } from "@/helpers/formHandling"
import { useDebounce } from "use-debounce"
import axios from 'axios'
import Button from "../Button"
import { showCloseModal } from "@/helpers/modal.function"
import { postRequest } from "@/helpers/request/fetchRequests"
import { arrowLeftSVG } from "@/helpers/svg"
import Image from "next/image"
import regFailed from '../../../public/illustrations/error.png'


export default function SignUpUserForm({ 
    className, passwordArr, refs, countriesArray, handleChangeFunc, signupBtnRef,
    loading, setLoading
    } : { 
        className: string, passwordArr: any, refs: any, countriesArray: string[], handleChangeFunc: any, signupBtnRef: any,
        loading: boolean, setLoading: any
    }) {
    
    const [ statusCode, setStatusCode ] = useState(0)
    const [ emailRef, usernameRef, passwordRef, confirmPasswordRef, domainRef, genderRef, dobRef, referralCodeRef ] = refs
    const [ debouncedFetchUserByReferral ] = useDebounce(fetchUserByReferral, 5000)
    
    async function fetchUserByReferral(referral: any) {
        try {
            let res = await axios.post('http://localhost:8000/api/users/referral', {
                refferalCode: referral
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async function referralCodeCheck(referral: string) {
        let res = await debouncedFetchUserByReferral(referral);

        let codeValid = referralCodeRef.current.parentElement.nextSibling.firstChild

        if (referral === '') {
            codeValid.classList.add('hidden')
            signupBtnRef.current?.classList.remove('btn-disabled')
            return true
        } else if (res?.data.status === 'ok') {
            codeValid.classList.remove('hidden')
            signupBtnRef.current?.classList.remove('btn-disabled')
            return true
        } else {
            codeValid.classList.add('hidden')
            signupBtnRef.current?.classList.add('btn-disabled')
            return false
        }

    }

    async function handleUserChange() {
        const genderValue = genderRef.current;
        const usernameValue = usernameRef.current;
        const dobValue = dobRef.current;
        const referralCodeValue = referralCodeRef.current;

        function genderCheck() {
            if (genderValue?.value !== 'Gender') {
                document.getElementById('gender-placeholder')?.setAttribute('disabled', 'disabled')
                return true;
            } else {
                return false;
            }
        }
 
        genderCheck();

        await debouncedFetchUserByReferral(referralCodeValue.value)

        if ((handleChange(emailRef, passwordRef, confirmPasswordRef, domainRef, usernameRef, 'user') && await referralCodeCheck(referralCodeValue?.value)) && (genderCheck() && dobValue?.value !== '')) {
            signupBtnRef.current?.classList.remove('btn-disabled')
        } else {
            signupBtnRef.current?.classList.add('btn-disabled')
        }
    }
    
    function closeAndCleanFailedModal() {
        cleanUpForms();
        showCloseModal('', 'sign-up-failed-modal')
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        setLoading(true)

        const userDate: any = dobRef.current?.value.toString().split('-')
        const year = Number(userDate[0])
        const month = Number(Number(userDate[1]) - 1)
        const date = Number(userDate[2])

        console.log(userDate)

        const dob = new Date()
        dob.setDate(date)
        dob.setMonth(month)
        dob.setFullYear(year)

        console.log(dob)
        
        const userData = {
            username: usernameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            domain: domainRef.current?.value,
            gender: genderRef.current?.value,
            referralCode: referralCodeRef.current?.value,
            dob: dob
        }

        console.log(userData)

        try {
            const res = await postRequest(userData, 'users')
            console.log(res)
        
            if (res.ok) {
                setLoading(false)
                showCloseModal('sign-up-success-modal', 'sign-up-modal-user');
                (document.getElementById('sign-up-failed-modal-user') as HTMLFormElement ).close()
                (document.getElementById('sign-up-form-user') as HTMLFormElement ).reset()
            } else {
                setStatusCode(res.status)
                setLoading(false)
                showCloseModal('sign-up-failed-modal-user', 'sign-up-modal-user');
            }

        } catch (error) {
            console.log(error)
        }
    }

    function showLoginModal(e: any) {
        e.preventDefault()
        showCloseModal('login-modal',`sign-up-modal-user`)
    }

    return (
        <div className={``}>

            <form id="sign-up-form-user" className={`${className} `}>
                {/* username */}
                <label className="input input-bordered flex items-center gap-2 sign-up-form-parent-label">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 opacity-70" viewBox="0 0 16 16"><path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/></svg>
                        <input ref={usernameRef} onChange={handleUserChange} type="text" className="grow" placeholder="Username" />
                    </div>
                    <div className="label w-full sm:justify-end justify-start sign-up-form-outer-label">
                        <span id="username-guard" className="label-text-alt text-black hidden">minimum 6 characters</span>
                    </div>
                </label>

                {/* email */}
                <div>
                    <label className="input input-bordered flex items-center gap-2 sign-up-form-parent-label">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input onChange={handleUserChange} ref={emailRef} type="text" className="grow" placeholder="Email" />
                        </div>
                        <div className="label w-full sm:justify-end justify-start sign-up-form-outer-label">
                            <span id="user-email-valid" className="label-text-alt text-green-400 hidden">Valid Email</span>
                        </div>
                    </label>
                </div>

                {/* domain */}
                <div>
                    <label className="input input-bordered flex items-center gap-2 pr-0 sign-up-form-parent-label">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 opacity-70" viewBox="0 0 16 16">
                            <path d="m10.495 6.92 1.278-.619a.483.483 0 0 0 .126-.782c-.252-.244-.682-.139-.932.107-.23.226-.513.373-.816.53l-.102.054c-.338.178-.264.626.1.736a.48.48 0 0 0 .346-.027ZM7.741 9.808V9.78a.413.413 0 1 1 .783.183l-.22.443a.6.6 0 0 1-.12.167l-.193.185a.36.36 0 1 1-.5-.516l.112-.108a.45.45 0 0 0 .138-.326M5.672 12.5l.482.233A.386.386 0 1 0 6.32 12h-.416a.7.7 0 0 1-.419-.139l-.277-.206a.302.302 0 1 0-.298.52z"/>
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1.612 10.867l.756-1.288a1 1 0 0 1 1.545-.225l1.074 1.005a.986.986 0 0 0 1.36-.011l.038-.037a.88.88 0 0 0 .26-.755c-.075-.548.37-1.033.92-1.099.728-.086 1.587-.324 1.728-.957.086-.386-.114-.83-.361-1.2-.207-.312 0-.8.374-.8.123 0 .24-.055.318-.15l.393-.474c.196-.237.491-.368.797-.403.554-.064 1.407-.277 1.583-.973.098-.391-.192-.634-.484-.88-.254-.212-.51-.426-.515-.741a7 7 0 0 1 3.425 7.692 1 1 0 0 0-.087-.063l-.316-.204a1 1 0 0 0-.977-.06l-.169.082a1 1 0 0 1-.741.051l-1.021-.329A1 1 0 0 0 11.205 9h-.165a1 1 0 0 0-.945.674l-.172.499a1 1 0 0 1-.404.514l-.802.518a1 1 0 0 0-.458.84v.455a1 1 0 0 0 1 1h.257a1 1 0 0 1 .542.16l.762.49a1 1 0 0 0 .283.126 7 7 0 0 1-9.49-3.409Z"/>
                        </svg>
                        <select ref={domainRef} onChange={handleUserChange} className="select select-bordered pl-0 w-full focus:outline-0 border-l-0 rounded-tl-none rounded-bl-none">
                            <option id="domain-placeholder-user" placeholder="Domain" className="">Domain</option>
                            
                            {
                                countriesArray.map((item, idx) => {
                                    return <option key={idx}>{ item }</option>
                                })
                            }
                        </select>
                    </label>
                </div>

                {/* gender & dob */}
                <div className="flex flex-col sm:gap-4 gap-6">
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-2">
                        {/* gender */}
                        <label className="input input-bordered flex items-center gap-2 pr-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 opacity-70" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z"/>
                            </svg>
                            <select ref={genderRef} onChange={handleUserChange} className="select select-bordered pl-0 w-full focus:outline-0 border-l-0 rounded-tl-none rounded-bl-none">
                                <option id="gender-placeholder" placeholder="Gender" className="">Gender</option>
                                <option>MALE</option>
                                <option>FEMALE</option>
                            </select>
                        </label>

                        {/* DOB */}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 opacity-70" viewBox="0 0 16 16"><path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/></svg>
                            <input id="user-dob" ref={dobRef} onChange={handleUserChange} min="1924-01-01" type="date" className="grow" placeholder="DOB" />
                        </label>
                    </div>
                    
                    {/* referral */}
                    <label className="input input-bordered flex items-center gap-2 sign-up-form-parent-label">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 opacity-70" viewBox="0 0 16 16"><path d="M2 2h2v2H2z"/><path d="M6 0v6H0V0zM5 1H1v4h4zM4 12H2v2h2z"/><path d="M6 10v6H0v-6zm-5 1v4h4v-4zm11-9h2v2h-2z"/><path d="M10 0v6h6V0zm5 1v4h-4V1zM8 1V0h1v2H8v2H7V1zm0 5V4h1v2zM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8zm0 0v1H2V8H1v1H0V7h3v1zm10 1h-1V7h1zm-1 0h-1v2h2v-1h-1zm-4 0h2v1h-1v1h-1zm2 3v-1h-1v1h-1v1H9v1h3v-2zm0 0h3v1h-2v1h-1zm-4-1v1h1v-2H7v1z"/><path d="M7 12h1v3h4v1H7zm9 2v2h-3v-1h2v-1z"/></svg>
                            <input ref={referralCodeRef} onChange={handleUserChange} type="text" className="grow" placeholder="Referral Code(Optional)" />
                        </div>
                        <div className="label w-full sm:justify-end justify-start sign-up-form-outer-label">
                            <span id="user-referral" className="label-text-alt text-green-400 hidden">Code Valid!</span>
                        </div>
                    </label>
                </div>

                {/* password */}
                <label className="input input-bordered flex items-center gap-2 sign-up-form-parent-label">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input ref={passwordRef} onChange={handleUserChange} type="password" className="grow" placeholder="Password" />
                    </div>
                    <div id="user-password-strength" className="
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
                        <input ref={confirmPasswordRef} onChange={handleUserChange} type="password" className="grow" placeholder="Confirm Password" />
                    </div>
                    <div className="label w-full sign-up-form-outer-label justify-start sm:justify-end">
                        <span id="user-confirm-password" className="label-text-alt text-green-400 hidden">Match</span>
                    </div>
                </label>

                <p className="mt-4">By signing up, you agree to the&nbsp;
                    <a className="underline cursor-pointer">Terms of Service</a>&nbsp; and&nbsp;
                    <a className="underline cursor-pointer">Privacy Policy</a>, including&nbsp;
                    <a className="underline cursor-pointer">Cookie Use</a>.
                </p>
                    
                {/* submit button */}
                <div className="flex flex-col justify-end mt-8 gap-2">
                    <Button buttonID="user-sign-up-submit-btn" optionalFunc={handleSubmit} refName={signupBtnRef} className="w-full bg-accent btn-disabled" >
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

            <dialog id="sign-up-failed-modal-user" className="modal">
                <div className="modal-box flex flex-col items-center gap-4">
                    <div onClick={() => showCloseModal(`sign-up-modal-user`, 'sign-up-failed-modal')} className="absolute left-6 text-black/60 scale-125 cursor-pointer">
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

