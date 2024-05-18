'use client'
import DashboardContentWrapper from "@/components/DashboardContentWrapper"
import Transition from "@/components/Transition"
import Table from "@/components/analytics/Table"
import { dispatchRouteEffect } from "@/helpers/dispatchRoute"
import React from "react"

export default function Page() {

    dispatchRouteEffect('Transaction')

    const testColumn = [ 'transaction ID', 'Event Name', 'Seats Ordered', 'Total Paid', 'Ordered At', 'Status' ]

    const testTransaction = [
        {
            id: '001',
            eventName: 'Ujian Chunin (Naruto vs Neji)',
            seatsOrdered: '2',
            total: '100000',
            createdAt: '2006-10-02',
            status: 'PENDING'
        },
        {
            id: '002',
            eventName: 'Ujian Chunin (Rock Lee vs Gaara)',
            seatsOrdered: '1',
            total: '100000',
            createdAt: '2006-09-27',
            status: 'PAID'
        },
    ]

    // TODO:  if clicked can be redirected to invoice page. In invoice page, they can make payment


    return (
        <Transition>
            <DashboardContentWrapper contentClassName={""}>
                <Table columnNames={testColumn} records={testTransaction} />
            </DashboardContentWrapper>
        </Transition>
    )
};

