import React from "react";
import "./Header.css";
export const Header = () => {
  return (
    <header className=" fixed top-0 w-full shadow" id="header">
      <nav className="py-3 px-3 ">
        <div className=" flex grid-cols-12 ">
          <div className="w-full col-span-6">
            <button
              data-drawer-target="default-sidebar"
              data-drawer-toggle="default-sidebar"
              aria-controls="default-sidebar"
              type="button"
              className="inline-flex justify-start items-center p-2 mt-2 ms-3 text-sm text-gray-100 bg-white rounded-lg sm:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-lightgray-200 dark:text-gray-400 dark:hover:bg-gray-100 dark:focus:ring-gray-400"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div className="py-2 px-3 col-span-6 justify-end">
            <button className=" whitespace-nowrap text-xl text-black  justify-end border-2 border-black rounded-xl px-3 py-1 ">
              Filter
            </button>
          </div>
          <div className="py-1 px-3 col-span-6 justify-end">
            <span className=" whitespace-nowrap text-4xl text-green-400  justify-end ">
              Medicinery™
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};
