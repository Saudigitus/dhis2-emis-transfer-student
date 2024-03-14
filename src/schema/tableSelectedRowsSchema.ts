import { atom } from 'recoil';
import { SelectionSchemaConfig } from '../types/rows/SelectedRowsTypes';

export const RowSelectionState = atom<SelectionSchemaConfig>({
    key: "get-selection-rows",
    default: {
        isAllRowsSelected: false,
        selectedRows: [],
        rows: []
    }
})
