import { getSelectedKey } from "../../commons/dataStore/getSelectedKey"
import { StatusOptionsProps } from "../../../types/utils/ConstantsTypes";

export const useTransferConst = () => {
    const { getDataStoreData } = getSelectedKey()

    function transferConst(props : StatusOptionsProps) {
        const { key } = props;

        return getDataStoreData?.transfer.statusOptions.find((option : any) => option.key === key)?.code
    }

    return {
        transferConst
    }
}
