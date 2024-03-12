import { useRecoilValue } from "recoil";
import { useState } from "react";
import { TableColumnState } from "../../schema/columnSchema";
import { ProgramConfigState } from "../../schema/programSchema";
import { formatResponse } from "../../utils/table/header/formatResponse";
import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";

export function useHeader() {
    const programConfigState = useRecoilValue(ProgramConfigState);
    const [columnHeader, setcolumnHeader] = useState()
    const { getDataStoreData } = getSelectedKey()
    const tableColumns = useRecoilValue(TableColumnState)

    return {
        columns: formatResponse({data:programConfigState, programStageId:getDataStoreData?.transfer?.programStage, registrationId: getDataStoreData?.registration?.programStage, tableColumns:tableColumns}),
        columnHeader,
        setcolumnHeader
    }
}

