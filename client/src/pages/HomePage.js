import React, { Component } from 'react';
import ContentsBlock from '../components/home/ContentsBlock';



class HomePage extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         customers: '',
    //         completed: 0
    //     }
    // }

    // stateRefresh = () => {
    //     this.setState({customers: '', completed: 0});
    //     this
    //         .callApi()
    //         .then(res => this.setState({customers: res}))
    //         .catch(err => console.log(err));
    // }

    // componentDidMount() {
    //     this
    //         .callApi()
    //         .then(res => this.setState({customers: res}))
    //         .catch(err => console.log(err));
    // }

    // callApi = async () => {
    //     const response = await fetch('/api/customers');
    //     const body = await response.json();
    //     return body;
    // }

    render() {
        return (
            <div>
                <ContentsBlock/>
            </div>
        )
    }
}

export default HomePage;