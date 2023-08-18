import { useDataEngine } from '@dhis2/app-runtime'
import { useState } from 'react'
import { useEditDataElement } from '../events/useEditDataElement'
import { useRecoilValue } from 'recoil'
import { DataStoreState } from '../../schema/dataStoreSchema'

interface TransferQueryProps {
    program: string
    ou: string
    trackedEntityInstance: string
}

/* const TRANSFERQUERY = {
    resource: "tracker/ownership/transfer",
    type: 'update',
    params: ({ program, ou, trackedEntityInstance }: TransferQueryProps) => ({
        program,
        ou,
        trackedEntityInstance
    })
} */

const TRANSFERQUERY = {
    resource: 'tracker',
    data: ({ data }: any) => data,
    type: 'create',
    params: {
        async: false
    }
}

export function useTransferTEI() {
    const engine = useDataEngine()
    const dataStoreState = useRecoilValue(DataStoreState);
    const [loading, setloading] = useState(false)
    const { mutateValues } = useEditDataElement()

    const transferTEI = async (ou: any, selectedTei: any) => {
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
                await mutateValues(selectedTei?.transferInstance, dataStoreState?.transfer?.status, "Approved")
            }).catch(e => {
                console.log("Faailed", e)
            })
        setloading(false)
    }

    const rejectTEI = async (event: any) => {
        console.log("event", event)
        setloading(true)
            await mutateValues(event, dataStoreState?.transfer?.status, "Reproved")
            .then(async (res) => {
                console.log("Faailed", res)
            }).catch(e => {
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
