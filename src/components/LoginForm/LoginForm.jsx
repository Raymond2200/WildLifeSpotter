import { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from 'react-router-dom';
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
            <ThemeProvider theme={theme}>
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
              </ThemeProvider>
            </Box>
            <br />
            <Box>
              <ThemeProvider theme={theme}>
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
              </ThemeProvider>
            </Box>
            <br/>
              <Box m={0}>
                <ThemeProvider theme={theme}>
                  <Button
                      className="button"
                      theme='theme'
                      variant="contained"
                      color="primary"
                      type="submit"
                  >
                      LOGIN
                  </Button>
                </ThemeProvider>
              </Box>
            
          </form>
            <p className="error-message" style={{color: 'red'}}>&nbsp;{this.state.error}</p>
          <Box mt={5} mb={-1}>
            <h3 style={{color:'#0b3939'}}>Don't have an account? <br/> Sign up here!</h3>
          </Box>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LoginForm)