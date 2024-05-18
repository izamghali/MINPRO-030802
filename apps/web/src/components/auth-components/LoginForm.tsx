'use client'
import React, { useState } from "react"
import Button from "../Button"
import { showCloseModal } from "@/helpers/modal.function"
import AskEmail from "../modal/AskEmail"
import { googleSVG } from "@/helpers/svg"
import { postRequest } from "@/helpers/request/fetchRequests"
import Cookies from "js-cookie"
import Toast from "../Toast"
import { useDispatch } from "react-redux"
import { dispatchCurrentUser } from "@/helpers/dispatchRoute"
import { setCurrentAccount } from "@/redux/features/auth-slice"
import { useRouter } from "next/navigation"

export default function LoginForm({ className, refs }: { className: string, refs: any }) {

    const dispatch = useDispatch();
    const router = useRouter();
    const [ loginEmailRef, loginPasswordRef ] = refs;
    const [ loading, setLoading ] = useState(false)
    const [ statusCode, setStatusCode ] = useState(0)

    function showSignUpModal() {
        showCloseModal('sign-up-as-modal', 'login-modal')
    }

    function showForgotPass() {
        showCloseModal('ask-email-modal', 'login-modal')
    }

    function cleanUpLogin() {
        (document.getElementById('login-form') as HTMLFormElement)?.reset()
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        const email:string = loginEmailRef.current.value
        const password:string = loginPasswordRef.current.value

        const loginData = {
            email: email,
            password: password
        }

        try {
            const res = await (postRequest(loginData, 'accounts/login'))

            const notFoundToast = (document.getElementById('toast-password-account-not-found'))
            const passwordInc = (document.getElementById('toast-password-incorrect'))
            const data = await res.json()
            
            if (res.ok) {
                setLoading(false);
                passwordInc?.classList.add('hidden');
                notFoundToast?.classList.add('hidden');
                const token = data.data.token;
                const account = data.data.user || data.data.organizer;
                
                dispatch(setCurrentAccount(account))
                Cookies.set('token', token);
                if (!account.isOrg) {
                    Cookies.set('account', 'user');
                    router.push('/homepage')
                } else {
                    Cookies.set('account', 'organizer');
                    router.push('/dashboard/organizer')
                }               
                
                (document.getElementById('login-form') as HTMLFormElement)?.close();
                cleanUpLogin();
                
            } else {
                setStatusCode(res.status)
                
                document.getElementById('login-modal')?.classList.add('animate-shake')
                setTimeout(() => {
                    document.getElementById('login-modal')?.classList.remove('animate-shake')
                }, 1000);

                setTimeout(() => {
                    if (res.status === 404) {
                        notFoundToast?.classList.remove('hidden');
                        passwordInc?.classList.add('hidden');
                    } else {
                        passwordInc?.classList.remove('hidden');
                        notFoundToast?.classList.add('hidden');
                    }
                }, 1000);

                // setLoading(false)
                // showCloseModal('sign-up-failed-modal-org', 'sign-up-modal-organizer');
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form id="login-form" className={`${className}`}>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input ref={loginEmailRef} type="text" className="grow" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input ref={loginPasswordRef} type="password" className="grow" placeholder="Password" />
                    <span onClick={showForgotPass} className="label-text-alt text-black/60 hover:text-blue-600 left-2 absolute top-[3.2rem] cursor-pointer">Forgot Password?</span>
                </label>

                <div className="flex justify-end mt-8">
                    <Button optionalFunc={handleSubmit} className="w-full bg-accent">
                        { loading ? 
                            <span className="loading loading-spinner loading-md"></span>
                            :
                            ''
                        }
                        Login
                    </Button>
                </div>

                <div className="divider">OR</div>
                <div className="flex justify-center flex-col mb-3">
                    <Button className="rounded-full w-full" svg={ googleSVG }>Login with Google</Button>
                </div>
            </form>

            <p className="text-center">Don't have account?&nbsp;
                <button onClick={showSignUpModal} className="underline cursor-pointer">Sign Up</button>
            </p>
        
                <Toast 
                    id='toast-password-incorrect'
                    className='toast-top toast-center absolute -top-52 hidden'
                    toastMsg='Password incorrect!' 
                    toastColor={'bg-red-400 text-white border-0'}
                />

                <Toast 
                    id='toast-password-account-not-found'
                    className='toast-top toast-center absolute -top-52 hidden'
                    toastMsg='Account Not Found!' 
                    toastColor={'bg-red-400 text-white border-0'}
                />

            <AskEmail/>
        </div>
    )
};

