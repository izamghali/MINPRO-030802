'use client'
import React, { useRef, useState } from "react"
import SearchBar from "@/components/search/SearchBar"
import SearchResultBlock from "@/components/search/SearchResultBlock"
import SearchResultPage from "@/components/search/SearchResultPage"

export default function SearchResultComponent(params : { params: { eventID: string } }) {

    const [ searchbarText, setSearchbarText ] = useState('')
    const searchbarRef = useRef<any>()

    return (
        <div className="p-4 lg:p-10 flex flex-col gap-6">
            <div className="relative">
                <SearchBar searchbarText={searchbarText} searchbarRef={searchbarRef} setSearchbarText={setSearchbarText}/>
                <div className="sm:-translate-y-[5.5rem]">
                    {
                        searchbarText ? // FIX:  when there's type, fetch something (debounce)
                        <SearchResultBlock />
                        :
                        ''
                    }
                </div>
            </div>
            
            <div className="">
                <h3 className="mb-4 font-semibold">Search Result: <span className="font-normal bg-red-400">change this to what was searched</span></h3>
                <div className="h-[23rem] lg:h-[30rem] overflow-scroll">
                    <SearchResultPage/>
                </div>
            </div>
            
            {/* pagination */}
            <div className="w-full flex justify-center">
                <div className="join grid grid-cols-2 max-w-96">
                    <button className="join-item btn btn-outline">Previous page</button>
                    <button className="join-item btn btn-outline">Next</button>
                </div>
            </div>
        </div>
    )
};