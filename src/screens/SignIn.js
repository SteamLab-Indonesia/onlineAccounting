import React, {Component} from 'react';
class SignIn extends Component{
    constructor(){
        super()
    }
    render(){
        return(
        <fieldset>
            <legend>Sign In</legend>
            <label for="email">Email Address</label><br/>
            <input type="email" id='email'/><br/>
            <label for="password">Password</label><br/>
            <input type="password" id='password'/><br/>
            <input type='checkbox' id='rememberme'/>
            <label for="rememberme">Remember Me</label><br/>
            <label for="submit"></label>
            <input type="submit" id='submit'/><br/>
            <a href='https://www.forgotpassword.com'>Forgot password?</a>
        </fieldset>
        );

    }
}
export default SignIn