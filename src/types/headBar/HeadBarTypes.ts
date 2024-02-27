interface HeadBarTypes {
    id: string
    label: string
    value: string
    selected?:boolean
    component?: string
    placeholder: string
    dataElementId?: string
}

interface SelectedOptionsTypes {
    academicYear: string | null
    class: string | null
    grade: string | null
    school: string | null
    schoolName: string | null
}
export type { HeadBarTypes, SelectedOptionsTypes }
