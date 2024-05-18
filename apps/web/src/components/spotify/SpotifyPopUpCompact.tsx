'use client'
import gsap from 'gsap'
import React, { useEffect } from "react"

export default function SpotifyPopUpCompact({ src, iframeID, className }: { src: string, iframeID: string, className: string }) {

    useEffect(() => {
        const track = document.getElementById(iframeID)
        track?.classList.remove('lg:hidden')
        track?.classList.add('lg:block')

        gsap.set(`#${iframeID}`, {
            x: '-25rem'
        })

        setTimeout(() => {
            gsap.to(`#${iframeID}`, {
                x: '0rem', duration: 2
            })
        }, 3000);

        setTimeout(() => {
            gsap.to(`#${iframeID}`, {
                x: '-25rem', duration: 2
            })
        }, 10000);
    }, [])

    return (
        <iframe
            id={iframeID}
            className={`rounded-md max-w-96 fixed z-40 lg:hidden hidden ${className} `}
            src={src}
            width="100%" height="152" frameBorder="0" allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">    
        </iframe>
    )
};