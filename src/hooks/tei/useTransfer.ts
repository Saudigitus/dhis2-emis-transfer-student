import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { useDataEngine } from '@dhis2/app-runtime'
import { TeiRefetch } from '../../schema/refecthTeiSchema'
import { useEditDataElement } from '../events/useEditDataElement'
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey'
import { useTransferConst } from '../../utils/constants/transferOptions/statusOptions'

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
                await mutateValues(selectedTei?.transferInstance, getDataStoreData?.transfer?.status, transferConst({status:"approved"}) as string)
                setRefetch(!refetch)
                handleCloseApproval()
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
        loading,
        transferTEI,
        rejectTEI
    }
}
