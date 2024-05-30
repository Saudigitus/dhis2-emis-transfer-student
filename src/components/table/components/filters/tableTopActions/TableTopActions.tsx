import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import TabComponent from "../../../../tabs/TabComponent";
import WithPadding from "../../../../template/WithPadding";
import { TabsState } from "../../../../../schema/tabSchema";
import { type TabElementsProps } from "../../../../../types/tabs/TabsTypes";
import TransferActionsButtons from "../../tranferActionsButtons/TransferActionsButtons";
import { useParams } from "../../../../../hooks/commons/useQueryParams";
import { SelectedTabSchema } from "../../../../../types/table/SelectedTabTypes";

const tabsElements: TabElementsProps[] = [
  { name: "Outgoing transfer", value: "outgoing" },
  { name: "Incoming transfer", value: "incoming" }
];

function WorkingLits() {
  const { add, urlParamiters } = useParams()
  const [selectedValue, setSelectedValue] = useRecoilState(TabsState);

  useEffect(() => {
    if (urlParamiters().transferTab) {
      const tab = tabsElements.find((x: any) => x.value == urlParamiters().transferTab)
      setSelectedValue(tab as unknown as SelectedTabSchema)
      console.log(tab)
    }
    // add("transferType", selectedValue.value)
  }, [])

  useEffect(() => {
    add("transferTab", selectedValue.value)
  }, [selectedValue])

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
