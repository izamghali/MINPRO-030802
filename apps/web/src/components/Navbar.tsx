import React from "react"
import Link from "next/link"

export default function Navbar({ children, className }: { children: any, className?: string }) {

    return (
        <nav className={`navbar bg-base-100 ${className}`}>

            <div className="flex-1">
                <Link href={'/'} className="btn btn-ghost md:text-3xl text-2xl font-thin font-mono">生きる</Link>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    { children }
                </ul>
            </div>
        </nav>
    )
};

