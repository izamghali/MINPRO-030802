import React, { Suspense } from "react"
import Image from "next/image"
import Button from "@/components/Button"
import errorImg from '../../../../public/illustrations/error.png'
import { arrowRightSVG } from "@/helpers/svg";

export default function Page() {

    const videoSrc = 'https://videos.pexels.com/video-files/15921892/15921892-uhd_3840_2160_50fps.mp4';
    
    return (
        <div className="relative flex gap-4 justify-center items-center flex-col p-4 sm:p-6 lg:p-0 h-screen">

            <h3 className="heading-text mb-8 text-2xl lg:text-5xl lg:font-bold
             lg:absolute top-40 z-10 lg:text-white lg:tracking-widest">We're Sorry :(</h3>
            <div className="overflow-hidden">
                <Suspense fallback={<Image src={errorImg} alt="Image indicating error" />}>
                    <video className="hidden lg:block w-full blur-[1.5px] scale-105" autoPlay={true} controls={false} muted loop={true} >
                        <source src={videoSrc} type="video/webm"/>
                    </video>
                    <Image priority className="lg:hidden w-52 sm:w-64" src={errorImg} alt="Image indicating error" />
                </Suspense>
            </div>

            {/* mobile */}
            <div className="flex flex-col items-center lg:hidden gap-4">
                <p className="">Invalid token or token has been expired!</p>
                <Button className={"bg-violet-600 text-white max-w-64 border-0"}>
                    Go to Homepage
                    { arrowRightSVG }
                </Button>
            </div>

            {/* desktop */}
            <div className="lg:absolute hidden lg:flex translate-y-52 bg-black/40 rounded-lg min-w-80 p-4 flex-col items-center gap-2">
                <p className="text-white">Invalid token or token has been expired!</p>
                <Button className={"bg-violet-600 text-white max-w-64 border-0"}>
                    Go to Homepage
                    { arrowRightSVG }
                </Button>
            </div>
        </div>
    )
};

