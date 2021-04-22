import './App.css';
import {Component} from 'react';

class App extends Component() {
    state = {
        user:null,
    }
  
    setUserInState = (incomingUserData) => {
        this.setState({ user: incomingUserData})
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        if (token) {
          // YOU DO: check expiry!
          let userDoc = JSON.parse(atob(token.split('.')[1])).user
          this.setState({user: userDoc})      
        }
      }

    render() {
        return (
            <div className="App">
                Moosed
            </div>
        );
    }
}

export default App;
