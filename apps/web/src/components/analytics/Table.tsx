import React from "react"

export default function Table({ columnNames, records } : { columnNames: string[], records: any[] }) {



    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>NO</th>
                    {
                        columnNames.map((column, idx) => {
                            return <th key={idx}>{ column }</th>        
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                {/* row */}

                    {
                        records.map((item, idx) => {
                            return <tr key={idx} className="hover">
                                <th>{idx + 1}</th>
                                <td>{ item.id }</td>
                                <td>{ item.eventName }</td>
                                <td>{ item.seatsOrdered }</td>
                                <td>{ item.total }</td>
                                <td>{ item.createdAt }</td>
                                <td>{ item.status }</td>
                            </tr>        
                        })
                    }

                {/* <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                </tr> */}
                </tbody>
            </table>
        </div>
    )
};

