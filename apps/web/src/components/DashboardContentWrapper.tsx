import React from "react"

export default function DashboardContentWrapper({ children, contentClassName } : { children: React.ReactNode, className?: string, contentClassName: string }) {
    return (
        <div className={`flex flex-col gap-4 p-4 lg:p-6 ${contentClassName}`}>
            { children }
        </div>
    )
};

