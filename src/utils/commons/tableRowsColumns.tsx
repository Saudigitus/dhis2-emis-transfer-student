import React from 'react'
import { ButtonStrip, IconThumbUp24, IconThumbDown24 } from "@dhis2/ui"
import styles from "../../components/table/render/table-render.module.css"
import { valueColorMapping } from './getValueColor';
import { type CustomAttributeProps } from '../../types/table/AttributeColumns';
import { IconButton } from '@material-ui/core';
import { Attribute } from '../../types/generated/models';
import OuNameContainer from './OuName';

function showValueBasedOnColumn(column: CustomAttributeProps, value: string, dataStore: any, onToggle: (arg: object) => void, setClickedButton: (arg: string) => void, selected: object, index: number, selectedTab: string) {
    if (column.id === dataStore?.transfer?.status) {
        if (value === "Pending" && selectedTab === "incoming") {
            return (
                <ButtonStrip>
                    <IconButton size="small" className={styles.approveIcon} onClick={() => { onToggle(selected.rows[index]); setClickedButton("approve") }}>
                        <IconThumbUp24/>
                    </IconButton>
                    <IconButton size="small" className={styles.rejectIcon} onClick={() => { onToggle(selected.rows[index]); setClickedButton("reject") }}>
                        <IconThumbDown24/>
                    </IconButton>
                </ButtonStrip>
            )
        } else {
            return <h6 className={styles.transferStatusLabel} style={{color: valueColorMapping[value]}}>{value ?? "---"}</h6>
        }
    }
    if (column.valueType === Attribute.valueType.ORGANISATION_UNIT as unknown as CustomAttributeProps["valueType"] && (value !== "")) {
        return <OuNameContainer ouId={value}/>
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
