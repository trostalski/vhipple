import React, { useEffect } from "react";

interface ModalWrapperProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  children: React.ReactNode;
}

const ModalWrapper = (props: ModalWrapperProps) => {
  useEffect(() => {
    // close on escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.setShowModal(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  });

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        props.showModal ? "block" : "hidden"
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={props.showModal ? () => props.setShowModal(false) : () => {}}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
