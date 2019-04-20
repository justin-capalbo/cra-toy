import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { useDebounce } from "./hooks";
import to from "./util/to";
import { Z_STREAM_ERROR } from "zlib";

type HitResponse = {
    hits: Hit[];
};

type Hit = {
    objectID: string;
    url: string;
    title: string;
}

const App: React.FC = () => {
    const [query, setQuery] = useState("redux");
    const [hits, setHits] = useState<Hit[]>([]);
    const [error, setError] = useState<any>();
    const fetchUrl = `http://hn.algolia.com/api/v1search?query=${useDebounce(query, 500)}`;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHits = async () => {
            setLoading(true);
            const { result, error } = await to(axios.get<HitResponse>(fetchUrl));
            if (error) {
                setError(error);
            }
            if (result) {
                setHits(result.data.hits || []);
            }
            setLoading(false);
        };
        fetchHits();
    }, [fetchUrl]);

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
