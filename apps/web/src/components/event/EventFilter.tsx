'use client'
import { categoryArr, locationArr } from "@/helpers/dummyData";
import { chevronDownSVG } from "@/helpers/svg"
import React, { useState } from "react"

export default function EventFilter() {

    const [ location, setLocation ] = useState('location');
    const [ category, setCategory ] = useState('category')

    // TODO:   fetch event based on the filter

    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 mb-4 lg:mb-0"> {/* FIX:  this might get hydration error */}
            <h2 className=" lg:py-10 py-4 font-semibold text-xl sm:text-center">Browse Festivities</h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-6 sm:items-center sm:justify-center">
                <div className="dropdown">
                    <div className="flex items-center gap-2 text-black/60" tabIndex={0} role="button">
                        in
                        { chevronDownSVG }
                        <span className="font-semibold underline-offset-4 underline text-black">{ location }</span>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-20 relative menu p-2 shadow bg-base-100 rounded-box w-52">
                        { locationArr.map((item, idx) => {
                                return <div key={idx}>
                                    <li onClick={(e: any) => setLocation(e.target.innerText)}><a>{ item }</a></li>
                                </div>
                        }) }
                    </ul>
                </div>

                <div className="dropdown">
                    <div className="flex items-center gap-2 text-black/60" tabIndex={0} role="button">
                        about
                        { chevronDownSVG }
                        <span className="font-semibold underline-offset-4 underline text-black">{ category }</span>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-20 relative menu p-2 shadow bg-base-100 rounded-box w-52">
                        { categoryArr.map((item, idx) => {
                                return <div key={idx}>
                                    <li onClick={(e: any) => setCategory(e.target.innerText)}><a>{ item }</a></li>
                                </div>
                        }) }
                    </ul>
                </div>
            </div>
        </div>
    )
};

