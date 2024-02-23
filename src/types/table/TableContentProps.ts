import { CustomAttributeProps } from "../variables/AttributeColumns"

interface TableProps {
    head: any
    footer: any
}

interface TableComponentProps {
    children?: React.ReactNode
    className?: string
}

interface HeaderCellProps {
    children?: React.ReactNode
    className?: string
    passOnProps?: object
    table?: TableProps
    colspan?: number
    onClick?: () => void
}

interface RowProps {
    children?: React.ReactNode
    className?: string
    passOnProps?: object
    table?: TableProps
}

interface RenderHeaderProps {
    rowsHeader?: CustomAttributeProps[]
    orderBy?: string
    order?: "asc" | "desc"
    // TODO resolve this bug.👇
    createSortHandler?: (property: string) => any
    rowsData?: any[]
    headerData?: CustomAttributeProps[]
}

interface RenderRowsProps {
    headerData: CustomAttributeProps[], 
    rowsData:  any[], 
    loading: boolean, 
    selectedTab: any, 
    handleOpenApproval: () => void;
}

interface TableSortProps {
    children?: React.ReactNode
    active: boolean
    direction?: 'asc' | 'desc'
    createSortHandler: (rowsPerPage: string) => void
}
type tableProps = {
    head: any,
    footer: any,
}

interface RowCellProps {
    children?: React.ReactNode,
    className?: string,
    passOnProps?: object,
    table?: tableProps,
    colspan?: number,
}

interface RowTableProps {
    children?: React.ReactNode
    className?: string
    passOnProps?: object
    table?: tableProps
}

type TableDataProps = Record<string, string>;


export type { TableComponentProps, HeaderCellProps, RowProps, RenderHeaderProps, TableSortProps, TableDataProps, RowCellProps, RowTableProps, RenderRowsProps }