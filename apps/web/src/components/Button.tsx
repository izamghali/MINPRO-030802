'use client'
import React from "react"
import { setPath } from "@/redux/features/pageNavigation-slice"
import { setDashboardTitle } from "@/redux/features/dashboardTitle-slice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"

export default function Button(
{ 
    text, className, redirect, optionalFunc,
    svg, tabIndex, role, refName, title, children, buttonID
}: 
{ 
    text?: string, className: string, redirect?: any, title?: string
    svg?: any, tabIndex?: number, role?: string, refName?: any, optionalFunc?: any
    children?: Readonly<React.ReactNode>, buttonID?: string

}) {
    const dispatch = useDispatch<AppDispatch>();

    function handleRedirect() {
        if (redirect) {
            dispatch(setPath(redirect))
            dispatch(setDashboardTitle(!text ? title : text))
        }
    }

    return (
        <button id={`${buttonID}`} ref={refName} role={role} onClick={!redirect ? optionalFunc : handleRedirect} tabIndex={tabIndex} className={`btn ${className}`}>
            { svg }
            { children }
        </button>
    )
};

