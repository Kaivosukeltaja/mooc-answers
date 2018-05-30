import React from 'react';

const Button = ({text, vote, onClick}) => {
    return (
        <button onClick={() => onClick(vote)}>{text}</button>
    );
};

export default Button;
