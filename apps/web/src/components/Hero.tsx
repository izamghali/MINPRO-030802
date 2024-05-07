import React from "react"

export default function Hero() {

    const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/test.mp4?alt=media&token=cc461407-d7ab-4b0d-8d46-d66b01383398'

    return (
        <div className=" w-full h-96 overflow-hidden relative">
            <video autoPlay={true} controls={false} muted loop={true} >
                <source src={srcTest} type="video/webm"/>
            </video>
            <div className="absolute left-0 top-0 flex justify-center items-center w-full h-full">

                <div className="flex flex-col">
                    <h1 className="text-white font-bold text-3xl">[some slogan]</h1>
                    <div>
                        <label className="input input-bordered 
                            flex items-center gap-2 
                            rounded-full 
                            md:w-[40rem] sm:w-[30rem] w-full ">

                            <input type="text" className="grow" placeholder="Seek your adventure.." />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>
                    </div>
                </div>

            </div>
        </div>
    )
};

