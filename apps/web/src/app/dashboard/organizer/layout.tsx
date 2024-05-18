import SpotifyPopUp from "@/components/spotify/SpotifyPopUp"
import OrganizerDrawer from "@/components/dashboard/drawers/OrganizerDrawer"
import React from "react"

export default function DashboardLayout({ children }: { children: Readonly<React.ReactNode> }) {

    return (
        <div className="relative">
            <OrganizerDrawer children={children} />
            {/* <SpotifyPopUp 
                src={"https://open.spotify.com/embed/episode/0Qqqk4Xz4wrq234bJAIurd?utm_source=generator"} 
                iframeID={"spotify-podcast-event-marketing"} 
                className={"bottom-4 right-4"} 
            /> */}
            <SpotifyPopUp 
                src={"https://open.spotify.com/embed/episode/227IIydMN5G7Uj0f5PemCg?utm_source=generator"} 
                iframeID={"spotify-podcast-event-aesthetic"} 
                className={"bottom-4 right-4"} 
            />
        </div>
    )
};
