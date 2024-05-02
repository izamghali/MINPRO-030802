'use client'
import { Footer } from "@/components/Footer"
import Navbar from "@/components/Navbar"
import React from "react"
import { usePathname } from "next/navigation"

export default function Template({ children } : Readonly<{ children : React.ReactNode}>) {

    const pathname = usePathname();

    return (
        <div>
            <Navbar />

            { children }

            {
                pathname === '/' ? 
                    <Footer />
                :
                    ''
            }
            
        </div>
    )
};

