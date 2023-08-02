import React from "react";

interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper = (props: MainWrapperProps) => {
  return (
    <div className="container mx-auto h-full w-full py-12 px-24 overflow-y-scroll overflow-x-clip">
      {props.children}
    </div>
  );
};

export default MainWrapper;
