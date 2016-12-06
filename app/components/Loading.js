import React, {PropTypes} from 'react';

const Loading = props => {
    return (
        <div>
            <h1>Loading <i className="fa fa-spinner fa-spin fa-2x da-fw"></i></h1>
        </div>
    );
};

Loading.propTypes = {
    
};

export default Loading;