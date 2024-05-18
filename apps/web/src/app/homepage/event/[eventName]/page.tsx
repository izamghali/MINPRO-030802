import EventSlugComponent from "@/components/event/EventSlugComponent"

export default function EventDetail(params : { params: { eventName: string } }) {

    const testTicketType = ['Reguler', 'VVIP', 'Nasabah Prioritas']

    return (
        <EventSlugComponent params={{
            eventName: ""
        }} buttonText={"Book Event"} buttonFunc={undefined} />

    )
};