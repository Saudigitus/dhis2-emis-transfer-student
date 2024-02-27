import React from 'react'
import HeaderItem from './HeaderItem'
import style from "./mainHeader.module.css"
import { useParams } from '../../../hooks/commons/useQueryParams'
import { headBarData } from '../../../utils/constants/headBar/headBarData'

export default function MainHeader(): React.ReactElement {
    const { urlParamiters } = useParams();
    const selectedOptions = urlParamiters();

    return (
        <nav className={style.MainHeaderContainer}>
            {headBarData(selectedOptions).map(headerItem => (
                <HeaderItem key={headerItem.id} id={headerItem.id} dataElementId={headerItem.dataElementId} component={headerItem.component} placeholder={headerItem.placeholder} label={headerItem.label} value={headerItem.value} selected={headerItem.selected}/>
            ))}
        </nav>
    )
}
