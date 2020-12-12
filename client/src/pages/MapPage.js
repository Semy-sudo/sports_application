import React from 'react';
import ContentsBlock from '../components/map/ContentsBlock';

const MapPage = ({ history }) => {
    return(
        <ContentsBlock
            history={ history }
            // type={ user.type }
        />
    );
};

export default MapPage;