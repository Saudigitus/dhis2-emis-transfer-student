
import { useRecoilState, useRecoilValue } from "recoil";
import { DataStoreState } from "../../schema/dataStoreSchema";
import { useState } from "react";
import { useDataEngine } from "@dhis2/app-runtime";
import { formatAllSelectedRow, formatResponseRows } from "../../utils/table/rows/formatResponseRows";
import { useParams } from "../commons/useQueryParams";
import { HeaderFieldsState } from "../../schema/headersSchema";
import useShowAlerts from "../commons/useShowAlert";
import { RowSelectionState } from "../../schema/tableSelectedRowsSchema";

type TableDataProps = Record<string, string>;

interface EventQueryProps {
    page: number
    pageSize: number
    ouMode: string | undefined
    program: string
    order: string
    programStage: string
    orgUnit: string | undefined
    filter?: string[]
    filterAttributes?: string[]
    trackedEntity?: string
}

interface TeiQueryProps {
    program: string
    pageSize: number
    ouMode: string
    trackedEntity: string
    orgUnit?: string
    order: string
}

const EVENT_QUERY = ({ ouMode, page, pageSize, program, order, programStage, filter, orgUnit, filterAttributes, trackedEntity }: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            order,
            page,
            pageSize,
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

interface dataValuesProps {
    dataElement: string
    value: string
}

interface attributesProps {
    attribute: string
    value: string
}

interface TransferQueryResults {
    results: {
        instances: [{
            trackedEntity: string
            orgUnit: string
            dataValues: dataValuesProps[]
        }]
    }
}

interface TeiQueryResults {
    results: {
        instances: Array<{
            trackedEntity: string
            attributes: attributesProps[]
        }>
    }
}

interface RegistrationQueryResults {
    results: {
        instances: any
    }
}

export function useTableData() {
    const engine = useDataEngine();
    const dataStoreState = useRecoilValue(DataStoreState);
    const headerFieldsState = useRecoilValue(HeaderFieldsState)
    const [selected, setSelected] = useRecoilState(RowSelectionState);

    const { urlParamiters } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<TableDataProps[]>([])
    const { hide, show } = useShowAlerts()
    const school = urlParamiters().school as unknown as string

    console.log("filterState", [`kQbquG7UivM:eq:${school}`, ...headerFieldsState?.dataElements], school)

    async function getData(page: number, pageSize: number, selectedTab: string) {
        setLoading(true)
        const registrationValuesByTei: RegistrationQueryResults = {
            results: {
                instances: []
            }
        }
        const initialFilter = [`${dataStoreState?.transfer?.destinySchool as unknown as string}:eq:${school}`, ...headerFieldsState?.dataElements];
        const tranferResults: TransferQueryResults = await engine.query(EVENT_QUERY({
            ouMode: undefined,
            page,
            pageSize,
            program: dataStoreState?.program as unknown as string,
            order: "createdAt:desc",
            programStage: dataStoreState?.transfer?.programStage as unknown as string,
            filter: (dataStoreState != null) && selectedTab === "incoming" ? initialFilter : headerFieldsState?.dataElements,
            filterAttributes: headerFieldsState?.attributes,
            orgUnit: selectedTab === "outgoing" ? school : undefined
        })).catch((error) => {
            show({
                message: `${("Could not get data")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        })

        const trackedEntityIds = tranferResults?.results?.instances.map((x: { trackedEntity: string, orgUnit: string }) => ({trackedEntity: x.trackedEntity, orgUnit: x.orgUnit}))
        const trackedEntityToFetch = tranferResults?.results?.instances.map((x: { trackedEntity: string }) => x.trackedEntity).toString().replaceAll(",", ";")

        if (trackedEntityIds?.length > 0) {
            for (const tei of trackedEntityIds) {
                const registrationResults: RegistrationQueryResults = await engine.query(EVENT_QUERY({
                    ouMode: undefined,
                    page,
                    pageSize,
                    program: dataStoreState?.program as unknown as string,
                    order: "createdAt:desc",
                    programStage: dataStoreState?.registration?.programStage as unknown as string,
                    // filter: headerFieldsState?.dataElements,
                    // filterAttributes: headerFieldsState?.attributes,
                    orgUnit: undefined,
                    trackedEntity: tei.trackedEntity
                })).catch((error) => {
                    show({
                        message: `${("Could not get data")}: ${error.message}`,
                        type: { critical: true }
                    });
                    setTimeout(hide, 5000);
                })

                registrationValuesByTei.results.instances.push(...registrationResults?.results?.instances)
            }
        }

        const teiResults: TeiQueryResults = trackedEntityToFetch?.length > 0
            ? await engine.query(TEI_QUERY({
                ouMode: "ALL",
                order: "created:desc",
                pageSize,
                program: dataStoreState?.program as unknown as string,
                orgUnit: undefined,
                trackedEntity: trackedEntityToFetch
            })).catch((error) => {
                show({
                    message: `${("Could not get data")}: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            })
            : { results: { instances: [] } }

            console.log("AllData", formatAllSelectedRow({
                transferInstances: tranferResults?.results?.instances,
                registrationInstances: registrationValuesByTei?.results?.instances,
                teiInstances: teiResults.results.instances
            }))
        setSelected({
            ...selected,
            rows: formatAllSelectedRow({
                transferInstances: tranferResults?.results?.instances,
                registrationInstances: registrationValuesByTei?.results?.instances,
                teiInstances: teiResults.results.instances
            })
        })
        setTableData(formatResponseRows({
            transferInstances: tranferResults?.results?.instances,
            registrationInstances: registrationValuesByTei?.results?.instances,
            teiInstances: teiResults.results.instances
        }));

        setLoading(false)
    }

    return {
        getData,
        tableData,
        loading
    }
}
