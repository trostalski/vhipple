import useCloseOnOutsideClick from "@/app/hooks/useCloseOnOutsideClick";
import { useEffect } from "react";

interface CohortSettingsMenuProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => Promise<void>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CohortSettingsMenu = (props: CohortSettingsMenuProps) => {
  const { setShowMenu, handleDelete, setShowEditModal } = props;
  // add listener to close menu when clicked outside
  useCloseOnOutsideClick({
    setShowMenu: setShowMenu,
    elementId: "#cohort-menu",
  });
  return (
    <div
      id="cohort-menu"
      className="absolute right-0 top-12 bg-white border border-secondary-button rounded-md shadow-md z-10"
    >
      <div className="flex flex-col">
        <button
          className="flex flex-row items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
          onClick={() => {
            setShowMenu(false);
            setShowEditModal(true);
          }}
        >
          Edit
        </button>
        <button
          className="flex flex-row items-center gap-2 px-4 py-2 hover:bg-gray-100"
          onClick={async () => {
            await handleDelete();
            setShowMenu(false);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CohortSettingsMenu;
