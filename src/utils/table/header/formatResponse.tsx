import { useMemo } from "react";
import { Attribute } from "../../../types/generated/models";
import { HeaderFormatResponseProps } from "../../../types/utils/table/TableTypes";
import { VariablesTypes, type CustomAttributeProps } from "../../../types/variables/AttributeColumns";
import { ProgramStageConfig } from "../../../types/programStageConfig/ProgramStageConfig";

export function formatResponse({ data, programStageId, registrationId, tableColumns = []  }: HeaderFormatResponseProps): CustomAttributeProps[] {
    let actionColumns: any[] = [{id: "requestTime", name: "Resquest time"}];

    const staticColumns: CustomAttributeProps[] = actionColumns.map((column) => ({
        id: column.id,
        displayName: column.name,
        header: column.name,
        required: true,
        name: column.name,
        labelName: column.name,
        valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
        options: { optionSet: undefined as unknown as CustomAttributeProps["options"]["optionSet"] },
        visible: true,
        disabled: false,
        pattern: '',
        searchable: false,
        error: false,
        content: '',
        key: column.id,
        displayInFilters: false,
        type: VariablesTypes.DataElement
    }));
    
    const headerResponse = useMemo(() => {

        const originalData = ((data?.programStages?.find(programStge => programStge.id === programStageId)) ?? {} as ProgramStageConfig)
        const registrationData = ((data?.programStages?.find(programStge => programStge.id === registrationId)) ?? {} as ProgramStageConfig)

        return tableColumns?.length > 0 ? tableColumns : data?.programTrackedEntityAttributes?.map((item) => {
            return {
                id: item.trackedEntityAttribute.id,
                displayName: item.trackedEntityAttribute.formName ?? item.trackedEntityAttribute.displayName,
                header: item.trackedEntityAttribute.formName ?? item.trackedEntityAttribute.displayName,
                required: item.mandatory,
                name: item.trackedEntityAttribute.formName ?? item.trackedEntityAttribute.displayName,
                labelName: item.trackedEntityAttribute.formName ?? item.trackedEntityAttribute.displayName,
                valueType: item.trackedEntityAttribute.optionSet?.options?.length > 0 ? Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"] : item.trackedEntityAttribute.valueType as unknown as CustomAttributeProps["valueType"],
                options: { optionSet: item.trackedEntityAttribute.optionSet },
                visible: item.displayInList,
                disabled: false,
                pattern: '',
                searchable: false,
                error: false,
                content: '',
                key: item.trackedEntityAttribute.id,
                displayInFilters: true,
                type: VariablesTypes.Attribute
            }
        }).concat(Object.keys(registrationData).length > 0
        ? registrationData?.programStageDataElements?.map((programStageDataElement) => {
            return {
                id: programStageDataElement.dataElement.id,
                displayName: programStageDataElement.dataElement.formName ?? programStageDataElement.dataElement.displayName,
                header: programStageDataElement.dataElement.formName ?? programStageDataElement.dataElement.displayName,
                required: programStageDataElement.compulsory,
                name: programStageDataElement.dataElement.formName ?? programStageDataElement.dataElement.displayName,
                labelName: programStageDataElement.dataElement.formName ?? programStageDataElement.dataElement.displayName,
                valueType: programStageDataElement.dataElement.optionSet?.options?.length > 0 ? Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"] : programStageDataElement.dataElement.valueType as unknown as CustomAttributeProps["valueType"],
                options: { optionSet: programStageDataElement.dataElement.optionSet },
                visible: programStageDataElement.displayInReports,
                disabled: false,
                pattern: '',
                searchable: false,
                error: false,
                content: '',
                key: programStageDataElement.dataElement.id,
                displayInFilters: false,
                programStage: programStageDataElement?.programStage?.id,
                type: VariablesTypes.DataElement
            }
        }) as []
        : [],
            Object.keys(originalData).length > 0
                ? originalData?.programStageDataElements?.map((programStageDataElement) => {
                    return {
                        id: programStageDataElement.dataElement.id,
                        displayName: programStageDataElement.dataElement.formName ?? programStageDataElement.dataElement.displayName,
                        header: programStageDataElement.dataElement.formName ?? programStageDataElement.dataElement.displayName,
                        required: programStageDataElement.compulsory,
                        name: programStageDataElement.dataElement.formName ?? programStageDataElement.dataElement.displayName,
                        labelName: programStageDataElement.dataElement.formName ?? programStageDataElement.dataElement.displayName,
                        valueType: programStageDataElement.dataElement.optionSet?.options?.length > 0 ? Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"] : programStageDataElement.dataElement.valueType as unknown as CustomAttributeProps["valueType"],
                        options: { optionSet: programStageDataElement.dataElement.optionSet },
                        visible: programStageDataElement.displayInReports,
                        disabled: false,
                        pattern: '',
                        searchable: false,
                        error: false,
                        content: '',
                        key: programStageDataElement.dataElement.id,
                        programStage: programStageDataElement?.programStage?.id,
                        displayInFilters: true,
                        type: VariablesTypes.DataElement
                    }
                }) as []
                : [], 
            staticColumns as [])
    }, [tableColumns]);

    return headerResponse;
}
