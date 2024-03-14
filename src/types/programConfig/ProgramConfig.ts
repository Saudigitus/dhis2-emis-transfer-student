import { ProgramStageConfig } from "../programStageConfig/ProgramStageConfig"

export interface ProgramConfig {
    displayName: string
    id: string
    description: string
    access?: any
    programType: string
    programStages: ProgramStageConfig[]
    programTrackedEntityAttributes:
    {
        trackedEntityAttribute: {
            generated: boolean
            pattern?: string
            displayName: string
            formName: string
            id: string
            valueType: string
            optionSet: { id: string, options: [{ value: string, label: string }] }
        }
        searchable: boolean
        displayInList: boolean
        mandatory: boolean
    }[]
    
    trackedEntityType: {
        trackedEntityTypeAttributes: {
            trackedEntityAttribute: {
                id: string
            }
        }[]
        
        id: string
    }
}
