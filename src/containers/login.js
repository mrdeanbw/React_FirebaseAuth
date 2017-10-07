import React, { Component } from 'react'

import createHistory from 'history/createBrowserHistory'
import * as firebase from 'firebase'
import firebaseApp from '../firebase/firebase'
import { Router, browserHistory, Link  } from 'react-router';

const history = createHistory()

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: '',
          email: '',
          password : '',
          searchResults : []
        };
    
        this.handleChange = this.handleChange.bind(this);

        this.history = createHistory()
        
        // this.initIndex = this.initIndex.bind(this);
        //this.addOrUpdateObject = this.addOrUpdateObject.bind(this);
    }


    googleSignin(){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().languageCode = 'pt';
        provider.setCustomParameters({
          'login_hint': 'user@example.com'
        });
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function(result) {
          if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log('google user token', token);
            // ...
          }
          // The signed-in user info.
          var user = result.user;
          console.log('google user', user);
          browserHistory.push('/home');
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }

    facebookSignin(){
        
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        // firebase.auth().languageCode = 'fr_FR';
        provider.setCustomParameters({
          'display': 'popup'
        });
        // firebase.auth().signInWithRedirect(provider);
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function(result) {
          if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // console.log('facebook user token', token);
            // ...
          }
          // The signed-in user info.
          var user = result.user;
        //   console.log('facebook user', user);
          browserHistory.push('/home');
        //   alert('facebook login Success!');
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
        });
    
    }
    googleSignout(){
        
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
        // console.log('google signout success');
        // alert('Google login Success!');
        }).catch(function(error) {
        // An error happened.
        });
    }
    facebookSignout(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            // console.log('facebook signout success');
        }).catch(function(error) {
            // An error happened.
        });
    }

    emailSignin(email, password){
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .then(function(){
            console.log('emailsigninsuccess');
            browserHistory.push('/home');
        }.bind(this))
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        });
    }

    emailSignout(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log('Email signout success');
        }).catch(function(error) {
            // An error happened.
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleChangeEmail= (event) => {    
        this.setState({email: event.target.value});
    } 
    handleChangePassword = (event) => {
        this.setState({password: event.target.value});
    } 

    render() {
        return (
            <div className="login-container">
                <div className="page-container">
                    <div className="page-content">
                        <div className="content-wrapper">
                            <div className="content">
                                <div>
                                    <div className="panel panel-body login-form" style={{width:'640px'}}>
                                        <div className="row" style={{display:'flex', alignItems:'center'}}>
                                            <div className="col-xs-6" style={{padding:'0px 35px'}}>
                                                <div className="mycontent-left">
                                                    <div className="form-group text-center" style={{display:'flex', flexDirection:'column'}}>
                                                        <button type="button" className="btn btn-xlg" style={{backgroundColor:'rgb(80,124,192)', color:'white', marginBottom:30, display:'flex', alignItems:'center', borderRadius:'8px'}}
                                                            onClick={this.facebookSignin.bind(this)}
                                                        >
                                                            <i className="icon-facebook position-left"></i>
                                                            <div style={{flex:'auto'}}>
                                                                Login with Facebook
                                                            </div>
                                                        </button>

                                                        <button type="button" className="btn btn-xlg" style={{backgroundColor:'rgb(223,73,48)', color:'white', display:'flex', alignItems:'center', borderRadius:'8px'}}
                                                            onClick={this.googleSignin.bind(this)}
                                                        >
                                                            <i className="icon-google-plus position-left"></i>
                                                            <div style={{flex:'auto'}}>
                                                                Login with Google+
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-6" style={{padding:'0px 35px'}}>
                                                <div style={{position:'absolute', width:'100%', height:'70%', left:'0%', top:'15%', borderLeft:'2px solid rgb(240,240,240)'}}>
                                                    <div style={{borderRadius:'50%', width:'40px', height:'40px', marginLeft:'-20px', marginTop:'25%', border:'2px solid rgb(240,240,240', backgroundColor:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                        OR
                                                    </div>
                                                </div>
                                                <div className="mycontent-right">
                                                    <div className="text-center">
                                                        <h5 className="content-group">Sign in manually</h5>
                                                    </div>
                        
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" placeholder="Username or email" value={this.state.email} onChange={this.handleChangeEmail}/>
                                                    </div>
                        
                                                    <div className="form-group">
                                                        <input type="password" className="form-control" placeholder="Password"  value={this.state.password} onChange={this.handleChangePassword}/>
                                                    </div>
                        
                                                    <div className="form-group login-options">
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label className="checkbox-inline">
                                                                    <input type="checkbox" className="styled" />
                                                                    Remember
                                                                </label>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <button type="submit" className="btn btn-xlg" style={{backgroundColor:'rgb(255, 90, 95)', color:'white', borderRadius:'8px'}} onClick={()=> this.emailSignin(this.state.email, this.state.password)}>LOGIN</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6 text-left text-center">
                                                            <Link to="/signup">Register now</Link>
                                                        </div>
                                                        <div className="col-sm-6 text-right text-center">
                                                            <div style={{position:'absolute', width:'100%', height:'70%', left:'0%', top:'15%', borderLeft:'2px solid rgb(240,240,240)'}}> </div>
                                                            <a href="login_password_recover.html">Forgot password?</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                            </div>
            
                        </div>
            
                    </div>
            
                </div>
            </div>
        )
    }
}

export default LoginPage