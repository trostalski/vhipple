import React, { useEffect } from "react";

interface BoxMenuProps {
  handleDelete: () => void;
  setShowMenu: (showMenu: boolean) => void;
  showMenu: boolean;
}

const BoxMenu = (props: BoxMenuProps) => {
  useEffect(() => {
    window.addEventListener("click", function (e: any) {
      if (
        !document.getElementById("dashboard-card-box-menu")?.contains(e.target)
      ) {
        props.setShowMenu(false);
      }
    });
    return () => {
      window.removeEventListener("click", () => props.setShowMenu(false));
    };
  }, []);

  return (
    <div
      id="dashboard-card-box-menu"
      className="flex flex-col absolute items-start bg-white p-2 top-6 left-2 rounded-md shadow-md z-10"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button className="text-blue-500 hover:underline">Edit</button>
      <button
        className="text-red-500 hover:underline"
        onClick={props.handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
export default BoxMenu;
