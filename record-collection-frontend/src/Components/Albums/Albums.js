import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../../Pages/Index.css';

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
            const data = await response;
            const filteredAlbums = albums.filter(album => album.id !== data.id);
            setAlbums(filteredAlbums);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchAlbums();
    }, [albums])
    
    return(
        <div className="Index">
            <h1 className="indextitle">Albums</h1>
                <div className="indexlist">
                    {
                        albums.map((album, index) => {
                            return(
                                <div className="oneindex"
                                key={index}
                                >
                                    <Link to={`/albums/${album.id}`}>
                                        <h1 className="test">{album.name}</h1>
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
        </div>
    )
}

export default Albums;