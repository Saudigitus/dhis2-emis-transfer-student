import { AttributeFilterProps } from "../../types/utils/TeiTypes"

export function attributeFilter(props: AttributeFilterProps) {
    const { array, attribute } = props;
    
    return array?.find((element: {attribute: string, value: string}) => {
        return element?.attribute === attribute
    })?.value
}
