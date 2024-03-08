import { CustomAttributeProps, VariablesTypes } from "../../types/variables/AttributeColumns";
import { ProgramConfig } from "../../types/programConfig/ProgramConfig";
import { Attribute } from "../../types/generated/models";

export function formatAttributes(programTrackedEntityAttributes: ProgramConfig["programTrackedEntityAttributes"]): CustomAttributeProps[] {
        return programTrackedEntityAttributes?.map((item) => {
            return {
                id: item.trackedEntityAttribute.id,
                displayName: item.trackedEntityAttribute.formName ?? item.trackedEntityAttribute.displayName,
                header: item.trackedEntityAttribute.formName ?? item.trackedEntityAttribute.displayName,
                required: item.mandatory,
                name: item.trackedEntityAttribute.id,
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
                type: VariablesTypes.Attribute
            }
        })

}
