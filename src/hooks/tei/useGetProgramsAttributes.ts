import { useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { formatAttributes } from "../../utils/tei/formatAttributes";

function useGetProgramsAttributes() {
    const programConfigState = useRecoilValue(ProgramConfigState);
    const programAttributes = programConfigState?.programTrackedEntityAttributes


    return {
        teiAttributes: formatAttributes(programAttributes),
    }
}
export { useGetProgramsAttributes }
