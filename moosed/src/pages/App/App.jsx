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
        lat: null,
        lng: null,
        user:null,
        listview: false,
        spotteds: [],
    }

    handleDragMarker = (lat, lng) => {
        this.setState({
            lat: lat, 
            lng: lng
        })
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
        const {lat, lng} = await getCurrentLatLng()
        let token = localStorage.getItem('token')
        let fetchSpotsResponse = await fetch('/api/spotteds/me/'+lng+'/'+lat)
            let inSpots = await fetchSpotsResponse.json()
        if (token) {
            let userDoc = JSON.parse(atob(token.split('.')[1])).user
            this.setState({
                user: userDoc,
                lat: lat, 
                lng: lng,
                spotteds: inSpots
            })      
        } else {
            this.setState({
                lat: lat, 
                lng: lng,
                spotteds: inSpots,
            }) 
        }
        console.log(this.state.spotteds)
    }
    render() {
        return (
        <div className="App">
            {/* <h2>Moose on the Loose</h2> */}
            {/* <img src="Logo.svg"></img> */}
            <img src="Logo2.svg"></img>
            <MenuList userState={this.state.user}/>
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
                    {!this.state.listview ? (
                        <Map
                            {...props}
                            lng={this.state.lng}
                            lat={this.state.lat}
                            spotteds={this.state.spotteds}
                            handleDragMarker={this.handleDragMarker}
                        />
                    ) : ( 
                        <ListPage
                            {...props}
                            lng={this.state.lng}
                            lat={this.state.lat}
                            spotteds={this.state.spotteds}
                        />
                    )}
                    <div className="button-container">
                        <ToggleView setListView={(listview) => this.setState({listview})}/>
                        <FilterSpotteds 
                            setSpotteds={(spotteds) => this.setState({spotteds})}
                            lng={this.state.lng}
                            lat={this.state.lat}
                        />
                        <AddSpot
                            setSpotteds={(spotteds) => this.setState({spotteds})}
                            lng={this.state.lng}
                            lat={this.state.lat}
                        />
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
