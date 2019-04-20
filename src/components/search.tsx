import React, { useState } from "react";
import { useAlgoliaSearch } from "../hooks";
import { SearchResults } from "./search-results";
import { SearchInput } from "./search-input";

export const Search: React.FC = () => {
    const { searchState, query, setQuery } = useAlgoliaSearch("redux");
    const [loadingText, setLoadingText] = useState("Searching...");
    const handleChange = (value: string) => {
        setLoadingText("Updating results...");
        setQuery(value);
    }
    return (
        <>
            <SearchInput 
                value={query}
                onChange={handleChange} 
            />
            <SearchResults 
                searchState={searchState}
                loadingText={loadingText}
            />
        </>
    )
};
