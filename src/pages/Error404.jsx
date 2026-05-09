import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router";

const Error404 = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <h1 className="md:text-2xl">
        🙁 Requested page,{" "}
        <strong className="text-yellow-500">{pathname}</strong> doesnot exist.
      </h1>
      <span className="text-gray-900 md:text-xl p-2 border-2 border-yellow-500 rounded-md">
        <Link to={-1}>Get back</Link>
      </span>
    </div>
  );
};

export default Error404;
