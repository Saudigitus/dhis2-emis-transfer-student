import React from 'react'
import { useGetOusData } from '../../hooks/orgUnits/useGetOrgUnits';
import { OuNameProps } from '../../types/utils/commons/OuNameTypes';

function OuNameContainer({ ouId }: OuNameProps): React.ReactElement {
    const { ouName } = useGetOusData(ouId)

    return (
        <span>{ouName ?? "--"}</span>
    )
}
export default OuNameContainer
