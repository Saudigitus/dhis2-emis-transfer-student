import { SelectionSchemaConfig } from "../../../schema/tableSelectedRowsSchema"

interface CheckIsRowSelectedProps {
    rawRowData: any
    selected: SelectionSchemaConfig
}

interface ReplaceSelectedRowProps {
    rawRowData: any
}

export type { CheckIsRowSelectedProps, ReplaceSelectedRowProps }