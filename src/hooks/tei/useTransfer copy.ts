import { useDataEngine } from '@dhis2/app-runtime'
import { useState } from 'react'

interface TransferQueryProps {
    program: string
    ou: string
    trackedEntityInstance: string
}

const TRANSFERQUERY = {
    resource: "tracker/ownership/transfer",
    type: 'update',
    params: ({ program, ou, trackedEntityInstance }: TransferQueryProps) => ({
        program,
        ou,
        trackedEntityInstance
    })
}

export function useTransferTEI() {
    const engine = useDataEngine()
    const [loading, setloading] = useState(false)

    const transferTEI = async (program: any, ou: any, tei: any) => {
        setloading(true)
            await engine.mutate(TRANSFERQUERY, {
                variables: {
                    program,
                    ou,
                    trackedEntityInstance: tei.teiId
                }
            })
                .then(e => {
                    console.log("Transfer", e)
                }).catch(e => {
                    console.log("Faailed", e)
                })
        setloading(false)
    }

    return {
        loading,
        transferTEI
    }
}
