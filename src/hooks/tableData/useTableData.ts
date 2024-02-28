
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDataEngine } from "@dhis2/app-runtime";
import { formatAllSelectedRow, formatResponseRows } from "../../utils/table/rows/formatResponseRows";
import { useParams } from "../commons/useQueryParams";
import { HeaderFieldsState } from "../../schema/headersSchema";
import useShowAlerts from "../commons/useShowAlert";
import { RowSelectionState } from "../../schema/tableSelectedRowsSchema";
import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";
import { EventQueryProps, TransferQueryResults } from "../../types/api/WithoutRegistrationProps";
import { TeiQueryProps, TeiQueryResults } from "../../types/api/WithRegistrationProps";
import { TableDataProps } from "../../types/table/TableContentProps";
import { ProgramConfigState } from "../../schema/programSchema";

const EVENT_QUERY = ({ ouMode, page, pageSize, program, order, programStage, filter, orgUnit, filterAttributes, trackedEntity, programStatus }: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            order,
            page,
            pageSize,
            programStatus,
            ouMode,
            program,
            programStage,
            orgUnit,
            filter,
            filterAttributes,
            fields: "*",
            trackedEntity
        }
    }
})

const TEI_QUERY = ({ ouMode, pageSize, program, trackedEntity, orgUnit, order }: TeiQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            program,
            order,
            ouMode,
            pageSize,
            trackedEntity,
            orgUnit,
            fields: "trackedEntity,trackedEntityType,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,status,orgUnit,orgUnitName,enrolledAt]"
        }
    }
})


export function useTableData() {
    const engine = useDataEngine();
    const { getDataStoreData } = getSelectedKey();
    const headerFieldsState = useRecoilValue(HeaderFieldsState)
    const [selected, setSelected] = useRecoilState(RowSelectionState);
    const programConfig = useRecoilValue(ProgramConfigState)
    const { urlParamiters } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<TableDataProps[]>([])
    const { hide, show } = useShowAlerts()
    const school = urlParamiters().school as unknown as string

    const incomingInitialFilter = [`${getDataStoreData?.transfer?.destinySchool as unknown as string}:in:${school}`, ...headerFieldsState?.dataElements];

    async function getData(page: number, pageSize: number, selectedTab: string) {
        setLoading(true)

        const tranferResults: TransferQueryResults = await engine.query(EVENT_QUERY({
            ouMode: undefined as unknown as string,
            page,
            pageSize,
            program: getDataStoreData?.program as unknown as string,
            order: "createdAt:desc",
            programStatus: "ACTIVE",
            programStage: getDataStoreData?.transfer?.programStage as unknown as string,
            filter: (getDataStoreData != null) && selectedTab === "incoming" ? incomingInitialFilter : headerFieldsState?.dataElements,
            filterAttributes: headerFieldsState?.attributes,
            orgUnit: selectedTab === "outgoing" ? school : undefined as unknown as string,
            trackedEntity: undefined as unknown as string,
        })).catch((error) => {
            show({
                message: `${("Could not get data")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }) as unknown as TransferQueryResults

        const trackedEntityToFetch = tranferResults?.results?.instances.map((x: { trackedEntity: string }) => x.trackedEntity).toString().replaceAll(",", ";")

        const teiResults: TeiQueryResults = trackedEntityToFetch?.length > 0
            ? await engine.query(TEI_QUERY({
                ouMode: "ALL",
                order: "created:desc",
                pageSize,
                program: getDataStoreData?.program as unknown as string,
                orgUnit: undefined as unknown as string,
                trackedEntity: trackedEntityToFetch
            })).catch((error) => {
                show({
                    message: `${("Could not get data")}: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            }) as unknown as TeiQueryResults
            : { results: { instances: [] } } as unknown as TeiQueryResults
        setSelected({
            ...selected,
            rows: formatAllSelectedRow({
                transferInstances: tranferResults?.results?.instances,
                teiInstances: teiResults.results.instances,
            })
        })
        setTableData(formatResponseRows({
            transferInstances: tranferResults?.results?.instances,
            teiInstances: teiResults.results.instances,
            programConfig: programConfig,
            programStageId: getDataStoreData?.transfer?.programStage

        }));

        setLoading(false)
    }

    return {
        getData,
        tableData,
        loading
    }
}
