import { useDataQuery } from "@dhis2/app-runtime"

const TEI_QUERY = (organisationUnit: string, program: string, trackedEntity: string) => ({
    results: {
        resource: "tracker/trackedEntities",
        id: trackedEntity,
        params: {
            ou: organisationUnit,
            program,
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value],enrollments[events[*]]"
        }
    }
})

const useGetTEIByID = (organisationUnit: string, program: string, trackedEntity: string) => {
    const { data, loading, error, refetch } = useDataQuery(TEI_QUERY(organisationUnit, program, trackedEntity))
    return { data, loading, error, refetch }
}

export default useGetTEIByID