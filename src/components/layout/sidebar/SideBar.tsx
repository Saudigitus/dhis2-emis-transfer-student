import React, { useState } from 'react'
import style from "./sideBar.module.css"
import { useLocation } from 'react-router-dom'
import SideBarItem from './components/SideBarItem'
import SibeBarCollapseBtn from './components/SibeBarCollapseBtn'
import { sideBarData } from "../../../utils/constants/sideBar/sideBarData"

export default function SideBar(): React.ReactElement {
    const location = useLocation()  
    const [collapsed, setCollapsed] = useState<boolean>(true);

    return (
        <aside className={collapsed ? style.SideBarContainerCollapsed : style.SideBarContainer}>
            <div className={style.SideBarMenu}>
                {
                    sideBarData({locationParms:location.search}).map((element, index) => (
                        <SideBarItem key={index} title={element.title} subItems={element.subItems} />
                    ))
                }
            </div>
            <SibeBarCollapseBtn collapsed={collapsed} setCollapsed={setCollapsed} />
        </aside>
    )
}
