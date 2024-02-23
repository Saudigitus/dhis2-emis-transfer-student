import React from 'react'
import HeaderItem from './HeaderItem'
import style from "./mainHeader.module.css"
import { useParams } from '../../../hooks/commons/useQueryParams'
import { headBarData } from '../../../utils/constants/headBar/headBarData'
import { getSelectedKey } from '../../../utils/commons/dataStore/getSelectedKey'

export default function MainHeader(): React.ReactElement {
    const { urlParamiters } = useParams();
    const selectedOptions = urlParamiters();
    const { getDataStoreData } = getSelectedKey();

    return (
        <nav className={style.MainHeaderContainer}>
            {headBarData(selectedOptions, getDataStoreData).map(haderItem => (
                <HeaderItem key={haderItem.id} id={haderItem.id} dataElementId={haderItem.dataElementId} component={haderItem.component} placeholder={haderItem.placeholder} label={haderItem.label} value={haderItem.value} />
            ))}
        </nav>
    )
}
