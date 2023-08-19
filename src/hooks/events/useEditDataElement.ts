import { useDataMutation } from "@dhis2/app-runtime"
import useShowAlerts from "../commons/useShowAlert"
import { useRecoilValue } from "recoil"
import { ApprovalButtonClicked } from "../../schema/approvalButtonClicked"

const UPDATE_DATAELEMENT_QUERY = {
    resource: 'events',
    type: 'update',
    id: ({ id }: any) => id,
    data: ({ form }: any) => form
}

export const useEditDataElement = () => {
    const { hide, show } = useShowAlerts()
    const clickedButton = useRecoilValue(ApprovalButtonClicked)

    const [mutate] = useDataMutation(UPDATE_DATAELEMENT_QUERY, {
        onComplete: () => {
            show({ message: `Student transfer ${clickedButton === "approve" ? "Approved" : "Rejected"} successfuly`, type: { success: true } })
        },
        onError: (error) => {
            show({
                message: `Something went wrong: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    })

    async function mutateValues(event: any, dataElement: any, value: string) {
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
