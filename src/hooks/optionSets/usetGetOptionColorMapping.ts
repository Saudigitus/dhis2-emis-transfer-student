import { useTransferConst } from "../../utils/constants/transferOptions/statusOptions";

const usetGetOptionColorMapping = () => {
    const { transferConst } = useTransferConst()
    return {
        [transferConst({status:"pending"}) as string]: "#F87E0D",
        [transferConst({status:"approved"}) as string]: "#277314",
        [transferConst({status:"reproved"}) as string]: "#D64D4D"
    }
}
export default usetGetOptionColorMapping;
