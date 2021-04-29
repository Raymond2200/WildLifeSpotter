import { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#0b3939'
      },
  }
});


class SignUpForm extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirm: '',
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
            const fetchResponse = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: this.state.username, email: this.state.email, password: this.state.password,})
          })
          
          if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
          let token = await fetchResponse.json()
          localStorage.setItem('token', token);
          
          const userDoc = JSON.parse(atob(token.split('.')[1])).user;
          this.props.setUserInState(userDoc)
          if (this.props.user !== null) this.setState({ doRedirect: true });
        } catch (err) {
            console.log("SignupForm error", err)
            this.setState({ error: 'Sign Up Failed - Try Again' });
        }
    }

  render() {
    const disable = this.state.password !== this.state.confirm;
    const { classes } = this.props;
    return (
      <div>
        { this.state.doRedirect && <Redirect to="/" /> }
        <div className="form-container">
          <form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit}>
          <ThemeProvider theme={theme}>
          <Box mt={4}>
            <TextField
                id="outlined-helperText"
                label="Username"
                variant="outlined"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                required
            />
          </Box>
          <br/>
          <Box>
            <TextField
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
          <br/>
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
          <Box>
            <TextField
                id="outlined-helperText"
                label="Confirm Password"
                variant="outlined"
                name="confirm"
                type="password"
                value={this.state.confirm}
                onChange={this.handleChange}
                required
            />
          </Box>
          <br/>
          <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={disable}
          >
              SIGN UP
          </Button>
          </ThemeProvider>
          </form>
          <Box mt={5} mb={-3}>
          <h3>Have an account? <br/> Log in here!</h3>
          </Box>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SignUpForm)