import React from "react";
import {
  SearchBarTextField,
  SearchContainer,
  SearchContent,
} from "./SearchBar.styled";
import { FaSearch } from "react-icons/fa";

type IProps = {
  searchTerm: string;
  handleSearchTerm: React.ChangeEventHandler<HTMLInputElement>;
};

const SearchBar: React.FC<IProps> = ({ searchTerm, handleSearchTerm }) => {
  return (
    <SearchContainer>
      <SearchContent>
        <FaSearch style={{ fontSize: "25px", color: "#484848" }} />
        <SearchBarTextField
          type="search"
          placeholder="Search Movie..."
          onChange={handleSearchTerm}
          value={searchTerm}
        />
      </SearchContent>
    </SearchContainer>
  );
};

export default SearchBar;
