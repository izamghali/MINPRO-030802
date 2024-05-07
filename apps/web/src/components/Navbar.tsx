import React from "react"
import Modal from "./Modal"
import LoginForm from "./auth-components/LoginForm"
import SignUpForm from "./auth-components/SignUpForm"
import Dropdown from "./Dropdown"
import { showCloseModal } from '../helpers/modal.function'
import EventForm from "./EventForm"
import Link from "next/link"

export default function Navbar({ children }: { children: any }) {

    const profileSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>
    const keySvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16"><path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>

    return (
        <div className="navbar bg-base-100 border-b-2 border-slate-500">

            <div className="flex-1">
                <Link href={'/'} className="btn btn-ghost text-xl">Website</Link>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    { children }
                </ul>
            </div>
        </div>
    )
};

