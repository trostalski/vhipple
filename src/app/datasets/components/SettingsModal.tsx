import ModalWrapper from "@/app/components/ModalWrapper";
import {
  availableColorThemes,
  colorThemeStorageKey,
} from "@/app/lib/constants";
import { toastSuccess } from "@/app/lib/toasts";
import React, { useState } from "react";

interface SettingsModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export interface GlobalSettings {
  colorTheme: string;
}

const SettingsModal = (props: SettingsModalProps) => {
  const { showModal, setShowModal } = props;
  const savedTheme = localStorage.getItem(colorThemeStorageKey);
  const [settings, setSettings] = useState<GlobalSettings>({
    colorTheme: savedTheme || availableColorThemes[0].value,
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.setItem(colorThemeStorageKey, settings.colorTheme);
  };

  return (
    <ModalWrapper showModal={showModal} setShowModal={setShowModal}>
      <div className="py-2 px-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">
            Colour Theme
          </label>
          <div className="flex gap-4">
            {availableColorThemes.map((theme) => (
              <div
                key={theme.value}
                title={theme.label}
                className={`h-10 w-10 rounded-md cursor-pointer ${
                  settings.colorTheme === theme.value
                    ? "border-2 border-blue-700 "
                    : ""
                } ${theme.color} `}
                onClick={() => {
                  setSettings({ ...settings, colorTheme: theme.value });
                }}
              />
            ))}
          </div>
          <div className="flex flex-row w-full justify-end gap-2">
            <button
              className="mt-4 bg-cancel-button text-white py-2 px-4 rounded-md"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="mt-4 bg-primary-button text-white py-2 px-4 rounded-md"
              onClick={(e) => {
                handleSubmit(e);
                window.location.reload();
                toastSuccess("Settings saved!");
                setShowModal(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default SettingsModal;
