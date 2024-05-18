import UserDrawer from "@/components/dashboard/drawers/UserDrawer"
import React from "react"

export default function DashboardLayout({ children }: { children: Readonly<React.ReactNode> }) {

    

    return (
        <div>
            <UserDrawer children={children} />
        </div>
    )
};
