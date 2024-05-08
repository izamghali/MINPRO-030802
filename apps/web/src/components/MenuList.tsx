import React from "react"

export default function MenuList({ children, svg, className } : { children: any, svg?: any, className?: string }) {
    return (
        <li><a>
            { svg }
            { children }
        </a></li>
    )
};

