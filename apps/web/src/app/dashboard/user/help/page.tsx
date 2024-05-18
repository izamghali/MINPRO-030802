'use client'
import Transition from "@/components/Transition"
import { dispatchRouteEffect } from "@/helpers/dispatchRoute"
import React from "react"

export default function Page() {

    dispatchRouteEffect('Help Center')

    return (
        <Transition>
            <div>
                Help Page!
            </div>
        </Transition>
    )
};

