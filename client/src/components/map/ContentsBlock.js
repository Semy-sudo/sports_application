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

function Marker(map, mapContainer) {
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
        console.log(map.FACI_NM);
    }

    var content = 
    '<div class="wrap">' +
    '   <div class="header">' +
    '       <div class="header_header">' +
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
    '   </div>' +
    '</div>';
    
    kakao.maps.event.addListener(marker, 'click', function(){
        var overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: mapContainer,
            position: marker.getPosition()
        });

        overlay.setMap(mapContainer);
    });

    // marker.setMap(mapContainer);
}

const ContentsBlock = () => {
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

                const mapContainer = new window.kakao.maps.Map(container, options);

                mapList.map(
                    (map, i) => {
                        Marker(map, mapContainer);
                    }
                )
            });
        };
    }, [mapList]);

    useEffect( () => {
        console.log("update placeValue");
    }, [placeValue]);

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