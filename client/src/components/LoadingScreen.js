import "../styles/loading.css";
import Spinner from 'react-bootstrap/Spinner';

function LoadingScreen(){

    return (
        <div className="loading">
            <Spinner animation="border" variant="warning" /><br></br>
            <p>Loading...</p>
        </div>
    );

}

export default LoadingScreen;