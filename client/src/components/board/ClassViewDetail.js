import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ViewDetailContents from './ViewDetailContents';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import styled from 'styled-components';
import qs from 'qs';

const Table_td = styled.td `
    width: 200px;
    height: 100px;
    text-align: right;
`;

class ClassViewDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classviewdetail: '',
            completed: 0,
            history: props.history,
            loaction: props.location
        }
    }

    stateRefresh = () => {
        this.setState({classviewdetail: '', completed: 0});
        this
            .callApi()
            .then(res => this.setState({classviewdetail: res}))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this
            .callApi()
            .then(res => this.setState({classviewdetail: res}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/classviewdetail');
        const body = await response.json();
        return body;
    }




    render() {
        return (
            <div>
                        {
                                this.state.classviewdetail
                                    ? this
                                        .state
                                        .classviewdetail
                                        .map(c => {
                                            return (
                                                <ViewDetailContents
                                                    stateRefresh={this.stateRefresh}
                                                    key={c.boardid}
                                                    boardTitle={c.boardTitle}
                                                    boardpay={c.boardpay}
                                                    boardmin={c.boardmin}
                                                    boardmax={c.boardmax}
                                                    boardType={c.boardType}
                                                    boardContents={c.boardContents}
                                                    startDate={c.startDate}
                                                    finishDate={c.finishDate}
                                                    startTime={c.startTime}
                                                    finishTime={c.finishTime}
                                                    mapdata={c.mapdata}
                                                    CREATEDATE={c.CREATEDATE}
                                                    classkind={c.classkind}
                                                    onClick={(e)=> {this.ClassDetail(this.props.boardid)}}
                                                    />
                                            );
                                        })
                                    : ""
                        }
                        
            </div>
              
        )
    }

}

export default ClassViewDetail;
