import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { useDebounce } from "./hooks";

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
    const [data, setData] = useState<HitResponse>({ hits: [] });
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        const fetchUrl = `http://hn.algolia.com/api/v1/search?query=${debouncedQuery}`;
        const fetchHits = async () => { 
            const result = await axios.get<HitResponse>(fetchUrl);
            setData(result.data);
        };
        
        fetchHits();
    }, [debouncedQuery]);

    return (
        <>
            <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul>
                {data.hits.map(item => (
                    <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default App;
