import { attributesProps } from "../../api/WithRegistrationTypes"
import { dataValuesProps } from "../../api/WithoutRegistrationTypes"
import { ProgramConfig } from "../../programConfig/ProgramConfig"

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
    statusDataElementId?: string
    pendingStatus?: string
}

type RowsDataProps = Record<string, string | number | boolean | any>;

interface defaultProps {
    metaData: string
    program: ProgramConfig
    value: string
}



export type { FormatResponseRowsProps, RowsDataProps, defaultProps, attributesProps, dataValuesProps }