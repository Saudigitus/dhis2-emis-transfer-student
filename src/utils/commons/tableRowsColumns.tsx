import React from 'react'
import styles from "../../components/table/render/table-render.module.css"
import { valueColorMapping } from './getValueColor';
import { type CustomAttributeProps } from '../../types/table/AttributeColumns';

function showValueBasedOnColumn(column: CustomAttributeProps, value: string, dataStore: any) {
    if (column.id === dataStore?.transfer?.status) {
        return (
            <h6 className={styles.transferStatusLabel} style={{color: valueColorMapping[value]}}>{value}</h6>
        )
    }
    return value
}

function removeColumById (columns: CustomAttributeProps[], dataStore: any, selectedTab: string) {
    if (selectedTab === "incoming") {
        const newRowsHeader = columns?.filter((x: any) => x.id !== dataStore?.transfer?.status)
        return newRowsHeader
    }
    return columns
}

export { showValueBasedOnColumn, removeColumById }
