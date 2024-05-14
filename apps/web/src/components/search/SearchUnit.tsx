'use client'
import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation";

export default function SearchUnit({ img, width, height, desc, title, className, redirect }: { img: string, width: number, height: number, desc: string, title: string, className: string, redirect: string }) {

    const router = useRouter();

    function shortenString(inputString: string, limit: number) {
        if (inputString.length > 30) {
            return inputString.substring(0, limit) + "...";
        } else {
            return inputString;
        }
    }

    function handleRedirect() {
        router.push(redirect)
    }

    return (
        <div onClick={handleRedirect} className={`flex gap-2 sm:gap-4 md:gap-6 hover:bg-blue-200 cursor-pointer ${className}`}>
            <div className="max-w-32 lg:max-w-52">
                <Image src={img} alt="" width={width} height={height} />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="font-bold tracking-wide">{title}</h3>
                <div>
                    <span className="hidden lg:block text-black/60">{ shortenString(desc, 80) }</span>
                    <span className="lg:hidden text-black/60">{ shortenString(desc, 20) }</span>
                </div>
            </div>
        </div>
    )
};

