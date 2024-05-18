'use client'
import React, { Suspense, useEffect, useState } from "react"
import rocketImg from '../../../../public/illustrations/rocket.png';
import Image from "next/image";
import Button from "@/components/Button";
import VideoSkeleton from "@/components/VideoSkeleton";
import { getRequest, postRequest } from "@/helpers/request/fetchRequests";
import { useParams, useRouter } from "next/navigation";
import { parseJwt } from "@/helpers/auth/token";

export default function Page() {

    const params = useParams()
    const router = useRouter();
    const [ isOrg, setIsOrg ] = useState(false);
    const videoSrc = 'https://videos.pexels.com/video-files/15921892/15921892-uhd_3840_2160_50fps.mp4';

    useEffect(() => {

        const token = params.token;
        const decodedPayload = parseJwt(token);
        const accountRole = decodedPayload.isOrg;
        setIsOrg(accountRole)

        const activateAccount = async () => {

            try {
                const res = await getRequest(token, 'accounts/verify')

                if (!res.ok) {
                    router.push('/verify/failed')
                }

            } catch (error) {
                console.log(error)
            }
        };

        activateAccount()
    }, [])

    function redirectAccount() {
        if (isOrg) {
            router.push('/dashboard/organizer')
        } else {
            router.push('/homepage')
        }
    }

    return (
        <div className="relative flex gap-4 justify-center items-center flex-col p-4 sm:p-6 lg:p-0 h-screen">

            <h3 className="heading-text mb-8 text-2xl lg:text-5xl lg:font-bold
             lg:absolute top-40 z-10 lg:text-white lg:tracking-widest">Congratulations!</h3>
            <div className="overflow-hidden">
                <Suspense fallback={<Image src={rocketImg} alt="image of a rocket taking a launch" />}>
                    <video className="hidden lg:block w-full blur-[1.5px] scale-105" autoPlay={true} controls={false} muted loop={true} >
                        <source src={videoSrc} type="video/webm"/>
                    </video>
                    <Image priority className="lg:hidden w-52 sm:w-64" src={rocketImg} alt="image of a rocket taking a launch" />
                </Suspense>
            </div>

            {/* mobile */}
            <div className="flex flex-col items-center lg:hidden gap-4">
                <p className="">Account has been verified!</p>
                <Button optionalFunc={redirectAccount} className={"bg-violet-500 text-fuchsia-50 max-w-64 border-0"}>Go to my page!</Button>
            </div>

            {/* desktop */}
            <div className="lg:absolute hidden lg:flex translate-y-52 bg-black/40 rounded-lg min-w-80 p-4 flex-col items-center gap-2">
                <p className="text-white">Account has been verified!</p>
                <Button optionalFunc={redirectAccount} className={"bg-violet-500 text-fuchsia-50 max-w-64 border-0"}>Go to my page!</Button>
            </div>
        </div>
    )
};

