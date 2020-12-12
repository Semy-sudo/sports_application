/*global kakao*/
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import qs from 'querystring'
import '../common/BoardMarker.css';

const KakaoMap = styled.div`
    float: left;
    margin-top: 100px;
    width: 450px;
    height: 300px;
`;

// 맵 데이터가 없을 때
function Marker(mapContainer, history) {
    var content = 
    `
        <div id="goRental" class="board_button">
            대관하러 가기
        </div>
    `;

    var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: mapContainer,
        position: {
            Lat: 33.450701,
            Lng: 126.570667
        }
    });

    document.getElementById('goRental').addEventListener("click", goRental);
    
    overlay.setMap(mapContainer);

    function goRental() {
        history.push('/map');
    }
}

// var params = qs.parse(location.search)
// var keys = Object.keys(params);
// var values = Object.values(params);
// var startDate = values[0].replace('?',"");
// var finishDate = values[1];
// var startTime = values[2];
// var finishTime = values[3];
// var mapData = new Object();

// for(var i = 4; i < Object.keys(params).length; i++) {
//     mapData[keys[i]] = values[i]
// }
const BoardSearchMap = ({ history, location }) => {
    useEffect(() => {
        const script = document.createElement("script");

        script.async = true;
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4864e82f11768fe659ceb5b45c6cc4e3&autoload=false";

        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load( () => {

                var container = document.getElementById('mapContainer');
                var options = {
                    center: new kakao.maps.LatLng(33.450701, 126.570667),
                    level: 7,
                    draggable: false
                };

                const mapContainer = new window.kakao.maps.Map(container, options);
                
                Marker(mapContainer, history)
            });
        };
    });

    return(
        <div>
            <KakaoMap id="mapContainer">
            </KakaoMap>
        </div>
    );
};

export default BoardSearchMap;

/**
 *  import BoardSearchMap from './BoardSearchMap';
 * 
 *  <BoardSearchMap />
 */