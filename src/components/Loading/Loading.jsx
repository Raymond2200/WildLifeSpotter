import CircularProgress from '@material-ui/core/CircularProgress';
import './Loading.css'

function Loading() {
    return (
        <div id="loading-container">
            Loading...<br/>
            <CircularProgress id="loading-grphx"/>
        </div>
    )
}

export default Loading;