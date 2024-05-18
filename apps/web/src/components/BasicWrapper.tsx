import React from "react"

export default function BasicWrapper({ children, className, title }: { children: any, className?: string, title?: string }) {
    return (
        <div className={`p-4 lg:p-6 ${className} `}>
            { children }
        </div>
    )
};

