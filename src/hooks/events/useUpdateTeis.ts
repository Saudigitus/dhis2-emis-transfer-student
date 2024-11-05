import { useState } from 'react'
import { useRecoilState } from 'recoil';
import { useDataEngine, useDataMutation } from "@dhis2/app-runtime";
import useShowAlerts from '../commons/useShowAlert';
import { TeiRefetch } from '../../schema/refecthTeiSchema';

const POST_EVENT: any = {
    resource: 'tracker',
    type: 'create',
    data: ({ data }: any) => data,
    params: {
        importStrategy: 'CREATE_AND_UPDATE',
        async: false
    }
}


export function useUpdateTei() {
    const engine = useDataEngine()
    const [data, setData] = useState()
    const { hide, show } = useShowAlerts()
    const [loading, setLoading] = useState<boolean>()
    const [refetch, setRefetch] = useRecoilState<boolean>(TeiRefetch)


    const updateTei = async (data: any) => {
        console.log(data)
        setLoading(true)
        return await engine.mutate(POST_EVENT, {
            variables: { data: data },
            onComplete: (resp) => {
                setData(resp)
                console.log(resp, "le")
                show({ message: "Transfer updated successfully", type: { success: true } })
                setLoading(false)
                setRefetch(!refetch)
            },
            onError: (error) => {
                console.log("error", error)
                show({
                    message: `Could not save the transfer details: ${error.message}`,
                    type: { critical: true }
                });
                setLoading(false)
                setTimeout(hide, 5000);
            }
        })
    }

    return {
        loadUpdateTei: loading,
        updateTei,
        data
    }
}



export function useUpdateTei2() {
    const { hide, show } = useShowAlerts()
    const [refetch, setRefetch] = useRecoilState<boolean>(TeiRefetch)

    const [create, { loading, data, error }] = useDataMutation(POST_EVENT, {
        onComplete: () => {
            show({ message: "Transfer updated successfully", type: { success: true } })
            setRefetch(!refetch)
        },
        onError: (error) => {
            console.log("error", error)
            show({
                message: `Could not save the transfer details: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    });

    return {
        loadUpdateTei: loading,
        updateTei: create,
        data
    }
}
