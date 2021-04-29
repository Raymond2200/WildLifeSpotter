import {Component} from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default class AuthPage extends Component {
  state = {
    showLogin: true,
  }

  render() {
    return (
      <main className="AuthPage">
        <div>
        </div>
        {this.state.showLogin ? 
        <LoginForm user={this.props.user} setUserInState={this.props.setUserInState}/> : 
        <SignUpForm user={this.props.user} setUserInState={this.props.setUserInState} />}
          <Box m={-2}>
            <Button className="changeForm"variant="contained" color="primary" type="submit" onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
              {this.state.showLogin ? 'SIGN UP' : 'LOG IN'}
            </Button>
          </Box>
      </main>
    );
  }
}