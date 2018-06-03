import React from 'react';

const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name} - {country.nativeName}</h1>
            <p>
                Population: {country.population}<br />
                Gini: {country.gini}
            </p>
            <img src={country.flag} style={{ maxWidth: '400px' }} />
        </div>
    );
};

export default Country;