/*global kakao*/
import React, { useEffect } from 'react';
import styled from 'styled-components';
import MarkerSelection from '../../lib/styles/img/img_category/Marker_Selection.png';
import '../common/BoardMarker.css';

const KakaoMap = styled.div`
    float: left;
    margin-top: 100px;
    width: 450px;
    height: 300px;
`;



// 맵 데이터가 있을 때
function Marker(mapData, mapContainer) {
    var position = new kakao.maps.LatLng(Number(mapData.FACI_POINT_Y), Number(mapData.FACI_POINT_X));
    var marker = new kakao.maps.Marker({
        map: mapContainer,
        position: position,
        image: new kakao.maps.MarkerImage(
            MarkerSelection,
            new kakao.maps.Size(35, 35),
        )
    });

    if(mapData.FACI_NM) {
        mapData.FACI_NM = mapData.FACI_NM.replace(/"/gi, "");
    }

    var content = 
    `
        <div class="board_marker_wrap">
            <div class="board_marker_header">
                <h4>${mapData.FCOB_NM}</h4>
            </div>
            <div class="board_marker_article">
                <b><h3>${mapData.FACI_NM}</h3></b>
            </div>
            <div class="board_marker_footer">
                ${mapData.ADDR_CP_NM} ${' '} ${mapData.ADDR_CPB_NM} ${' '} ${mapData.ADDR_EMD_NM}
                <br>
                ${mapData.FACI_ROAD_ADDR1}
            </div>
        </div>
    `;

    var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: mapContainer,
        position: marker.getPosition()
    });
}

const BoardMap = ({ mapData }) => {
    useEffect(() => {
        const script = document.createElement("script");

        script.async = true;
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4864e82f11768fe659ceb5b45c6cc4e3&autoload=false";

        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load( () => {

                var container = document.getElementById('mapContainer');
                var options = {
                    center: new kakao.maps.LatLng(Number(mapData.FACI_POINT_Y), Number(mapData.FACI_POINT_X)),
                    level: 7
                };
                var zoomControl = new kakao.maps.ZoomControl();

                const mapContainer = new window.kakao.maps.Map(container, options);

                mapContainer.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
                
                Marker(mapData, mapContainer);
            });
        };
    }, [mapData]);

    return(
        <div>
            <KakaoMap id="mapContainer">
            </KakaoMap>
        </div>
    );
};

export default BoardMap;

/**
 *  import BoardMap from './BoardMap';
 * 
 *  <BoardMap
 *      mapData={ url map 파라미터 }
 *  />
 */