import React from 'react';

const Anecdote = ({ text, votes }) => {
    return (
        <div>
            <p>{text}</p>
            <p>Has {votes | 0} points</p>
        </div>
    );
};

export default Anecdote;