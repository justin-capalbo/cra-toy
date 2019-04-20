import React from "react";
import "./App.css";
import { useAlgoliaSearch } from "./hooks/algolia";

const App: React.FC = () => {
    const { hits, loading, error, query, setQuery } = useAlgoliaSearch("reactjs");

    return (
        <>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {loading ? (
                <p>Updating results...</p>
            ) : error ? (
                <p>{"Search error :("}</p>
            ) : (
                <ul>
                    {hits.map(hit => (
                        <li key={hit.objectID}>
                            <a href={hit.url}>{hit.title}</a>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default App;
