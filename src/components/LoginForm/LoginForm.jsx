import { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from 'react-router-dom';


const styles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
});

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    doRedirect: false
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const fetchResponse = await fetch('/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.state.email, password: this.state.password, })
      })

      if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')

      let token = await fetchResponse.json()
      localStorage.setItem('token', token);

      const userDoc = JSON.parse(atob(token.split('.')[1])).user;
      this.props.setUserInState(userDoc)
      if (this.props.user !== null) this.setState({ doRedirect: true });
    } catch (err) {
      console.log("LoginForm error", err)
      this.setState({ error: 'Login Failed - Try Again' });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        { this.state.doRedirect && <Redirect to="/" /> }
        <div className="form-container" p={2}>
          <form autoComplete="off" p={2} className={classes.root}  onSubmit={this.handleSubmit}>
          <Box m={0} mt={4}>
          <TextField
              align="center"
              id="outlined-helperText"
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
          />
          </Box>
          <br />
          <Box>
            <TextField
                id="outlined-helperText"
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
            />
          </Box>
          <br/>
          <Box m={0}>
            <Button
              className="button"
                variant="contained"
                color="primary"
                type="submit"
            >
                LOGIN
            </Button>
          </Box>
          </form>
          <Box mt={5} mb={-3}>
            <h3>Don't have an account? <br/> Sign up here!</h3>
          </Box>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LoginForm)