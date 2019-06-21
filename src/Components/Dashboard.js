import React, { Component } from 'react';
import '../App.css';
import '../Custom.css';
import { exists } from 'fs';
import { parse } from 'query-string';
import ReactTooltip from 'react-tooltip'
import queryString from 'query-string'
var qs = require('qs');
var  access_token= '';
export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            cluster:[],
            group1:[],
            cluster3:[],
            clusterflag:'True',
            groupflag:'True',
            cluster3flag:'True',
            access_token : '',
            Code : '',
            State:''
        };
        console.log(this.props.match.params.session)
    }
    /*****************************  Code Start List of function for getting access token and fetching list of display ****************************/
    async componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        console.log(values.code);
        console.log(values.state);
        var Code = values.code;
        if (typeof(values.code) !== 'undefined' && values.code != null && values.state !== 'undefined' && values.state != null && values.state =='JkVRNYhB3OpfD6btsqCwhWfLA8mJZ2ur') {
     } else {
            window.location= '/LoginScreen';
   }
       try {
            setInterval(async () => {
                fetch('http://52.172.36.138/api/authorize/access_token',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body :  qs.stringify({
                        'client_id' : 'cbBVF0wO6fnwg65L1qRD3QxwBxxqk4WETD4Po9YP',
                        'client_secret' : 'Dtj0al4xTYMSuO7htOtdX3ToNsBk5nUZZNPzYSJZCGW93iIw4yKM9Iei3PPds689uXlNNhvtSQdmDmrELXmUEd7DBCw9IuLWrLKDP7XogxThbiidxVahXnNdSqEpRLyHaVVHUnO8hQywKUAwPvZA3rpMr7g9eLMLjo5OZ10sOmK6Ytn8COGeSuMkW4zZG3ocyp7RHCVdIoQf5UkatChe7AwujvlfG9m101NCF1ShNoLPTW6DD9lP0t3qKCbYlO',
                        'grant_type' : 'client_credentials',
                    })
                }).then((response) => response.json()).then((jsonData) => {
                    console.log(jsonData);
                    access_token =  jsonData.access_token
                    console.log(this.props.match.params.session);
                    var x = this.props.match.params;
                    console.log(x);
                    console.log(access_token)
                    fetch('http://52.172.36.138/api/display',{
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+access_token,
                        },
                    }).then((response) => response.json()).then((jsonResponse) => {
                        console.log(jsonResponse);
                            this.setState({
                                cluster:jsonResponse
                            })
                    })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
            },5000);
        }
        catch(e) {
            console.log(e);
          }
    };
    /***************************** End List of function for getting access token and fetching list of display ****************************/

    /*********  Function for Play video Start *********************/

    PayVideo(displayId) {
        let url = 'http://52.172.36.138/layout/preview/'+displayId;
        let win = window.open(url, '_blank');
        win.focus();
    }
    /*********  Function for Play video end *********************/

    /************   Start Function for request screenshot not working properly ***********************/
    showScreen(displayId)
    {
        let url = 'http://52.172.36.138/display/requestscreenshot/'+displayId
        fetch(url,{
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+access_token,
            },
            body:JSON.stringify({
                'displayId' : displayId,
            }),
        }).then((response) => response.json()).then((jsonResponseScreen) => {
            console.log(jsonResponseScreen);
        })
            .catch((error) => {
                console.error(error);
            });
    }
    /************   End Function for request screenshot not working properly ***********************/

/***************  Render function to load the html content**********************/
    render() {
        return (
            <div>
                { this.state.groupflag ==='True' ?
                    <div className="container">
                        <div className="mybox">
                            <div className="row">
                                <div className="col-sm-12">
                                    {
                                        this.state.cluster.length > 0 ? this.state.cluster.map((data)=> {
                                            return (
                                                <div className="col-sm-6">
                                                    <div className="col-sm-2">
                                                    <button disabled={data.loggedIn == 0} onClick={ () => this.PayVideo(data.displayId) } className ='myButton' >
                                                    <img src={require('../../src/image/play2.png')} className="playimg" />
                                                    </button>
                                                    </div>
                                                    
                                                    <div className="col-sm-2">
                                                    <img src={require('../../src/image/icons8-eye-48.png')} className="playimg" onClick="#" data-tip="Under Development" style={{"pointer-events":"all"}} /><ReactTooltip />
                                                    </div>
                                                    <div className={data.loggedIn == 1 ?  "box" : "box-red" }>
                                                        {data.display}
                                                    </div>
                                                </div>
                                            )
                                        }) : "Data Not Available."
                                    }
                                </div>
                            </div>
                        </div>
                    </div> :
                   <div>   
                </div>
                }
            </div>
        );
    }
}



