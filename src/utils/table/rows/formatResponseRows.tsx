import { ProgramConfig } from "../../../types/programConfig/ProgramConfig"
import { FormatResponseRowsProps, RowsDataProps, attributesProps, dataValuesProps } from "../../../types/utils/table/FormatRowsDataTypes";
import { OptionsProps } from "../../../types/variables/AttributeColumns";
import { getRelativeTime } from "../../commons/getRelativeTime";

export function formatResponseRows({ transferInstances, teiInstances, registrationInstances, programConfig, programStageId, statusDataElementId, pendingStatus }: FormatResponseRowsProps): RowsDataProps[] {
    const allRows: RowsDataProps[] = []
    if(programConfig)
        for (const event of transferInstances ?? []) {
            const teiDetails = teiInstances.find(tei => tei.trackedEntity === event.trackedEntity)
            const registrationDetails = registrationInstances.find(tei => tei.trackedEntity === event.trackedEntity)
            allRows.push({
                "requestTime": transferDataValues(event?.dataValues, programConfig, programStageId)[statusDataElementId as unknown as string] === pendingStatus ? getRelativeTime(new Date(event?.createdAt)) : "---",
                teiId: event?.trackedEntity,
                ...transferDataValues(event?.dataValues, programConfig, programStageId), 
                ...(attributes((teiDetails?.attributes) ?? [], programConfig)),
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

function transferDataValues(data: dataValuesProps[], programConfig: ProgramConfig, programStageId:string | undefined): RowsDataProps {
    const localData: RowsDataProps = {}
    const currentProgramStage = ((programConfig?.programStages?.find(programStage => programStage.id === programStageId)) ?? {} as ProgramConfig["programStages"][0])

    if (data) {
        for (const dataElement of data) {
            const dataElementOptSet = currentProgramStage?.programStageDataElements?.find((option: any) => option.dataElement.id == dataElement.dataElement)?.dataElement?.optionSet

            if(dataElementOptSet)
                localData[dataElement.dataElement] = dataElementOptSet?.options?.find((option: OptionsProps) => option.value === dataElement.value)?.label as unknown as string
            else
                localData[dataElement.dataElement] = dataElement.value
        }
    }
    return localData
}

function attributes(data: attributesProps[], programConfig: ProgramConfig): RowsDataProps {
    const localData: RowsDataProps = {}
    
    for (const attribute of data) {
        const trackedEntityAttribute : any = programConfig?.programTrackedEntityAttributes?.find((option: any) => option.trackedEntityAttribute.id == attribute.attribute)?.trackedEntityAttribute
        
        if(trackedEntityAttribute?.optionSet)
            localData[attribute.attribute] = trackedEntityAttribute?.optionSet?.options?.find((option: OptionsProps) => option.value === attribute.value).label
        
        else
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
