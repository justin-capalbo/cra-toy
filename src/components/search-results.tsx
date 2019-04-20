import React from "react";
import { Hit } from "../models";
import { SearchHits } from "./search-hits";

type SearchResultsProps = {
    hits: Hit[];
    loading: boolean;
    loadingText?: string;
    error?: any;
};
export const SearchResults: React.FC<SearchResultsProps> = (props) => { 
    const { loading, loadingText, error, hits } = props;
    if (loading) {
        return <p>{loadingText}</p>;
    }
    if (error) {
        <p>{"Search error :("}</p>
    }
        
    return (
        <SearchHits hits={hits} />
    );
};

SearchResults.defaultProps = {
    hits: [],
    loading: false,
    loadingText: "Loading...",
};
