'use client'
import React from "react"
import { useRouter } from "next/navigation";

export default function SidebarMenuBtn({ children, text, svg, className, func, redirect, buttonID }: { children?: any, text?: string, svg?: any, className?: string, func?: any, redirect?: any, buttonID?: string }) {

    const router = useRouter();

    function handleRedirect() {
        func(buttonID);
        router.push(redirect)
    }

    return (
        <li className="">
            <button id={buttonID}
                onClick={handleRedirect}
                className={`h-16 flex items-center ${className} `} >
                { svg }
                { text }
                { children }
            </button>
        </li>
    )
};

