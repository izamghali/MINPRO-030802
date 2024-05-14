'use client'
import React, { useEffect, useState } from "react"
import Button from "../Button"
import EventAdmissionTicket from "./EventAdmissionTicket"

export default function EventBookMobile({ buttonFunc, buttonText }: { buttonFunc: any, buttonText:string }) {

    const [ prevScrollpos, setPrevScrollpos ] = useState(0)

    useEffect(() => {
        
        window.onscroll = function() {
            var currentScrollPos = window.scrollY;
            const bookBtn = document.getElementById('book-button');
            
            if (bookBtn === null) { return }
            if (bookBtn.style !== null) {
                if (prevScrollpos > currentScrollPos || window.scrollY === 40) {
                    console.log('scrolling to the top')
                    // bookBtn.style.top = "0";
                    bookBtn.classList.remove('translate-y-64')
                    bookBtn.classList.add('translate-y-0')
                } else {
                    console.log('scrolling to the bottom')
                    bookBtn.classList.add('translate-y-64')
                    bookBtn.classList.remove('translate-y-0')
                    // bookBtn.style.top = "-64px";
                }
            }
            setPrevScrollpos(currentScrollPos);
        }

    }, [prevScrollpos])

    return (
        <div id="book-button" className="fixed flex-col justify-between flex items-end p-4 duration-200 lg:hidden bottom-0 left-0 h-64 w-full rounded-t-xl z-20 border-2 border-black/60 bg-white ">
            
            <div className="flex flex-col gap-4 mt-4 w-full">
                <EventAdmissionTicket />
            </div>
            
            <div className="w-full border-orange-400 justify-between flex font-semibold">
                <span>Total: </span>
                <span>IDR 1.000.000</span>
            </div>

            <Button className={"w-full bg-accent rounded-full"}>{ buttonText }</Button>
        </div>
    )
};

