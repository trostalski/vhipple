interface SidebarNavIconProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  sidebarOpen: boolean;
  isActive: boolean;
}

const SidebarNavIcon = (props: SidebarNavIconProps) => {
  return (
    <button
      className={`relative flex flex-row w-full items-center gap-4 p-4 hover:bg-sidebar-hover hover:rounded-xl ease-in-out duration-300 ${
        props.sidebarOpen ? "translate-x-0" : "tanslate-x-[24vw]"
      }`}
      title={props.text}
      onClick={props.onClick}
    >
      <div
        className={`absolute ease-in-out duration-300 ${
          props.sidebarOpen ? "translate-x-0" : "translate-x-[12vw]"
        }`}
      >
        {props.icon}
      </div>
      <span className="ml-14">{props.text}</span>
    </button>
  );
};

export default SidebarNavIcon;
