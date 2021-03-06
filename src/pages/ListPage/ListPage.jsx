import {useState, useEffect} from 'react';
import './ListPage.css'

function ListPage(props) {
    const [lng] = useState(props.lng)
    const [lat] = useState(props.lat)

    useEffect(() => {
        props.loadSpots()
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
                return "< 1"
            }
                return d.toFixed(1);
        }

        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }
        let newTime = undefined
        let convertTime= (time) =>{
            let test = new Date(time)
            test = test.toString()
            newTime = test.split(/\s|:/)
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
            {props.spotteds.map(spottedAnimal => (
                <div className="list-item-container">
                    {setIcon(spottedAnimal.animalType)}
                    <li className="list-head"><img alt="icon" className="list-head-image" src={markerIcon}/></li>
                    {convertTime(spottedAnimal.updatedAt)}
                    <div id="user-seen-distance">
                        <li className="list-seen">{`${newTime[1]}, ${newTime[2]} - ${newTime[4]} : ${newTime[5]}`}</li>
                        <li className="list-user">{`${spottedAnimal.user.username}`}</li>
                        <li className="list-distance">{`${getDistanceFromLatLonInKm(lat, lng, spottedAnimal.location.coordinates[1], spottedAnimal.location.coordinates[0])} km`}</li>
                    </div>
                    <li className="list-comment">{`Comments: ${spottedAnimal.description}`}</li>
                    <li className="list-hr"><hr/></li>
                </div>               
            ))}
            </div>
        </div>
    )
}

export default ListPage;