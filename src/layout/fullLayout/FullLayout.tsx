import React, { useEffect } from 'react'
import style from "../layout.module.css"
import { MainHeader, SideBar } from '../../components'
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { useGetInitialValues } from '../../hooks/initialValues/useGetInitialValues'
import { useGetProgramConfig } from '../../hooks/programConfig/useGetprogramConfig'
import { useParams } from '../../hooks/commons/useQueryParams';

export default function FullLayout({ children }: { children: React.ReactNode }) {
    useGetInitialValues()
    const { isSetSectionType } = useGetInitialValues()
    const { loading } = useGetProgramConfig();

    const { urlParamiters, remove } = useParams();
    const { academicYear } = urlParamiters();

    useEffect(() => {
        if ((academicYear !== null || academicYear !== undefined) || (typeof academicYear === "string")) {
            remove("academicYear")
        }
    }, [academicYear])

    if (!isSetSectionType) {
        return (
            <CenteredContent>
                Cant load the app without section type
            </CenteredContent>
        )
    }

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    return (
        <div className={style.LayoutContainer}>
            <SideBar />
            <div className={style.FullLayoutContainer}>
                <MainHeader />
                <main className={style.MainContentContainer}>
                    { children }
                </main>
            </div>
        </div>
    )
}
