import { SelectedOptionsTypes } from "../headBar/HeadBarTypes";

interface HeadBarDataProps {
    selectedOptions: SelectedOptionsTypes
}


interface SideBarDataProps {
    locationParms : string
}

type SideBarDataRouteProps = {
    location: string 
    sectionType: string
}


type StatusOptionsType = "pending" | "approved" | "reproved"

interface StatusOptionsProps {
    key: StatusOptionsProps
}

export type { HeadBarDataProps, SideBarDataProps, SideBarDataRouteProps, StatusOptionsType, StatusOptionsProps }