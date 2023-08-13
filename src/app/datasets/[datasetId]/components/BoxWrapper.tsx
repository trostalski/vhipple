import React from "react";

interface BoxWrapperProps {
  children: React.ReactNode;
}

const BoxWrapper = (props: BoxWrapperProps) => {
  const { children } = props;
  return (
    <div className="flex flex-row gap-4 items-center bg-white rounded-lg shadow-md">
      {children}
    </div>
  );
};

export default BoxWrapper;
