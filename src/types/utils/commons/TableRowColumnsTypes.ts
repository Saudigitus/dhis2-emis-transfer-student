import { CustomAttributeProps } from "../../variables/AttributeColumns"

interface ShowValueBasedOnColumnProps {
    index: number 
    value: string
    dataStore: any
    selected: any 
    selectedTab: string 
    column: CustomAttributeProps 
    onToggle: (arg: object) => void
    setClickedButton: (arg: string) => void
    pendingStatus: string
    valueColorMapping: Record<string, string>
}

interface RemoveColumByIdProps {
    dataStore: any, 
    selectedTab: string
    columns: CustomAttributeProps[]
}

export type { ShowValueBasedOnColumnProps, RemoveColumByIdProps}
