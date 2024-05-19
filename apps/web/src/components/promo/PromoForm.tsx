'use client'
import { arrowLeftSVG, calendarSVG, percentSVG } from "@/helpers/svg"
import React, { useEffect, useRef, useState } from "react"
import FileUpload from "../event/FileUpload"
import { getEventsByOrganizer, getRequest, postRequest } from "@/helpers/request/fetchRequests"
import Cookies from "js-cookie"
import { parseJwt } from "@/helpers/auth/token"
import Button from "../Button"
import { closeModal, showCloseModal } from "@/helpers/modal.function"
import Image from "next/image"
import promoFailed from '../../../public/illustrations/construction.png'
import promoSuc from '../../../public/illustrations/shopping.png'
import { useRouter } from "next/navigation"
import FileUploadSingle from "../event/FIleUploadSingle"
import useStorage from "@/hooks/useStorage"

interface EventData {
    id: string;
    organizerID: string;
    isActive: boolean;
    eventName: string;
    category: string; // You might want to replace this with an enum if you have defined one
    location: string;
    date: string; // Date string in ISO format
    details: string;
    availableSeats: number;
    thumbnailUrl?: string; // Optional
    createdAt: string; // Date string in ISO format
    promoID: string | null; // Can be null
}

export default function PromoForm({ className, cleanUpFunc, file, setFile } : { className: string, cleanUpFunc: any, file: File | null, setFile: any }) {

    const { uploadFile, progress } = useStorage();
    const [ loading, setLoading ] = useState(false)
    const [ events, setEvents ] = useState([]);
    const promoNameRef = useRef<HTMLInputElement>(null)
    const discountRef = useRef<HTMLInputElement>(null)
    const promoDetailsRef = useRef<HTMLTextAreaElement>(null)
    const relatedEventRef = useRef<HTMLSelectElement>(null)
    const startDateRef = useRef<HTMLInputElement>(null)
    const endDateRef = useRef<HTMLInputElement>(null)
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token')
        const payload = parseJwt(token);
        const orgID = payload.id;

        async function fetchEvents() {
            try {
                const res = await getEventsByOrganizer(token, orgID)
                setEvents(res)
            } catch (error) {
                console.log(error)
            }
        }

        fetchEvents();
    }, [])

    function formCheck() {
        function promoNameCheck(): boolean {
            let refValue = promoNameRef.current;
            
            if (refValue?.value && refValue?.value.length > 10) {
                document.getElementById('promo-name-guard')?.classList.add('hidden')
                return true;
            } else {
                document.getElementById('promo-name-guard')?.classList.remove('hidden')
                return false
            }
        }

        function discountCheck(): boolean {
            let refValue = discountRef.current;
            if (Number(refValue?.value) > 0 && Number(refValue?.value) < 101) {
                document.getElementById('discount-guard')?.classList.add('hidden');
                return true;
            } else {
                document.getElementById('discount-guard')?.classList.remove('hidden');
                return false;
            }
        };

        function detailsCheck(): boolean {
            let refValue = promoDetailsRef.current;
            if (Number(refValue?.value.length) > 9 && Number(refValue?.value.length) < 100) {
                document.getElementById('promo-details-guard')?.classList.add('hidden');
                return true;
            } else {
                document.getElementById('promo-details-guard')?.classList.remove('hidden');
                return false;
            }
        }

        function relatedEventCheck(): boolean {
            let refValue = relatedEventRef.current;
            if (refValue?.value) {
                return true
            } else {
                return false
            }
        }
        
        function mediaCheck(): boolean {
            const guard  = document.getElementById('promo-file-guard');
            if (file) {
                guard?.classList.add('hidden')
                return true;
            } else {
                guard?.classList.remove('hidden')
                return false;
            }
        }

        return [ promoNameCheck, discountCheck, detailsCheck, relatedEventCheck, mediaCheck ]
    }

    function closeModalFunctions(){
        function closeFailedModalRedirectTo() {
            setLoading(false);
            closeModal('create-promo-failed-modal')
            cleanUpFunc()
            router.push('/dashboard/organizer/')
        }
    
        function closeFailedModalCleanForm() {
            setLoading(false);
            closeModal('create-promo-failed-modal')
            cleanUpFunc()
        }
    
        function closeSuccessModalRedirectTo() {
            setLoading(false);
            closeModal('create-promo-success-modal')
            router.push('/dashboard/organizer/promos')
        }

        return [ closeFailedModalRedirectTo,  closeFailedModalCleanForm, closeSuccessModalRedirectTo ]
    }

    const [ promoNameCheck, discountCheck, detailsCheck, relatedEventCheck, mediaCheck ] = formCheck()
    const [ closeFailedModalRedirectTo, closeFailedModalCleanForm, closeSuccessModalRedirectTo ] = closeModalFunctions()

    function handlePromoChangeForm() {
        if ((promoNameCheck() && discountCheck()) && ((detailsCheck() && relatedEventCheck()) && (mediaCheck()))) {
            document.getElementById('submit-create-promo-btn')?.classList.remove('btn-disabled')
        } else { 
            document.getElementById('submit-create-promo-btn')?.classList.add('btn-disabled')   
        }
    }

    async function submitCreatePromo(event: React.FormEvent<HTMLFormElement>) {
        setLoading(true)
        document.getElementById('submit-create-promo-btn')?.classList.add('btn-disabled');
        event.preventDefault()

        const promoName = promoNameRef.current?.value;
        const discount = discountRef.current?.value;
        const promoDetails = promoDetailsRef.current?.value;
        const startDate = startDateRef.current?.value;
        const endDate = endDateRef.current?.value;
        
        const token = Cookies.get('token');
        const payload = parseJwt(token);
        const selectedOptions = relatedEventRef.current?.selectedOptions[0];

        let eventID: string | null = ''
        if (selectedOptions?.id === 'related-event-placeholder') {
            eventID = null;
        } else {
            let splittedID = selectedOptions?.id.split('related-event-')
            if (splittedID) {
                eventID = splittedID[1]
            }
        }

        try {
            
            // upload img to firebase
            let promoImg = ''
            if (file) {
                promoImg = await uploadFile(file);
            }

            const promoData = {
                organizerID: payload.id,
                eventID: eventID, // FIX:  fill eventID
                promoName: promoName,
                details: promoDetails,
                discount: discount, 
                imgUrl: promoImg,
                expireAt: endDate,
                startAt: startDate
            }

            const res = await postRequest(promoData, 'promo');

            if (res.ok) {
                showCloseModal('create-promo-success-modal', 'create-promo-modal');
                cleanUpFunc();
            } else {
                showCloseModal('create-promo-failed-modal', 'create-promo-modal');
            }
            setLoading(false);
            
            // post request to promo segment
            
        } catch (error) {
            
        }
        
    }

    // fetch all promos that this organizer has created

    return (
        <div>
            <form id="promo-form" className={`${className}`}>
                <div className="flex justify-between gap-4 flex-col lg:flex-row">

                    {/* input */}
                    <div className="flex flex-col gap-4 w-full">

                        {/* promo name */}
                        <div className="relative">
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input onChange={handlePromoChangeForm} ref={promoNameRef} type="text" className="grow" placeholder="Promo Name" />
                            </label>
                            <div className="label sm:justify-start justify-end absolute top-2 right-2 w-fit">
                                <span id="promo-name-guard" className="label-text-alt text-black/60 ">minimum 10 characters</span>
                            </div>
                        </div>

                        {/* amount */}
                        <div className="relative">
                            <label className="input input-bordered flex items-center gap-2">
                                <div>{percentSVG}</div>
                                <input
                                    onChange={handlePromoChangeForm}
                                    ref={discountRef}
                                    type="number"
                                    className="grow"
                                    placeholder="Discount"
                                />
                            </label>
                            <div className="label sm:justify-start justify-end absolute top-2 right-2 w-fit">
                                <span id="discount-guard" className="label-text-alt text-black/60">min 1% - max 100%</span>
                            </div>
                        </div>
                        
                        {/* details */}
                        <div className="relative w-full">
                            <textarea ref={promoDetailsRef} onChange={handlePromoChangeForm} className="textarea textarea-bordered w-full" placeholder="Details"></textarea>
                            <div className="label absolute top-2 right-2 flex justify-end w-fit">
                                <span id="promo-details-guard" className="label-text-alt text-black/40 hidden">min 10 characters - max 100 characters</span>
                            </div>
                        </div>

                        {/* related event */}
                        <select ref={relatedEventRef} onChange={handlePromoChangeForm} className="select select-bordered w-full">
                            <option id="related-event-placeholder" className="">Any Event</option>
                            {
                                events.map((item: EventData) => (
                                    <option key={item.id} id={`related-event-${item.id}`}>{ item.eventName }</option>
                                ))
                            }
                        </select>
                        
                        {/* promo date */}
                        <div className="flex gap-2 flex-col sm:flex-row">

                            {/* start date */}
                            <div className="w-full">
                                <span>Start</span>
                                <div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 opacity-70" viewBox="0 0 16 16"><path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/></svg>
                                        <input onChange={handlePromoChangeForm} ref={startDateRef} 
                                            defaultValue={'2024-05-20'} min={`2024-05-20`} type="date" className="grow" placeholder="Date & Time" 
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* end date */}
                            <div className="w-full">
                                <span>End</span>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 opacity-70" viewBox="0 0 16 16"><path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/></svg>
                                    <input ref={endDateRef} onChange={handlePromoChangeForm} defaultValue={'2024-05-20'} min={`2024-05-20`} type="date" className="grow" placeholder="Date & Time" />
                                </label>
                            </div>

                        </div>
                    </div>

                    {/* media upload */}
                    <div className="lg:w-[90%] w-full flex justify-between flex-col relative">
                        <FileUploadSingle file={file} setFile={setFile} />
                        <div className="label w-full sm:justify-start justify-start absolute lg:-top-8 max-lg:-bottom-8">
                            <span id="promo-file-guard" className="label-text-alt text-black/60 hidden">max 1 image</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <Button buttonID="submit-create-promo-btn" optionalFunc={submitCreatePromo} className="btn bg-accent btn-disabled">
                        { loading ? 
                            <span className="loading loading-spinner loading-md"></span>
                            :
                            ''
                        }
                        Create New Promo
                    </Button>
                </div>
            </form>

            {/* promo failed to create (modal) */}
            <dialog id="create-promo-failed-modal" className="modal">
                <div className="modal-box flex flex-col items-center gap-4">
                    <div onClick={() => showCloseModal(`create-promo-modal`, 'create-promo-failed-modal')} className="absolute left-6 text-black/60 scale-125 cursor-pointer">
                        { arrowLeftSVG } 
                    </div>
                    <h3 className="font-bold text-lg">Promo Failed to create...</h3>
                    <Image className="w-64" src={promoFailed} alt={'promo failed to create'} />
                    <p className="text-black/60">Our team is trying our best to fix it.</p>
                    <Button optionalFunc={closeFailedModalRedirectTo} svg={calendarSVG} className={'px-10 bg-black text-white/80 hover:text-black/80'}>See Events instead</Button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeFailedModalCleanForm}>close</button>
                </form>
            </dialog>
            
            {/* promo successfully created (modal) */}
            <dialog id="create-promo-success-modal" className="modal">
                <div className="modal-box flex flex-col items-center gap-4">
                    <h3 className="font-bold text-lg">Promo Successfully Created!</h3>
                    <Image priority className="w-64" src={promoSuc} alt={'promo created modal'} />
                    <p className="text-black/60">Now you can see your new promo in the dashboard.</p>
                    <Button optionalFunc={closeSuccessModalRedirectTo} svg={ percentSVG } className={'px-10 bg-accent'}>Manage Promos</Button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => closeModal('create-promo-success-modal')}>close</button>
                </form>
            </dialog>

        </div>
    )
};
function uploadFile(arg0: any) {
    throw new Error("Function not implemented.")
}

