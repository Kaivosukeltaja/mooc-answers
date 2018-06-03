import React from 'react';

const FilterForm = (props) => {
    return (
        <div>
            <span>Rajaa näytettäviä</span>
            <input onChange={props.handleFilterChange} />
        </div>
    );
};

export default FilterForm;
