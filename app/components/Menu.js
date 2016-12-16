import React, {PropTypes} from 'react';

const Menu = (props) => {
    return (
        <div id="menu">
            <button onClick={props.onClick} id="all"
            className={"col-xs-4 col-md-2 col-md-offset-3 btn menu-button" + (props.showing == 'all' ? ' active' : '')}>All</button>
            <button onClick={props.onClick} id="online"
            className={"col-xs-4 col-md-2 btn menu-button" + (props.showing == 'online' ? ' active' : '')}>Online</button>
            <button onClick={props.onClick} id="offline"
            className={"col-xs-4 col-md-2 btn menu-button" + (props.showing == 'offline' ? ' active' : '')}>Offline</button>
        </div>
    );
};

Menu.propTypes = {
    onClick: PropTypes.func.isRequired,
    showing: PropTypes.string.isRequired
};

export default Menu;