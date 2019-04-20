import React, { useState } from "react";
import "./App.css";
import { useAlgoliaSearch } from "./hooks/algolia";
import { SearchHits } from "./components/search-hits";

const App: React.FC = () => {
    const { hits, loading, error, query, setQuery } = useAlgoliaSearch("reactjs");
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
            {loading ? (
                <p>{loadingText}</p>
            ) : error ? (
                <p>{"Search error :("}</p>
            ) : (
                <SearchHits hits={hits} />
            )}
        </>
    );
};

export default App;
