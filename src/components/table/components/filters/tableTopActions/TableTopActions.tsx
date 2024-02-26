import React from "react";
import { useRecoilState } from "recoil";
import TabComponent from "../../../../tabs/TabComponent";
import WithPadding from "../../../../template/WithPadding";
import { TabsState } from "../../../../../schema/tabSchema";
import { type TabElementsProps } from "../../../../../types/tabs/TabsTypes";
import TransferActionsButtons from "../../tranferActionsButtons/transferActionsButtons";

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
