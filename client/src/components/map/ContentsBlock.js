/*global kakao*/
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import SearchBarBlock from './SearchBarBlock';
import axios from 'axios';
import MarkerImage from '../../lib/styles/img/img_category/MarkerImage_Color.png';
import Close from '../../lib/styles/img/close.svg';
import '../common/Marker.css';

const KakaoMap = styled.div`
    float: left;
    margin-top: 100px;
    width: 70%;
    height: 600px;
    text-align: center;
`;


function Marker(map, mapContainer, history) {
    var position = new kakao.maps.LatLng(Number(map.FACI_POINT_Y), Number(map.FACI_POINT_X));
    var marker = new kakao.maps.Marker({
        map: mapContainer,
        position: position,
        image: new kakao.maps.MarkerImage(
            MarkerImage,
            new kakao.maps.Size(35, 35),
        )
    });

    if(map.FACI_NM) {
        map.FACI_NM = map.FACI_NM.replace(/"/gi, "");

    }

    var content = 
    '<div class="wrap">' +
    '   <div class="header">' +
    '       <div id="close" class="header_header">' +
    `            <img src=${Close} style="width: 30px; height: 30px;">` +
    '       </div>' +
    '       <div class="header_contents">' +
    `           <h2><b>${map.FACI_NM}</b></h2>` +
    '       </div>' +
    '       <div class="header_contents">' +
    `           ${map.ADDR_CP_NM} ${' '} ${map.ADDR_CPB_NM} ${' '} ${map.ADDR_EMD_NM}` + 
    '       </div>' +
    '       <div class="header_contents">' +
    `           ${map.FACI_ROAD_ADDR1}` +
    '       </div>' +
    '   </div>' +
    '   <div class="contents">' +
    '       <div class="contents_header">' +
    '           <b>이용안내</b>' +
    '       </div>' +
    '       <div class="contents_contents">' +
    '           이용요금: 30000원 / 시간' +
    '       </div>' +
    '       <div class="contents_contents">' +
    '           이용요일: 월 ~ 일' +
    '       </div>' +
    '       <div class="contents_header">' +
    '           <b>연락처</b>' +
    '       </div>' +
    '       <div class="contents_contents">' +
    `           전화번호: ${map.FMNG_USER_TEL}` +
    '       </div>' +
    '       <div class="contents_contents">' +
    `           홈페이지: ${map.FACI_HOMEPAGE}` +
    '       </div>' +
    '   </div>' +
    '   <div class="article">' +
    '       <div class="article_header">' +
    '           <b>대관 날짜 선택</b>' +
    '       </div>' +
    '       <div class="article_contents">' +
    '           시작 날짜: <input type="date" id="startDate"/>' +
    '       </div>' +
    '       <div class="article_contents">' +
    '           종료 날짜: <input type="date" id="finishDate" min="2020-12-10"/>' +
    '       </div>' +
    '       <div class="article_contents">' +
    '           시작 시간: <input type="number" id="startTime" min="9" placeholder="9시부터 입력가능"/>' +
    '       </div>' +
    '       <div class="article_contents">' +
    '           종료 시간: <input type="number" id="finishTime" min="22" placeholder="22시까지 입력가능"/>' +
    '       </div>' +
    '   </div>' +
    '   <div class="footer">' +
    '       <div id="submit">' +
    '           <b>대관하기</b>' +
    '       </div>' +
    '   </div>' +
    '</div>';

    var overlay = new kakao.maps.CustomOverlay({
        content: content,
        position: marker.getPosition()
    });

    kakao.maps.event.addListener(marker, 'click', function(){
        overlay = new kakao.maps.CustomOverlay({

            content: content,
            map: mapContainer,
            position: marker.getPosition()
        });

        document.getElementById('close').addEventListener("click", closeInfo);
        document.getElementById('submit').addEventListener("click", goRental);
    });

    function closeInfo() {
        overlay.setMap(null);
    }
    
    function goRental() {
        var startDate = document.getElementById('startDate').value;
        var finishDate = document.getElementById('finishDate').value;
        var startTime = document.getElementById('startTime').value;
        var finishTime = document.getElementById('finishTime').value;

        history.push(
            '/OpenClass?startDate='+ startDate +'&finishDate=' + finishDate +
            '&startTime=' + startTime + '&finishTime=' + finishTime + '&map=' + map
        );   
    }
}

const ContentsBlock = ({ history }) => {
    const [place, setPlace] = useState(false);
    const [placeValue, setPlaceValue] = useState('');
    const [mapList, setMapList] = useState([{
        FACI_POINT_Y: 33.450701,
        FACI_POINT_X: 126.570667
    }]);
    const [filter, setFilter] = useState(false);
    const onClick = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        var res = await axios.get(`/api/map/mapList/${document.getElementById('keyword').value}`, config);

        setMapList( (res.data.data) )
    };
    const onHandlePlace = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        if(document.getElementById('place').value === '') {
            return;
        }

        var res = await axios.get(`/api/map/mapListByPlace/${document.getElementById('place').value}`, config);
        
        setMapList(res.data);
        setPlaceValue(document.getElementById('place').value);
    };
    const onClickPlace = e => {
        e.preventDefault();

        setPlace(!place);
    };
    const onClickFilter = e => {
        e.preventDefault();

        setFilter(!filter);
    };
    const onHandleFilter = async e => {
        
        var filterValue = e.nativeEvent.path[1].innerText.includes('/') ? 
                    e.nativeEvent.path[1].innerText.split('/') :
                    e.nativeEvent.path[1].innerText;

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        var res = '';

        if(typeof(filterValue) === "object") {
            res = await axios.get(`/api/map/mapListByFilter/${filterValue[0]}`, config);
        } else {
            res = await axios.get(`/api/map/mapListByFilter/${filterValue}`, config);
        }

        setMapList(res.data);
    };

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
                    center: new kakao.maps.LatLng(Number(mapList[0].FACI_POINT_Y), Number(mapList[0].FACI_POINT_X)),
                    level: 7
                };
                var zoomControl = new kakao.maps.ZoomControl();

                const mapContainer = new window.kakao.maps.Map(container, options);


                mapContainer.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
                
                mapList.map(
                    (map, i) => {
                        Marker(map, mapContainer, history);
                    }
                )
            });
        };
    }, [mapList]);


    return(
        <div>
            <SearchBarBlock
                onClick={ onClick }
                place={ place }
                onHandlePlace={ onHandlePlace }
                onClickPlace={ onClickPlace }
                placeValue={ placeValue }
                onClickFilter={ onClickFilter }
                filter={ filter }
                onHandleFilter={ onHandleFilter }
            />
            <KakaoMap id="mapContainer">
            </KakaoMap>
        </div>

    );
};

export default ContentsBlock;