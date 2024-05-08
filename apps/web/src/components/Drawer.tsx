import React from "react"
import SidebarMenuBtn from "./SidebarMenuBtn"
import Card from "./Card";

export default function Drawer({ 
        children, classNameContent, 
        childrenMenu, classNameChildrenMenu,
        classNameDrawer
    }: 
    { 
        children?: any, sidebarMenu?: any, 
        classNameContent: string, childrenMenu: any 
        classNameChildrenMenu?: string, classNameDrawer?: string
    }) {

    return (
        <div className={`drawer lg:drawer-open ${classNameDrawer}`}>
            <input id="drawer" type="checkbox" className="drawer-toggle" />
            <div className={`drawer-content  ${classNameContent}  `}>
                { children }
            </div> 
            <div className={`drawer-side ${classNameChildrenMenu} `}>
                <label htmlFor="drawer" aria-label="close sidebar" className="drawer-overlay"></label> 
                { childrenMenu }
            </div>
        </div>
    )
};

