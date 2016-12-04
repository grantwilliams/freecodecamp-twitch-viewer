import React from 'react';
import MainContainer from './MainContainer';
import Header from './Header';
import Menu from './Menu';
import ResultsContainer from '../containers/ResultsContainer';
import SearchContainer from '../containers/SearchContainer';

const AppContainer = () => {
    return (
        <div>
            <MainContainer>
            <div id="top-section">
                <Header />
                <SearchContainer />
                <Menu />
            </div>
            <ResultsContainer />
            </MainContainer>
            
        </div>
    );
};

export default AppContainer;