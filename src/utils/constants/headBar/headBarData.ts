import { type HeadBarTypes } from "../../../types/headBar/HeadBarTypes"
import { HeadBarDataProps } from "../../../types/utils/ConstantsTypes"

function headBarData({ selectedOptions }: HeadBarDataProps): HeadBarTypes[] {

    return [
        {
            id: "c540ac7c",
            label: "School",
            value: selectedOptions?.schoolName ?? "Select a school",
            placeholder: "Search for organisation unit",
            component: "orgUnitTree",
            selected: selectedOptions?.schoolName ? true : false,
        }
    ]
}
export { headBarData }
