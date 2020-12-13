/*global kakao*/
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBarBlockParent from './SearchBarBlockParent';
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

function parseJsonToString(json) {
    var query = '';
    var keys = Object.keys(json);
    var values = Object.values(json);

    for(var i = 0; i < Object.keys(json).length; i++) {
        query += i === 0 ? `${keys[i]}=${values[i]}` : `&${keys[i]}=${values[i]}`;
    }

    return query;
}

function Marker(classData, mapContainer, history) {
    var position = new kakao.maps.LatLng(Number(classData.mapdata.FACI_POINT_Y), Number(classData.mapdata.FACI_POINT_X));
    var marker = new kakao.maps.Marker({
        map: mapContainer,
        position: position,
        image: new kakao.maps.MarkerImage(
            MarkerImage,
            new kakao.maps.Size(35, 35),
        )
    });
    var expert = getExpert();

    if(classData.mapdata.FACI_NM) {
        classData.mapdata.FACI_NM = classData.mapdata.FACI_NM.replace(/"/gi, "");
    }

    var content = 
    '<div class="wrap">' +
    '   <div class="header">' +
    '       <div id="close" class="header_header">' +
    `            <img src=${Close} style="width: 30px; height: 30px;">` +
    '       </div>' +
    '       <div class="header_contents">' +
    `           <h2><b>${expert.certifiName}</b></h2>` +
    '       </div>' +
    '   </div>' +
    '   <div class="contents">' +
    '       <div class="contents_header">' +
    '           <b>대관시설정보</b>' +
    '       </div>' +
    '       <div class="contents_contents">' +
    `           ${classData.mapdata.FACI_NM}` +
    '       </div>' +
    '       <div class="contents_contents">' +
    `           ${classData.mapdata.ADDR_CP_NM} ${' '} ${classData.mapdata.ADDR_CPB_NM} ${' '} ${classData.mapdata.ADDR_EMD_NM}` +
    '       </div>' +
    '       <div class="contents_contents">' +
    `           ${classData.mapdata.FACI_ROAD_ADDR1}` +
    '       </div>' +
    '       <div class="contents_header">' +
    '           수업정보' +
    '       </div>' +
    '       <div class="contents_contents">' +
    `           수강료: ${classData.boardpay}` +
    '       </div>' +
    '       <div class="contents_contents">' +
    `           신청인원/최대인원: ${classData.boardmax}` +
    '       </div>' +
    '   </div>' +
    '   <div class="article">' +
    '       <div class="article_header">' +
    '           <b>수업날짜</b>' +
    '       </div>' +
    '       <div class="article_contents">' +
    `           시작 날짜: ${classData.startDate}` +
    '       </div>' +
    '       <div class="article_contents">' +
    `           종료 날짜: ${classData.finishDate}` +
    '       </div>' +
    '       <div class="article_contents">' +
    `           시작 시간: ${classData.startTime}` +
    '       </div>' +
    '       <div class="article_contents">' +
    `           종료 시간: ${classData.finishTime}` +
    '       </div>' +
    '   </div>' +
    '   <div class="footer">' +
    '       <div id="submit">' +
    '           <b>더자세히</b>' +
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
        document.getElementById('submit').addEventListener("click", goDetail);
    });

    function closeInfo() {
        overlay.setMap(null);
    }
    
    function goDetail() {
        
        history.push(
            '/OpenClass?'+ parseJsonToString(classData)
        );   
    }

    var config = {
        headers: {
            'content-type': 'application/json'
        }
    };

    async function getExpert() {
        return await axios.get(`/api/auth/getExpert/${classData.nickName}`, config);
    }
}

// user.type === 'parent'
const ContentsBlockParent = ({ history }) => {
    const [place, setPlace] = useState(false);
    const [placeValue, setPlaceValue] = useState('');
    const [classList, setClassList] = useState([{
        boardid: '',
        nickName: '',
        boardTitle: '',
        boardpay: '',
        boardmin: '',
        boardmax: '',
        boardContents: '',
        boardType: '',
        startDate: '',
        finishDate: '',
        mapdata: {
            FACI_NM: '',                                        
            FACI_GB_CD: '',                                            
            FACI_GB_NM: '',                                            
            FCOB_CD: '',                                               
            FCOB_NM: '',                                              
            FTYPE_CD: '',                                              
            FTYPE_NM: '',                                             
            FMNG_TYPE_GB_CD: '',                                       
            FMNG_TYPE_GB_NM: '',                                     
            FMNG_CP_CD: '',                                            
            FMNG_CP_NM: '',                                           
            FMNG_CPB_CD: '',                                           
            FMNG_CPB_NM: '',                                          
            FMNG_DEPT_NM: '',                                         
            FMNG_USER_TEL: '',                                        
            ADDR_CP_CD: '',                                            
            ADDR_CP_NM: '',                                       
            ADDR_CPB_CD: '',                                           
            ADDR_CPB_NM: '',                                       
            ADDR_EMD_CD: '',                                       
            ADDR_EMD_NM: '',                                      
            ADDR_AMD_CD: '',                                      
            ADDR_AMD_NM: '',                                      
            FACI_ROAD_ADDR1: '',                                      
            FACI_POINT_X: '126.570667',                                   
            FACI_POINT_Y: '33.450701',                                     
            TOT_FACI_AREA: '',                                   
            STAND_CPT_PSN_CNT: '',                                  
            STAND_SEAT_CNT: '',                              
            FACI_HOMEPAGE: '',                                  
            NATION_YN: '',                                     
            FACI_STAT:  '',
            DEL_YN: '',
        },
        CREATEDATE: '',
        ISDELETED: null,
        classKind: null,
    }]);
    const [filter, setFilter] = useState(false);
    const onClick = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        var res = await axios.get(`/api/class/${document.getElementById('keyword').value}`, config);

        setClassList(res.data);
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

        var res = await axios.get(`/api/class/classListByPlace/${document.getElementById('place').value}`, config);
        
        setClassList(res.data);

        console.log(classList);
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
            res = await axios.get(`/api/class/classListByFilter/${filterValue[0]}`, config);
        } else {
            res = await axios.get(`/api/class/classListByFilter/${filterValue}`, config);
        }

        setClassList(res.data);
    };

    useEffect(() => {
        const script = document.createElement("script");
        
        script.async = true;
        script.src =
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4864e82f11768fe659ceb5b45c6cc4e3&autoload=false";

        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load( () => {
                var options = classList.length === 0 ? {
                    center: new kakao.maps.LatLng(33.450701, 126.570667),
                    level: 7
                } : {
                    center: new kakao.maps.LatLng(Number(classList[0].mapdata.FACI_POINT_Y), Number(classList[0].mapdata.FACI_POINT_X)),
                    level: 7
                }

                if(classList.length === 0) {
                    alert('데이터가 존재하지 않습니다! 다시 입력해주세요');
                }

                var container = document.getElementById('mapContainer');

                var zoomControl = new kakao.maps.ZoomControl();

                const mapContainer = new window.kakao.maps.Map(container, options);

                mapContainer.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
                
                classList.map(
                    (classData, i) => {
                        Marker(classData, mapContainer, history);
                    }
                );
            });
        };
    }, [classList]);


    return(
        <div>
            <SearchBarBlockParent
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

export default ContentsBlockParent;