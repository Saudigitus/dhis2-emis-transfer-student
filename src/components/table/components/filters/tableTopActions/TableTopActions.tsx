import React from "react";
import WithPadding from "../../../../template/WithPadding";
import TransferActionsButtons from "../../tranferActionsButtons/transferActionsButtons";
import TabComponent from "../../../../tabs/TabComponent";
import { type TabElementsProps } from "../../../../../types/tabs/TabsTypes";
import { useRecoilState } from "recoil";
import { TabsState } from "../../../../../schema/tabSchema";

const tabsElements: TabElementsProps[] = [
  { name: "Outgoing transfer", value: "outgoing" },
  { name: "Incoming transfer", value: "incoming" }
];

function WorkingLits() {
  const [selectedValue, setSelectedValue] = useRecoilState(TabsState);

  return (
    <div className="d-flex justify-content-between align-items-center">
      <TabComponent
        elements={tabsElements}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />

      <WithPadding p="10px">
        <TransferActionsButtons />
      </WithPadding>
    </div>
  );
}

export default WorkingLits;
