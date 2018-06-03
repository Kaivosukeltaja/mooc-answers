import React from 'react';

const FilterForm = (props) => {
    return (
        <div>
            <span>Find country: </span>
            <input onChange={props.handleChange} value={props.value} />
        </div>
    );
};

export default FilterForm;