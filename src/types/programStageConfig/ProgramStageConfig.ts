export interface ProgramStageConfig {
    autoGenerateEvent: boolean
    displayName: string
    id: string
    executionDateLabel?: string
    programStageDataElements: [
        {
            displayInReports: boolean
            compulsory: boolean
            programStage: {
                id: string
            }
            dataElement: {
                displayInReports: boolean | undefined
                displayName: string
                formName: string
                id: string
                valueType: string
                optionSet: {
                    id: string
                    options: {
                        [x: string]: any
                        value: string
                        label: string
                    }
                }
            }
        }
    ]
}
