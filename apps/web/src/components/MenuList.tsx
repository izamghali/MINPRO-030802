'use client'
import React from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux";
import { setPath } from "@/redux/features/pageNavigation-slice";
import { setDashboardTitle } from "@/redux/features/dashboardTitle-slice";

export default function MenuList({ children, svg, redirect, text, title } : { children: any, svg?: any, redirect: string, text: string, title?: string }) {

    const router = useRouter();
    const dispatch = useDispatch();


    function handleRedirect() {
        dispatch(setPath(redirect))
        dispatch(setDashboardTitle(!text ? title : text))
    }

    return (
        <li className="">
            <button onClick={handleRedirect} >
                { svg }
                { children }
            </button>
        </li>
    )
};

