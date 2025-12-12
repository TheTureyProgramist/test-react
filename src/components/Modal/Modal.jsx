import React from 'react';
export const Modal = ({ children, onClose }) => {
    return (
        <div className="modal" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose} aria-label="close">×</button>
                {children}
            </div>
        </div>
    );
};