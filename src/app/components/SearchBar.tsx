import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  handleSearch: () => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { searchTerm, setSearchTerm, handleSearch } = props;
  return (
    <div className="flex flex-row items-center w-full">
      <input
        className="border border-gray-300 p-2 rounded-lg w-full"
        type="text"
        name="search"
        id="search"
        placeholder="Search by id or type"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
