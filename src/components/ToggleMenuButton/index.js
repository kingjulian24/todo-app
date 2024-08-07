import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

const ToggleMenuButton = ({ toggleMenu }) => (
  <button
    id="toggle-menu-btn"
    className="lg:hidden absolute top-4 right-4 p-2 z-10"
    onClick={toggleMenu}
  >
    <AiOutlineMenu className="text-xl" />
  </button>
);

export default ToggleMenuButton;
