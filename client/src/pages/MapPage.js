import React from 'react';
import ContentsBlock from '../components/map/ContentsBlock';
import ContentsBlockParent from '../components/map/ContentsBlockParent';

const MapPage = ({ history }) => {
    return(
        // type === 'parent' ?
        // <ContentsBlock
        //     history={ history }
        // /> // :
        <ContentsBlockParent
            history={ history }
        />
    );
};

export default MapPage;