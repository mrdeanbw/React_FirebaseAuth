import React, { Component } from 'react'
import firebaseApp from '../firebase/firebase';
import { browserHistory } from 'react-router';

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: '',
          email: '',
          password : '',
          searchResults : []
        };
        this.handleChange = this.handleChange.bind(this);        
    }

    emailSignUp(email, password){
        console.log(email, '/', password);
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then(function(){
            browserHistory.push('/home');
        })
        .catch(function(error) {
          // Handle Errors here.
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
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
                                <div className="panel login-form" style={{borderRadius:'10px'}}>
                                    <div className="panel-heading" style={{backgroundColor:'rgb(240,242,245', borderTopLeftRadius:'10px', borderTopRightRadius:'10px'}}>
                                        Create an account
                                    </div>
                                    <div className="panel-body">

                                        <div className="row">
                                            <div className="input-group" style={{margin:'10px'}}>
                                                <span className="input-group-addon">Name</span>
                                                <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange}/>
                                            </div>
                                            <div className="input-group" style={{margin:'10px'}}>
                                                <span className="input-group-addon">Mail</span>
                                                <input type="email" className="form-control" value={this.state.email} onChange={this.handleChangeEmail}/>
                                            </div>
                                            <div className="input-group" style={{margin:'10px'}}>
                                                <span className="input-group-addon">Password</span>
                                                <input type="password" className="form-control" value={this.state.password} onChange={this.handleChangePassword}/>
                                            </div>

                                            <div style={{display:'flex', justifyContent:"space-between", margin:'10px'}}>
                                                <span className="help-block text-left">I accept the <a href='#'>Terms</a></span>
                                                <button type="submit" className="btn btn-rounded" style={{backgroundColor:'rgb(98, 217, 98)', color:'white', width:'100px'}}
                                                    onClick={()=> this.emailSignUp(this.state.email, this.state.password)}
                                                >
                                                    Create
                                                </button>
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

export default SignupPage