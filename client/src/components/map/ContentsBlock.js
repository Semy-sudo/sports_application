/*global kakao*/
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBarBlock from './SearchBarBlock';

const KakaoMap = styled.div`
    float: left;
    margin-top: 130px;
    width: 100%;
    height: 570px;
    text-align: center;
`;

const OverlayInfo = styled.div`
    border-radius: 6px; 
    margin-bottom: 12px; 
    float: left;
    position: relative; 
    border: 1px solid #ccc; 
    border-bottom: 2px solid #ddd;
    background-color:#fff;
    nth-of-type(n) {
        border: 0;
        box-shadow: 0px 1px 2px #888;
    }
`;

const LinkArea = styled.a`
    display: block; 
    background: #000080; 
    background: #000080 url(/src/lib/styles/img/chevron-forward-outline.svg) right 14px center; 
    text-decoration: none; 
    color: #fff; 
    padding:12px 36px 12px 14px; 
    font-size: 14px; 
    border-radius: 6px 6px 0 0;
`;

const LinkText = styled.strong`
    background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/place_icon.png) no-repeat; 
    padding-left: 27px;
`;

const Desc = styled.div`
    padding: 14px;
    position: relative; 
    min-width: 190px; 
    height: 56px;
`;

const AddressArea = styled.span`
    font-size: 12px; 
    color: #333; 
    position: absolute; 
    left: 80px; 
    right: 14px; 
    top: 24px; 
    white-space: normal;
    after {
        content: '';
        position: absolute; 
        margin-left: -11px; 
        left: 50%; 
        bottom: -12px; 
        width: 22px; 
        height: 12px; 
        background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png) no-repeat 0 bottom;
    }
`;

function Marker(map) {
    var content = 
        '<OverlayInfo>' +
        '   <a href="#">' +
        '       <Link to="#">' +
        '           <LinkText>' +
        '               월정리 해수욕장' +
        '           </LinkText>' +
        '       </Link>' +
        '   </a>' +
        '   <Desc>' +
        '       <img src="#" style="vertical-align: top;"/>' +
        '       <AddressArea>' +
        '           제주특별자치도 제주시 구좌읍 월정리 33-3' +
        '       </AddressArea>' +
        '   </Desc>' +
        '</OverlayInfo>';

    var position = new kakao.maps.LatLng(map.FACI_POINT_Y, map.FACI_POINT_X);
    var mapCustomOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        xAnchor: 0.5,
        yAnchor: 1.1,
    });

    mapCustomOverlay.setMap(map);
}

const ContentsBlock = () => {

    useEffect(() => {
        const script = document.createElement("script");
        
        script.async = true;
        script.src =
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4864e82f11768fe659ceb5b45c6cc4e3&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load( () => {
                var container = document.getElementById('mapContainer');
                var options = {
                    center: new kakao.maps.LatLng(33.450701, 126.570667),
                    level: 7
                };

                const mapContainer = new window.kakao.maps.Map(container, options);
                
            });
        };
    }, []);

    return(
        <div>
            <KakaoMap id="mapContainer">
            </KakaoMap>
            <SearchBarBlock
                
            />
        </div>
    );
};

export default ContentsBlock;