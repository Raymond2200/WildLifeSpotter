import './App.css';
import Map from '../../components/Map/Map'
import ListPage from '../ListPage/ListPage'
import React, { Component } from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { getCurrentLatLng} from '../../services/geolocation'
import AuthPage from '../../pages/AuthPage/AuthPage';
import MenuList from '../../components/MenuList/MenuList';
import ToggleView from '../../components/ToggleView/ToggleView';
import FilterSpotteds from '../../components/FilterSpotteds/FilterSpotteds';
import AddSpot from '../../components/AddSpot/AddSpot';
import Loading from '../../components/Loading/Loading'

class App extends Component {
    state = {
        lat: null,
        lng: null,
        user: null,
        listview: false,
        spotteds: [],
        isLoading: false,
        filter: "recent",
    }

    handleDragMarker = (lat, lng) => {
        this.setState({
            lat: lat, 
            lng: lng
        })
    }
    handleLogout = () => {
        localStorage.clear();
        this.setState({user: null})
        return <Redirect to="/"/>
    }
    setUserInState = (incomingUserData) => {
        this.setState({ user: incomingUserData})
    }

    loadSpots = async (lat=this.state.lat, lng=this.state.lng) => {
        if (this.state.filter === "recent") {
            try{
                let fetchSpotsResponse = await fetch('/api/spotteds/me/'+lng+'/'+lat)
                let inSpots = await fetchSpotsResponse.json()
                this.setState({spotteds: inSpots})
            } catch (err) {
                console.log(err+"Bad Request")
        }
        } else if (this.state.filter === "my") {
            try{
                let jwt = localStorage.getItem('token')
                let fetchSpotsResponse = await fetch('/api/spotteds/myspots', {headers: {'Authorization': 'Bearer ' + jwt}})
                let inSpots = await fetchSpotsResponse.json()
                this.setState({spotteds: inSpots})
            } catch (err) {
                console.log(err+"Bad Request")
        }
        } else if (this.state.filter === "archive") {
            try {
                let fetchSpotsResponse = await fetch('/api/spotteds/archived/'+lng+'/'+lat)
                let inSpots = await fetchSpotsResponse.json()
                this.setState({spotteds: inSpots})
            } catch (err) {
                console.log(err+"Bad Request")
            }
        }
    }

    async componentDidMount () {
        const {lat, lng} = await getCurrentLatLng()
        let token = localStorage.getItem('token')
        this.loadSpots(lat,lng)
        if (token) {
            let userDoc = JSON.parse(atob(token.split('.')[1])).user
            this.setState({
                user: userDoc,
                lat: lat, 
                lng: lng,
                isLoading: true,
            })      
        } else {
            this.setState({
                lat: lat, 
                lng: lng,
                isLoading: true,
            }) 
        }
    }

    render() {
        return (
        <div className="App">
            <Link to="/">
                <header>
                    <img src="Logo-png.png" alt="logo"></img>
                </header>
            </Link>
            {this.state.isLoading === false ? (
                <div className="loading-frame">
                    <Loading/>
                </div>
            ) : (
                <div>
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
                            {this.state.lat && this.state.listview === false ? (
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
                                    loadSpots={this.loadSpots}
                                    setSpotteds={(spotteds) => this.setState({spotteds})}
                                />
                            )}
                            <footer>
                            <div className="button-container">
                                <ToggleView setListView={(listview) => this.setState({listview})}/>
                                <FilterSpotteds 
                                    setFilter={(filter, x) => this.setState({filter},x)}
                                    loadSpots={this.loadSpots}
                                    user={this.state.user}
                                    lng={this.state.lng}
                                    lat={this.state.lat}
                                />
                                <AddSpot
                                    setFilter={(filter) => this.setState({filter})}
                                    loadSpots={this.loadSpots}
                                    user={this.state.user}
                                    lng={this.state.lng}
                                    lat={this.state.lat}
                                    fitler={this.state.filter}
                                />
                            </div>
                            </footer>
                        </>
                    )}/>
                    <Redirect to="/" />
                    </Switch>
                </div>
            )}
        </div>
        );
    }
}

export default App;