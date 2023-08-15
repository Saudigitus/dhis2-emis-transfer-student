import React from 'react'
import WithPadding from '../../../../template/WithPadding'
import { Chip } from "@dhis2/ui";
import TransferActionsButtons from '../../tranferActionsButtons/transferActionsButtons';

function WorkingLits() {
  return (
    <WithPadding>
      <div className='d-flex justify-content-between'>
        <div>
          <Chip>
            Active enrollments
          </Chip>
          <Chip>
            Completed enrollments
          </Chip>
          <Chip>
            Cancelled enrollments
          </Chip>
        </div>

        <TransferActionsButtons/>
      </div>
    </WithPadding>
  )
}

export default WorkingLits
