'use client'
import Transition from "@/components/Transition"
import { dispatchRouteEffect } from "@/helpers/dispatchRoute"
import React from "react"

export default function Page() {

    dispatchRouteEffect('Promos')

    return (
        <Transition>
            <div>
                Promo page!!!
            </div>
        </Transition>
    )
};

