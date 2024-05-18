'use client'
import Table from "@/components/analytics/CompactTable"
import React from "react"
import Image from "next/image";
import EventBarDetail from "@/components/event/EventBarDetail";
import PromoBlock from "@/components/promo/PromoBlock";
import Transition from "@/components/Transition";
import DashboardContentWrapper from "@/components/DashboardContentWrapper";
import { dotsSVG, pencilSVG, trashSVG } from "@/helpers/svg";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { closeModal } from "@/helpers/modal.function";
import UpdateEventForm from "@/components/event/UpdateEventForm";
import { dispatchRouteEffect } from "@/helpers/dispatchRoute";

// export const generateStaticParams = async () => {
//     const posts = await fetchBlogs()

//     return posts.map((post: { fields: { slug: string; } }) => ({
//         params: post.fields.slug,
//     }))
// }

// export async function generateMetadata(params : { params: { slug: string } }) {
//     const slug = params.params.slug
//     const blog = await fetchBlogBySlug(slug)

//     const title = blog.fields.title
//     const author = blog.fields.author.fields.name
//     const date = blog.fields.date
//     const authorSrc = blog.fields.author.fields.image.fields.file.url
//     const src = `https://${blog.fields.img.fields.file.url}`
//     const content = blog.fields.content; 
      
//     return { 
//         title: title,
//         description: title,
//         authors: author,
//         openGraph: {
//             images: [`https:${src}`, `https:${authorSrc}`]
//         }
//     }
// }


export default function EventDetail(params : { params: { eventID: string } }) {

    const imgSrc = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    dispatchRouteEffect('Events #1') // NOTE:  later need to fetch this

    function closeRemoveModal() {
        closeModal('remove-event-modal')
    }

    return (
        <Transition>
            <div className="">
                <DashboardContentWrapper className=" flex-col flex gap-6 lg:gap-10 justify-between " contentClassName={""}>
                    <figure className="z-[2] relative rounded-md overflow-hidden">
                        <Image 
                            src={imgSrc} 
                            alt="Shoes"
                            width={2400}
                            height={1594}
                            priority
                            className="object-center lg:h-[30rem] object-cover w-full h-full"
                        />
                        <div className="w-full h-full bg-gradient-to-br from-black/50 absolute top-0"></div>
                        <div className="dropdown dropdown-end absolute top-2 right-2">
                            <div tabIndex={0} role="button" className="btn bg-white/20 text-white border-0 hover:text-black">{ dotsSVG }</div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex flex-col gap-2">
                                {/* TODO:  display event current info in the form */}
                                <Modal textBtn="Edit Event" btnSvg={ pencilSVG } 
                                    buttonClassName="w-full justify-start px-4 py-0 font-normal" 
                                    modalID={"edit-event-modal"} modalTitle={"Edit Event"} 
                                    modalClassName="max-w-[60rem]"
                                >
                                    <UpdateEventForm className={""} />
                                </Modal>
                                <Modal 
                                    textBtn="Remove Event" 
                                    btnSvg={ trashSVG } 
                                    modalClassName="flex flex-col items-center"
                                    buttonClassName="w-full justify-start px-4 py-0 font-normal hover:bg-red-400 hover:text-white" 
                                    // TODO:  insert eventID to modalID to make it unique.
                                    modalID={"remove-event-modal"} modalTitle={"Are you sure you want to remove this event?"} >
                                    <div className="flex w-full justify-center gap-8">
                                        <Button optionalFunc={closeRemoveModal} className={"min-w-32"}>
                                            No
                                        </Button>
                                        <Button className={"min-w-32 bg-black text-white hover:bg-black/70"}>
                                            Delete this event
                                        </Button>
                                    </div>
                                </Modal>
                            </ul>
                        </div>
                    </figure>

                    <EventBarDetail />

                    <PromoBlock title="Related Promos"/>

                    {/* TODO:  fetch table by status, gender, ticket type */}
                    <Table />

                </DashboardContentWrapper>
            </div>
        </Transition>
    )
};

