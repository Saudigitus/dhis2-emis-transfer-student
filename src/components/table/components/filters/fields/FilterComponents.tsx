import React from 'react'
import TextFilter from './components/text/Text'
import TrueOnly from './components/trueOnly/TrueOnly';
import { Attribute } from '../../../../../types/generated/models';
import DateFilterManager from './components/date/DateFilterManager';
import SelectBoxes from './components/optionSet/selectBoxes/SelectBoxes';
import { FilterComponentProps } from '../../../../../types/table/ContentFiltersTypes';
import { CustomAttributeProps } from '../../../../../types/variables/AttributeColumns';



function FilterComponents(props: FilterComponentProps) {
    const { type, column, onChange, value } = props;
    switch (type) {
        case Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"]:
            return <SelectBoxes
                onChange={onChange}
                value={value}
                {...column}
            />
        case Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"]:
            return <DateFilterManager
                onChange={onChange}
                value={value}
                {...column}
            />
        case Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"]:
            return <TextFilter
                onChange={onChange}
                value={value}
                {...column}
            />
        case Attribute.valueType.TRUE_ONLY as unknown as CustomAttributeProps["valueType"]:
            return <TrueOnly
                onChange={onChange}
                value={value}
                {...column}
            />
        case Attribute.valueType.INTEGER_ZERO_OR_POSITIVE as unknown as CustomAttributeProps["valueType"]:
            return <TrueOnly
                onChange={onChange}
                value={value}
                {...column}
            />
        default:
            return <div>not mapped</div>
    }
}

export default FilterComponents
