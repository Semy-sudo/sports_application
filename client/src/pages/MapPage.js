import React from 'react';
import ContentsBlock from '../components/map/ContentsBlock';
import ContentsBlockParent from '../components/map/ContentsBlockParent';

const MapPage = ({ history }) => {
    return(
        // JSON.parse(localStorage.getItem("user")).type === 'parent' ?
        <ContentsBlockParent
            history={ history }
        /> 
        // :
        // <ContentsBlock
        //     history={ history }
        // />
    );
};

export default MapPage;