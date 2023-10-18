import { atom } from "recoil"

interface attendance {
    absenceReason: string
    programStage: string
    status: string
}

interface programStages {
    programStage: string
}

interface performance {
    programStages: programStages[]
}

interface registration {
    academicYear: string
    position: string
    programStage: string
    employmentType: string
}

interface transfer {
    destinySchool: string
    originSchool: string
    programStage: string
    status: string
}

interface dataStoreRecord {
    attendance: attendance
    key: string
    lastUpdate: string
    performance: performance
    program: string
    registration: registration
    transfer: transfer
    ["socio-economics"]: programStages

}

export const DataStoreState = atom<dataStoreRecord | null>({
    key: "dataStore-get-state",
    default: null
})
