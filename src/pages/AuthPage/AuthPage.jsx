import {Component} from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Button from '@material-ui/core/Button';

export default class AuthPage extends Component {
  state = {
    showLogin: true,
  }

  render() {
    return (
      <main className="AuthPage">
        <div>
          <Button variant="contained" color="primary" type="submit" onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
            {this.state.showLogin ? 'SIGN UP' : 'LOG IN'}
          </Button>
        </div>
        {this.state.showLogin ? 
        <LoginForm user={this.props.user} setUserInState={this.props.setUserInState}/> : 
        <SignUpForm user={this.props.user} setUserInState={this.props.setUserInState} />}
      </main>
    );
  }
}