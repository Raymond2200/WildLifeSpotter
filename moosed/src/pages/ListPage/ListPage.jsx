import {useState, useEffect} from 'react';
import { Divider } from '@material-ui/core';
import './ListPage.css'

function ListPage(props) {
    const [spots, setSpots] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            let fetchSpotsResponse = await fetch('/api/spotteds/me/-77.835251/45.910191')
            let inSpots = await fetchSpotsResponse.json()
            setSpots(inSpots)   
        }
        fetchData()
    },[])

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