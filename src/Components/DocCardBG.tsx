import React from "react";
import "./DocCardBG.css";

export const DocCardBG = () => {
  return (
    <div className="px-2.5 ">
      <div className=" inline-block px-3 border-gray border-2 shadow  bg-white w-56 h-auto rounded-lg">
        <img src="https://picsum.photos/200" alt="" id="profile" />
        <div className="px-3 py-3" id="docname">
          <hr />
          <p>name</p>
          <p>specialty</p>
          <p>Organisation</p>
          <hr />
        </div>
      </div>
    </div>
  );
};
