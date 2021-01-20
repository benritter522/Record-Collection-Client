import { Link } from 'react'
import { useState, useEffect } from 'react'
// import '../App.css';
import NewRecordForm from "./NewRecordForm"



const Home = () => {
    const [records, setRecords] = useState([]);

    const fetchRecords = async () => {
        try {
            const response = await fetch ("http://localhost:3000/collections");
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
        <div>
            <h1>The Record Collection</h1>
            <NewRecordForm records={records} updateRecords={setRecords} />

            {/* <Link to="/genres">Genres</Link>
            <Link to="/artists">Artists</Link>
            <Link to="/albums">Albums</Link> */}


        </div>
    )
}

export default Home;