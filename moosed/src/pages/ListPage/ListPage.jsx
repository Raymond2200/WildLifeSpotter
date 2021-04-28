import {useState, useEffect} from 'react';
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
                Math.sin(dLon/2) * Math.sin(dLon/2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
            if (d < 1) {
                return "< 1 KM away, keep a look out!"
            }
                return d.toFixed(1);
        }

        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }

        let newTime = []
        function trimDate(dbItemDate) {
            const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
            newTime = dbItemDate.split(/-|T|:/)
            while(newTime[1][0] === '0') {
                newTime[1] = newTime[1].substring(1)
            }
            let monthName = months[newTime[1] - 1]
            newTime.splice(1, 1, monthName)
            
        }

        let markerIcon = ""
        function setIcon(animalType) {
            switch(animalType) {
                case "Bear":
                    markerIcon = "/icons/bear.svg";
                    break;
                case "Cougar":
                    markerIcon = "/icons/cat.svg";
                    break;
                case "Moose":
                    markerIcon = "/icons/moose.svg";
                    break;
                case "Skunk":
                    markerIcon = "/icons/skunk.svg";
                    break;
                case "Wolf":
                    markerIcon = "/icons/wolf.svg";
                    break; 
                case "Deer":
                    markerIcon = "/icons/deer.svg";
                    break; 
                default:
                    markerIcon = "";
            }
        }

    return (
        <div>
            <div id="list-container"> 
            <br/>
            {spots.map(spottedAnimal => (
                <div className="list-item-container">
                    {setIcon(spottedAnimal.animalType)}
                    <li className="list-head"><img alt="icon" className="list-head-image" src={markerIcon}/></li>
                    {trimDate(spottedAnimal.createdAt)}
                    <li className="list-seen">{`Seen at: ${newTime[1]}, ${newTime[2]} - ${newTime[3]}:${newTime[4]}`}</li>
                    <li className="list-user">{`User: ${spottedAnimal.user}`}</li>
                    <li className="list-comment">{`Comment: ${spottedAnimal.description}`}</li>
                    <li className="list-distance">{`Distance: ${getDistanceFromLatLonInKm(lat, lng, spottedAnimal.location.coordinates[1], spottedAnimal.location.coordinates[0])}`}</li>
                    <li className="list-hr"><hr/></li>
                </div>               
            ))}
            </div>
        </div>
    )
}

export default ListPage;