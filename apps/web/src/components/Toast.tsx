import React from "react"

export default function Toast({ className, id, toastColor, toastMsg }: { className: string, id: string, toastColor: string, toastMsg: string }) {
    return (
        <div id={id} className={`toast ${className}`}>
            <div className={`alert ${ toastColor } `}>
                <span>{ toastMsg }</span>
            </div>
        </div>
    )
};

