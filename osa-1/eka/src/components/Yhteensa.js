import React from 'react';

const Yhteensa = ({osat}) => {
    const total = osat.reduce((prev, current) => prev + current.tehtavia, 0)
    return (
        <p>yhteensä {total} tehtävää</p>
    );
};

export default Yhteensa;