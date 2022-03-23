import React, { ReactNode, SyntheticEvent } from "react";
import Tabs, { TabsProps } from "@mui/material/Tabs";

type AMITabsProps = {
  currentTabIndex: number;
  onTabIndexChange: (tabIndex: number) => void;
  children: ReactNode;
};

const AMITabs = ({
  currentTabIndex,
  onTabIndexChange,
  children,
  ...props
}: AMITabsProps & TabsProps): JSX.Element => {
  const handleTabIndexChange = (event: SyntheticEvent, newIndex: number) => {
    onTabIndexChange(newIndex);
  };
  return (
    <Tabs
      {...props}
      value={currentTabIndex}
      onChange={handleTabIndexChange}
      sx={{
        overflow: "hidden",
        borderLeft: 1,
        borderColor: "divider",
        ...props.sx,
        "& .MuiTabs-indicator": {
          height: "3px",
          top: 0,
        },
      }}
    >
      {children}
    </Tabs>
  );
};

export default AMITabs;
