import React from "react"

export default function Hero() {

    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/test.mp4?alt=media&token=cc461407-d7ab-4b0d-8d46-d66b01383398' // waterfall
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/cloud-1.mp4?alt=media&token=9ea06600-156e-41d8-b1ee-daa838d208d3' // cloud 1
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/cloud-2.mp4?alt=media&token=5d214e96-2493-4652-b260-8a6e67d86f86' // cloud 2
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/roller-coaster.mp4?alt=media&token=66e2c53b-b115-4eb7-bbcf-5c26e8dc835d' // roller coaster
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/animation-1.mp4?alt=media&token=87376155-1c1f-4e9f-9ca8-26ce8bb82ddd' // animation 1
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/animation-2.mp4?alt=media&token=22c7a6c5-fa9c-40b9-a1f8-914bbcf235bd' // animation 2
    
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/853958-hd_1920_1080_30fps.mp4?alt=media&token=7369d8de-64a9-4c2a-a8fe-ff03adc9e96f' // crowd low angle
    const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/853946-hd_1920_1080_25fps.mp4?alt=media&token=57785dc3-44aa-4dbb-8696-8642f5a68dbd' // blur crowd
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/2022396-hd_1920_1080_30fps.mp4?alt=media&token=75949dc5-fbfb-4eb6-9cbf-8ab389014e0f' // crowd concert
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/3941289-uhd_3840_2160_30fps.mp4?alt=media&token=93ef46b8-64ab-4d3d-8ec5-e1b35469005b' // crowd concert high angle
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/2386935-uhd_4096_2160_24fps.mp4?alt=media&token=a2e19bd2-74ea-4504-a40c-6f08033dd3e1' // kid seeing giant aquarium

    return (
        <div className=" w-full h-96 overflow-hidden relative">
            <video autoPlay={true} controls={false} muted loop={true} >
                <source src={srcTest} type="video/webm"/>
            </video>
            <div className="absolute left-0 top-0 flex justify-center items-center w-full h-full">

                <div className="flex flex-col">
                    <h1 className="text-white font-extralight text-3xl mb-2 pl-4 tracking-wider font-mono">Don't wait to live.</h1>
                    <div className="flex justify-center">
                        <label className="input input-bordered 
                            flex items-center gap-2 
                            rounded-full
                            md:w-[40rem] sm:w-[30rem] w-80
                        ">

                            <input type="text" className="grow tracking-wide text-light" placeholder="Seek your adventure..." />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>
                    </div>
                </div>

            </div>
        </div>
    )
};

