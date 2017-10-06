
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';
//import firebase from 'firebase';
import axios from 'axios';

var firebase = require('firebase');
var algoliasearch = require('algoliasearch');
//var client = algoliasearch('HQWHB4S3S1', '5d431ceafb5437b0e6104f52efebd577');
var client = algoliasearch('FBABZ8SPVB',   'afd643cfb28c1a5393e676c86a65b25d');
var index = client.initIndex('funtionTests');
var firebaseApp;

//-----------
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      email: '',
      password : '',
      searchResults : []
    };

    this.handleChange = this.handleChange.bind(this);
    
    // this.initIndex = this.initIndex.bind(this);
    //this.addOrUpdateObject = this.addOrUpdateObject.bind(this);
  }
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyDAy6lU4EGLudZeu6IMRUCB8bCZ0_9-Ufc",
      authDomain: "fir-chat-62c42.firebaseapp.com",
      databaseURL: "https://fir-chat-62c42.firebaseio.com",
      projectId: "fir-chat-62c42",
      storageBucket: "",
      messagingSenderId: "760467207802"
    };
    firebaseApp = firebase.initializeApp(config);
    

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
    this.facebookSignout();
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_likes');
    firebase.auth().languageCode = 'fr_FR';
    provider.setCustomParameters({
      'display': 'popup'
    });
    // firebase.auth().signInWithRedirect(provider);
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        console.log('facebook user token', token);
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      console.log('facebook user', user);
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
  googleSignout(){

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('google signout success');
    }).catch(function(error) {
      // An error happened.
    });
  }
  facebookSignout(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('facebook signout success');
    }).catch(function(error) {
      // An error happened.
    });
  }
  emailSignUp(email, password){
    console.log(email, '/', password);
    firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // ...
    });

  }
  emailSignin(email, password){
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
      console.log('emailsigninsuccess');
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
      // ...
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
  handleChangeEmail= (event) => {
    // https://us-central1-fir-rrendering.cloudfunctions.net/requestTest
    var _this = this;
    this.setState({email: event.target.value});
  } 
  handleChangePassword = (event) => {
    // https://us-central1-fir-rrendering.cloudfunctions.net/requestTest
    var _this = this;
    this.setState({password: event.target.value});
  } 
  

  handleChange(event) {
    // https://us-central1-fir-rrendering.cloudfunctions.net/requestTest
    var _this = this;
    this.setState({value: event.target.value});
      
  }

  addOrUpdateObject(dataSnapshot) {
    console.log("__addOrUpdateObject function");
    console.log("datasnapshot", dataSnapshot);
    // Get Firebase object
    var firebaseObject = dataSnapshot.val();

    // Specify Algolia's objectID using the Firebase object key
    
    //firebaseObject.objectID = dataSnapshot.key();
    console.log(dataSnapshot.key);
    firebaseObject.objectID = dataSnapshot.key;

    // Add or update object
    index.saveObject(firebaseObject, function(err, content) {
      if (err) {
        throw err;
      }

      console.log('Firebase<>Algolia object saved');
    });
  }
  removeIndex(dataSnapshot) {
    console.log("datasnapshot", dataSnapshot);
    // Get Algolia's objectID from the Firebase object key
    var objectID = dataSnapshot.key;

    // Remove the object from Algolia
    index.deleteObject(objectID, function(err, content) {
      if (err) {
        throw err;
      }

      console.log('Firebase<>Algolia object deleted');
    });
  }
  showSearchResults = () =>{
    return(
      this.state.searchResults.map((element)=>{
        //console.log(element.address, "~~~~")
        <p>{element.address}</p>
      })
      
    )
  }
  render() {
    var _this = this;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <div>
          <p>
          <button onClick={()=> this.googleSignin()}>  google signin</button>
          <button onClick={()=> this.googleSignout()}>  google signout </button>
          </p>
          <p>
          <button onClick={()=> this.facebookSignin()}>  facebook signin</button>
          <button onClick={()=> this.facebookSignout()}>  facebook signout</button>
          </p>
          <p>
          <input type="text" value={this.state.email} onChange={this.handleChangeEmail} placeholder='email'/>
          <input type="text" value={this.state.password} onChange={this.handleChangePassword} placeholder='password'/>
          <button onClick={()=> this.emailSignUp(this.state.email, this.state.password)}>  Email signup </button>
          <button onClick={()=> this.emailSignin(this.state.email, this.state.password)}>  Email signin </button>
          <button onClick={()=> this.emailSignout()}>  Email signout </button>
          </p>
        </div>

        
      </div>
    );
  }
}

export default App;
