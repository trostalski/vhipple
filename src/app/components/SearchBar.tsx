import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  handleSearch: () => void;
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <div className="flex flex-row items-center w-full">
      <input
        className="border border-gray-300 p-2 rounded-lg w-full"
        type="text"
        name="search"
        id="search"
        placeholder="Search by id or type"
        value={props.searchTerm}
        onChange={(e) => props.setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.handleSearch();
          }
        }}
      />
      <button
        className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-1 px-2 text-center rounded cursor-pointer ml-2"
        onClick={() => {
          props.handleSearch();
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
