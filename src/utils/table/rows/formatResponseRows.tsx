import { ProgramConfig } from "../../../types/programConfig/ProgramConfig"

interface dataValuesProps {
    dataElement: string
    value: string
}

interface attributesProps {
    attribute: string
    value: string
}

interface formatResponseRowsProps {
    transferInstances: [{
        trackedEntity: string
        dataValues: dataValuesProps[]
    }]
    teiInstances: Array<{
        trackedEntity: string
        attributes: attributesProps[]
    }>
    trackedEntityAttributes: ProgramConfig['programTrackedEntityAttributes']
}

type RowsProps = Record<string, string | number | boolean | any>;

export function formatResponseRows({ transferInstances, teiInstances, trackedEntityAttributes }: formatResponseRowsProps): RowsProps[] {
    const allRows: RowsProps[] = []
    for (const event of transferInstances) {
        const teiDetails = teiInstances.find(tei => tei.trackedEntity === event.trackedEntity)
        allRows.push({teiId: event?.trackedEntity, ...transferDataValues(event?.dataValues), ...(attributes((teiDetails?.attributes) ?? [],  trackedEntityAttributes)) })
    }
    return allRows;
}

function transferDataValues(data: dataValuesProps[]): RowsProps {
    const localData: RowsProps = {}
    if (data) {
        for (const dataElement of data) {
            localData[dataElement.dataElement] = dataElement.value
        }
    }
    return localData
}

function attributes(data: attributesProps[], trackedEntityAttributes: ProgramConfig['programTrackedEntityAttributes']): RowsProps {
    const localData: RowsProps = {}
    for (const attribute of data) {
        const trackedEntityAttribute : any = trackedEntityAttributes?.find((x: any) => x.trackedEntityAttribute.id == attribute.attribute)?.trackedEntityAttribute

        if(trackedEntityAttribute?.optionSet)
            localData[attribute.attribute] = trackedEntityAttribute?.optionSet?.options?.find((x: any) => x.value === attribute.value).label
        
        else
            localData[attribute.attribute] = attribute.value
    }
    return localData
}

export function formatAllSelectedRow ({ transferInstances, teiInstances }: formatResponseRowsProps) {
    const formattedRows = [];
    for (const iterator of transferInstances) {
        const newRow = {
            teiInstance: teiInstances.find(tei => tei.trackedEntity === iterator.trackedEntity),
            transferInstance: iterator
        }
        formattedRows.push(newRow);
    }
    return formattedRows;
}
