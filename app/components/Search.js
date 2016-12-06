import React, {PropTypes} from 'react';

const Search = props => {
    return (
        <div className="row" id="search">
            <datalist id="suggestions">
                {props.suggestions.map((channel, key) => {
                    return (
                        <option value={channel} key={key}></option>
                    )
                })}
            </datalist>
            <form id="search-form" className="form-inline col-xs-10 col-xs-offset-1" onSubmit={props.onSubmit}>
            <div className="form-group">
            <div className="input-group">
                <input
                name="search"
                className='form-control'
                placeholder='Search'
                value={props.value}
                onChange={props.onChange}
                type='text'
                list="suggestions" />
                <a type="submit" className="btn input-group-addon" onClick={() => props.onSubmit(props.value)}><i className="fa fa-search"></i></a>
                </div>
                </div>
            </form>
        </div>
    );
};

Search.propTypes = {
    
};

export default Search;