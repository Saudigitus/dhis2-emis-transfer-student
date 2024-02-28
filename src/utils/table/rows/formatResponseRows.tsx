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
    programConfig?: ProgramConfig
    programStageId?: string | undefined
}

type RowsProps = Record<string, string | number | boolean | any>;

export function formatResponseRows({ transferInstances, teiInstances, programConfig, programStageId }: formatResponseRowsProps): RowsProps[] {
    const allRows: RowsProps[] = []
    if(programConfig)
        for (const event of transferInstances) {
            const teiDetails = teiInstances.find(tei => tei.trackedEntity === event.trackedEntity)
            allRows.push({teiId: event?.trackedEntity, ...transferDataValues(event?.dataValues, programConfig, programStageId), ...(attributes((teiDetails?.attributes) ?? [],  programConfig)) })
        }
    return allRows;
}

function transferDataValues(data: dataValuesProps[], programConfig: ProgramConfig, programStageId:string | undefined): RowsProps {
    const localData: RowsProps = {}
    const currentProgramStage = ((programConfig?.programStages?.find(programStage => programStage.id === programStageId)) ?? {} as ProgramConfig["programStages"][0])

    if (data) {
        for (const dataElement of data) {
            const dataElementOptSet = currentProgramStage?.programStageDataElements?.find((option: any) => option.dataElement.id == dataElement.dataElement)?.dataElement?.optionSet

            if(dataElementOptSet)
                localData[dataElement.dataElement] = dataElementOptSet?.options?.find((option: any) => option.value === dataElement.value).label as unknown as string
            else
                localData[dataElement.dataElement] = dataElement.value
        }
    }
    return localData
}

function attributes(data: attributesProps[], programConfig: ProgramConfig): RowsProps {
    const localData: RowsProps = {}
    
    for (const attribute of data) {
        const trackedEntityAttribute : any = programConfig?.programTrackedEntityAttributes?.find((option: any) => option.trackedEntityAttribute.id == attribute.attribute)?.trackedEntityAttribute
        
        if(trackedEntityAttribute?.optionSet)
            localData[attribute.attribute] = trackedEntityAttribute?.optionSet?.options?.find((option: any) => option.value === attribute.value).label
        
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
