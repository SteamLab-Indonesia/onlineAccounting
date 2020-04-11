import React, {Component} from 'react';
import { login } from '../libs/database';

class SignIn extends Component{

    state = {
        username: '',
        password: ''
    }

    constructor(){
        super()
    }

    handleData = (e, name) => {
        this.setState({ [name]: e.target.value })
    }

    handleSubmit = () => {
        // Cookie (Session) akan disimpan di cache Browser (temporary storage)
        login(this.state.username, this.state.password).then((resp) => {
            alert('Login successful');
            this.setState({username: '', password: ''});
            this.props.history.push('/dashboard');  // Automatically redirect to /dashboard
        })
        .catch((err) => {
            alert(err);
        })
    }

    render(){
        let {username, password} = this.state;

        return(
        <fieldset>
            <legend>Sign In</legend>
            <label for="email">Username</label><br/>
            <input type="email" id='email' value={username} onChange={(e) => this.handleData(e, 'username')}/><br/>
            <label for="password">Password</label><br/>
            <input type="password" id='password' value={password} onChange={(e) => this.handleData(e, 'password')}/><br/>
            <input type='checkbox' id='rememberme'/>
            <label for="rememberme">Remember Me</label><br/>
            <label for="submit"></label>
            <input type="submit" id='submit' onClick={this.handleSubmit} /><br/>
            <a href='https://www.forgotpassword.com'>Forgot password?</a>
        </fieldset>
        );

    }
}
export default SignIn