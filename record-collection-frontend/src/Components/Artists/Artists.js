import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../Pages/Index.css';
import Button from 'react-bootstrap/Button';

const Artists = () => {
    const [artists, setArtists] = useState([]);

    const fetchArtists = async () => {
        try {
            const response = await fetch('https://record-collection-api.herokuapp.com/artists');
            const data = await response.json();
            setArtists(data);
        } catch(err) {
            console.error(err)
        }
    }

    const deleteArtist = async (id) => {
        try {
            const response = await fetch(`https://record-collection-api.herokuapp.com/artists/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response;
            const filteredArtists = artists.filter(artist => artist.id !== data.id);
            setArtists(filteredArtists);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchArtists();
    }, [artists])

    return(
        <div className="Index">
            <h1 className="indextitle">Artists</h1>
                <div className="indexlist">
                    {
                        artists.map((artist, index) => {
                            return(
                                <div className="oneindex"
                                key={index}
                                >
                                    <Link to={`/artists/${artist.id}`}>
                                        <h1 className="test">{artist.name}</h1>
                                    </Link>
                                    <Button variant="dark" size="sm"
                                    onClick={() => { deleteArtist(artist.id) }}
                                    >
                                    Delete
                                    </Button>
                                </div>
                            )
                        })
                    }
                </div>
        </div>
    )
}

export default Artists;