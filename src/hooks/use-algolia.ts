import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import to from "../util/to";
import { Hit } from "../models";
import { useDebounce } from ".";

type HitResponse = {
    hits: Hit[];
};

type SearchState = {
    hits: Hit[];
    error: any;
    loading: boolean;
};

type SearchAction = {
    type: "SEARCH_INIT" | "SEARCH_DONE" | "SEARCH_FAIL";
    payload?: Hit[],
    error?: any,
}

export const algoliaReducer = (prevState: SearchState, action: SearchAction): SearchState => {
    console.log(action.type);
    switch (action.type) {
        case "SEARCH_INIT":
            return {
                ...prevState,
                loading: true,
                error: null,
                hits: [],
            };
        case "SEARCH_DONE":
            return {
                ...prevState,
                loading: false,
                error: null,
                hits: action.payload || [],
            };
        case "SEARCH_FAIL":
            return {
                ...prevState,
                loading: false,
                error: action.error,
            };
        default:
            throw new Error();
    }
}

export const useAlgoliaSearch = (initialSearchTerm: string = "") => {
    const [query, setQuery] = useState(initialSearchTerm);
    const [searchState, dispatch] = useReducer(algoliaReducer, {
        hits: [],
        loading: false,
        error: null,
    });
    const fetchUrl = `http://hn.algolia.com/api/v1/search?query=${useDebounce(query, 500)}`;

    useEffect(() => {
        let didCancel = false;
        const fetchHits = async () => {
            dispatch({ type: "SEARCH_INIT" });
            const { result, error } = await to(axios.get<HitResponse>(fetchUrl));
            if (!didCancel) {
                if (error) {
                    dispatch({
                        type: "SEARCH_FAIL",
                        error
                    });
                }
                if (result) {
                    dispatch({
                        type: "SEARCH_DONE",
                        payload: result.data.hits
                    });
                }
            }
        };
        fetchHits();

        //Cleanup
        return () => {
            didCancel = true;
        };
    }, [fetchUrl]); //Dependencies

    return { searchState, query, setQuery };
};
