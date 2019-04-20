import React, { useState } from 'react';
import './App.css';

type Item = {
    objectID: string;
    url: string;
    title: string;
}

const App: React.FC = () => {
    const [data, setData] = useState<{ hits: Item[] }>({ hits: [{ objectID: "test", url: "https://google.com", title: "test item" }] });

    return (
        <ul>
            {data.hits.map(item => (
                <li key={item.objectID}>
                    <a href={item.url}>{item.title}</a>
                </li>
            ))}
        </ul>
    );
};

export default App;
