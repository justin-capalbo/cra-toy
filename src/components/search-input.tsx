import React, { useState } from "react";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
};
export const SearchInput: React.FC<SearchInputProps> = ({ onChange, value }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => {
                onChange(e.target.value);
            }}
        />
    );
};
