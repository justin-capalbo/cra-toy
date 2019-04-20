import React from "react";
import { Hit } from "../models";
import { SearchHits } from "./search-hits";

type SearchResultsProps = {
    searchState: {
        hits: Hit[];
        loading: boolean;
        error?: any;
    }
    loadingText?: string;
};
export const SearchResults: React.FC<SearchResultsProps> = (props) => { 
    const { searchState, loadingText } = props;
    const { loading, error, hits } = searchState;

    if (loading) {
        return <p>{loadingText || "Loading..."}</p>;
    }
    if (error) {
        return <p>{"Search error :("}</p>;
    }
        
    return (
        <SearchHits hits={hits} />
    );
};
