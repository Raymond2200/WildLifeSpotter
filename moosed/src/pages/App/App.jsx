import './App.css';
import Map from '../../components/Map/Map'
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { getCurrentLatLng} from '../../services/geolocation'
import AuthPage from '../../pages/AuthPage/AuthPage';
import MenuList from '../../components/MenuList/MenuList';
import ToggleView from '../../components/ToggleView/ToggleView';
import FilterSpotteds from '../../components/FilterSpotteds/FilterSpotteds';
import AddSpot from '../../components/AddSpot/AddSpot';
import ListPage from '../ListPage/ListPage';


class App extends Component {
    state = {
        lat: null,
        lng: null,
        user:null,
        doRedirect: false,
        spotteds: [
            {animalType: 'Moose', lat: 43.239818899999996, lng: -79.8139712, description: "there's a damn moose on the loose!"},
            {animalType: 'Skunk', lat: 43.249818899999996, lng: -79.8239712, description: "i think i smell a skunk"},
            {animalType: 'Wolf', lat: 43.259818899999996, lng: -79.8339712, description: "ahhh it's a wolf!"},
            {animalType: 'Deer', lat: 43.269818899999996, lng: -79.8439712, description: "oh look, bambi!"},
        ],
    }
    handleLogout = () => {
        console.log("logout hit")
        localStorage.clear();
        this.setState({user: null})
        window.location.href = '/';
    }
    setUserInState = (incomingUserData) => {
        this.setState({ user: incomingUserData})
    }
    async componentDidMount () {
        //google maps
        const {lat, lng } = await getCurrentLatLng()
        if ({lat, lng}) {
            this.setState({
                lat: lat, 
                lng: lng
            }) 
        }
        //auth
        let token = localStorage.getItem('token')
        //setState for both
        if (token) {
            let userDoc = JSON.parse(atob(token.split('.')[1])).user
            this.setState({
                user: userDoc,
            })      
        }
    }
    render() {
        return (
        <div className="App">
            <h2>Moose on the Loose</h2>
            {/* <img src="logo.svg"></img> */}
            <MenuList 
                userState={this.state.user}
                handleLogout={this.handleLogout}/>
            <Switch>
            <Route path='/login-signup' render={(props) => (
                <>
                <AuthPage {...props} user={this.state.user} setUserInState={this.setUserInState}/>
                <br/>
                </>
            )}/>
            <Route path='/logout' render={this.handleLogout}/>
            <Route path='/' render={(props) => (
                <>
                <Map
                    {...props}
                    lng={this.state.lng}
                    lat={this.state.lat}
                    spotteds={this.state.spotteds}
                />
                <div className="button-container">
                    <ToggleView/>
                    <FilterSpotteds 
                        setSpotteds={(spotteds) => this.setState({spotteds})}
                    />
                    <AddSpot user={this.state.user} />
                </div>
                </>
            )}/>
            <Redirect to="/" />
        </Switch>
        </div>
        );
    }
}

export default App;
