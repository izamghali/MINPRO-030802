import React, { useRef } from "react"
import Button from "./Button"
import { showCloseModal } from "@/helpers/modal.function"

export default function EventForm({ className }: { className: string }) {

    const eventTitleRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement | any>(null)
    const submitButtonRef = useRef<HTMLButtonElement>(null)
    const detailsRef = useRef<HTMLTextAreaElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)
    const seatsRef = useRef<HTMLInputElement | any>(null)
    const locationRef = useRef<HTMLSelectElement>(null)

    let locations = [
        'Bali, Indonesia', 'Lombok, Indonesia', 'Bandung, Indonesia', 'Macau, China',
        'Ticino, Switzerland', 'Western Cape, South Africa', 'Corsica, France'
    ]

    function showSignUpModal() {
        showCloseModal('sign-up-as-modal', 'login-modal')
    }

    function handleForm() {
        let eventTitleValue = eventTitleRef.current;
        let priceValue = priceRef.current;
        let detailsValue = detailsRef.current;
        let seatsValue = seatsRef.current;
        let dateValue = dateRef.current;
        let locationValue = locationRef.current;
        if (locationValue?.value) {
            document.getElementById('location-placeholder')?.setAttribute('disabled', 'disabled')
        }

        let inputs = [ 
            eventTitleValue, priceValue, 
            detailsValue, seatsValue, dateValue, locationValue 
        ]
        let trues = []

        for (let input of inputs) {
            if (input?.value === '' || input?.value < 1) {
                trues.push(false) 
            } else {
                
                if (input.type === 'date') {
                    
                    let date = input.value.split('-')
                    let year = date[0]
                    let month = date[1]
                    let day = date[2]
                    
                    if ((year > 2023 && month > 4) && day > 0) {
                        trues.push(true)
                    } else {
                        trues.push(false)
                    }
                } else if (input.type === 'select-one') {
                    console.log(`input: ${input?.type}`)
                } else {
                    trues.push(true)
                }
            }
        }

        let allTrues = trues.every(item => item == true);

        if (allTrues) { submitButtonRef.current?.removeAttribute('disabled')   
        } else { submitButtonRef.current?.setAttribute('disabled', 'disabled')
        }
    }

    return (
        <div className={`${className}`}>
            <div className="flex justify-between gap-4">

                {/* input */}
                <div className="flex flex-col gap-4 w-full">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input onChange={handleForm} ref={eventTitleRef} type="text" className="grow" placeholder="Event Name" />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 opacity-70" viewBox="0 0 16 16"><path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"/></svg>
                        <input onChange={handleForm} min={1} ref={priceRef} type="number" className="grow" placeholder="Price" />
                    </label>
                    
                    <textarea onChange={handleForm} ref={detailsRef} className="textarea textarea-bordered" placeholder="Details"></textarea>
                    <select ref={locationRef} onChange={handleForm} className="select select-bordered w-full max-w-xs">
                        <option id="location-placeholder">Location</option>
                        {
                            locations.map((item, idx) => {
                                return <option key={idx}>{ item }</option>
                            })
                        }
                    </select>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 opacity-70" viewBox="0 0 16 16"><path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/></svg>
                        <input min="2024-05-01" ref={dateRef} onChange={handleForm} type="date" className="grow" placeholder="Date & Time" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 opacity-70" viewBox="0 0 16 16"><path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z"/><path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z"/></svg>
                        <input onChange={handleForm} min={1} ref={seatsRef} type="number" className="grow" placeholder="Seats" />
                    </label>

                    
                </div>

                {/* TODO:  drag n drop media */}
                <label className="input input-bordered flex items-center gap-2 w-[150%]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="text" className="grow" placeholder="Video" />
                </label>
            </div>

            <div className="flex justify-end mt-8">
                {/* <Button className="px-16 bg-accent" text="Create New Event" /> */}
                <button ref={submitButtonRef} className="btn bg-accent" disabled>Create New Event</button>
            </div>
        </div>
    )
};

