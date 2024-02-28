import { SideBarDataRouteProps } from "../../../types/utils/ConstantsTypes";

export function subItemRoute ({ location, sectionType }: SideBarDataRouteProps)  {

    return location?.replace(/(student|staff)/g, sectionType).toString();
};