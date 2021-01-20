import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
            const data = await response.json();
            const filteredArtists = artists.filter(artist => artist.id !== data.id);
            setArtists(filteredArtists);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchArtists();
    }, [])

    return(
        <div className="Artists">
            <h1>Artists</h1>
        {
            artists.map((artist, index) => {
                return(
                    <div
                    key={index}
                    >
                        <Link to={`/artists/${artist.id}`}>
                            {artist.name}
                        </Link>

                        <button
                        onClick={() => { deleteArtist(artist.id) }}
                        >
                        Delete
                        </button>
                    </div>
                )
            })
        }
        </div>
    )
}

export default Artists;