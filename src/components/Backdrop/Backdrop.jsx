import React from 'react';
export const Backdrop = ({ children, onClose }) => {
    return (
        <div className="backdrop" onClick={onClose}>
            {children}
        </div>
    );
};