import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { css } from 'aphrodite/no-important';
import g from '../../style/global'
import axios  from 'axios';
import cookie from 'react-cookies'
import Navigation from './navigation'
import Panel from '../panels/panel'
import { Api } from '../../config'

class AppWrap extends Component{
    token(){
        axios.get(Api('Auth', 'getTokenWithoutAuth'))
        .then((response) => {
            if (response.data[0].result != undefined && response.data[0].result != null){
                this.props.token(response.data[0].result.user_token)
            }
        })
        .catch((error) => {console.log(error)})
    }
    componentDidMount(){
        setTimeout(()=>{
            if (cookie.load('user') != undefined){
                this.props.token(cookie.load('user').token)
                this.props.logging(cookie.load('user').profile)
            } else {
                this.token()
            }
            this.props.Store.user.logging == true ? this.props.Store.routing.locationBeforeTransitions.pathname == '/' ? browserHistory.push('/entry') : false : browserHistory.push('/')
        },10)
    }
    render(){
        return(
            <div className={css(g.app)}>
                <Navigation />
                {this.props.Store.user.logging == true ? (
                    <div className={css(g.top)}>
                        <Panel title={this.props.routes[1].title} />
                    </div>
                ) : (
                    <div></div>
                )}
                {this.props.children}
            </div>
        )
    }
}

export default connect(
  state => ({
    Store: state
  }),
  dispatch =>({
      token: (token) => {dispatch({type:'PUSH_TOKEN', payload: token})},
      logging: (item) => {dispatch({type:'LOGGING',payload:item})}
  })
)(AppWrap)