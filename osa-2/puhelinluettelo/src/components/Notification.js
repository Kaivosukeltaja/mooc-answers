import React from 'react';

const Notification = ({ text }) => {
    return (
        text
            ? <div className="notification">{text}</div>
            : null        
    );
};

export default Notification;