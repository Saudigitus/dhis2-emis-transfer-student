import { type SelectionSchemaConfig } from "../../schema/tableSelectedRowsSchema";

export const checkIsRowSelected = (rawRowData: object, selected: SelectionSchemaConfig) => {
    const newArray = [...selected.selectedRows];
    const existingIndex = newArray.findIndex(item => item.teiInstance.trackedEntity === rawRowData.teiInstance.trackedEntity);

    if (existingIndex !== -1) {
        newArray.splice(existingIndex, 1); // Remover o objeto existente
    } else {
        newArray.push(rawRowData); // Adicionar o novo objeto
    }
    return newArray;
}

export const replaceSelectedRow = (rawRowData: object) => {
    const newArray = [rawRowData]; // Cria um novo array com o novo objeto
    return newArray;
}