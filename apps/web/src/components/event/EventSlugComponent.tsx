import EventBarDetail from "@/components/event/EventBarDetail"
import Image from "next/image"
import BookEvent from "./BookEvent"
import EventBookMobile from "./EventBookMobile"

export default function EventSlugComponent({ params, buttonText, buttonFunc } : { params: { eventName: string }, buttonText: string, buttonFunc: any }) {

    return (
            // p-4 lg:p-6
            <div className=" lg:px-32 xl:px-52 md:px-20 px-4 sm:px-10 py-10 flex flex-col gap-8 duration-200">
                {/* img */}
                <div className="h-96 rounded-md overflow-hidden relative">
                    <Image priority
                        src={'https://images.unsplash.com/photo-1559686043-aef1bbc98d19?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
                        alt={""}
                        width={2970}
                        height={1980}
                        className="w-full object-cover object-center h-full"
                    />
                    <h1 className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 text-white text-2xl lg:text-4xl heading-text">Event Title</h1>
                </div>

                <EventBarDetail />

                <div id="bottom-event" className={`flex gap-10 flex-col md:flex-row`}>

                    {/* event detail */}
                    <div className="lg:w-[130%] w-full flex flex-col gap-12">

                        <div>
                            <h2 className="text-2xl lg:text-3xl heading-text mb-4">About this event</h2>
                            <p className="text-black/60">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae temporibus magnam corrupti libero nesciunt similique labore sapiente, excepturi unde aspernatur aliquam obcaecati, velit et. Sunt maiores eum tenetur doloribus asperiores.</p>
                        </div>
                        <div>
                            <h2 className="text-2xl lg:text-3xl heading-text mb-4">Prerequisite</h2>
                            <p className="text-black/60">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, necessitatibus. Eius quas officia ducimus, maxime ratione quaerat sunt ut ipsum.</p>
                            <span className="lg:hidden bg-accent">By booking this event, I agree to terms and condition.</span>
                        </div>
                        <div>
                            <h2 className="text-2xl lg:text-3xl heading-text mb-4">Available Promo</h2>
                            <span className="bg-accent">Fetch promo here</span> {/* TODO:  fetch available related promos */}
                            <span className="">or No Promo Available</span> {/* TODO:  fetch available related promos */}
                            {/* <p className="text-black/60">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, necessitatibus. Eius quas officia ducimus, maxime ratione quaerat sunt ut ipsum.</p>
                            <span className="lg:hidden bg-accent">By booking this event, I agree to terms and condition.</span> */}
                        </div>

                    </div>

                    {/* book event */}
                    <div className="w-full h-fit justify-endhidden md:flex">
                        <BookEvent 
                            buttonFunc={buttonFunc} buttonText={buttonText} 
                            className={"hidden md:flex"} 
                        />
                    </div>
                    
                    {/* book event mobile */}
                    <EventBookMobile 
                        className={"md:hidden"}
                        buttonFunc={buttonFunc} buttonText={buttonText} 
                    />
                </div>
            </div>

        
    )
};