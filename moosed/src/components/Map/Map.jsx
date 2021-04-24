import React, { Component } from 'react'
import mapStyle from './map-style';
import styles from './Map.module.css';

class Map extends Component {
    mapDiv = React.createRef();
    

    setMap() {
        if(this.props.lat && this.props.lng) {
            const location = {
                lat: this.props.lat, 
                lng: this.props.lng}
            const map = new window.google.maps.Map(
                this.mapDiv.current, {
                    zoom: this.props.zoom || 12,
                    center: location, 
                    disableDefaultUI: true,
                    styles: mapStyle,
                    gestureHandling: "greedy"
                }
            );
            new window.google.maps.Marker({
                position: location, 
                map: map,
                draggable: true,
                animation: window.google.maps.Animation.DROP
            });
        }
    }
    
    componentDidMount() {
        this.setMap()
    }
    componentDidUpdate() {
        this.setMap();
    }
    render () {
        return (
            <div>
                map component here:<br/>
                <div ref={this.mapDiv} className={styles.Map}></div>
            </div>
        )
    }
}


export default Map;