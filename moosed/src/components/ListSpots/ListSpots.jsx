import {useState, useEffect} from 'react';

function ListSpots() {
    
    let [spots, setSpots] = useState()

    useEffect(async () => {
        console.log("I loaded")
        try{
            let fetchSpotsResponse = await fetch('/api/spotteds/me/-77.835251/45.910191')
            let inSpots = await fetchSpotsResponse.json()
            console.log(inSpots)
            setSpots(inSpots)
            console.log("test")
        } catch (err) {
            console.log('ERROR')
        }
    },[])
    
    return(
        <div>
            Hello
        </div>
    )
}

export default ListSpots