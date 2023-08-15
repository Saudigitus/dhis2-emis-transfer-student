import { useState } from "react";
import { useDataEngine } from "@dhis2/app-runtime";

interface GetOrgUnitProps {
    orgUnit: string
}

interface OuDataProps {
    id: string
    name: string
}

interface OrgUnitQueryResult {
    results: {
        id: string
        name: string
    }
}

const ORGUNIT_QUERY = (id: string) => ({
    results: {
        resource: "organisationUnits",
        id: `${id}`,
        params: {
            fields: [
                "id,name"
            ]
        }
    }
});

export function useGetOuById() {
    const engine = useDataEngine();
    const [loading, setLoading] = useState<boolean>(true);

    async function getOu(orgUnitId: string) {
        await engine.query(ORGUNIT_QUERY(orgUnitId)).then(response => {
            setLoading(false);
            console.log(response)
            return response.results;
        })
    }

    return {
        loading,
        getOu
    };
}
