export const fieldsType = {
    programStage: "executionDateLabel,programStageDataElements[displayInReports,compulsory,dataElement[id,displayName,valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]],programStageSections[displayName,id,displayInReports,compulsory,dataElements[id,formName~rename(displayName),valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]",
    programStageSection: "executionDateLabel,programStageSections[displayName,id,displayInReports,compulsory,dataElements[id,formName~rename(displayName),valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]"
}

interface EventQueryProps {
    page?: number
    pageSize?: number
    ouMode: string
    program: string
    order: string
    programStage: string
    orgUnit: string
    filter?: string[]
    filterAttributes?: string[]
    trackedEntity: string
}

interface GeTDataElementsProps {
    programStageId: string
    type?: keyof typeof fieldsType
}

interface dataValuesProps {
    dataElement: string
    value: string
}

interface RegistrationQueryResults {
    results: {
        instances: [{
            trackedEntity: string
            dataValues: dataValuesProps[]
        }]
    }
}

interface TransferQueryResults {
    results: {
        instances: [{
            createdAt: string
            trackedEntity: string
            orgUnit: string
            dataValues: dataValuesProps[]
        }]
    }
}

export type { EventQueryProps, GeTDataElementsProps, RegistrationQueryResults, dataValuesProps, TransferQueryResults }
