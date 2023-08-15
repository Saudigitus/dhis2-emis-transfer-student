import { TabBar, Tab } from "@dhis2/ui";
import React from "react";
import { type TabBarProps } from "../../types/tabs/TabsTypes";
import WithPadding from "../template/WithPadding";

function TabComponent(props: TabBarProps): React.ReactElement {
  const { elements, selectedValue, setSelectedValue } = props;
  return (
    <TabBar fixed>
      {elements.map((element, i) => (
        <Tab
          key={i}
          selected={selectedValue.value === element.value}
          onClick={() => {
            setSelectedValue(element);
          }}
        >
          <WithPadding p="7px">{element.name} </WithPadding>
        </Tab>
      ))}
    </TabBar>
  );
}

export default TabComponent;
