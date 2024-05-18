import OrganizerDrawer from "@/components/dashboard/drawers/OrganizerDrawer"
import { useAppSelector } from "@/redux/store"
import React from "react"

export default function DashboardLayout({ children }: { children: Readonly<React.ReactNode> }) {

    return (
        <div>
            <OrganizerDrawer children={children} />
        </div>
    )
};
