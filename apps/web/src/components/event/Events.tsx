import React from "react"
import EventCard from "./EventCard"
import { chevronDownSVG } from "@/helpers/svg"
import EventFilter from "./EventFilter"
import Button from "../Button"

export default function Events() {

    function seeMoreEvents() {
        alert('belum ada fungsi apa apa bang')
    }

    return (
        <div className="p-4 lg:p-10">
            
            <EventFilter />

            <div className=" w-full
                flex flex-wrap justify-center lg:justify-between gap-6 lg:gap-10
            ">
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
            </div>
            
            <div className="flex justify-center py-4 lg:py-10">
                <Button className={"px-16"}  optionalFunc={seeMoreEvents}>
                    See More
                </Button>
            </div>
        </div>
    )
};

