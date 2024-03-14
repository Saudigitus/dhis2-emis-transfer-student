import { attributesProps } from "../../api/WithRegistrationTypes"
import { dataValuesProps } from "../../api/WithoutRegistrationTypes"
import { ProgramConfig } from "../../programConfig/ProgramConfig"
import { CustomAttributeProps } from "../../variables/AttributeColumns"

interface FormatResponseRowsProps {
    transferInstances: {
        createdAt: string
        trackedEntity: string
        dataValues: dataValuesProps[]
    }[]
    teiInstances: {
        trackedEntity: string
        attributes: attributesProps[]
    }[]
    registrationInstances: {
        trackedEntity: string
        dataValues: dataValuesProps[]
    }[]
    programConfig?: ProgramConfig
    programStageId?: string | undefined
    statusDataElementId?: string
    pendingStatus?: string
}

type RowsDataProps = Record<string, string | number | boolean | any>;

interface DefaultProps {
    attribute: string
    value: string
    headers: CustomAttributeProps[]
}



export type { FormatResponseRowsProps, RowsDataProps, DefaultProps, attributesProps, dataValuesProps }