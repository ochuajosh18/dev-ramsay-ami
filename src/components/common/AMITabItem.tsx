import React from "react";
import Tab, { TabProps } from "@mui/material/Tab";

type AMITabItemProps = {
  currentTabIndex: number;
  index: number;
};

const AMITabItem = ({
  currentTabIndex,
  index,
  ...props
}: AMITabItemProps & TabProps) => {
  return (
    <Tab
      {...props}
      sx={{
        textTransform: "capitalize",
        fontSize: 15,
        bgcolor: "#ECF0F4",
        border: 1,
        borderLeft: 0,
        borderColor: "divider",
        borderBottomColor:
          currentTabIndex === index ? "transparent" : "divider",
        ...props.sx,
      }}
    />
  );
};

export default AMITabItem;
