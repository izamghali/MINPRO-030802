import React from "react"

export default function VideoComponent() {

    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/test.mp4?alt=media&token=cc461407-d7ab-4b0d-8d46-d66b01383398' // waterfall
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/cloud-1.mp4?alt=media&token=9ea06600-156e-41d8-b1ee-daa838d208d3' // cloud 1
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/cloud-2.mp4?alt=media&token=5d214e96-2493-4652-b260-8a6e67d86f86' // cloud 2
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/roller-coaster.mp4?alt=media&token=66e2c53b-b115-4eb7-bbcf-5c26e8dc835d' // roller coaster
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/animation-1.mp4?alt=media&token=87376155-1c1f-4e9f-9ca8-26ce8bb82ddd' // animation 1
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/animation-2.mp4?alt=media&token=22c7a6c5-fa9c-40b9-a1f8-914bbcf235bd' // animation 2
    
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/853958-hd_1920_1080_30fps.mp4?alt=media&token=7369d8de-64a9-4c2a-a8fe-ff03adc9e96f' // crowd low angle
    const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/853946-hd_1920_1080_25fps.mp4?alt=media&token=57785dc3-44aa-4dbb-8696-8642f5a68dbd' // blur crowd
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/2022396-hd_1920_1080_30fps.mp4?alt=media&token=75949dc5-fbfb-4eb6-9cbf-8ab389014e0f' // crowd concert
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/3941289-uhd_3840_2160_30fps.mp4?alt=media&token=93ef46b8-64ab-4d3d-8ec5-e1b35469005b' // crowd concert high angle
    // const srcTest = 'https://firebasestorage.googleapis.com/v0/b/image-gallery-3010c.appspot.com/o/2386935-uhd_4096_2160_24fps.mp4?alt=media&token=a2e19bd2-74ea-4504-a40c-6f08033dd3e1' // kid seeing giant aquarium

    return (
        <div>
            <video className="sm:block hidden" autoPlay={true} controls={false} muted loop={true} >
                <source src={srcTest} type="video/webm"/>
            </video>
            <video className="sm:hidden block" width={2160} height={3840} autoPlay={true} controls={false} muted loop={true} >
                <source src={'https://videos.pexels.com/video-files/7956444/7956444-uhd_2160_3840_24fps.mp4'} type="video/webm"/>
            </video>
        </div>
    )
};

