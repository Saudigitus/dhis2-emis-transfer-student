import { useSetRecoilState } from "recoil"
import { useLocation } from "react-router-dom";
import { useParams } from "../commons/useQueryParams";
import { HeaderFieldsState } from "../../schema/headersSchema"
import useDataElementsParamMapping from "../dataElements/useDataElementsParamMapping";

export function useGetInitialValues() {
    const location = useLocation()
    const { urlParamiters } = useParams()
    const paramsMapping = useDataElementsParamMapping();
    const setHeaderFields = useSetRecoilState(HeaderFieldsState)
    const entries = location?.search?.split('?')?.[1]?.split('&')?.map((item) => item.split('='))
    const dataElementsQuerybuilder = []
    if (entries?.length > 0) {
        for (const [key, value] of entries) {
            const keys = Object.entries(paramsMapping)
            for (const [dataElement, name] of keys) {
                if (name.includes(key)) {
                    dataElementsQuerybuilder.push(`${dataElement}:in:${value.replace("+", " ")}`)
                }
            }
        }
        setHeaderFields({
            attributes: [],
            dataElements: dataElementsQuerybuilder
        })
    }

    return {
        isSetSectionType: location?.search.includes("sectionType"),
        sectionType: urlParamiters().sectionType
    }
}