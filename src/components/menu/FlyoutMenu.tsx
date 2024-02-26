import React from "react";
import { Divider } from "@material-ui/core"
import { MenuItem, FlyoutMenu } from "@dhis2/ui";
import { FlyoutOptionsProps, type FlyoutMenuProps } from "../../types/menu/FlyoutMenuTypes";

function FlyoutMenuComponent(props: FlyoutMenuProps): React.ReactElement {
  const { options } = props

  return (
    <FlyoutMenu>
      {options.map((option: FlyoutOptionsProps, i: number) => (
        <>
          <MenuItem key={i} {...option}/>
          {option.divider === true && <Divider />}
        </>
      ))}
    </FlyoutMenu>
  );
}

export default FlyoutMenuComponent;
