import {useState, useEffect} from 'react';

function ListView() {
    let [spots, setSpots] = useState()
    useEffect(() => {
    })
    
    let recentSpots = async () => {
        await fetch("/api/spotteds/recentspots")
            .then((res) => res.json())
            .then(data => console.log(data))
    }

    return (
        <div>
            TEST
        </div>
    )
}



export default ListView;