import React from 'react'
import Item from './Item';
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { MenuItemContainerProps } from '../../types/menu/MenuItemTypes';
import { formatResponse } from '../../utils/table/header/formatResponse';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';

function MenuItemContainer(props: MenuItemContainerProps): React.ReactElement {
    const { dataElementId, onToggle } = props;
    const { getDataStoreData } = getSelectedKey()
    const programConfigState = useRecoilValue(ProgramConfigState);
    const options = formatResponse(programConfigState, getDataStoreData?.transfer?.programStage)?.find(element => element.id === dataElementId)?.options.optionSet.options ?? [];

    return (
        <Item onToggle={onToggle} dataElementId={dataElementId} menuItems={options} />
    )
}
export default MenuItemContainer