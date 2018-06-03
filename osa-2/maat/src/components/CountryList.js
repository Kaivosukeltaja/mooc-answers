import React from 'react';
import Country from './Country';

const CountryList = ({ selectedCountries, handleSelect }) => {
    const hits = selectedCountries.length;
    return (
        <div>
            { hits > 10 &&
              <p>Too many results ({ hits })</p>
            }
            { hits > 1 && hits <= 10 &&
              selectedCountries.map(country => (
                <div onClick={handleSelect(country)} key={country.name} style={{ cursor: 'pointer'}}>{country.name}</div>
              ))
            }
            { hits === 1 && 
                <Country country={selectedCountries[0]} />
            }
        </div>
    );
};

export default CountryList;
