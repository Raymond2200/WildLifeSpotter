import React, { Component } from 'react'
import mapStyle from './map-style';
import styles from './Map.module.css';

class Map extends Component {
    mapDiv = React.createRef();
    
    setMap() {
        let savedVals = [];
        let spotteds = this.props.spotteds;
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
                });
                let svgMarker;
                console.log('animalType: ', spot[0])
                if (spot[0] === 'Moose') {
                    svgMarker = {
                        url: "icons/moose.svg",
                        anchor: new window.google.maps.Point(25,50),
                        scaledSize: new window.google.maps.Size(40,40)
                    }
                } else if (spot[0] === 'Deer'){
                    svgMarker = {
                        url: "icons/deer.svg",
                        anchor: new window.google.maps.Point(25,50),
                        scaledSize: new window.google.maps.Size(40,40)
                    }
                } else if (spot[0] === 'Bear'){
                    svgMarker = {
                        url: "icons/bear.svg",
                        anchor: new window.google.maps.Point(25,50),
                        scaledSize: new window.google.maps.Size(40,40)
                    }
                } else if (spot[0] === 'Skunk'){
                    svgMarker = {
                        url: "icons/Skunk.svg",
                        anchor: new window.google.maps.Point(25,50),
                        scaledSize: new window.google.maps.Size(40,40)
                    }
                } else if (spot[0] === 'Wolf'){
                    svgMarker = {
                        url: "icons/wolf.svg",
                        anchor: new window.google.maps.Point(25,50),
                        scaledSize: new window.google.maps.Size(40,40)
                    }
                } else if (spot[0] === 'Cougar'){
                    svgMarker = {
                        url: "icons/cat.svg",
                        anchor: new window.google.maps.Point(25,50),
                        scaledSize: new window.google.maps.Size(40,40)
                    }
                }
                // const svgMarker = {
                //     path:
                //     "M2335 4744 c-563 -57 -1021 -264 -1399 -633 -196 -192 -335 -382 -451 -616 -333 -673 -306 -1473 71 -2122 101 -174 201 -302 358 -459 280 -281 568 -453 951 -569 500 -151 1028 -120 1524 92 508 216 936 638 1163 1147 345 769 225 1675 -307 2331 -155 191 -376 383 -585 509 -247 149 -553 260 -830 301 -103 15 -416 27 -495 19z m270 -981 c13 -43 107 -183 151 -224 35 -32 54 -12 26 28 -25 35 -49 150 -35 164 14 14 27 -5 62 -91 16 -41 33 -76 38 -77 4 -2 9 45 10 103 2 59 5 109 8 112 16 16 28 -29 36 -130 9 -133 6 -113 25 -132 23 -24 81 -20 105 7 26 28 102 143 129 197 22 43 40 52 40 20 0 -30 -38 -118 -70 -164 -37 -53 -48 -94 -26 -102 25 -10 85 33 189 135 101 99 119 103 77 15 -28 -57 -86 -122 -149 -164 -28 -19 -51 -40 -51 -46 0 -13 59 -25 74 -16 6 3 19 7 30 8 12 1 39 9 61 18 22 8 52 15 66 16 15 0 36 8 47 18 24 20 52 109 52 163 0 21 4 40 9 44 14 8 31 -28 31 -66 0 -40 14 -30 45 33 11 23 26 44 34 46 28 9 1 -72 -55 -165 -14 -24 -16 -35 -7 -44 9 -9 23 0 62 36 38 36 56 63 77 118 27 69 28 71 36 42 8 -31 -6 -100 -22 -110 -15 -9 -12 -57 3 -53 19 7 65 79 77 121 6 20 15 37 19 37 24 0 21 -69 -6 -122 -17 -35 -4 -36 45 -3 43 29 52 31 52 10 0 -44 -258 -146 -382 -151 -41 -2 -82 -10 -104 -22 l-37 -19 37 -22 c39 -25 56 -48 56 -80 0 -13 18 -29 58 -52 82 -46 99 -65 112 -123 6 -28 16 -61 22 -73 8 -17 6 -30 -13 -64 -28 -51 -58 -69 -116 -69 -39 0 -44 3 -57 35 -29 69 -108 56 -134 -23 -8 -25 -35 -66 -62 -94 -34 -36 -50 -61 -54 -88 -7 -46 -45 -80 -88 -80 l-29 0 2 75 c2 41 0 77 -3 80 -3 3 -39 -10 -80 -28 -110 -50 -167 -126 -168 -222 0 -23 -17 -47 -73 -107 -61 -65 -78 -78 -104 -78 -29 0 -33 -4 -48 -52 -10 -29 -35 -89 -56 -134 -44 -92 -63 -163 -56 -200 2 -14 1 -44 -4 -67 -5 -23 -13 -64 -19 -92 -6 -27 -12 -108 -13 -180 -3 -115 -1 -138 20 -197 13 -37 23 -72 23 -78 0 -6 18 -28 41 -50 23 -21 39 -45 37 -52 -3 -9 -28 -14 -77 -16 -95 -4 -126 13 -118 64 5 27 2 36 -14 45 -35 18 -39 50 -28 232 9 148 8 184 -6 242 -10 44 -14 93 -10 144 2 42 7 125 10 185 6 109 6 110 -14 92 -43 -39 -119 -233 -105 -270 7 -17 -33 -108 -76 -176 -21 -33 -38 -87 -63 -202 -30 -135 -33 -162 -24 -202 6 -25 14 -46 18 -46 9 0 39 -53 39 -68 0 -17 -84 -32 -119 -22 -47 13 -61 28 -61 65 0 18 -7 39 -16 46 -22 18 -14 80 26 194 99 281 99 283 104 388 3 68 11 121 25 161 12 34 17 64 13 70 -8 10 -9 63 -2 76 2 3 4 10 4 15 1 6 7 20 14 33 15 27 18 26 -100 6 -107 -18 -167 -14 -270 22 -85 29 -88 29 -88 6 0 -9 -13 -33 -29 -52 -86 -104 -211 -448 -211 -577 0 -54 21 -153 49 -228 10 -27 26 -83 36 -122 9 -40 22 -73 27 -73 15 0 37 -31 38 -51 0 -31 -70 -39 -142 -17 -38 11 -39 12 -33 52 6 38 5 42 -23 52 -27 10 -29 15 -35 80 -4 38 -7 94 -7 124 0 52 -45 348 -54 358 -3 2 -17 -20 -33 -50 -25 -48 -28 -62 -27 -148 1 -52 9 -126 18 -165 9 -38 23 -100 31 -137 8 -36 23 -81 35 -100 11 -18 20 -36 20 -40 0 -14 -70 -29 -107 -22 -53 9 -73 29 -66 66 4 22 1 33 -14 43 -20 14 -21 29 -28 262 -14 466 -14 449 23 518 l33 60 -6 125 c-4 84 -16 165 -36 248 -19 80 -29 150 -29 199 0 67 4 82 36 144 41 78 126 164 196 197 58 29 194 43 283 31 207 -29 431 -37 498 -18 23 6 67 37 115 80 42 38 85 69 96 69 11 0 16 5 13 14 -4 10 4 15 26 19 18 2 73 17 122 32 109 33 238 55 323 55 34 0 62 4 62 9 0 5 2 16 5 23 9 23 -74 38 -205 38 -98 0 -121 3 -128 16 -10 18 -65 53 -141 89 -37 18 -51 29 -44 36 7 7 27 2 62 -15 28 -15 51 -22 51 -17 0 12 -46 48 -71 56 -10 4 -19 13 -19 21 0 16 14 14 79 -12 18 -8 35 -14 36 -14 2 0 -14 18 -35 41 -35 39 -64 101 -52 113 11 12 20 6 26 -16 6 -25 142 -165 151 -156 3 3 -15 27 -40 53 -33 33 -43 51 -36 58 7 7 30 -8 76 -52 72 -69 96 -75 46 -12 -38 48 -57 91 -66 154 -7 44 -6 49 10 45 11 -2 23 -19 30 -45z",
                //     fillColor: "#0b3939",
                //     fillOpacity: 1,
                //     strokeWeight: 0,
                //     rotation: 180,
                //     scale: 0.01,
                //     anchor: new window.google.maps.Point(15, 30),
                // };
                let marker = new window.google.maps.Marker({
                    position: spot[1], 
                    map: map,
                    animation: window.google.maps.Animation.DROP,
                    animalType: spot[0],
                    description: spot[2],
                    icon: svgMarker,
                });
                marker.addListener("click", () => {
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