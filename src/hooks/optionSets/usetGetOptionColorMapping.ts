import { useTransferConst } from "../../utils/constants/transferOptions/statusOptions";

const usetGetOptionColorMapping = () => {
    const { transferConst } = useTransferConst()
    return {
        [transferConst("pending") as string]: "#F87E0D",
        [transferConst("approved") as string]: "#277314",
        [transferConst("reproved") as string]: "#D64D4D"
    }
}
export default usetGetOptionColorMapping;
