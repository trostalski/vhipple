import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiExpandRightLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";

interface AnimatedBurgerProps {
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
}

const AnimatedBurger = (props: AnimatedBurgerProps) => {
  const { isOpen, setIsOpen } = props;
  return (
    <button
      className={`relative ${isOpen ? "" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
      }}
    >
      <RxHamburgerMenu
        className={`absolute bottom-0 top-0 my-auto transition ease-in-out duration-300 delay-150 text-white ${
          isOpen ? "rotate-0 hover:rotate-90" : "rotate-90 hover:rotate-0"
        }`}
        size={24}
      />
    </button>
  );
};

export default AnimatedBurger;
