import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { useDataEngine } from '@dhis2/app-runtime'
import { TeiRefetch } from '../../schema/refecthTeiSchema'
import { useEditDataElement } from '../events/useEditDataElement'
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey'
import { useTransferConst } from '../../utils/constants/transferOptions/statusOptions'

const TRANSFERQUERY : any = {
    resource: 'tracker',
    data: ({ data }: any) => data,
    type: 'create',
    params: {
        async: false
    }
}

export function useTransferTEI() {
    const engine = useDataEngine()
    const { getDataStoreData } = getSelectedKey();

    const [loading, setloading] = useState(false)
    const { mutateValues } = useEditDataElement()
    const [refetch, setRefetch] = useRecoilState<boolean>(TeiRefetch)
    const { transferConst } = useTransferConst()

    const transferTEI = async (ou: any, selectedTei: any, handleCloseApproval: () => void) => {
        setloading(true)
            await engine.mutate(TRANSFERQUERY, {
                variables: {
                    data: {
                        trackedEntities: [
                            {
                                attributes: selectedTei?.teiInstance.attributes,
                                trackedEntity: selectedTei?.teiInstance.trackedEntity,
                                trackedEntityType: selectedTei?.teiInstance.trackedEntityType,
                                orgUnit: ou
                            }
                        ]
                    }
                }
            })
            .then(async (res) => {
                await mutateValues(selectedTei?.transferInstance, getDataStoreData?.transfer?.status, transferConst({status:"approved"}) as string)
                setRefetch(!refetch)
                handleCloseApproval()
            }).catch(e => {
                console.log("Faailed", e)
            })
            setloading(false)
    }

    const rejectTEI = async (event: any, handleCloseApproval: () => void) => {
        console.log("event", event)
        setloading(true)
            await mutateValues(event, getDataStoreData?.transfer?.status, transferConst({status:"reproved"}) as string)
            .then(async (res) => {
                console.log("Faailed", res)
                setRefetch(!refetch)
                handleCloseApproval()
            }).catch(e => {
                setloading(false)
                console.log("Faailed", e)
            })
        setloading(false)
    }

    return {
        loading,
        transferTEI,
        rejectTEI
    }
}
