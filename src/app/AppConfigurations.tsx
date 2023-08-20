import React from 'react'
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { useGetProgramConfig } from '../hooks/programConfig/useGetprogramConfig';
import { useGetOusData } from '../hooks/orgUnits/useGetOrgUnits';

interface Props {
    children: React.ReactNode
}

export default function AppConfigurations(props: Props) {
    const { loading } = useGetProgramConfig()
    const { loading: loadingOus } = useGetOusData()

    if (loading || loadingOus) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    return (
        <>{props.children}</>
    )
}
