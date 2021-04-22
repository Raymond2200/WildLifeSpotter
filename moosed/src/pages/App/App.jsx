import './App.css';
import Map from '../../components/Map/Map'
import { Component } from 'react'
import { getCurrentLatLng} from '../../services/geolocation'

class App extends Component {
  state = {
    lat: null,
    lng: null,
  }
  async componentDidMount () {
    const {lat, lng } = await getCurrentLatLng()
    this.setState({ lat: lat, lng: lng})
  }
  render() {
    return (
      <div className="App">
        Moosed
        <Map 
          lng={this.state.lng}
          lat={this.state.lat}
        />
      </div>
    );
  }
}

export default App;
