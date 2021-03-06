import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { css } from 'aphrodite/no-important';
import axios  from 'axios';
import cookie from 'react-cookies'
import { Api, setting } from '../config'

const UserHOC = (ComposedComponent) => {
    class UserHOC extends Component{
        tokenGet(){
            axios.get(Api('Auth', 'getTokenWithoutAuth'))
            .then((response) => {
                if (response.data[0].result != undefined && response.data[0].result != null){
                    this.token(response.data[0].result.user_token)
                }
            })
            .catch((error) => {console.log(error)})
        }
        loginGet(login, password, token, error){
            axios.get(Api('Auth', 'auth', `"login":"${login}","password":"${password}","token":"${token}"`))
                .then((response) => {
                    if (response.data[0].result != undefined && response.data[0].result != null){
                        this.logging(response.data[0].result)
                        browserHistory.push(`${setting.site}entry`)
                    } else {
                        this.error(response.data[0].error.message)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        render() {
            return <ComposedComponent tokenGet={this.tokenGet} loginGet={this.loginGet} {...this.props} {...this.state} />;
        }
    }
    return UserHOC
}
export default UserHOC;