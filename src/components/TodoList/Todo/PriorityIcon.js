import React from "react";
import { IoArrowDown, IoAlertCircle, IoAlert } from "react-icons/io5";

const PriorityIcon = ({ priority }) => {
  const getIconAndColor = () => {
    switch (priority) {
      case "low":
        return { Icon: IoArrowDown, color: "gray" };
      case "medium":
        return { Icon: IoAlertCircle, color: "orange" };
      case "high":
        return { Icon: IoAlert, color: "red" };
      default:
        return { Icon: IoArrowDown, color: "gray" }; // Default to low priority
    }
  };

  const { Icon, color } = getIconAndColor();

  return <Icon style={{ color: color }} />;
};

export default PriorityIcon;
