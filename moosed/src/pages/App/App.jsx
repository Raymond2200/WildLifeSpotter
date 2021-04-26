import './App.css';
import Map from '../../components/Map/Map';
import React, { Component } from 'react';
import { getCurrentLatLng} from '../../services/geolocation';
import { Route, Switch, Redirect } from 'react-router-dom';
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
        spotteds: [
            {animalType: 'Moose', lat: 43.239818899999996, lng: -79.8139712, description: "there's a damn moose on the loose!"},
            {animalType: 'Skunk', lat: 43.249818899999996, lng: -79.8239712, description: "i think i smell a skunk"},
            {animalType: 'Wolf', lat: 43.259818899999996, lng: -79.8339712, description: "ahhh it's a wolf!"},
            {animalType: 'Deer', lat: 43.269818899999996, lng: -79.8439712, description: "oh look, bambi!"},
        ],
    }

    setUserInState = (incomingUserData) => {
        this.setState({ user: incomingUserData})
    }
    async componentDidMount () {
        //google maps
        const {lat, lng } = await getCurrentLatLng()
        //auth
        let token = localStorage.getItem('token')
        //setState for both
        if (token) {
            let userDoc = JSON.parse(atob(token.split('.')[1])).user
            this.setState({
                user: userDoc,
                lat: lat, 
                lng: lng
            })      
        }
    }
    render() {
        return (
        <div className="App">
            <Switch>
                <MenuList/>
                <Route path='/list' render={(props) => (
                    <>
                    <ListPage/>
                    </>
                )}/>
                <Route path='/' render={(props) => (
                    <>
                    <h2>Moose on the Loose</h2>
                    <Map 
                        lng={this.state.lng}
                        lat={this.state.lat}
                        spotteds={this.state.spotteds}
                    />
                    
                    <div className="button-container">
                        <ToggleView/>
                        <FilterSpotteds 
                            setSpotteds={
                                (spotteds) => this.setState(
                                    {spotteds})}
                        />
                        <AddSpot user={this.state.user}/>
                    </div>
                    
                    <AuthPage setUserInState={this.setUserInState}/>
                    <br/>
                    </>
                )}/>
            </Switch>
        </div>
        );
    }
}

export default App;
