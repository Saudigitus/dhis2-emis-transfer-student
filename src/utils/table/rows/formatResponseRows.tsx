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
}

type RowsProps = Record<string, string | number | boolean | any>;

export function formatResponseRows({ transferInstances, teiInstances }: formatResponseRowsProps): RowsProps[] {
    const allRows: RowsProps[] = []
    for (const event of transferInstances) {
        const teiDetails = teiInstances.find(tei => tei.trackedEntity === event.trackedEntity)
        allRows.push({teiId: event?.trackedEntity, ...transferDataValues(event?.dataValues), ...(attributes((teiDetails?.attributes) ?? [])) })
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

function attributes(data: attributesProps[]): RowsProps {
    const localData: RowsProps = {}
    if (data) {
        for (const attribute of data) {
            localData[attribute.attribute] = attribute.value
        }
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
