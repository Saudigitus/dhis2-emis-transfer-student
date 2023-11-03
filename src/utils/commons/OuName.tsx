import React from 'react'
import { useGetOusData } from '../../hooks/orgUnits/useGetOrgUnits';

function OuNameContainer({ ouId }: { ouId: string }): React.ReactElement {
    const { ouName } = useGetOusData(ouId)

    return (
        <span>{ouName ?? "--"}</span>
    )
}
export default OuNameContainer
