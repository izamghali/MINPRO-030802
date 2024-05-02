import React from "react"

export default function Button(
{ 
    text, className, onClickFunc, 
    svg, tabIndex, role 
}: 
{ 
    text?: string, className: string, onClickFunc?: any, 
    svg?: any, tabIndex?: number, role?: string 

}) {

    return (
        <button role={role} tabIndex={tabIndex} onClick={onClickFunc} className={`btn ${className}`}>
            { svg }
            { text }
        </button>
    )
};

