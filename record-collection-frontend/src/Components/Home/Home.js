import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../../App.css';
import '../../Pages/Home.css';
import NewRecordForm from "./NewRecordForm"

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
            <h1>The Record Collection</h1>
            <NewRecordForm records={records} updateRecords={setRecords} />
            <Link to="/genres">Genres</Link><br/>
            <Link to="/artists">Artists</Link><br/>
            <Link to="/albums">Albums</Link><br/>

        </div>
    )
}

export default Home;