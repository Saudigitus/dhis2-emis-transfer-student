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
    registrationInstances: Array<{
        trackedEntity: string
        dataValues: dataValuesProps[]
    }>
    teiInstances: Array<{
        trackedEntity: string
        attributes: attributesProps[]
    }>
}

type RowsProps = Record<string, string | number | boolean | any>;

export function formatResponseRows({ transferInstances, registrationInstances, teiInstances }: formatResponseRowsProps): RowsProps[] {
    const allRows: RowsProps[] = []
    for (const event of transferInstances) {
        const teiDetails = teiInstances.find(tei => tei.trackedEntity === event.trackedEntity)
        const registrationDetails = registrationInstances.find(tei => tei.trackedEntity === event.trackedEntity)
        allRows.push({ ...transferDataValues(event.dataValues), ...(attributes((teiDetails?.attributes) ?? [])), ...registrationDataValues(registrationDetails?.dataValues) })
    }
    return allRows;
}

function transferDataValues(data: dataValuesProps[]): RowsProps {
    const localData: RowsProps = {}
    for (const dataElement of data) {
        localData[dataElement.dataElement] = dataElement.value
    }
    return localData
}

function registrationDataValues(data: dataValuesProps[]): RowsProps {
    const localData: RowsProps = {}
    for (const dataElement of data) {
        localData[dataElement.dataElement] = dataElement.value
    }
    return localData
}

function attributes(data: attributesProps[]): RowsProps {
    const localData: RowsProps = {}
    for (const attribute of data) {
        localData[attribute.attribute] = attribute.value
    }
    return localData
}
