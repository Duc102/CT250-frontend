import React from 'react';
import { useParams } from 'react-router-dom';

const Search = () => {
    const {name, category} = useParams();
    return (
        <div className="container border border-dark rounded mt-1 mb-1" style={{ minWidth: "450px" }}>
            {name?<div>This name: {name}</div>:<div>This no name</div>}
            {category?<div>This category: {category}</div>:<div>This no category</div>}
        </div>
    );
}

export default Search;
