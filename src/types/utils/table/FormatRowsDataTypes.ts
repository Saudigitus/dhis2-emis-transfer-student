import { attributesProps } from "../../api/WithRegistrationTypes"
import { dataValuesProps } from "../../api/WithoutRegistrationTypes"
import { ProgramConfig } from "../../programConfig/ProgramConfig"
import { CustomAttributeProps } from "../../variables/AttributeColumns"

interface FormatResponseRowsProps {
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

type RowsDataProps = Record<string, string | number | boolean | any>;

interface DefaultProps {
    attribute: string
    value: string
    headers: CustomAttributeProps[]
}



export type { FormatResponseRowsProps, RowsDataProps, DefaultProps, attributesProps, dataValuesProps }