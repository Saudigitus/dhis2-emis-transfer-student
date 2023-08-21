import React from 'react'
import style from "../Layout.module.css"
import { MainHeader, SideBar } from '../../components'
import { useGetInitialValues } from '../../hooks/initialValues/useGetInitialValues'
import { useParams } from '../../hooks/commons/useQueryParams'
import InitialMessage from '../../components/initialInstructions/InitialMessage'

export default function FullLayout({ children }: { children: React.ReactNode }) {
    useGetInitialValues()
    const { urlParamiters } = useParams();

    return (
        <div className={style.LayoutContainer}>
            <SideBar />
            <div className={style.FullLayoutContainer}>
                <MainHeader />
                <main className={style.MainContentContainer}>
                    {
                        (urlParamiters().school != null) ? children : <InitialMessage />
                    }
                </main>
            </div>
        </div>
    )
}
