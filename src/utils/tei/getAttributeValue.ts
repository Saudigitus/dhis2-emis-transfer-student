import { AttributeFilterProps } from "../../types/utils/TeiTypes"

export function attributeFilter({ array, attribute }: AttributeFilterProps) {
    
    return array?.find((element: {attribute: string, value: string}) => {
        return element?.attribute === attribute
    })?.value
}
