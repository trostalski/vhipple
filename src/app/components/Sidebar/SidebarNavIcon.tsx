interface SidebarNavIconProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  sidebarOpen: boolean;
  isActive: boolean;
  id: string;
}

const SidebarNavIcon = (props: SidebarNavIconProps) => {
  const { icon, id, text, onClick, sidebarOpen, isActive } = props;
  return (
    <button
      id={id}
      className={`relative flex flex-row w-full items-center gap-4 p-4 rounded-xl transition ${
        isActive
          ? "bg-secondary-button-hover "
          : "hover:bg-secondary-button-hover "
      }`}
      title={text}
      onClick={onClick}
    >
      <div
        className={`absolute ease-in-out duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-[12vw]"
        }`}
      >
        {icon}
      </div>
      <span className="ml-14">{text}</span>
    </button>
  );
};

export default SidebarNavIcon;
