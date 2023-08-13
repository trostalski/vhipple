import React from "react";
import Image from "next/image";

const LeftSidebarLogo = () => {
  const logoPath = "/images/logo1.png";
  return (
    <div>
      <div className="flex flex-row justify-center items-center h-12">
        <Image src={logoPath} alt="Vhipple" width={80} height={80} />
      </div>
    </div>
  );
};

export default LeftSidebarLogo;
