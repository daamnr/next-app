"use client";
import React from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const Main: React.FC = () => {
  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <Breadcrumb pageName="Welcome to Dashboard" />
        </div>
      </div>
    </>
  );
};

export default Main;
