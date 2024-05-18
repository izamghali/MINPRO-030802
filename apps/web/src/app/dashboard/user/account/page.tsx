'use client'
import Transition from "@/components/Transition"
import { dispatchRouteEffect } from "@/helpers/dispatchRoute";
import React from "react"

export default function Page() {

    dispatchRouteEffect('Account')

    return (
        <Transition>
            <div>
                This is account page
            </div>
        </Transition>
    )
};

