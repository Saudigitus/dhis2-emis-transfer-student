export function getOuName(array: Array<{id: string, name: string}>, id: string) {
    return array?.find((element: {id: string, name: string}) => {
        return element?.id === id
    })?.name
}
