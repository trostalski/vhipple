export const colorThemeStorageKey = "vhipple-color-theme";
export const availableColorThemes = [
  {
    value: "root",
    color: "bg-blue-500",
    label: "Default",
  },
  {
    value: "theme-red",
    color: "bg-red-500",
    label: "Red",
  },
  {
    value: "theme-green",
    color: "bg-green-500",
    label: "Green",
  },
  {
    value: "theme-blue",
    color: "bg-blue-500",
    label: "Blue",
  },
  {
    value: "theme-purple",
    color: "bg-purple-500",
    label: "Purple",
  },
  {
    value: "theme-yellow",
    color: "bg-yellow-500",
    label: "Yellow",
  },
  {
    value: "theme-gray",
    color: "bg-gray-500",
    label: "Gray",
  },
  {
    value: "theme-orange",
    color: "bg-orange-500",
    label: "Orange",
  },
];

export const reactSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: 8,
    borderColor: "#e2e8f0",
    minHeight: 40,
    height: 40,
    // boxShadow: "none",
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: 8,
    // boxShadow: "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#3182ce" : "white",
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      backgroundColor: "#3182ce",
      color: "white",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#3182ce",
    color: "white",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "white",
    "&:hover": {
      backgroundColor: "#3182ce",
      color: "white",
    },
  }),
};
