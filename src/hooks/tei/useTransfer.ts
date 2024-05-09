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

const TRANSFERQUERY : any = {
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
    const { registrationEvent, getRegistrationEvent, loading: loadingRegistration } = useGetRegistrationEvent()
    const selectedTei = useRecoilValue(RowSelectionState).selectedRows[0]

    
    useEffect(() => {
        getRegistrationEvent(selectedTei?.transferInstance?.enrollment, selectedTei?.teiInstance?.trackedEntity)
     }, []);

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
                            {
                                ...registrationEvent,
                                orgUnit: newOu,
                            },
                            {
                                ...transferEvent,
                                dataValues: [{ dataElement: getDataStoreData?.transfer?.status, value: transferConst({status:"approved"}) as string }]
                            }
                        ]
                    }
                ]
            }
        ]
        
        return await updateTei({ data: { trackedEntities } }).then(() => {handleCloseApproval()});
        
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
                setRefetch(!refetch)
            }).catch(e => {
            })
            setloading(false)
    }



    const rejectTEI = async (event: any, handleCloseApproval: () => void) => {
        setloading(true)
            await mutateValues(event, getDataStoreData?.transfer?.status, transferConst({status:"reproved"}) as string)
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
        loadingRegistration,
        transferTEI,
        rejectTEI
    }
}
