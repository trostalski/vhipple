import { useRouter } from "next/navigation";
import React from "react";

const useRedirect = () => {
  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };
  return {
    redirect,
  };
};

export default useRedirect;
