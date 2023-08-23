interface HeadBarTypes {
    id: string
    label: string
    value: string
    placeholder: string
    component?: string
    dataElementId?: string
}

interface SelectedOptionsTypes {
    school: string | null
    schoolName: string | null
}
export type { HeadBarTypes, SelectedOptionsTypes }
