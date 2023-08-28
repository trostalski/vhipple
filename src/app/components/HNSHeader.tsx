import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { RiAncientGateFill } from "react-icons/ri";

const HNSHeader = () => {
  return (
    <header id="hns-header">
      <nav className="flex flex-row fixed left-0 top-0 w-full h-10 bg-primary-button items-center text-white font-light px-4 z-10">
        <h1>Vhipple</h1>
        <span className="flex-grow"></span>
        <div className="flex flex-row gap-4">
          <a href="https://github.com/trostalski/vhipple" target="_blank">
            <AiFillGithub size={32} style={{ color: "white" }} />
          </a>
          <a href="https://healthnerd.solutions" target="_blank">
            <RiAncientGateFill size={32} style={{ color: "white" }} />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default HNSHeader;
