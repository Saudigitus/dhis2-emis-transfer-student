import { getSelectedKey } from "../../commons/dataStore/getSelectedKey"
import { StatusOptionsProps } from "../../../types/utils/ConstantsTypes";

export const useTransferConst = () => {
    const { getDataStoreData } = getSelectedKey()

    function transferConst({ status } : StatusOptionsProps) {

        return getDataStoreData?.transfer?.statusOptions?.find((option : any) => option.key === status)?.code
    }

    return {
        transferConst
    }
}
