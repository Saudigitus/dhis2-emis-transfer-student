import { useDataMutation } from "@dhis2/app-runtime"
import useShowAlerts from '../commons/useShowAlert';
import { useRecoilState } from "recoil";
import { useState } from "react";
import { TeiRefetch } from "../../schema/refecthTeiSchema";
import { useTransferTEI } from "./useTransfer";
import { teiPostBody } from "../../utils/tei/formatPostBody";

const POST_TEI: any = {
    resource: "tracker",
    type: 'create',
    data: ({ data }: any) => data,
    params: {
        async: false,
        importStrategy: 'CREATE_AND_UPDATE'
    }
}

export default function usePostTei() {
    const { hide, show } = useShowAlerts()
    const [refetch, setRefetch] = useRecoilState(TeiRefetch)
    const { loading: loadingTransfer, transferTEI } = useTransferTEI()
    const [loading, setLoading] = useState(false)

    const [ create ] = useDataMutation(POST_TEI, {
        onComplete: () => {
            show({ message: "Enrollment saved successfully", type: { success: true } })
            setRefetch(!refetch)
        },
        onError: (error) => {
            show({
                message: `Could not save the enrollment details: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    });

    const transferTEIEnrollments = async (programId: string, orgUnit: string, teiData: any, selectedTei: any, handleCloseApproval: () => void) => {
        setLoading(true)

        await create({ data: teiPostBody(programId, orgUnit, teiData) })
        .then(() => {
            void transferTEI(orgUnit, selectedTei, handleCloseApproval)
            setLoading(false)
        })
        .catch((error) => show({ message: `${("Could not update the enrollments")}: ${error.message}`, type: { critical: true } }))
    }

    return {
        loading: loading || loadingTransfer,
        transferTEIEnrollments
    }
}
