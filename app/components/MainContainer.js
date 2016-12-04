import React from 'react';
import '../main.css';

const MainContainer = (props) => {
    return (
        <div className="container text-center" id="main-wrapper">
            {props.children}
        </div>
    );
};

export default MainContainer;