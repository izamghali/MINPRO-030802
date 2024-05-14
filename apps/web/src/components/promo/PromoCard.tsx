import React from "react"
import Image from "next/image"

export default function PromoCard() {
    return (
        <div className="snap-center flex cursor-pointer bg-white duration-200 lg:min-w-[30rem] min-w-full lg:p-6 p-4 relative overflow-hidden">
            <div className="flex flex-col">
                <h3 className="font-bold mb-2">Promo Title</h3>
                <p className="z-10 w-[80%] text-black/60">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam, ipsam.</p>
            </div>
        
            <div className="hidden lg:block absolute top-0 right-0 h-full rotate-[80deg] overflow-hidden translate-x-[11.6rem]">
                <Image 
                    className="h-full -z-10 -rotate-[80deg] object-cover object-right-bottom" 
                    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    width={2970}
                    height={1980}
                    alt=""
                />
            </div>

            {/* gradient img */}
            {/* <div className="absolute top-0 right-0 h-full ">
                <img className="h-full -z-10" src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <div className="absolute top-0 right-0 z-10 h-full w-full bg-gradient-to-r to-transparent from-white"></div>
            </div> */}
        </div>
    )
};