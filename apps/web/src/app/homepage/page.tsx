'use client'
import Hero from '@/components/Hero'
import Overview from '@/components/Overview'
import garbageImg1 from '../../../public/pexels-kofoshotit-10370776.jpg'
import Events from '@/components/event/Events'
import { warningSVG } from '@/helpers/svg'
import PromoBlock from '@/components/promo/PromoBlock'
import { Footer } from '@/components/Footer'
import { showCloseModal } from '@/helpers/modal.function'

export default function Home() {

    const pollutionText = "Discover the lasting impact of garbage pollution on ecosystems, wildlife, and human health. \
    Our collective actions matter—reduce waste, recycle more, embrace sustainable packaging, and advocate for better waste management policies. \
    Let’s work together for a cleaner, healthier planet. Join us in the fight against garbage pollution today!"

    function showSignUpModal() {
        showCloseModal('sign-up-as-modal')
    }

    function showLoginModal() {
        showCloseModal('login-modal')
    }

    return (
        <main className={` `}>
            
            <Hero/>
            <Events />
            <PromoBlock title='Discover Promos' />
            <Overview 
                className={''} src={garbageImg1} 
                heading={'Beat Garbage Pollution!'} text={pollutionText}
                buttonClassName='bg-red-400' svg={warningSVG}
                altText='a picture of a kid hugging a pillow, standing on a garbage land'
            />
            <Footer />
        </main>
    )
}
