import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Radio, spacersNum, colors } from '@dhis2/ui'
import { SelectBoxesProps } from '../../../../../../../../types/table/ContentFiltersTypes';

const useStyle = makeStyles(() => ({
    iconDeselected: {
        fill: colors.grey700
    },
    checkbox: {
        marginTop: spacersNum.dp8,
        marginBottom: spacersNum.dp16
    }
}));


function SingleSelectBoxes(props: SelectBoxesProps) {
    const { options, id, onChange, value = "" } = props;
    const classes = useStyle()

    const handleOptionChange = (e: any) => {
        onChange(e.value, id)
    }
    const isChecked = (localValue: string) => {
        return (value.length > 0 && value.includes(localValue));
    }

    return options?.optionSet.options.map(({ label, value }, index: number) => (
        <Radio
            key={index}
            checked={isChecked(value)}
            label={label}
            name={`singleSelectBoxes-${index}`}
            onChange={(e: any) => { handleOptionChange(e); }}
            value={value}
            className={classes.checkbox}
            dense
        />
    ));
}

export default SingleSelectBoxes
