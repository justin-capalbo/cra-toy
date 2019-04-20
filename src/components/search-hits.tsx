import React from "react";
import { Hit } from "../models";

const SearchHit: React.FC<{ hit: Hit }> = ({ hit }) => (
    <li>
        <a href={hit.url}>{hit.title}</a>
    </li>
);

export const SearchHits: React.FC<{ hits: Hit[] }> = ({ hits }) => (
    <ul>
        {hits.map((hit) => (
            <SearchHit key={hit.objectID} hit={hit} />
        ))}
    </ul>
);
