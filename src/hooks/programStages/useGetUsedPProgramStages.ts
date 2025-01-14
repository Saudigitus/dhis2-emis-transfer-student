import { simpleProgramStage } from "../../types/dataStore/DataStoreConfig";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";

const useGetUsedProgramStages = () => {
    const { performance, finalResult, socioEconomics, registration } = getDataStoreKeys();
    const performanceProgramStages = performance?.programStages.map((programStage: simpleProgramStage) => programStage.programStage) ?? [];
    return [...performanceProgramStages, finalResult?.programStage, socioEconomics?.programStage, registration?.programStage].filter(Boolean)
}
export default useGetUsedProgramStages
