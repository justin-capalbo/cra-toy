import React, { useState } from "react";
import { useAlgoliaSearch } from "../hooks";
import { SearchResults } from "./search-results";

export const Search: React.FC = () => {
    const { searchState, query, setQuery } = useAlgoliaSearch("reactjs");
    const [loadingText, setLoadingText] = useState("Searching...");
    return (
        <>
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setLoadingText("Updating results...");
                    setQuery(e.target.value)
                }}
            />
            <SearchResults 
                searchState={searchState}
                loadingText={loadingText}
            />
        </>
    )
};
