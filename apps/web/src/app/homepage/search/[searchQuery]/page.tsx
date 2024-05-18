import React from "react"
import SearchResultComponent from "@/components/search/SearchResultComponent"

export default function SearchResult(params : { params: { eventID: string } }) {

    return (
        <SearchResultComponent params={{
            eventID: ""
        }}/>
    )
};