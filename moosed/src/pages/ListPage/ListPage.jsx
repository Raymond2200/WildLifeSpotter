import {useState, useEffect} from 'react';
import List from '@material-ui/core/List';
import { ListItemText } from '@material-ui/core';

function ListView(props) {
    let [spots, setSpots] = useState()
    let [lng, setLng] = useState(props.lng)
    let [lat, setLat] = useState(props.lat)
    
    useEffect(async () => {
        console.log(lng,lat)
        try{
            let fetchSpotsResponse = await fetch('/api/spotteds/me/'+lng+'/'+lat)
            let inSpots = await fetchSpotsResponse.json()
            console.log(inSpots)
            setSpots(inSpots)
            console.log(spots)
        } catch (err) {
            console.log('ERROR')
        }
    },[])

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2-lat1);  // deg2rad below
            var dLon = deg2rad(lon2-lon1); 
            var a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2)
                ; 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
                return d;
        }
        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }

    return (
        <div>
            <List>
                {props.spotteds.map(spottedAnimal => (
                    <ListItemText 
                        primary={spottedAnimal.animalType} 
                        secondary={spottedAnimal.description} />
                ))}
            </List>
        </div>
    )
}



export default ListView;