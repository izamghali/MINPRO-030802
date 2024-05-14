import React from "react"
import BasicWrapper from "../BasicWrapper"
import PromoCard from "./PromoCard"
import { chevronLeftSVG } from "@/helpers/svg"

export default function PromoBlock({ title } : { title: string }) {
    return (
        <BasicWrapper className='bg-[#fff0e4]'>
            <div className="flex justify-between">
                <h3 className='font-bold text-2xl mb-10'>{ title }</h3>
                <div className="text-black/25 flex items-center gap-1 lg:gap-2 select-none h-fit max-sm:hidden">
                    { chevronLeftSVG }
                    <span>scroll left</span>
                </div>
            </div>
            <div className="flex overflow-scroll lg:gap-10 gap-8 snap-x snap-mandatory">
                <PromoCard />
                <PromoCard />
                <PromoCard />
            </div>
        </BasicWrapper>
    )
};

