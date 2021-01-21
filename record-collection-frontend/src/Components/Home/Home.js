import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../../App.css';
import '../../Pages/Home.css';
import NewRecordForm from "./NewRecordForm";

const Home = () => {
    const [records, setRecords] = useState([]);

    const fetchRecords = async () => {
        try {
            const response = await fetch ('https://record-collection-api.herokuapp.com/collections');
            const data = await response.json();
            setRecords(data);
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchRecords();
    }, [])

    return(
        <div className="homepage">
            <h1 className="title">The Record Collection</h1>
            <NewRecordForm records={records} updateRecords={setRecords} />
            <div className="homelinks">
                <div className="genresrecord">
                <Link to="/genres">Genres</Link>
                </div>
                <div className="artistsrecord">
                <Link to="/artists">Artists</Link>
                </div>
                <div className="albumsrecord">
                <Link to="/albums">Albums</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;