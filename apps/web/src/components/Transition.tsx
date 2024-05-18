'use client'
import React, { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { usePathname } from "next/navigation"
import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { setPath } from "@/redux/features/pageNavigation-slice"
import { useRouter } from "next/navigation"
gsap.registerPlugin(useGSAP)

export default function Transition({ children }: { children: React.ReactNode }) {

    const [ displayChildren, setDisplayChildren ] = useState(children)
    const dispatch = useDispatch<AppDispatch>();
    const container = useRef(null);
    const currentPath = usePathname();
    const nextPath = useAppSelector((state) => state.pageNavReducer.value.current)
    const router = useRouter()

    useEffect(() => {
        dispatch(setPath(nextPath))
        gsap.set(container.current, {
            y: '6rem'
        })
        gsap.to(container.current, {
            opacity: 1, duration: 0.5, y: '0rem', ease: 'power1.inOut'
        })
    }, [])

    useGSAP(() => {
        if (currentPath !== nextPath) {

            // exit transition
            gsap.to(container.current, {
                opacity: 0, duration: 0.5, y: '6rem', ease: 'power3.inOut'
            }).then(() => {
                // push to another route
                router.push(nextPath)
                setTimeout(() => {
                    setDisplayChildren(children)
                }, 1);
            })
        }
    }, [children])

    return (
        <div className="opacity-0" ref={container}>
            { children }
        </div>
    )
};

