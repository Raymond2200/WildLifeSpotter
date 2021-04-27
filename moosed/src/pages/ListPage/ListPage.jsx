import {useState, useEffect} from 'react';
import { Divider } from '@material-ui/core';
import './ListPage.css'

function ListPage(props) {
    const [spots, setSpots] = useState([])
    const [lng] = useState(props.lng)
    const [lat] = useState(props.lat)


    useEffect(() => {
        const fetchData = async () => {
            let fetchSpotsResponse = await fetch('/api/spotteds/me/'+lng+'/'+lat)
            let inSpots = await fetchSpotsResponse.json()
            setSpots(inSpots)   
        }
        fetchData()
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
            {spots.map(spottedAnimal => (
            <div> 
                <ul>
                    <li>{spottedAnimal.animalType}</li>
                    <li>{`Seen at: ${spottedAnimal.createdAt}`}</li>
                    <li>{`Comment: ${spottedAnimal.description}`}</li>
                    <li>{`Username: ${spottedAnimal.user}`}</li>
                </ul>  
                <Divider/>
            </div>
            
            ))}
        </div>
    )
}

export default ListPage;