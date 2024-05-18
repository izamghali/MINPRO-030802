'use client'
import Calendar from "@/components/analytics/Calendar"
import Chart from "@/components/analytics/Chart"
import DonutChart from "@/components/analytics/DonutChart"
import EventInYear from "@/components/analytics/EventsInYear"
import PieChart from "@/components/analytics/PieChart"
import StackedBarChart from "@/components/analytics/StackedBarChart"
import DashboardContentWrapper from "@/components/DashboardContentWrapper"
import Transition from "@/components/Transition"
import { dispatchRouteEffect } from "@/helpers/dispatchRoute"
import React from "react"

export default function Page() {

    dispatchRouteEffect('Analytics')

    return (
        <Transition>
            <DashboardContentWrapper contentClassName=" bg-gradient-to-tl from-slate-300 w-full">
                {/* <div className=" bg-gradient-to-br from-slate-300"></div> */}

                <div className="flex gap-4 flex-col lg:flex-row overflow-x-scroll">
                    <EventInYear className={"min-w-96"} />
                    <div className="lg:hidden">
                        <Calendar className={""} />
                    </div>
                    <StackedBarChart />
                </div>
                <div className="flex gap-4 flex-col lg:flex-row">
                    <Calendar className={"hidden lg:block"} />
                    <DonutChart className={""} />
                </div>
                {/* <PieChart /> */}



                {/* <Chart /> */}

            </DashboardContentWrapper>
        </Transition>
    )
};