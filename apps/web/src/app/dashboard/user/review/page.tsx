'use client'
import DashboardContentWrapper from "@/components/DashboardContentWrapper"
import Transition from "@/components/Transition"
import { dispatchRouteEffect } from "@/helpers/dispatchRoute"
import React from "react"

export default function Page() {

    dispatchRouteEffect('Review')

    return (
        <Transition>
            <DashboardContentWrapper contentClassName={""}>
                <h2 className="font-light text-lg">How was your experience?</h2>
            </DashboardContentWrapper>
        </Transition>
    )
};

