import { DisableNextPageProps } from "../../../types/utils/table/TableTypes"

export const disableNextPage = (props: DisableNextPageProps): boolean => {
    const { totalPerPage, rowsPerPage } = props

    if (totalPerPage < rowsPerPage) {
        return true
    }
    return false
}