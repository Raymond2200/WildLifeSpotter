import React, { Component } from 'react'
import mapStyle from './map-style';
import styles from './Map.module.css';

class Map extends Component {
    mapDiv = React.createRef();
    mapRef = React.createRef();
    setMap = () => {
        if(this.props.lat && this.props.lng) {
            const location = {
                lat: this.props.lat, 
                lng: this.props.lng}
            this.mapRef = new window.google.maps.Map(
                this.mapDiv.current, {
                    zoom: this.props.zoom || 12,
                    center: location, 
                    disableDefaultUI: true,
                    styles: mapStyle,
                    gestureHandling: "greedy"
                }
            );
            const initString = 
                `<div class="pin">` +
                `<h1 id="hello">Hi There!</h1>` +
                `<div id="helper">Drag me to a location and then click "ADD SPOT"</div>` +
                `</div>`;
            const initwindow = new window.google.maps.InfoWindow({
                content: initString,
                maxWidth: 200,
            });
            const initMarker = {
                url: "icons/binoculars.svg",
                anchor: new window.google.maps.Point(25,50),
                scaledSize: new window.google.maps.Size(60,60)
            }
            let dragMarker = new window.google.maps.Marker({
                position: location, 
                map: this.mapRef,
                draggable: true,
                animation: window.google.maps.Animation.DROP,
                icon: initMarker,
                zIndex: 9999,
            });
            dragMarker.addListener("animation_changed", () => {
                initwindow.open(this.mapRef, dragMarker);
            });
            window.google.maps.event.addListener(this.mapRef, 'click', (evt) => {
                dragMarker.setPosition(evt.latLng);
                let clickLat = dragMarker.getPosition().lat();
                let clickLng = dragMarker.getPosition().lng();
                this.props.handleDragMarker(clickLat, clickLng);
            })
            window.google.maps.event.addListener(dragMarker, 'dragend', (evt) => {
                let dragLat = dragMarker.getPosition().lat();
                let dragLng = dragMarker.getPosition().lng();
                this.props.handleDragMarker(dragLat, dragLng);
            });
            this.drawMarkers();
        }
    }
    drawMarkers() {
        let savedVals = [];
        let spotteds = this.props.spotteds;
        let prev_infowindow = false;
        let newTime = undefined
        let convertTime = (time) => {
            let test = new Date(time)
            test = test.toString()
            newTime = test.split(/\s|:/)

            return `Spotted on ${newTime[1]} ${newTime[2]} at ${newTime[4]}:${newTime[5]}`
        }
        spotteds.forEach((spot) => {
            let animalType = spot.animalType;
            let location = {
                lat: spot.location.coordinates[1], 
                lng: spot.location.coordinates[0]}
            let description = spot.description;
            let dateTime = convertTime(spot.updatedAt)
            savedVals.push([animalType, location, description, dateTime]);
        });
        savedVals.forEach((spot) => {
            const contentString =
                `<div id="content">` +
                `<h1 id="animalType">${spot[0]}</h1>` +
                `<div id="bodyContent">` +
                `<p id="description" style="text-align: left;">${spot[2]}</p>` +
                `<p id="dateTime" style="text-align: left;">${spot[3]}</p>` +
                `</div>` +
                `</div>`;
            const infowindow = new window.google.maps.InfoWindow({
                content: contentString,
                maxWidth: 200,
            });
            let svgMarker;
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
            const shape = {
                coords: [10, 10, 10, 65, 70, 65, 70, 10],
                type: "poly",
            };
            let marker = new window.google.maps.Marker({
                position: spot[1], 
                map: this.mapRef,
                // animation: window.google.maps.Animation.DROP,
                animalType: spot[0],
                description: spot[2],
                icon: svgMarker,
                shape: shape,
            });
            marker.addListener("click", () => {
                if( prev_infowindow ) {
                    prev_infowindow.close();
                }
                prev_infowindow = infowindow;
                infowindow.open(window.google.map, marker);
            });
        });
    }
    recenterMap() {
        const map = this.mapRef;
        let curr = {
            lat: this.props.lat, 
            lng: this.props.lng
        }
        const maps = window.google.maps;
    
        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng)
            map.panTo(center)
        }
    }
    componentDidMount() {
        this.setMap()
    }
    componentDidUpdate(prevProps) {
        if (this.props.lat !== prevProps.lat) {
            this.recenterMap();
        } else if (this.props.spotteds !== prevProps.spotteds) {
            this.drawMarkers();
        } else if (this.props.filter !== prevProps.filter) {
            this.setMap();
        }
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