import React from 'react';
import styled from 'styled-components';
const Backdroping = styled.div`
background: ; 
`
export const Backdrop = ({ children, onClose }) => {
    return (
        <Backdroping onClick={onClose}>
            {children}
        </Backdroping>
    );
};