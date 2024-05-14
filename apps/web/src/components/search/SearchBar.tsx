'use client'
import React, { useRef, useState } from "react"
import { TypeAnimation } from 'react-type-animation';
import SearchResultBlock from "./SearchResultBlock";

export default function SearchBar({ searchbarText, searchbarRef, setSearchbarText }: { searchbarText: string, searchbarRef: any, setSearchbarText: any }) {

    let typeAnimation = <TypeAnimation
        sequence={[
        // Same substring at the start will only be typed out once, initially
        'Seek your adventure.',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Seek your concert.',
        1000,
        'Seek your party.',
        1000,
        'Seek your destination.',
        1000,
        'Seek your life.',
        1000,
        'Seek yourself.',
        3000
        ]}
        wrapper="span"
        speed={20}
        style={{ fontSize: '1rem', display: 'inline-block' }}
        repeat={Infinity}
    />

    function handleChangeSearchbar() {
        let searchbarValue = searchbarRef.current.value;
        if (searchbarValue) {
            setSearchbarText(true)
        } else {
            setSearchbarText(false)
        }
    }

    return (
        <div>
            <label className="input input-bordered
                flex items-center gap-2 
                rounded-full
                min-w-[18rem] sm:min-w-[26rem] md:min-w-[40rem]
            ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                <div className="relative select-text w-full">
                    { !searchbarText && 
                        <label className="font-extralight text-base absolute top-0 text-black/50 select-none">{ typeAnimation }</label>
                    }
                    <input onChange={handleChangeSearchbar} ref={searchbarRef} type="text" className="grow tracking-wide text-light w-full text-black/75 text-base font-extralight" />
                </div>
            </label>
        </div>
    )
};

