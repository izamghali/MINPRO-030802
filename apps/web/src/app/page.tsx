import Hero from '@/components/Hero'
import Overview from '@/components/Overview'
import garbageImg1 from '../../public/pexels-kofoshotit-10370776.jpg'
import garbageImg2 from '../../public/pexels-tomfisk-3181031.jpg'
import Events from '@/components/Events'
import { warningSVG } from '@/helpers/svg'

export default function Home() {

    const pollutionText = "Discover the lasting impact of garbage pollution on ecosystems, wildlife, and human health. \
    Our collective actions matter—reduce waste, recycle more, embrace sustainable packaging, and advocate for better waste management policies. \
    Let’s work together for a cleaner, healthier planet. Join us in the fight against garbage pollution today!"

    return (
        <main className={` `}>
            <Hero/>
            <Events />
            <Overview 
                className={''} src={garbageImg1} 
                heading={'Beat Garbage Pollution!'} text={pollutionText}
                buttonClassName='bg-red-400' svg={warningSVG}
                altText='a picture of a kid hugging a pillow, standing on a garbage land'
            />
        </main>
    )
}
