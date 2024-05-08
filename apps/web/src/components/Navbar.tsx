import React from "react"
import Modal from "./Modal"
import LoginForm from "./auth-components/LoginForm"
import SignUpForm from "./auth-components/SignUpForm"
import Dropdown from "./Dropdown"
import { showCloseModal } from '../helpers/modal.function'
import EventForm from "./EventForm"
import Link from "next/link"

export default function Navbar({ children, className }: { children: any, className?: string }) {

    return (
        <div className={`navbar bg-base-100 z-10 ${className}`}>

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

