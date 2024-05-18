export function enableBtn(arr: any, btnRef: any) {
    if (arr) {
        btnRef.current?.classList.remove('btn-disabled')
        return true;
    } else {
        btnRef.current?.classList.add('btn-disabled')
        return false;
    }
}

export function orgEnableBtn(arr: any, btnID: string) {
    const btn = document.getElementById(btnID) as HTMLButtonElement;
    if (arr) {
        btn.classList.remove('btn-disabled')
        return true;
    } else {
        btn.classList.add('btn-disabled')
        return false;
    }
}

import { passwordStrength } from "check-password-strength";

function nameCheck(elementValue: any) {
    const nameGuard = elementValue.parentElement.nextSibling.firstChild;
    if (elementValue.value !== '') {
        if (elementValue?.value.length < 6) {
            nameGuard.classList.remove('hidden')
            return false;
        } else {
            nameGuard.classList.add('hidden')
            return true;
        }
    }
}

export function handleChange(
    emailRef: any, passwordRef: any, confirmPasswordRef: any, 
    domainRef: any, nameRef: any, 
    role: string
    ) {
    const emailValue = emailRef.current;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordValue: any = passwordRef.current;
    const confirmPasswordValue = confirmPasswordRef.current;
    const nameValue: any = nameRef.current;
    const domainValue = domainRef.current;

    function passwordStrengthCheck() {
        let strongPass = passwordValue.parentNode.nextSibling.firstChild;
        let mediumPass = passwordValue.parentNode.nextSibling.firstChild.nextSibling;
        let weakPass = passwordValue.parentNode.nextSibling.firstChild.nextSibling.nextSibling;
        let tooWeakPass = passwordValue.parentNode.nextSibling.lastChild;

        let passwordPower = passwordStrength(passwordValue.value).value;

        if (passwordValue.value !== '') {
            if (passwordPower === 'Strong') {
                strongPass.classList.remove('hidden')
                mediumPass.classList.add('hidden')
                weakPass.classList.add('hidden')
                tooWeakPass.classList.add('hidden')
            } else if (passwordPower === 'Medium') {
                mediumPass.classList.remove('hidden')
                weakPass.classList.add('hidden')
                tooWeakPass.classList.add('hidden')
                strongPass.classList.add('hidden')
            } else if (passwordPower === 'Weak') {
                weakPass.classList.remove('hidden')
                tooWeakPass.classList.add('hidden')
                mediumPass.classList.add('hidden')
                strongPass.classList.add('hidden')
            } else {
                tooWeakPass.classList.remove('hidden')
                weakPass.classList.add('hidden')
                mediumPass.classList.add('hidden')
                strongPass.classList.add('hidden')
            }
        }

    }

    function emailValidityCheck() {
        const validEmail = emailValue?.value.match(emailPattern)
        const validText: any = emailValue?.parentElement?.nextSibling?.firstChild
        if (validEmail) {
            validText.classList.remove('hidden')
            return true;
        } else {
            validText.classList.add('hidden')
            return false;
        }
    }

    function passwordMatchCheck() {
        const matchedPass: any = confirmPasswordValue?.parentElement?.nextSibling?.firstChild
        if (confirmPasswordValue?.value !== '') {
            if (passwordValue?.value === confirmPasswordValue?.value) {
                matchedPass?.classList.remove('hidden')
                return true
            } else {
                matchedPass?.classList.add('hidden')
                return false
            }
        }
    }

    function domainCheck(role: string) {
        if (domainValue?.value && domainValue.value !== 'Domain') {
            document.getElementById(`domain-placeholder-${role}`)?.setAttribute('disabled', 'disabled')
            return true;
        } else {
            return false;
        }
    }

    passwordStrengthCheck();
    emailValidityCheck();
    passwordMatchCheck();
    nameCheck(nameValue);
    domainCheck(role);

    let inputs = [ 
        nameValue, emailValue, passwordValue, confirmPasswordValue
    ]
    let trues = []

    for (let input of inputs) {
        
        if (input?.value === '') {
            trues.push(false) 
        } else {
            if ((emailValidityCheck() && passwordMatchCheck()) && domainCheck(role)) {
                if (nameCheck(nameValue)) {
                    trues.push(true)
                } else {
                    trues.push(false)
                }
            } else {
                trues.push(false) 
            }
        }
    }

    let allTrues = trues.every(item => item == true);
    return allTrues
}

export function userCleanUpForm() {
    console.log('cleaning up USER form...')
    const userForm = document.getElementById('sign-up-form-user') as HTMLFormElement
    const usernameGuard = document.getElementById('username-guard')
    const userEmailValid = document.getElementById('user-email-valid')
    const userDomain = document.getElementById('domain-placeholder-user');
    const userGender = document.getElementById('gender-placeholder');
    const userDOB = document.getElementById('user-dob');
    const userReferral = document.getElementById('user-referral');
    const userPasswordStr = document.getElementById('user-password-strength');
    const userConfirmPass = document.getElementById('user-confirm-password');
    const userSubmitBtn = document.getElementById('user-sign-up-submit-btn');

    usernameGuard?.classList.add('hidden')
    userEmailValid?.classList.add('hidden')

    userDomain?.removeAttribute('disabled')
    userDomain?.setAttribute('selected', 'selected')
    
    userGender?.removeAttribute('disabled')
    userGender?.setAttribute('selected', 'selected')

    userReferral?.classList.add('hidden')
    userPasswordStr?.children[0].classList.add('hidden')
    userPasswordStr?.children[1].classList.add('hidden')
    userPasswordStr?.children[2].classList.add('hidden')
    userPasswordStr?.children[3].classList.add('hidden')
    userConfirmPass?.classList.add('hidden')
    userSubmitBtn?.classList.add('btn-disabled')
    userForm.reset()
}

export function orgCleanUpForm() {
    const orgForm = document.getElementById('sign-up-form-organizer') as HTMLFormElement
    const orgNameGuard = document.getElementById('org-name-guard');
    const orgEmailValid = document.getElementById('org-email-valid');
    const orgDomain = document.getElementById('domain-placeholder-organizer');
    const orgPasswordStr = document.getElementById('org-password-strength');
    const orgConfirmPass = document.getElementById('org-confirm-password');
    const orgSubmitBtn = document.getElementById('org-sign-up-submit-btn');

    orgNameGuard?.classList.add('hidden')
    orgEmailValid?.classList.add('hidden')
    orgDomain?.removeAttribute('disabled')
    orgDomain?.setAttribute('selected', 'selected')
    orgPasswordStr?.children[0].classList.add('hidden')
    orgPasswordStr?.children[1].classList.add('hidden')
    orgPasswordStr?.children[2].classList.add('hidden')
    orgPasswordStr?.children[3].classList.add('hidden')
    orgConfirmPass?.classList.add('hidden')
    orgSubmitBtn?.classList.add('btn-disabled')
    orgForm.reset()
}

export function cleanUpForms() {
    userCleanUpForm()
    orgCleanUpForm()
}
