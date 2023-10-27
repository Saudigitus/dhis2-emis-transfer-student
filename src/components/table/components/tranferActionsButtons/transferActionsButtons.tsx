import React, { useState } from 'react'
import { IconUserGroup16, IconAddCircle24, Button, ButtonStrip } from "@dhis2/ui";
import ModalComponent from '../../../modal/Modal';
import ImportContent from '../../../modal/ImportContent';
import DropdownButtonComponent from '../../../buttons/DropdownButton';
import { type FlyoutOptionsProps } from '../../../../types/buttons/FlyoutOptions';
import { useParams } from '../../../../hooks/commons/useQueryParams';
import { Tooltip } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { TabsState } from '../../../../schema/tabSchema';
import { useConfig } from '@dhis2/app-runtime';

function TransferActionsButtons() {
  const [openTranfer, setOpenTranfer] = useState<boolean>(false);
  const { useQuery } = useParams();
  const orgUnit = useQuery().get("school")
  const orgUnitName = useQuery().get("schoolName")
  const selectedTabState = useRecoilValue(TabsState).value
  const { baseUrl } = useConfig();

  const enrollmentOptions: FlyoutOptionsProps[] = [
    { label: "Transfer students", divider: true, onClick: () => { setOpenTranfer(true); } }
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
             <a href={`${baseUrl}/api/apps/SEMIS-Student-Transfer-Execute/index.html#/student-transfer?sectionType=student&school=${orgUnit}&schoolName=${orgUnitName}`}>
            <Button disabled={orgUnit === null} icon={<IconAddCircle24 />}>Perfom transfer</Button></a>
          </span>
        </Tooltip>
}
      </ButtonStrip>

      {openTranfer && <ModalComponent title="Transfer Students" open={openTranfer} setOpen={setOpenTranfer}><ImportContent setOpen={setOpenTranfer} /></ModalComponent>}
    </div>
  )
}

export default TransferActionsButtons
