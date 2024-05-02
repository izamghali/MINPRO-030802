import React from "react"
import Button from "./Button"

export default function Dropdown(
    { children, className, buttonSvg, dropdownText, dropdownID, ulClassName }: 
    { children: any, className: string, buttonSvg?: any, dropdownText?: string, dropdownID?: string, ulClassName?: string }) {
    

    return (
        <div id={dropdownID} className={`dropdown ${className} `}>
            <Button tabIndex={0} role="button" className="btn" text={dropdownText} svg={buttonSvg} />
            <ul tabIndex={0} className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ${ulClassName}`}>
                { children }
            </ul>
        </div>
    )
};

