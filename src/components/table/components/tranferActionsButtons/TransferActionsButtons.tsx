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
import RequestTransfer from '../../../modal/RequestTransferModal';

function TransferActionsButtons() {
  const [openRequestTransfer, setOpenRequestTransfer] = useState<boolean>(false);
  const { urlParamiters} = useParams();
  const { school: orgUnit, schoolName: orgUnitName } = urlParamiters()
  const selectedTabState = useRecoilValue(TabsState).value
  const { baseUrl } = useConfig();

  const enrollmentOptions: FlyoutOptionsProps[] = [
    { label: "Transfer students", divider: true, onClick: () => { setOpenRequestTransfer(true); } }
  ];

  return (
    <div>
      {selectedTabState === "incoming" ? 
        <ButtonStrip>
          <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
            <span>
              <Button disabled={orgUnit === null} icon={<IconAddCircle24 />} onClick={setOpenRequestTransfer}>Request transfer</Button>
            </span>
          </Tooltip>

          {/* <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
            <span>
              <DropdownButtonComponent
                disabled
                name="Bulk approval"
                icon={<IconUserGroup16 />}
                options={enrollmentOptions}
              />
            </span>
          </Tooltip> */}
        </ButtonStrip>
      : 
        <ButtonStrip>
          <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
            <span>
              <a href={`${baseUrl}/api/apps/SEMIS-Student-Transfer-Execute/index.html#/student-transfer?sectionType=student&school=${orgUnit}&schoolName=${orgUnitName}`}>
                <Button disabled={orgUnit === null} icon={<IconAddCircle24 />}>Perfom transfer</Button>
              </a>
            </span>
          </Tooltip>
        </ButtonStrip>
      }
  
      {openRequestTransfer && <ModalComponent title="Request Student Transfer" open={openRequestTransfer} setOpen={setOpenRequestTransfer}><RequestTransfer setOpen={setOpenRequestTransfer} /></ModalComponent>}
    </div>
  )
}

export default TransferActionsButtons
