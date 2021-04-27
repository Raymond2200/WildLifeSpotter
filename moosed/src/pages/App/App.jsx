import './App.css';
import Map from '../../components/Map/Map'
import ListPage from '../ListPage/ListPage'
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { getCurrentLatLng} from '../../services/geolocation'
import AuthPage from '../../pages/AuthPage/AuthPage';
import MenuList from '../../components/MenuList/MenuList';
import ToggleView from '../../components/ToggleView/ToggleView';
import FilterSpotteds from '../../components/FilterSpotteds/FilterSpotteds';
import AddSpot from '../../components/AddSpot/AddSpot';

class App extends Component {
    state = {
        lat: 45.910191,
        lng: -77.822451,
        user:null,
        listview: false,
        spotteds: [
            {animalType: 'Moose', lat: 43.239818899999996, lng: -79.8139712, description: "there's a damn moose on the loose!"},
            {animalType: 'Skunk', lat: 43.249818899999996, lng: -79.8239712, description: "i think i smell a skunk"},
            {animalType: 'Wolf', lat: 43.259818899999996, lng: -79.8339712, description: "ahhh it's a wolf! really super long test description to test max width settings okay cool"},
            {animalType: 'Deer', lat: 43.269818899999996, lng: -79.8439712, description: "oh look, bambi!"},
            {animalType: 'Bear', lat: 43.279818899999996, lng: -79.8539712, description: "it's winnie the pooh!"},
            {animalType: 'Cougar', lat: 43.289818899999996, lng: -79.8639712, description: "meow"},
        ],
    }
    handleLogout = () => {
        console.log("logout hit")
        localStorage.clear();
        this.setState({user: null})
        return <Redirect to="/"/>
    }
    setUserInState = (incomingUserData) => {
        this.setState({ user: incomingUserData})
    }
    async componentDidMount () {
        const {lat, lng } = await getCurrentLatLng()
        let token = localStorage.getItem('token')
        if (token) {
            let userDoc = JSON.parse(atob(token.split('.')[1])).user
            this.setState({
                user: userDoc,
                lat: lat, 
                lng: lng
            })      
        } else {
            this.setState({
                lat: lat, 
                lng: lng
            }) 
        }
    }
    render() {
        return (
        <div className="App">
            <h2>Moose on the Loose</h2>
            {/* <img src="logo.svg"></img> */}
            <MenuList userState={this.state.user}/>
            <Switch>
            {/* <Route path='/list' render={(props) => (
               <ListPage/> 
            )}/> */}
            <Route path='/login-signup' render={(props) => (
                <>
                <AuthPage {...props} user={this.state.user} setUserInState={this.setUserInState}/>
                <br/>
                </>
            )}/>
            <Route path='/list' render={(props) => (
                <>
                <ListPage 
                    lng={this.state.lng}
                    lat={this.state.lat} />
                <br/>
                </>
            )}/>
            <Route path='/logout' render={this.handleLogout}/>
            <Route path='/' render={(props) => (
                <>
                    {!this.state.listview ? (
                        <Map
                            {...props}
                            lng={this.state.lng}
                            lat={this.state.lat}
                            spotteds={this.state.spotteds}/>
                    ) : ( 
                        <ListPage
                            {...props}
                            lng={this.state.lng}
                            lat={this.state.lat}
                            spotteds={this.state.spotteds}/>
                    )}
                    <div className="button-container">
                        <ToggleView setListView={(listview) => this.setState({listview})}/>
                        <FilterSpotteds 
                            setSpotteds={(spotteds) => this.setState({spotteds})}
                        />
                        <AddSpot 
                            lng={this.state.lng}
                            lat={this.state.lat} />
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
