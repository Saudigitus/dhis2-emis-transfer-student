import { useSetRecoilState } from "recoil";
import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";
import useShowAlerts from "../commons/useShowAlert";
import { OuState } from "../../schema/orgUnitsSchema";

const ORGUNIT_QUERY = {
    results: {
        resource: "organisationUnits",
        params: {
            fields: [
                "id,name"
            ],
            paging: false
        }
    }
}

export function useGetOusData() {
    const setOuState = useSetRecoilState(OuState);
    const { hide, show } = useShowAlerts()

    const { data, loading } = useDataQuery<{ results: { organisationUnits: Array<{ id: string, name: string }> } }>(ORGUNIT_QUERY, {
        onError(error) {
            show({
                message: `${("Could not get data")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    })

    useEffect(() => {
        setOuState(data?.results?.organisationUnits);
    }, [loading])

    return {
        data,
        loading
    }
}
