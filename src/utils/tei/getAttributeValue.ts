export function attributeFilter(array: Array<{attribute: string, value: string}>, attribute: string) {
    return array?.find((element: {attribute: string, value: string}) => {
        return element?.attribute === attribute
    })?.value
}
