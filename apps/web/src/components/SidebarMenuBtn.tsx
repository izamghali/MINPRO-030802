import React from "react"
import { useDispatch } from "react-redux";
import { setPath } from "@/redux/features/pageNavigation-slice";
import { AppDispatch } from "@/redux/store";
import { setDashboardTitle } from "@/redux/features/dashboardTitle-slice";

export default function SidebarMenuBtn({ children, text, svg, className, redirect, buttonID, title }: { children?: any, text?: string, svg?: any, className?: string, func?: any, redirect?: any, buttonID?: string, title?: string }) {

    const dispatch = useDispatch<AppDispatch>();

    function handleRedirect() {
        dispatch(setPath(redirect))
        dispatch(setDashboardTitle(!text ? title : text))
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

