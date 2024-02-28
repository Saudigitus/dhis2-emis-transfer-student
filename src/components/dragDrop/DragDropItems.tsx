
import React from 'react'
import { Checkbox, IconReorder24 } from '@dhis2/ui';
import TableCell from '@material-ui/core/TableCell';
import { DragDropItemsProps } from '../../types/dragDrop/DragDropTypes';

const style = {
    outline: 'none'
};

function DragDropItems(props: DragDropItemsProps) {
    const { handleToggle, id, text, visible } = props;
    
    return (
        <tr key={id} tabIndex={-1} style={{
            ...style
        }}>
            <TableCell component="th" scope="row">
                <Checkbox
                    checked={visible}
                    tabIndex={-1}
                    onChange={() => { handleToggle(id); }}
                    label={text}
                    // className={classes.checkbox}
                    valid dense />
            </TableCell>
            <TableCell>
                <span style={{
                    float: 'right'
                }}>
                    <IconReorder24 />
                </span>
            </TableCell>
        </tr>
    )
}

export default DragDropItems
