import { passwordStrength } from "check-password-strength";
import { enableBtn } from "./button.function";

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
    role: string, signupBtnRef: any
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