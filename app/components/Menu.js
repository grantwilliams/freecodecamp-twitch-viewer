import React from 'react';

const Menu = () => {
    return (
        <div className="col-xs-12" id="menu">
            <button className="col-xs-4 col-md-2 col-md-offset-3 btn menu-button active">All</button>
            <button className="col-xs-4 col-md-2 btn menu-button">Online</button>
            <button className="col-xs-4 col-md-2 btn menu-button">Offline</button>
        </div>
    );
};

export default Menu;