import React, {PropTypes} from 'react';

const Search = props => {
    return (
        <div className="col-xs-6 col-xs-offset-3" id="search">
            <datalist id="suggestions">
                {props.suggestions.map((channel, key) => {
                    return (
                        <option value={channel} key={key}></option>
                    )
                })}
            </datalist>
            <form className="form-inline" onSubmit={props.onSubmit}>
                <input
                name="search"
                className='form-control'
                placeholder='Search'
                value={props.value}
                onChange={props.onChange}
                type='text'
                list="suggestions" />
                <button type="submit" className="btn">Add Streamer</button>
            </form>
        </div>
    );
};

Search.propTypes = {
    
};

export default Search;