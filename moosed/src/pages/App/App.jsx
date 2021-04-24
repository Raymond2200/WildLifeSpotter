import './App.css';
import Map from '../../components/Map/Map'
import { Component } from 'react'
import { getCurrentLatLng} from '../../services/geolocation'
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from '../../pages/AuthPage/AuthPage';
import MenuList from '../../components/MenuList/MenuList'
import ToggleView from '../../components/ToggleView/ToggleView'
import FilterSpotteds from '../../components/FilterSpotteds/FilterSpotteds'
import AddSpot from '../../components/AddSpot/AddSpot'

class App extends Component {
    state = {
        lat: null,
        lng: null,
        user:null,
        spotteds: [],
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
            <h2>Moose on the Loose</h2>
            <MenuList/>
            <Map 
                lng={this.state.lng}
                lat={this.state.lat}
            />
            
            <div className="button-container">
                <ToggleView/>
                <FilterSpotteds 
                    setSpotteds={
                        (spotteds) => this.setState(
                            {spotteds})}
                />
                <AddSpot/>
            </div>
            
            <AuthPage setUserInState={this.setUserInState}/>
            <br/>
        </div>
        );
    }
}

export default App;
