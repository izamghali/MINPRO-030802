'use client'
import React, { useEffect, useRef, useState } from "react"
import FileUpload from "./FileUpload"
import Button from "../Button"
import { analyticsSVG, arrowLeftSVG, arrowRightSVG, baloonSVG, calendarSVG, peopleSVG, plusSVG, ticketSVG, trashSVG } from "@/helpers/svg"
import { categoryArr, locationArr } from "@/helpers/dummyData"
import { postRequest } from "@/helpers/request/fetchRequests"
import useStorage from "@/hooks/useStorage"
import { closeModal, showCloseModal } from "@/helpers/modal.function"
import Image from "next/image"
import eventFailed from '../../../public/illustrations/fixing.png';
import todoList from '../../../public/illustrations/task-list.png';
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { parseJwt } from "@/helpers/auth/token"
import { v4 as uuid } from 'uuid'

export default function EventForm({ className, ticketData, setTicketData, files, setFiles, cleanUpFunc }: { className: string, ticketData: any, setTicketData: any, files: File[], setFiles: any, cleanUpFunc: any }) {

    const router = useRouter();
    const [ loading, setLoading ] = useState(false)
    const { uploadFile, progress } = useStorage();
    const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
    const eventTitleRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLSelectElement>(null)
    const detailsRef = useRef<HTMLTextAreaElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)
    const seatsRef = useRef<HTMLInputElement | any>(null)
    const locationRef = useRef<HTMLSelectElement>(null)
    const ticketTypeRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // render if ticketTypes change
        detailsCheck();
        handleEventChangeForm()
        fileCheck();
        seatsCheck();
    }, [ ticketData ]);

    function addTicketType(event: any) {
        event.preventDefault()
        const newType = ticketTypeRef.current?.value.trim();
        const sameType = ticketData.find((item: { ticketType: string | undefined }) => item.ticketType === newType)
        if ((newType && !sameType) && ticketData.length < 3) {
            setTicketData((prevTicketData: any) => [...prevTicketData, { ticketType: newType, price: 0 }]);
            return true;
        } else {
            return false;
        }
    }

    function removeType(event: React.MouseEvent<HTMLSpanElement>) {
        const target = (event.target as HTMLSpanElement).innerHTML;
        let currentTypes = [...ticketData];
        if (target !== ' - ') {
            setTicketData(currentTypes.filter(item => item.ticketType !== target));
        } 
    }

    const handleChangePrice = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const updatedPrices = [...ticketData];
        updatedPrices[index].price = Number(value);
    };

    function formCheck() {
        function eventTitleCheck() {
            let eventTitleValue = eventTitleRef.current;
            
            if (eventTitleValue?.value && eventTitleValue?.value.length > 10) {
                document.getElementById('title-guard')?.classList.add('hidden')
                return true;
            } else {
                document.getElementById('title-guard')?.classList.remove('hidden')
                return false
            }
        }
    
        function categoryCheck() {
            const selectedValue = categoryRef.current?.value;
            const cat = document.getElementById('category-placeholder')
            cat?.setAttribute('disabled', 'disabled')
            if (selectedValue === 'CATEGORY') {
                return false
            } else {
                return true
            }
        }
    
        function ticketTypeCheck() {
            if (ticketData.length < 3 && ticketData.length > 0) {
                return true;
            } else {
                return false;
            }
        }
    
        function detailsCheck() {
            const details = detailsRef.current?.value ?? ''; // Default to an empty string if undefined
    
            if (details.length > 29) {
                document.getElementById('details-guard')?.classList.add('hidden')
                return true;
            } else {
                document.getElementById('details-guard')?.classList.remove('hidden')
                return false;
            }
        }
    
        function locationCheck() {
            const loc = document.getElementById('location-placeholder')
            const locVal = locationRef.current?.value
            loc?.setAttribute('disabled', 'disabled')
    
            if (locVal === 'Location') {
                return false;
            } else {
                return true;
            }
        }
    
        function seatsCheck() {
            const seats = seatsRef.current.value;
            const guard = document.getElementById('seats-guard')
    
            if (seats > 9) {
                guard?.classList.add('hidden')
                return true
            } else {
                guard?.classList.remove('hidden')
                return false
            }
            
        }
    
        function fileCheck() {
            const guard  = document.getElementById('file-guard');
            if (files.length > 0) {
                guard?.classList.add('hidden')
                return true;
            } else {
                guard?.classList.remove('hidden')
                return false;
            }
        }
        return [ eventTitleCheck, categoryCheck, ticketTypeCheck, detailsCheck, locationCheck, seatsCheck, fileCheck ]
    }

    function closeCleanForm() {

        function closeSuccessModalRedirectTo() {
            setLoading(false);
            closeModal('create-event-success-modal')
            router.push('/dashboard/organizer/')
        }
    
        function closeFailedModalCleanForm() {
            setLoading(false);
            closeModal('create-event-failed-modal')
            cleanUpFunc()
        }
    
        function closeFailedModalRedirectTo() {
            setLoading(false);
            closeModal('create-event-failed-modal')
            cleanUpFunc()
            router.push('/dashboard/organizer/analytics')
        }
        return [ closeSuccessModalRedirectTo, closeFailedModalCleanForm, closeFailedModalRedirectTo ]
    }

    const [ eventTitleCheck, categoryCheck, ticketTypeCheck, detailsCheck, locationCheck, seatsCheck, fileCheck ] = formCheck()
    const [ closeSuccessModalRedirectTo, closeFailedModalCleanForm, closeFailedModalRedirectTo ] = closeCleanForm()

    async function submitCreateEvent(event: any) {
        event.preventDefault();
        setLoading(true);
        document.getElementById('submit-create-event-btn')?.classList.add('btn-disabled');
        const date = dateRef.current?.value;
        let formattedDate;
    
        if (date) {
            const [year, month, day] = date.split('-');
            formattedDate = new Date(Number(year), Number(month) - 1, Number(day));
            setEventDate(formattedDate); // Setting state asynchronously
        }
    
        let thumbnailURL = '';
        const token = Cookies.get('token');
        const payload = parseJwt(token);
        const orgID = payload.id;
        const eventID = uuid();
        
        let mediaArr = []
        try {
            if (files.length === 1) {
                thumbnailURL = await uploadFile(files[0]);
            } else if (files.length > 1) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const uploadedURL = await uploadFile(file);
    
                    if (i === 0) {
                        thumbnailURL = uploadedURL;
                    } else {
                        mediaArr.push(uploadedURL)
                    }
                }
            }
    
            // Update formData with the correct thumbnail URL
            
            const formData = {
                eventTitle: eventTitleRef.current?.value || '',
                eventID: eventID,
                orgID: orgID,
                details: detailsRef.current?.value || '',
                location: locationRef.current?.value || '',
                date: formattedDate, // Use the formatted date directly
                seats: Number(seatsRef.current?.value) || 0, // Ensure seats is a number
                tickets: ticketData,
                category: categoryRef.current?.value || '',
                thumbnailURL: thumbnailURL,// This will be updated after file upload
                mediaArr: mediaArr
            };
            formData.thumbnailURL = thumbnailURL;
    
            const res = await postRequest(formData, 'events');
    
            if (res.ok) {
                showCloseModal('create-event-success-modal', 'event-modal');
                cleanUpFunc();
            } else {
                showCloseModal('create-event-failed-modal', 'event-modal');
                // document.getElementById('submit-create-event-btn')?.classList.remove('btn-disabled');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error during file upload or post request:', error);
            setLoading(false); // Ensure loading state is reset on error
            showCloseModal('create-event-failed-modal', 'event-modal'); // Show failure modal
            document.getElementById('submit-create-event-btn')?.classList.remove('btn-disabled');
        }
    }
    
    function handleEventChangeForm() {

        if (((eventTitleCheck() && categoryCheck()) && (ticketTypeCheck() && detailsCheck())) && ( locationCheck() && seatsCheck() ) && fileCheck() ) {
            document.getElementById('submit-create-event-btn')?.classList.remove('btn-disabled')
        } else { 
            document.getElementById('submit-create-event-btn')?.classList.add('btn-disabled')   
        }
    }

    return (
        <div>
            <form id="create-event-form" className={`${className}`}>
                <div className="flex justify-between gap-4 flex-col lg:flex-row">

                    <div className="flex flex-col gap-4 w-full">

                        {/* name & category */}
                        <div className="flex lg:flex-row flex-col gap-4">
                            <div className="relative">
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <div className="text-black/60">{ baloonSVG }</div>
                                    <input ref={eventTitleRef} onChange={handleEventChangeForm} type="text" className="grow" placeholder="Event Name" />
                                </label>
                                <div className="label w-full sm:justify-start justify-start">
                                    <span id="title-guard" className="label-text-alt text-black/60 hidden">minimum 10 characters</span>
                                </div>
                            </div>

                            <div className="lg:w-[70%] w-full">
                                <select ref={categoryRef} onChange={handleEventChangeForm} className="select select-bordered w-full">
                                    <option id="category-placeholder" className="">CATEGORY</option>
                                    {
                                        categoryArr.map((item, idx) => {
                                            return <option key={idx}>{ item }</option>
                                        })
                                    }
                                </select>
                            </div>

                        </div>

                        {/* ticket type */}
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-4">
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <div className="text-black/60">{ ticketSVG }</div>
                                    <input ref={ticketTypeRef} onChange={handleEventChangeForm} type="text" className="grow" placeholder="Ticket Type" />
                                </label>
                                <Button optionalFunc={addTicketType} className={""} svg={ plusSVG } ></Button>
                            </div>
                            <span className="text-black/60 flex">Ticket type: &nbsp;
                                <div className="flex gap-1">
                                    {
                                        ticketData.map((item: { ticketType: string, price: number }, idx: number) => {
                                            return <div key={idx} className="tooltip" data-tip={`remove ${item.ticketType}`}>
                                                <span onClick={removeType} className="text-black cursor-pointer">
                                                    <span>{ item.ticketType }</span>
                                                    <span className="select-none">{ (idx + 1 === ticketData.length) ? '' : ' - ' }</span>
                                                </span>
                                            </div>
                                        })
                                    }
                                </div>
                            </span>
                        </div>

                        {/* price */}
                        {ticketData.map((ticket: { ticketType: any; price: number }, idx: number) => (
                            <div key={idx}>
                                {/* Ticket type input */}
                                <label className="input input-bordered flex items-center gap-2">
                                    <span className="text-black/60">{`${ticket.ticketType} ticket`}</span>
                                    {/* Price input */}
                                    <input
                                        type="number"
                                        onChange={handleChangePrice(idx)}
                                        className="grow"
                                        placeholder={ticket.price > 0 ? ticket.price.toString() : 'free'}
                                    />
                                </label>
                            </div>
                        ))}
                        
                        {/* details */}
                        <div className="relative w-full">
                            <textarea onChange={handleEventChangeForm} ref={detailsRef} className="textarea textarea-bordered w-full" placeholder="Details"></textarea>
                            <div className="label absolute top-2 right-2 flex justify-end w-fit">
                                <span id="details-guard" className="label-text-alt text-black/40 hidden">minimum 30 characters</span>
                            </div>
                        </div>

                        {/* location */}
                        <select ref={locationRef} onChange={handleEventChangeForm} className="select select-bordered w-full">
                            <option id="location-placeholder" className="">Location</option>
                            {
                                locationArr.map((item, idx) => {
                                    return <option key={idx}>{ item }</option>
                                })
                            }
                        </select>
                        
                        {/* calendar */}
                        <label className="input input-bordered flex items-center gap-2">
                            <div className="text-black/60">{ calendarSVG }</div>
                            <input defaultValue={'2024-05-20'} min={`2024-05-20`} ref={dateRef} onChange={handleEventChangeForm} type="date" className="grow" placeholder="Date & Time" />
                        </label>

                        {/* available seats */}
                        <div>
                            <label className="input input-bordered flex items-center gap-2">
                                <div className="text-black/60">{ peopleSVG }</div>
                                <input onChange={handleEventChangeForm} min={10} ref={seatsRef} type="number" className="grow" placeholder="Seats" />
                            </label>
                            <div className="label w-full sm:justify-start justify-start">
                                <span id="seats-guard" className="label-text-alt text-black/60 hidden">minimum 10 seats</span>
                            </div>
                        </div>
                    </div>

                    {/* media upload */}
                    <div className="lg:w-[90%] w-full flex justify-between flex-col relative">
                        <FileUpload files={files} setFiles={setFiles} />
                        <div className="label w-full sm:justify-start justify-start absolute lg:-top-8 max-lg:-bottom-8">
                            <span id="file-guard" className="label-text-alt text-black/60 hidden">minimum 1 media</span>
                        </div>
                    </div>
                </div>

                {/* submit button */}
                <div className="flex justify-end mt-8">
                    <Button optionalFunc={submitCreateEvent} buttonID="submit-create-event-btn" className="btn bg-accent ">
                        { loading ? 
                            <span className="loading loading-spinner loading-md"></span>
                            :
                            ''
                        }
                        Create New Event
                    </Button>

                </div>
            </form>

            {/* event failed to create (modal) */}
            <dialog id="create-event-failed-modal" className="modal">
                <div className="modal-box flex flex-col items-center gap-4">
                    <div onClick={() => showCloseModal(`event-modal`, 'create-event-failed-modal')} className="absolute left-6 text-black/60 scale-125 cursor-pointer">
                        { arrowLeftSVG } 
                    </div>
                    <h3 className="font-bold text-lg">Event Failed to create...</h3>
                    <Image className="w-64" src={eventFailed} alt={'event failed to create'} />
                    <p className="text-black/60">Our team is trying our best to fix it.</p>
                    <Button optionalFunc={closeFailedModalRedirectTo} svg={analyticsSVG} className={'px-10 bg-black text-white/80 hover:text-black/80'}>See Analaytics Instead</Button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeFailedModalCleanForm}>close</button>
                </form>
            </dialog>
            
            {/* event successfully created (modal) */}
            <dialog id="create-event-success-modal" className="modal">
                <div className="modal-box flex flex-col items-center gap-4">
                    <h3 className="font-bold text-lg">Event Successfully Created!</h3>
                    <Image priority className="w-64" src={todoList} alt={'event created modal'} />
                    <p className="text-black/60">Now you can see your new event in the dashboard.</p>
                    <Button optionalFunc={closeSuccessModalRedirectTo} svg={ arrowLeftSVG } className={'px-10 bg-accent'}>Manage Events</Button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => closeModal('create-event-success-modal')}>close</button>
                </form>
            </dialog>

        </div>
    )
};

