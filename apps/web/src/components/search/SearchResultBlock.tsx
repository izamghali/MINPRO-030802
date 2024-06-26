import React from "react"
import SearchUnit from "./SearchUnit"

export default function SearchResult() {

    const testSearchResult = [
        {
            img: 'https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            width: 2070, height: 1380,
            title: 'Hiking with celebrity',
            desc: 'Join us for an exhilarating hike through lush forests and stunning mountain vistas! Our fun hike event promises breathtaking views, laughter-filled moments, and a chance to connect with nature and fellow adventurers. Suitable for all skill levels, this hike includes games, prizes, and refreshing snacks at scenic rest stops. Get ready to lace up your boots and create unforgettable memories on this nature-filled escapade!',
        },
        {
            img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            width: 2070, height: 1380,
            title: 'Hi concert',
            desc: 'Experience the thrill of live music at our electrifying concert! Get ready to groove to the beats of top-notch performers, surrounded by a vibrant atmosphere and enthusiastic crowd. From chart-topping hits to soulful melodies, this concert promises an unforgettable night of music, dancing, and pure entertainment. Join us for an epic celebration of sound and energy that will leave you wanting more!',
        },
        {
            img: 'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            width: 2127, height: 1330,
            title: 'Hills top',
            desc: 'Rolling hills stretch as far as the eye can see, their gentle slopes adorned with vibrant greenery and colorful wildflowers. A serene landscape that invites you to wander, breathe in the fresh air, and enjoy peaceful moments amidst nature\'s beauty.',
        },
    ]

    return (
        <div className="absolute 
            sm:top-[5.5rem] top-[105%] 
            left-0 sm:left-0 lg:left-3 z-[100] 
            p-2 shadow bg-base-100 
            max-h-[25rem] overflow-scroll rounded-b-md duration-200
            border-2 lg:border-0
        ">
            { testSearchResult.map((item, idx) => {
                    return <div key={idx}>
                        <SearchUnit redirect="/homepage/event/1" className="lg:w-[37rem]" img={item.img} width={item.width} height={item.height} desc={item.desc} title={item.title} />
                    </div>
            }) }
        </div>
    )
};

