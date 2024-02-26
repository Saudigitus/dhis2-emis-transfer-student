import React from 'react'
import i18n from '@dhis2/d2-i18n';
import { DndProvider } from 'react-dnd';
import Table from '@material-ui/core/Table';
import DragDropListItem from './DragDropItems.js';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragDropListProps } from '../../types/dragDrop/DragDropTypes.js';

function DragDropList(props: DragDropListProps) {
    const { listItems, handleToggle } = props;

    return (
        <DndProvider backend={HTML5Backend}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={12}>{i18n.t('Column')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listItems?.map((item, i) =>
                        <DragDropListItem
                            key={item.id}
                            // index={i}
                            id={item.id}
                            text={item.header}
                            // moveListItem={moveListItem}
                            handleToggle={handleToggle}
                            visible={item.visible}
                        />
                    )}
                </TableBody>
            </Table>
        </DndProvider>
    )
}

export default DragDropList
