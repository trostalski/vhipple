"use client";
import React, { useState } from "react";
import { RxDashboard, RxHamburgerMenu } from "react-icons/rx";
import { BsPeople, BsDatabase } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineSetting, AiOutlineClose } from "react-icons/ai";
import { RiExpandRightLine } from "react-icons/ri";

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

interface AnimatedBurgerProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AnimatedBurger = (props: AnimatedBurgerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onMouseMove={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      className={`relative ${props.isOpen ? "" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        props.setIsOpen(!props.isOpen);
        setIsHovered(false);
      }}
    >
      {props.isOpen && (
        <AiOutlineClose
          className={`absolute bottom-0 top-0 my-auto transition ease-in-out duration-300 text-white ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          size={24}
        />
      )}
      {!props.isOpen && (
        <RiExpandRightLine
          className={`absolute bottom-0 top-0 my-auto transition ease-in-out duration-300 text-white ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          size={24}
        />
      )}
      <RxHamburgerMenu
        className={`absolute bottom-0 top-0 my-auto text-white transition ease-in-out duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
        size={24}
      />
    </button>
  );
};

const LeftSidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const sidebarNavIcons = [
    {
      icon: <RxDashboard size={24} />,
      text: "Dashboard",
      onClick: () => {
        router.push("/dashboard");
      },
    },
    {
      icon: <BsPeople size={24} />,
      text: "Users",
      onClick: () => {
        router.push("/users");
      },
    },
    {
      icon: <BsDatabase size={24} />,
      text: "Datasets",
      onClick: () => {
        router.push("/datasets");
      },
    },
    {
      icon: <AiOutlineSetting size={24} />,
      text: "Settings",
      onClick: () => {
        router.push("/settings");
      },
    },
  ];
  return (
    <nav
      className={`bg-sidebar-bg fixed w-[16vw] rounded-r-lg top-0 -left-[12vw] text-white text-sm h-full shadow-md z-0 ease-in-out duration-200 ${
        isOpen ? "translate-x-[12vw]" : "translate-x-0"
      }`}
    >
      <div
        className={`flex flex-row items-center justify-center h-12 ${
          isOpen ? "pr-8" : "pr-10"
        }`}
      >
        <span
          className={`text-2xl font-bold mx-auto ease-in-out duration-500 ${
            isOpen ? "opacity-100" : "opacity-100"
          }`}
        >
          Vhipple
        </span>
        <AnimatedBurger isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      {sidebarNavIcons.map((icon, index) => {
        return (
          <SidebarNavIcon
            key={index}
            icon={icon.icon}
            text={icon.text}
            onClick={icon.onClick}
            sidebarOpen={isOpen}
            isActive={pathname === icon.text.toLowerCase()}
          />
        );
      })}
    </nav>
  );
};

export default LeftSidebar;
