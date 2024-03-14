import { attributesProps } from "../api/WithRegistrationTypes"
import { dataValuesProps } from "../api/WithoutRegistrationTypes"

interface SelectionSchemaConfig {
    isAllRowsSelected: boolean,
    selectedRows: {
        teiInstance: {
            attributes: attributesProps[]
            createdAt: any,
            enrollments: {
                enrollment: any,
                orgUnit: any,
                orgUnitName: any,
                status: string
            }[],
            orgUnit: string,
            trackedEntity: string,
            trackedEntityType: string
        },
        transferInstance: {
            event: string,
            orgUnit: string,
            orgUnitName: string,
            dataValues: dataValuesProps[]
        },
        registrationInstance: {
            event: string,
            orgUnit: string,
            orgUnitName: string,
            dataValues: dataValuesProps[]
        }
    }[]
    rows: any[]
}

export type { SelectionSchemaConfig }