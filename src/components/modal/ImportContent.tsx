import React from "react";
import Subtitle from "../text/Subtitle";
import WithPadding from "../template/WithPadding";
import { ImportContentProps } from "../../types/modal/ModalTypes";
import { ModalActions, Button, ButtonStrip, Divider } from "@dhis2/ui";
import useGetSectionTypeLabel from "../../hooks/commons/useGetSectionTypeLabel";



function ImportContent(props: ImportContentProps): React.ReactElement {
  const { setOpen } = props;
  const { sectionName } = useGetSectionTypeLabel();

  const modalActions = [
    { label: "Cancel", disabled: false, loading: false, onClick: () => { setOpen(false) } },
    { label: "Import", primary: true, disabled: false, loading: false, onClick: () => { setOpen(false) } }
  ];

  return (
    <div>
      <WithPadding>
        <Subtitle label={`Transfer ${sectionName} modal content component`} />
        <Divider />
      </WithPadding>

      <ModalActions>
        <ButtonStrip end>
          {modalActions.map((action, i) => (
            <Button
              key={i}
              {...action}
            >
              {action.loading ? "Loading..." : action.label}
            </Button>
          ))}
        </ButtonStrip>
      </ModalActions>
    </div>
  );
}

export default ImportContent;
