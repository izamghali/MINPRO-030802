import React from "react"

export default function Button(
{ 
    text, className, onClickFunc, 
    svg, tabIndex, role, refName,
}: 
{ 
    text?: string, className: string, onClickFunc?: any, 
    svg?: any, tabIndex?: number, role?: string, refName?: any

}) {

    return (
        <button ref={refName} role={role} tabIndex={tabIndex} onClick={onClickFunc} className={`btn ${className}`}>
            { svg }
            { text }
        </button>
    )
};

