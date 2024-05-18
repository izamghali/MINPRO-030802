'use client'
import Button from "@/components/Button"
import Dropdown from "@/components/Dropdown"
import MenuList from "@/components/MenuList"
import { removeToken } from "@/helpers/auth/logout"
import { searchSVG, logoutSVG, calendarSVG, billSVG, starSVG, heartBoxSVG, profileSVG } from "@/helpers/svg"
import { clearCurrentAccount } from "@/redux/features/auth-slice"
import { useRouter } from "next/navigation"
import React from "react"
import { useDispatch } from "react-redux"

export default function UserNav() {

    const dispatch = useDispatch()
    const router = useRouter();

    function handleLogout() {
        removeToken()
        dispatch(clearCurrentAccount())
        router.push('/')
    }

    return (
            <div className="flex gap-4 w-full justify-end"> 
                <div className="hidden lg:flex gap-4">
                    <Button className="bg-accent" 
                        svg={searchSVG} redirect="/homepage"
                    >Browse Festivities</Button>
                    <Button optionalFunc={handleLogout} className="" text="Log Out" svg={logoutSVG} redirect="">
                        Logout
                    </Button>
                </div>

                <Dropdown 
                    className="dropdown-end lg:hidden z-10" 
                    ulClassName="flex gap-4"
                    buttonSvg={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg>}>
                    <Button className="" text="Browse Festivities" svg={searchSVG} redirect="/homepage" >Browse</Button>
                    <MenuList svg={calendarSVG} redirect={"/dashboard/user"} text={""}>Upcoming Events</MenuList>
                    <MenuList svg={billSVG} redirect={"dashbooard/user/transaction"} text={""}>Transaction</MenuList>
                    <MenuList svg={starSVG} redirect={"dashboard/user/review"} text={""}>Review</MenuList>
                    <MenuList svg={heartBoxSVG} redirect={"dashboard/user/wishlist"} text={""}>Wishlist</MenuList>
                    <Button className="" svg={profileSVG} redirect="dashboard/user/account">Account</Button>
                    <Button optionalFunc={handleLogout} className="bg-slate-800 text-slate-50 hover:text-slate-800" svg={logoutSVG} redirect="" >Logout</Button>
                </Dropdown>
            </div>
    )
};

