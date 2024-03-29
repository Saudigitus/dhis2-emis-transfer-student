import { useSetRecoilState } from "recoil"
import { useLocation } from "react-router-dom";
import { useParams } from "../commons/useQueryParams";
import { HeaderFieldsState } from "../../schema/headersSchema"
import useDataElementsParamMapping from "../dataElements/useDataElementsParamMapping";

let localLocation: string = ""
export function useGetInitialValues() {
    const location = useLocation()
    const { urlParamiters, remove } = useParams()
    const paramsMapping = useDataElementsParamMapping();
    const setHeaderFields = useSetRecoilState(HeaderFieldsState)
    const entries = location?.search?.split('?')?.[1]?.split('&')?.map((item) => item.split('=')).filter(x => x.length === 2)
    const dataElementsQuerybuilder = []
    let diff: number = 0

    if (entries?.length > 0) {
        for (const [key, value] of entries) {
            const keys = Object.entries(paramsMapping)
            for (const [dataElement, name] of keys) {
                if (name.includes(key) && key !== "academicYear") {
                    if (!localLocation.includes(value)) {
                        diff = diff + 1
                    }
                    dataElementsQuerybuilder.push(`${dataElement}:in:${value.replace("+", " ")}`)
                }
            }
        }
        if (diff > 0)
        setHeaderFields({
            attributes: [],
            dataElements: dataElementsQuerybuilder
        })
    }
    localLocation = location.search.toString()

    return {
        isSetSectionType: location?.search.includes("sectionType"),
        sectionType: urlParamiters().sectionType
    }
}