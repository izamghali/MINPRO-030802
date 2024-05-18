'use client'
import React, { useState } from "react"
import Button from "./Button"
import Image from "next/image";

export default function Card({ idx, title, desc, currentSeat, maxSeat }: { idx: number, title: string, desc: string, currentSeat: number, maxSeat: number }) {

    const [ currentHover, setCurrentHover ] = useState<any>();

    function handleMouseEnter(event: any) {
        const cardBody = event.target.parentElement.parentElement.nextSibling.nextSibling
        setCurrentHover(cardBody)
        cardBody.classList.remove('-translate-y-32')
    }

    function handleMouseLeave() {
        currentHover?.classList.add('-translate-y-32')
    }

    const imgSrc = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    return (
        <div onMouseLeave={handleMouseLeave} className="w-[27rem] max-sm:w-full relative">
            <div onMouseEnter={handleMouseEnter} className="overflow-hidden rounded-lg">
                <figure className="rounded-md z-[2] relative">
                    <Image 
                        src={imgSrc} 
                        alt="Shoes"
                        width={2400}
                        height={1594}
                        priority
                    />
                    <div className="w-full h-full bg-gradient-to-br from-black/50 absolute top-0"></div>
                </figure>
            </div>

            <div className="absolute top-4 left-4 z-[2]">
                <h2 className="card-title text-white">{ title }</h2>
            </div>

            {/*  */}
            <div id={`card-info-${idx}`} className="border-l-2 border-r-2 border-b-2 rounded-br-lg rounded-bl-lg 
                z-[1] relative duration-200 -translate-y-32">
                <div className=" p-4 flex flex-col gap-4 ">
                    <p>{ desc }</p>
                    <div className="card-actions justify-between items-center">
                        <p className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                            </svg>
                            {currentSeat}/{maxSeat}</p>
                            {/* TODO:  add prop userID from fetching */}
                        <Button title="" className="bg-accent px-10" redirect={'/dashboard/organizer/events/1'}>
                            View
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
};
