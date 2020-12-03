/*global kakao*/
import React, { useEffect } from 'react';
import styled from 'styled-components';

const MapContents = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 130px;
`;


const ContentsBlock = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = 
            "http://dapi.kakao.com/v2/maps/sdk.js?appkey=4864e82f11768fe659ceb5b45c6cc4e3&autoload=false"
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load( () => {
                var container = document.getElementById("kakaoMap");
                var options = {
                    center: new kakao.maps.LatLng(37.506502, 127.053617),
                    level: 7,
                };

                const map = new window.kakao.maps.Map(container, options);
            });
        }
    }, []);

    return(
        <MapContents id="kakaoMap">

        </MapContents>
    );
};

export default ContentsBlock;