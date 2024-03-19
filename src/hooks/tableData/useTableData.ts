
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDataEngine } from "@dhis2/app-runtime";
import { formatAllSelectedRow, formatResponseRows } from "../../utils/table/rows/formatResponseRows";
import { useParams } from "../commons/useQueryParams";
import { HeaderFieldsState } from "../../schema/headersSchema";
import useShowAlerts from "../commons/useShowAlert";
import { RowSelectionState } from "../../schema/tableSelectedRowsSchema";
import { getSelectedKey } from "../../utils/commons/dataStore/getSelectedKey";
import { EventQueryProps, RegistrationQueryResults, TransferQueryResults } from "../../types/api/WithoutRegistrationTypes";
import { TeiQueryProps, TeiQueryResults } from "../../types/api/WithRegistrationTypes";
import { TableDataProps } from "../../types/table/TableContentTypes";
import { ProgramConfigState } from "../../schema/programSchema";
import { useTransferConst } from "../../utils/constants/transferOptions/statusOptions";

const EVENT_QUERY = (queryProps: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            fields: "*",
            ...queryProps
        }
    }
})

const TEI_QUERY = (queryProps: TeiQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            fields: "trackedEntity,trackedEntityType,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,status,orgUnit,orgUnitName,enrolledAt]",
            ...queryProps
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
    const { transferConst } = useTransferConst()

    const incomingInitialFilter = [`${getDataStoreData?.transfer?.destinySchool as unknown as string}:in:${school}`, ...headerFieldsState?.dataElements];

    async function getData(page: number, pageSize: number, selectedTab: string) {
        setLoading(true)
        const registrationValuesByTei: RegistrationQueryResults = {
            results: {
                instances: [] as unknown as RegistrationQueryResults["results"]["instances"]
            }
        }

        const tranferResults: TransferQueryResults = await engine.query(EVENT_QUERY({
            ouMode: undefined as unknown as string,
            page,
            pageSize,
            program: getDataStoreData?.program as unknown as string,
            order: "createdAt:desc",
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

        const trackedEntityIds = tranferResults?.results?.instances.map((x: { trackedEntity: string, orgUnit: string }) => ({trackedEntity: x.trackedEntity, orgUnit: x.orgUnit}))
        const trackedEntityToFetch = tranferResults?.results?.instances.map((x: { trackedEntity: string }) => x.trackedEntity).toString().replaceAll(",", ";")

        if (trackedEntityIds?.length) {
            for (const tei of trackedEntityIds) {
                const registrationResults: RegistrationQueryResults = await engine.query(EVENT_QUERY({
                    ouMode: undefined as unknown as string,
                    program: getDataStoreData?.program as unknown as string,
                    order: "createdAt:desc",
                    programStage: getDataStoreData?.registration?.programStage as unknown as string,
                    orgUnit: tei.orgUnit,
                    trackedEntity: tei.trackedEntity
                })).catch((error) => {
                    show({
                        message: `${("Could not get data")}: ${error.message}`,
                        type: { critical: true }
                    });
                    setTimeout(hide, 5000);
                }) as unknown as RegistrationQueryResults;

                registrationValuesByTei.results.instances.push(...registrationResults?.results?.instances)
            }
        }

        const teiResults: TeiQueryResults = trackedEntityToFetch?.length
            ? await engine.query(TEI_QUERY({
                ouMode: "ALL",
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
                registrationInstances: registrationValuesByTei?.results?.instances,
                teiInstances: teiResults.results.instances,
            })
        })
        setTableData(formatResponseRows({
            transferInstances: tranferResults?.results?.instances,
            registrationInstances: registrationValuesByTei?.results?.instances,
            teiInstances: teiResults.results.instances,
            programConfig: programConfig,
            programStageId: getDataStoreData?.transfer?.programStage,
            statusDataElementId: getDataStoreData?.transfer?.status,
            pendingStatus: transferConst({status: "pending" }) as string

        }));

        setLoading(false)
    }

    return {
        getData,
        tableData,
        loading
    }
}
