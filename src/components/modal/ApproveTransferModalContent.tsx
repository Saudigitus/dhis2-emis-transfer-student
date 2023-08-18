import React from "react";
import { ModalActions, Button, ButtonStrip } from "@dhis2/ui";
import WithPadding from "../template/WithPadding";
import { useParams } from "../../hooks/commons/useQueryParams";
import { useTransferTEI } from "../../hooks/tei/useTransfer";
import { useRecoilValue } from "recoil";
import { RowSelectionState } from "../../schema/tableSelectedRowsSchema";
import { ApprovalButtonClicked } from "../../schema/approvalButtonClicked";

interface ContentProps {
  setOpen: (value: boolean) => void
}
function ApproveTranfer(props: ContentProps): React.ReactElement {
  const { setOpen } = props;
  const selectedTei = useRecoilValue(RowSelectionState).selectedRows[0]
  const clickedButton = useRecoilValue(ApprovalButtonClicked)
  const { useQuery } = useParams();
  const { loading, transferTEI, rejectTEI } = useTransferTEI()
  const school = useQuery().get("school");
  const schoolName = useQuery().get("schoolName");

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", disabled: loading, onClick: () => { setOpen(false) } },
    { id: "confirm", type: "button", label: "Confirm", primary: true, disabled: loading, loading, onClick: () => { void (clickedButton === "approve" ? transferTEI(school, selectedTei) : rejectTEI(selectedTei?.transferInstance)) } }
  ];

  return (
    <div>
      <WithPadding p="10px 0px">

        {clickedButton === "approve"
        ? <span><span className="text-danger">Attention:</span> This action will transfer this student into this school.</span>
        : <span><span className="text-danger">Attention:</span> You are about to reject the student&apos;s transfer to this school.</span>
        }

        <div style={{ background: "rgb(243, 245, 247)", height: "5px", margin: "5px 0px 10px 0px" }}></div>

        {clickedButton === "approve"
        ? <div className="py-2">
            Are you sure you want to{" "} <span className="text-danger"> approve the transfer </span> of{" "}  <strong> {selectedTei?.teiInstance?.trackedEntityType ?? ""} {selectedTei?.teiInstance?.trackedEntity ?? ""} </strong>{" "} from{" "}
            <strong>{selectedTei?.teiInstance?.trackedEntity}</strong>{" "} to{" "}
            <strong>{schoolName}</strong>?
          </div>
        : <div className="py-2">
            Are you sure you want to{" "} <span className="text-danger"> reject the transfer </span> of{" "}  <strong> {selectedTei?.teiInstance?.trackedEntityType ?? ""} {selectedTei?.teiInstance?.trackedEntity ?? ""} </strong>{" "} from{" "}
            <strong>{selectedTei?.teiInstance?.trackedEntity}</strong>{" "} to{" "}
            <strong>{schoolName}</strong>?
          </div>
        }
      </WithPadding>
      <ModalActions>
        <ButtonStrip end>
          {modalActions.map((action, i) => (
            <Button key={i} {...action}> {action.label} </Button>
          ))}
        </ButtonStrip>
      </ModalActions>
    </div>
  );
}

export default ApproveTranfer;
