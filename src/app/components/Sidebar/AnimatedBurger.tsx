import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiExpandRightLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";

interface AnimatedBurgerProps {
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
}

const AnimatedBurger = (props: AnimatedBurgerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => {
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

export default AnimatedBurger;
