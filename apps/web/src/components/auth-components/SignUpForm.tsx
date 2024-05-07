'use client'
import React, { useRef } from "react"
import Button from "../Button"
import { showCloseModal } from "@/helpers/modal.function"
import { countriesArray, passwordStyleArr } from "@/helpers/dummyData"
import SignUpOrganizerForm from "./SignUpOrganizerForm"
import SignUpUserForm from "./SignUpUserForm"
import { handleChange } from "@/helpers/onChange.function"
import { enableBtn } from "@/helpers/button.function"

export default function SignUpForm({ className, role, formID }: { className: string, role: string, formID?: string }) {

    const signupBtnRef = useRef<HTMLButtonElement>(null)

    const emailRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const domainRef = useRef<HTMLSelectElement>(null)
    const genderRef = useRef<HTMLSelectElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const dobRef = useRef<HTMLInputElement>(null)
    const referralCodeRef = useRef<HTMLInputElement>(null)

    function showLoginModal() {
        showCloseModal('login-modal',`sign-up-modal-${role}`)
    }

    function handleOrganizerChange() {
        let allTrues = handleChange(emailRef, passwordRef, confirmPasswordRef, domainRef, nameRef, 'organizer', signupBtnRef)
        enableBtn(allTrues, signupBtnRef)
    }

    function handleUserChange() {
        handleChange(emailRef, passwordRef, confirmPasswordRef, domainRef, usernameRef, 'adventurer', signupBtnRef)
    }

    function handleSubmit() {
        console.log(emailRef.current?.value)
    }

    return (
        <div>

            {
                role === 'organizer' ? 
                <SignUpOrganizerForm 
                    className={`${ className }`}
                    passwordArr={passwordStyleArr}
                    handleChangeFunc={handleOrganizerChange}
                    handleSubmitFunc={handleSubmit}
                    refs={[emailRef, nameRef, passwordRef, confirmPasswordRef, domainRef]}
                    countriesArray={countriesArray}
                /> : 
                <SignUpUserForm 
                    className={`${ className }`}
                    signupBtnRef={signupBtnRef}
                    passwordArr={passwordStyleArr}
                    handleChangeFunc={handleUserChange}
                    countriesArray={countriesArray}
                    refs={[emailRef, usernameRef, passwordRef, confirmPasswordRef, domainRef, genderRef, dobRef, referralCodeRef]}
                />
            }

            <p className="mt-4">By signing up, you agree to the&nbsp;
                <a className="underline cursor-pointer">Terms of Service</a>&nbsp; and&nbsp;
                <a className="underline cursor-pointer">Privacy Policy</a>, including&nbsp;
                <a className="underline cursor-pointer">Cookie Use</a>.
            </p>

            <div className="flex justify-end mt-8">
                <Button onClickFunc={handleSubmit} refName={signupBtnRef} className="w-full bg-accent btn-disabled" text="Sign Up" />
            </div>
            <p>Already have an account?&nbsp;
                <button onClick={showLoginModal} className="underline cursor-pointer">Login</button>
            </p>

        </div>
    )
};

