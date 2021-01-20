import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Albums = () => {
    const [albums, setAlbums] = useState([]);

    const fetchAlbums = async () => {
        try {
            const response = await fetch ('https://record-collection-api.herokuapp.com/albums');
            const data = await response.json();
            setAlbums(data);
        } catch(err) {
            console.error(err)
        }
    }

    const deleteAlbum = async (id) => {
        try {
            const response = await fetch(`https://record-collection-api.herokuapp.com/albums/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json();
            const filteredAlbums = albums.filter(album => album.id !== data.id);
            setAlbums(filteredAlbums);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchAlbums();
    }, [])
    
    return(
        <div className="Albums">
            <h1>Albums</h1>
        {
            albums.map((album, index) => {
                return(
                    <div
                    key={index}
                    >
                        <Link to={`/albums/${album.id}`}>
                            {album.name}
                        </Link>
                        
                        <button
                        onClick={() => { deleteAlbum(album.id) }}
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

export default Albums;