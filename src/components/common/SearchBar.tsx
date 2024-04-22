import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholder: string;
  border?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  border = true,
}) => {
  return (
    <div
      className={`flex justify-center w-full h-[6%] p-2 ${
        border ? "border-b" : ""
      }`}
    >
      <div className="w-[80%] h-full">
        <div className="flex h-full w-full relative">
          <div className="absolute h-full flex items-center ps-3">
            <button className="hover:cursor-pointer">
              <FaSearch className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <input
            type="text"
            id="search"
            className=" w-full p-4 ps-10 text-sm text-mainGray rounded-lg bg-secondaryWhite focus:outline-none"
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
