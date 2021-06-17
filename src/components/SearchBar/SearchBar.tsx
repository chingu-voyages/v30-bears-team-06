import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.scss";

import { Context } from "../../context/GlobalContext";

type SearchBarProps = {
  textInput: string;
};

export default function SearchBar(props: SearchBarProps) {
  const { textInput } = props;

  const { getSearchData, handleChange } = useContext(Context);

  return (
    <div className="search">
      <div className="page__search">
        <form
          action="submit"
          className="page__search__form"
          onSubmit={getSearchData}
        >
          <input
            type="text"
            name="searchterm"
            value={textInput}
            className="page__search__input"
            placeholder="Search tv shows"
            onChange={handleChange}
          />
          <button type="submit" className="page__search__button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    </div>
  );
}
