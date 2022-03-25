import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { cityData } from "../../assets/dumb-city-data/cityData";

const StopWatch = () => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const onChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = cityData.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setShowSuggestions(true);
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setShowSuggestions(false);
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ListContainer>
        <ul class="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            return (
              <li className={``} key={suggestion} onClick={onClick}>
                <strong>{suggestion.substr(0, input.length)}</strong>
                {suggestion.substr(input.length, suggestion.length)}
              </li>
            );
          })}
        </ul>
      </ListContainer>
    ) : (
      <ListContainer>
        <em>No suggestions, you're on your own!</em>
      </ListContainer>
    );
  };

  //   useEffect(() => {
  //     window.addEventListener("keydown", handleSelectItemInList);
  //   }, []);

  return (
    <>
      <input type="text" onChange={onChange} value={input} />
      {showSuggestions && input && <SuggestionsListComponent />}
    </>
  );
};

const ListContainer = styled.div`
  ${tw`
    w-full
    max-w-xs
    border-2
  `}

  .active {
    ${tw`
        w-full
        bg-green-400
        text-gray-50
    `}
  }
`;

export default StopWatch;
