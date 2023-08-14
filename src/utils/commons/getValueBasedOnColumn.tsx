import React from 'react'
import styles from "../../components/table/render/table-render.module.css"
import { getValueColor } from './getValueColor';
import { type CustomAttributeProps } from '../../types/table/AttributeColumns';

function showValueBasedOnColumn(column: CustomAttributeProps, value: string, dataStore: any) {
    if (column.id === dataStore?.transfer?.status) {
        return (
            <h6 className={styles.transferStatusLabel} style={{color: getValueColor(value)}}>{value}</h6>
        )
    }
    return value
}

export { showValueBasedOnColumn }
