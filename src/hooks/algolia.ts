import { useState, useEffect } from "react";
import axios from "axios";
import to from "../util/to";
import { Hit } from "../models";
import { useDebounce } from "./debounce";

type HitResponse = {
    hits: Hit[];
};

export const useAlgoliaSearch = (initialSearchTerm?: string) => {
    const [query, setQuery] = useState(initialSearchTerm);
    const [hits, setHits] = useState<Hit[]>([]);
    const [error, setError] = useState<any>();
    const fetchUrl = `http://hn.algolia.com/api/v1/search?query=${useDebounce(query, 500)}`;

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

    return { hits, loading, error, query, setQuery };
};
