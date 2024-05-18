import { setCurrentAccount } from "@/redux/features/auth-slice";
import { setDashboardTitle } from "@/redux/features/dashboardTitle-slice";
import { useAppSelector } from "@/redux/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export function dispatchRouteEffect(title: string) {
    const dispatch = useDispatch();
    useEffect(() => {  
        dispatch(setDashboardTitle(title))
    }, [])

    const currentPath = usePathname()
    const nextPath = useAppSelector((state) => state.pageNavReducer.value.current)
}

export function dispatchCurrentUser(account: any) {
    const dispatch = useDispatch();
    dispatch(setCurrentAccount(account))
}