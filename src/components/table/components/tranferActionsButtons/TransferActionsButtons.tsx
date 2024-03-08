import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import { Tooltip } from '@material-ui/core';
import { useConfig } from '@dhis2/app-runtime';
import ModalComponent from '../../../modal/Modal';
import { TabsState } from '../../../../schema/tabSchema';
import ImportContent from '../../../modal/ImportContent';
import { useParams } from '../../../../hooks/commons/useQueryParams';
import DropdownButtonComponent from '../../../buttons/DropdownButton';
import { type FlyoutOptionsProps } from '../../../../types/menu/FlyoutMenuTypes';
import { IconUserGroup16, IconAddCircle24, Button, ButtonStrip } from "@dhis2/ui";
import useGetSectionTypeLabel from '../../../../hooks/commons/useGetSectionTypeLabel';

function TransferActionsButtons() {
  const [openTranfer, setOpenTranfer] = useState<boolean>(false);
  const { urlParamiters} = useParams();
  const { school: orgUnit, schoolName: orgUnitName, sectionType } = urlParamiters()
  const selectedTabState = useRecoilValue(TabsState).value
  const { baseUrl } = useConfig();
  const { sectionName } = useGetSectionTypeLabel();

  const enrollmentOptions: FlyoutOptionsProps[] = [
    { label: `Transfer ${sectionName}`, divider: true, onClick: () => { setOpenTranfer(true); } }
  ];

  return (
    <div>
      <ButtonStrip>
        {selectedTabState === "incoming"
        ? <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
          <span>
            <DropdownButtonComponent
              disabled
              name="Bulk approval"
              icon={<IconUserGroup16 />}
              options={enrollmentOptions}
            />
          </span>
        </Tooltip>
        : <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
          <span>
             <a href={`${baseUrl}/api/apps/SEMIS-Transfer-Execute/index.html#/transfer?sectionType=${sectionType}&school=${orgUnit}&schoolName=${orgUnitName}`}>
            <Button disabled={orgUnit === null} icon={<IconAddCircle24 />}>Perfom transfer</Button></a>
          </span>
        </Tooltip>
}
      </ButtonStrip>

      {openTranfer && <ModalComponent title={`Transfer ${sectionName}`} open={openTranfer} setOpen={setOpenTranfer}><ImportContent setOpen={setOpenTranfer} /></ModalComponent>}
    </div>
  )
}

export default TransferActionsButtons
