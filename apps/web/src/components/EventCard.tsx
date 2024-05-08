import React from "react"

export default function EventCard() {
    return (
        <div className="relative group">
            <div className="card rounded-md w-96 h-fit bg-base-100 duration-200 relative z-10">
                <figure className="group-hover:-translate-x-2 group-hover:-translate-y-2 duration-200"><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div className="card-body bg-white rounded-br-md rounded-bl-md border-2 group-hover:-translate-x-2 group-hover:-translate-y-2 duration-200">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
                <div className="bg-black h-full w-full absolute top-0 rounded-md -z-10 group-hover:translate-x-2 group-hover:translate-y-2 duration-200 ease-out group-hover:opacity-100 opacity-0">

                </div>
            </div>

        </div>
    )
};

