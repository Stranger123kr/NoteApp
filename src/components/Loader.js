import React from "react";

const Loader = () => {
  return (
    <>
      <div className="text-center mt-[10%]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-black mx-auto" />
      </div>
    </>
  );
};

export default Loader;
