import { SideBarDataRouteProps } from "../../../types/utils/ConstantsTypes";

export function subItemRoute (props: SideBarDataRouteProps)  {
    const { location, sectionType } = props

    return location.replace(/(student|staff)/g, sectionType).toString();
};