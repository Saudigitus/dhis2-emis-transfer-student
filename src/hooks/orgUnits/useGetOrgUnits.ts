import { useRecoilState } from "recoil";
import { useDataQuery } from "@dhis2/app-runtime";
import useShowAlerts from "../commons/useShowAlert";
import { loadingOusState } from "../../schema/loadingOusSchema";

const ORGUNIT_QUERY: any = (id: string) => ({
    results: {
        resource: "organisationUnits",
        id,
        params: {
            fields: [
                "id,name"
            ],
            paging: false
        }
    }
})

export function useGetOusData(id: string) {
    const [, setOuLoading] = useRecoilState(loadingOusState);
    const { hide, show } = useShowAlerts()

    const { data, loading } = useDataQuery<{ results: { id: string, name: string } }>(ORGUNIT_QUERY(id), {
        onComplete: () => { setOuLoading(false) },
        onError(error) {
            show({
                message: `${("Could not get data")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    })

    return {
        ouName: data?.results?.name,
        loading
    }
}
