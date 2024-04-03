import { FormatResponseRowsProps, RowsDataProps, attributesProps, dataValuesProps } from "../../../types/utils/table/FormatRowsDataTypes";
import { getRelativeTime } from "../../commons/getRelativeTime";

export function formatResponseRows({ transferInstances, teiInstances, registrationInstances, statusDataElementId, pendingStatus }: FormatResponseRowsProps): RowsDataProps[] {
    const allRows: RowsDataProps[] = []
    for (const event of transferInstances ?? []) {
        const teiDetails = teiInstances.find(tei => tei.trackedEntity === event.trackedEntity)
        const registrationDetails = registrationInstances.find(tei => tei.trackedEntity === event.trackedEntity)
        allRows.push({
            "requestTime": transferDataValues(event?.dataValues)[statusDataElementId as unknown as string] === pendingStatus ? getRelativeTime(new Date(event?.createdAt)) : "---",
            trackedEntity: event?.trackedEntity,
            ...transferDataValues(event?.dataValues), 
            ...(attributes((teiDetails?.attributes) ?? [])),
            ...registrationDataValues(registrationDetails?.dataValues ?? [])
        })
    }
    return allRows;
}

function registrationDataValues(data: dataValuesProps[]): RowsDataProps {
    const localData: RowsDataProps = {}
    if (data) {
       for (const dataElement of data) {
            localData[dataElement.dataElement] = dataElement.value
        }
    }
    return localData
}

function transferDataValues(data: dataValuesProps[]): RowsDataProps {
    const localData: RowsDataProps = {}
    if (data) {
        for (const dataElement of data) {
            localData[dataElement.dataElement] = dataElement.value
        }
    }
    return localData
}

function attributes(data: attributesProps[]): RowsDataProps {
    const localData: RowsDataProps = {}
    for (const attribute of data) {
        localData[attribute.attribute] = attribute.value
    }
    return localData
}

export function formatAllSelectedRow ({ transferInstances, registrationInstances, teiInstances }: FormatResponseRowsProps) {
    const formattedRows = [];
    for (const iterator of transferInstances ?? []) {
        const newRow = {
            teiInstance: teiInstances.find(tei => tei.trackedEntity === iterator.trackedEntity),
            registrationInstance: registrationInstances.find((ev: any) => ev.trackedEntity === iterator.trackedEntity),
            transferInstance: iterator
        }
        formattedRows.push(newRow);
    }
    return formattedRows;
}
