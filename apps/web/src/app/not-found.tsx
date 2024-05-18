import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import notFound from '../../public/illustrations/error.png'
 
export default function NotFound() {

    const videoSrc = 'https://videos.pexels.com/video-files/3326576/3326576-hd_1920_1080_24fps.mp4'
    return (
        <div className="relative flex gap-4 justify-center items-center flex-col p-4 sm:p-6 lg:p-0 h-screen">

            <h3 className="heading-text mb-8 text-2xl lg:text-5xl lg:font-bold
             lg:absolute top-40 z-10 lg:text-white lg:tracking-widest">Too bad</h3>
            <div className="overflow-hidden">
                <Suspense fallback={<Image src={notFound} alt="image of a rocket taking a launch" />}>
                    <video className="hidden lg:block w-full blur-[1.5px] scale-105" autoPlay={true} controls={false} muted loop={true} >
                        <source src={videoSrc} type="video/webm"/>
                    </video>
                    <Image priority className="lg:hidden w-52 sm:w-64" src={notFound} alt="image of a rocket taking a launch" />
                </Suspense>
            </div>

            {/* mobile */}
            <div className="flex flex-col items-center lg:hidden gap-4">
                <p className="">Page Not Found!</p>
                <Button className={"bg-green-300 max-w-64 border-0 px-10"}>Go to Homepage</Button>
            </div>

            {/* desktop */}
            <div className="lg:absolute hidden lg:flex translate-y-52 bg-black/40 rounded-lg min-w-80 p-4 flex-col items-center gap-2">
                <p className="text-white">Page Not Found!</p>
                <Button className={"bg-green-300 max-w-64 border-0 px-10"}>Go to Homepage</Button>
            </div>
        </div>
    )
}