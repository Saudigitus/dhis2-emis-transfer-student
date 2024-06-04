import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useDataEngine } from '@dhis2/app-runtime'
import { TeiRefetch } from '../../schema/refecthTeiSchema'
import { useEditDataElement } from '../events/useEditDataElement'
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey'
import { useTransferConst } from '../../utils/constants/transferOptions/statusOptions'
import { useUpdateTei } from '../events/useUpdateTeis'
import { useGetEvent } from '../events/useGetEvent'
import { getDataStoreKeys } from '../../utils/commons/dataStore/getDataStoreKeys'
import { RowSelectionState } from '../../schema/tableSelectedRowsSchema'
import { useGetRegistrationEvent } from './usegetRegistrationEvent'
import { useGetEventsByEnrollment } from '../events/useGetEventsByEnrollment'
import useGetUsedProgramStages from '../programStages/useGetUsedPProgramStages'

const TRANSFERQUERY: any = {
    resource: 'tracker/ownership/transfer',
    type: 'update',
    params: ({ program, ou, trackedEntityInstance }: any) => ({
        program,
        ou,
        trackedEntityInstance
    })
}

export function useTransferTEI() {
    const engine = useDataEngine()
    const { getDataStoreData } = getSelectedKey();
    const [loading, setloading] = useState(false)
    const { mutateValues } = useEditDataElement()
    const [refetch, setRefetch] = useRecoilState<boolean>(TeiRefetch)
    const { transferConst } = useTransferConst()
    const { loadUpdateTei, updateTei } = useUpdateTei();
    const selectedTei = useRecoilValue(RowSelectionState).selectedRows[0]
    const { events, getEventsByEnrollment, loading: loadingEvents } = useGetEventsByEnrollment()
    // const { registrationEvent, getRegistrationEvent, loading: loadingEvents } = useGetRegistrationEvent()
    const programStagesToTransfer = useGetUsedProgramStages()

    // useEffect(() => {
    //     getRegistrationEvent(selectedTei?.transferInstance?.enrollment, selectedTei?.teiInstance?.trackedEntity)
    // }, []);


    useEffect(() => {
        getEventsByEnrollment(selectedTei?.transferInstance?.enrollment, selectedTei?.teiInstance?.trackedEntity, programStagesToTransfer)
    }, []);

    const registrationEvent: any = events?.find((x: any) => x.programStage == getDataStoreData.registration.programStage) ?? {}

    async function formatEnrollmentBody(newOu: any, transferEvent: any, tei: any, handleCloseApproval: () => void) {
        const trackedEntities = [
            {
                orgUnit: newOu,
                trackedEntity: tei?.trackedEntity,
                trackedEntityType: tei?.trackedEntityType,
                enrollments: [
                    {
                        orgUnit: newOu,
                        program: registrationEvent?.program,
                        status: "COMPLETED",
                        enrollment: registrationEvent?.enrollment,
                        attributes: tei?.attributes,
                        createdAt: registrationEvent?.createdAt,
                        occurredAt: registrationEvent?.occurredAt,
                        enrolledAt: registrationEvent?.occurredAt,
                        events: [
                            ...events?.map((event: any) => ({
                                ...event,
                                orgUnit: newOu,
                            })),
                            {
                                ...transferEvent,
                                dataValues: [{ dataElement: getDataStoreData?.transfer?.status, value: transferConst({ status: "approved" }) as string }]
                            }
                        ]
                    }
                ]
            }
        ]

        return await updateTei({ data: { trackedEntities } }).then(() => { handleCloseApproval(); setRefetch(!refetch) });

    }


    const transferTEI = async (ou: any, selectedTei: any, handleCloseApproval: () => void) => {
        setloading(true)
        await engine.mutate(TRANSFERQUERY, {
            variables: {
                program: selectedTei?.transferInstance?.program,
                ou,
                trackedEntityInstance: selectedTei?.teiInstance?.trackedEntity
            }
        })
            .then(async (res) => {
                formatEnrollmentBody(ou, selectedTei?.transferInstance, selectedTei?.teiInstance, handleCloseApproval)
            }).catch(e => {
            })
        setloading(false)
    }



    const rejectTEI = async (event: any, handleCloseApproval: () => void) => {
        setloading(true)
        await mutateValues(event, getDataStoreData?.transfer?.status, transferConst({ status: "reproved" }) as string)
            .then(async (res) => {
                setRefetch(!refetch)
                handleCloseApproval()
            }).catch(e => {
                setloading(false)
            })
        setloading(false)
    }

    return {
        loading: loading || loadUpdateTei,
        loadingEvents,
        transferTEI,
        rejectTEI
    }
}
