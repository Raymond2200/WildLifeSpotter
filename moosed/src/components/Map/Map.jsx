import React, { Component } from 'react'
import mapStyle from './map-style';
import styles from './Map.module.css';

class Map extends Component {
    mapDiv = React.createRef();
    
    setMap() {
        let savedVals = [];
        let spotteds = this.props.spotteds;
        let prev_infowindow = false;
        spotteds.forEach((spot) => {
            let animalType = spot.animalType;
            let location = {
                lat: spot.lat, 
                lng: spot.lng}
            let description = spot.description;
            savedVals.push([animalType, location, description]);
        });
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
            // new window.google.maps.Marker({
            //     position: location, 
            //     map: map,
            //     draggable: true,
            //     animation: window.google.maps.Animation.DROP
            // });
            savedVals.forEach((spot) => {
                const contentString =
                    `<div class="pin">` +
                    `<h1 id="animalType">${spot[0]}</h1>` +
                    `<div id="description">${spot[2]}</div>` +
                    `</div>`;
                const infowindow = new window.google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 200,
                });
                let svgMarker;
                console.log('animalType: ', spot[0])
                if (spot[0] === 'Moose') {
                    svgMarker = {
                        url: "icons/moose.svg",
                        anchor: new window.google.maps.Point(25,50),
                        scaledSize: new window.google.maps.Size(80,80)
                    }
                } else if (spot[0] === 'Deer'){
                    svgMarker = {
                        url: "icons/deer.svg",
                        anchor: new window.google.maps.Point(25,50),
                        scaledSize: new window.google.maps.Size(80,80)
                    }
                } else if (spot[0] === 'Bear'){
                    svgMarker = {
                        url: "icons/bear.svg",
                        anchor: new window.google.maps.Point(25,50),
                        scaledSize: new window.google.maps.Size(80,80)
                    }
                } else if (spot[0] === 'Skunk'){
                    svgMarker = {
                        url: "icons/Skunk.svg",
                        anchor: new window.google.maps.Point(25,50),
                        scaledSize: new window.google.maps.Size(80,80)
                    }
                } else if (spot[0] === 'Wolf'){
                    svgMarker = {
                        url: "icons/wolf.svg",
                        anchor: new window.google.maps.Point(25,50),
                        scaledSize: new window.google.maps.Size(80,80)
                    }
                } else if (spot[0] === 'Cougar'){
                    svgMarker = {
                        url: "icons/cat.svg",
                        anchor: new window.google.maps.Point(25,50),
                        scaledSize: new window.google.maps.Size(80,80)
                    }
                }
                let marker = new window.google.maps.Marker({
                    position: spot[1], 
                    map: map,
                    animation: window.google.maps.Animation.DROP,
                    animalType: spot[0],
                    description: spot[2],
                    icon: svgMarker,
                });
                marker.addListener("click", () => {
                    if( prev_infowindow ) {
                        prev_infowindow.close();
                    }
                    prev_infowindow = infowindow;
                    infowindow.open(map, marker);
                });
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
                <div ref={this.mapDiv} className={styles.Map}></div>
            </div>
        )
    }
}


export default Map;