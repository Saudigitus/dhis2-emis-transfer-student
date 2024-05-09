export const teiPostBody = (programId: string, orgUnit: string, teiData: any) => {
 
    return {
        trackedEntities: [
            {
                enrollments: [
                    {
                        program: programId,
                        orgUnit,
                        attributes: teiData?.attributes,
                        status: "COMPLETED",
                        events: teiData?.events
                    }
                ],
                orgUnit,
                trackedEntityType: teiData?.trackedEntityType,
                trackedEntity: teiData?.trackedEntity
            }
        ]
    }
}
