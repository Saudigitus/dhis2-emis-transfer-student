import { FlyoutOptionsProps } from "./FlyoutOptions"

interface DropdownButtonProps {
    name: string
    icon?: React.ReactNode
    options: FlyoutOptionsProps[]
    disabled: boolean
  
}

export type { DropdownButtonProps }