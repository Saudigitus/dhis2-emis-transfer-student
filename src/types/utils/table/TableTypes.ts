import { ProgramConfig } from "../../programConfig/ProgramConfig"
import { CustomAttributeProps } from "../../variables/AttributeColumns"

interface ConvertArrayToObjectProps {
    array: string[][]
}

interface HeaderFormatResponseProps {
    data: ProgramConfig
    programStageId: string | undefined
    registrationId: string | undefined
    tableColumns: CustomAttributeProps[]
}

interface DisableNextPageProps { 
    rowsPerPage: number 
    totalPerPage: number 
}

export type { ConvertArrayToObjectProps, HeaderFormatResponseProps, DisableNextPageProps }