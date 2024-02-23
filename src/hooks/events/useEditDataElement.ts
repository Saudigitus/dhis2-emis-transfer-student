import { useRecoilValue } from "recoil"
import useShowAlerts from "../commons/useShowAlert"
import { useDataMutation } from "@dhis2/app-runtime"
import type { Event, DataElement } from "../../types/generated"
import { ApprovalButtonClicked } from "../../schema/approvalButtonClicked"
import { useTransferConst } from "../../utils/constants/transferOptions/statusOptions"

const UPDATE_DATAELEMENT_QUERY : any = {
    resource: 'events',
    type: 'update',
    id: ({ id }: any) => id,
    data: ({ form }: any) => form
}

export const useEditDataElement = () => {
    const { hide, show } = useShowAlerts()
    const clickedButton = useRecoilValue(ApprovalButtonClicked)
    const { transferConst } = useTransferConst()

    const [mutate] = useDataMutation(UPDATE_DATAELEMENT_QUERY, {
        onComplete: () => {
            show({ message: `Student transfer ${clickedButton === "approve" ? transferConst("approved") as string : transferConst("reproved") as string} successfuly`, type: { success: true } })
        },
        onError: (error) => {
            show({
                message: `Something went wrong: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    })

    async function mutateValues(event: Event, dataElement: DataElement['id'], value: string) {
        const data = {
            event: event?.event,
            orgUnit: event?.orgUnit,
            program: event?.program,
            programStage: event?.programStage,
            status: event?.status,
            trackedEntityInstance: event?.trackedEntityInstance,
            dataValues: [
                {
                    dataElement,
                    value
                }
            ]
        }

        await mutate({ id: `${event?.event}/${dataElement}`, form: data })
    }

    return {
        mutateValues
    }
}
