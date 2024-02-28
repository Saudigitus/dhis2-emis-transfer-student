import React from 'react'
import OuNameContainer from './OuName';
import { IconButton } from '@material-ui/core';
import { Attribute } from '../../types/generated/models';
import { ButtonStrip, IconThumbUp24, IconThumbDown24 } from "@dhis2/ui"
import styles from "../../components/table/render/table-render.module.css"
import { type CustomAttributeProps } from '../../types/variables/AttributeColumns';
import { RemoveColumByIdProps, ShowValueBasedOnColumnProps } from '../../types/utils/commons/TableRowColumnsTypes';

function showValueBasedOnColumn({column, value, dataStore, onToggle, setClickedButton, selected, index, selectedTab, valueColorMapping, pendingStatus }: ShowValueBasedOnColumnProps) {

    if (column.id === dataStore?.transfer?.status) {
        if (value === pendingStatus && selectedTab === "incoming") {
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

function removeColumById (props: RemoveColumByIdProps) {
    const { columns, dataStore, selectedTab } = props
    
    if (selectedTab === "incoming") {
        const newRowsHeader = columns?.filter((x: any) => x.id !== dataStore?.transfer?.status)
        return newRowsHeader
    }
    return columns
}

export { showValueBasedOnColumn, removeColumById }
