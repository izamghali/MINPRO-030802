'use client'
import Button from "@/components/Button"
import DashboardContentWrapper from "@/components/DashboardContentWrapper"
import Transition from "@/components/Transition"
import React from "react"
import Image from "next/image"
import { dispatchRouteEffect } from "@/helpers/dispatchRoute"

export default function Page() {

    dispatchRouteEffect('Account')

    return (
        <div>
            <Transition>
                <DashboardContentWrapper className="" contentClassName={""}>
                    <div className="flex gap-4 lg:gap-10 flex-col lg:flex-row">
                        <div className="flex flex-col justify-center lg:justify-between w-full gap-4 lg:w-2/4">
                            <div className="avatar  justify-center lg:justify-start h-full w-full">
                                <div className=" max-w-24 sm:max-w-40 lg:rounded rounded-full">
                                    <Image 
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" 
                                    alt={""} 
                                    width={500}
                                    height={500}
                                    />
                                </div>
                            </div>
                            <input type="file" placeholder="Type here" className="input input-bordered p-2 w-full lg:max-w-xs"/>
                        </div>
                        <div className="flex flex-col gap-4 w-full justify-between">
                            
                            <label className="input input-bordered flex items-center gap-2">
                                Name
                                <input type="text" className="grow" placeholder="Promotor Name" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Email
                                <input type="text" className="grow" placeholder="currentEmail@gmail.com" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Password
                                <input type="password" className="grow" placeholder="****" />
                            </label>
                        </div>

                    </div>
                    <div className="flex justify-end">
                        <Button className={"bg-accent lg:bg-slate-800 lg:text-slate-50"} >
                            Update Account
                        </Button>
                    </div>
                </DashboardContentWrapper>
            </Transition>
        </div>
    )
};

