import { arrowUpSVG } from "@/helpers/svg"
import React from "react"

export default function EventInYear({ className }: { className: string }) {
    return (
        <div className={`bg-white rounded-md p-4 lg:max-w-sm max-w-full flex flex-col md:flex-row lg:flex-col ${ className }`}>
            <div className="flex flex-col gap-4">
                <div className="flex items-center">
                    <span className="w-full font-medium">Income this</span>
                    <select className="select select-bordered w-full lg:max-w-xs">
                        <option>Year</option>
                        <option>Month</option>
                        <option>Week</option>
                    </select>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <div className="text-green-400 animate-bounce">
                        { arrowUpSVG }
                    </div>
                    <span className="font-bold text-4xl ">IDR 1.000.000</span>
                </div>
                <div className="lg:text-center">
                    <span className="text-black/60">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, asperiores.</span>
                </div>
            </div>
            <div className="divider"></div>
            <div className="divider divider-horizontal"></div>
            <div className="flex flex-col gap-4">
                <div className="flex items-center">
                    <span className="w-full font-medium">Events created in</span>
                    <select className="select select-bordered w-full lg:max-w-xs">
                        <option>Year</option>
                        <option>Month</option>
                        <option>Week</option>
                    </select>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <span className="font-bold text-4xl ">78 &nbsp;<span className="font-thin">events</span></span>
                    <div className="text-green-400 animate-bounce">
                        { arrowUpSVG }
                    </div>
                </div>
                <div className="lg:text-center">
                    <span className="text-black/60">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, asperiores.</span>
                </div>
            </div>
        </div>
    )
};

