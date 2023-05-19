import React from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

interface IButtonProps {
  onClick?: () => void;
  icon: string;
}

const IconButton: React.FC<IButtonProps> = ({ icon, onClick }) => {
  let iconChosen;
  if (icon === "edit") {
    iconChosen = <FaRegEdit />;
  } else if (icon === "delete") {
    iconChosen = <FaTrashAlt />;
  }

  return <button onClick={onClick}>{iconChosen}</button>;
};

export default IconButton;
