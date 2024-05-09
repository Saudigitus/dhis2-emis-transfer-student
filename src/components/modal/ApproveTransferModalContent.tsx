import React from "react";
import style from './modal.module.css'
import { useRecoilValue } from "recoil";
import WithPadding from "../template/WithPadding";
import { useTransferTEI } from "../../hooks/tei/useTransfer";
import { ModalActions, Button, ButtonStrip, CenteredContent, CircularLoader } from "@dhis2/ui";
import { useParams } from "../../hooks/commons/useQueryParams";
import { ProgramConfigState } from "../../schema/programSchema";
import { ApproveTranferProps } from "../../types/modal/ModalTypes";
import { attributeFilter } from "../../utils/tei/getAttributeValue";
import { RowSelectionState } from "../../schema/tableSelectedRowsSchema";
import { ApprovalButtonClicked } from "../../schema/approvalButtonClicked";
import useGetSectionTypeLabel from "../../hooks/commons/useGetSectionTypeLabel";
import useGetTEIByID from "../../hooks/tei/useGetTei";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";

function ApproveTranfer(props: ApproveTranferProps): React.ReactElement {
  const { setOpen, handleCloseApproval } = props;
  const { urlParamiters } = useParams();
  const { school, schoolName } = urlParamiters()
  const { program} = getDataStoreKeys()
  const programConfig = useRecoilValue(ProgramConfigState)
  const selectedTei = useRecoilValue(RowSelectionState).selectedRows[0]
  const clickedButton = useRecoilValue(ApprovalButtonClicked)
  const { loading, transferTEI, rejectTEI } = useTransferTEI()
  const { loading: loadingTei, data } = useGetTEIByID(school as unknown as string, program, selectedTei?.teiInstance?.trackedEntity)
  const { sectionName } = useGetSectionTypeLabel();

  console.log("data: ", data?.results);
  const trackedEntityAttributes = programConfig?.trackedEntityType?.trackedEntityTypeAttributes
  const programTrackedEntityAttributes = programConfig?.programTrackedEntityAttributes

  const modalActions = [
    { id: "cancel", type: "button", label: "Cancel", disabled: loading, onClick: () => { setOpen(false) } },
    { id: "confirm", type: "button", label: "Confirm", primary: true, disabled: loading, loading, onClick: () => { void (clickedButton === "approve" ? transferTEI(school, selectedTei, handleCloseApproval) : rejectTEI(selectedTei?.transferInstance, handleCloseApproval)) } }
  ];

  console.log("selectedTei: ", selectedTei)

  return (
    <div>
      {loadingTei ? 
      <CenteredContent> 
        <CircularLoader /> 
      </CenteredContent> 
      : 
        <>
          <WithPadding p="10px 0px">

            {clickedButton === "approve"
            ? <span><span className="text-danger">Attention:</span> This action will transfer this {sectionName} into this school.</span>
            : <span><span className="text-danger">Attention:</span> You are about to reject the {sectionName}&apos;s transfer to this school.</span>
            }

            <div className={style.divider}></div>

            {clickedButton === "approve"
            ? <div className="py-2">
                Are you sure you want to{" "} <span className="text-danger"> approve the transfer </span> of{" "}  <strong> {`${attributeFilter({array: selectedTei?.teiInstance?.attributes, attribute: trackedEntityAttributes[1]?.trackedEntityAttribute.id ?? programTrackedEntityAttributes[2]?.trackedEntityAttribute.id }) ?? ""}, ${attributeFilter({array: selectedTei?.teiInstance?.attributes, attribute: trackedEntityAttributes[0]?.trackedEntityAttribute?.id ?? programTrackedEntityAttributes[3]?.trackedEntityAttribute.id}) ?? ""}`} </strong>{" "} from{" "}
                <strong>{selectedTei?.transferInstance?.orgUnitName}</strong>{" "} to{" "}
                <strong>{schoolName}</strong>?
              </div>
            : <div className="py-2">
                Are you sure you want to{" "} <span className="text-danger"> reject the transfer </span> of{" "}  <strong> {`${attributeFilter({array: selectedTei?.teiInstance?.attributes, attribute: trackedEntityAttributes[1]?.trackedEntityAttribute.id ?? programTrackedEntityAttributes[2]?.trackedEntityAttribute.id }) ?? ""}, ${attributeFilter({array: selectedTei?.teiInstance?.attributes, attribute: trackedEntityAttributes[0]?.trackedEntityAttribute?.id ?? programTrackedEntityAttributes[3]?.trackedEntityAttribute.id}) ?? ""}`} </strong>{" "} from{" "}
                <strong>{selectedTei?.transferInstance?.orgUnitName}</strong>{" "} to{" "}
                <strong>{schoolName}</strong>
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
        </>
      }
      
    </div>
  );
}

export default ApproveTranfer;
