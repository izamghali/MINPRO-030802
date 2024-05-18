import React, { Suspense, useRef, useState } from "react"
import VideoSkeleton from "./VideoSkeleton";
import VideoComponent from "./VideoComponent";
import SearchBar from "./search/SearchBar";
import SearchResultBlock from "./search/SearchResultBlock";

export default function Hero() {

    const [ searchbarText, setSearchbarText ] = useState('')
    const searchbarRef = useRef<any>()

    return (
        <div className="w-full h-full">
            <div>
                <Suspense fallback={<VideoSkeleton/>}>
                    <VideoComponent />
                </Suspense>
            </div>
            <div className="absolute left-0 top-12 sm:-top-[10rem] md:-top-10 lg:-top-6 xl:-top-2 flex justify-center items-center w-full h-full duration-200">

                <div className="flex flex-col relative">
                    <h1 className="text-white font-extralight lg:text-3xl text-xl mb-2 pl-4 tracking-wide font-mono">Don't wait to live:</h1>
                    <div className="flex justify-center">
                        <SearchBar searchbarText={searchbarText} searchbarRef={searchbarRef} setSearchbarText={setSearchbarText}/>
                        {
                            searchbarText ?
                                <SearchResultBlock />
                            :
                            ''
                        }
                    </div>
                    <span className="flex justify-end text-white font-mono font-thin tracking-wider mt-2 text-xs">/ Live a litte.</span>
                </div>

            </div>
        </div>
    )
};

