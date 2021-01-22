import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../Pages/Index.css';

const Genres = () => {
    const [genres, setGenres] = useState([]);

    const fetchGenres = async () => {
        try {
            const response = await fetch ('https://record-collection-api.herokuapp.com/genres');
            const data = await response.json();
            setGenres(data);
        } catch(err) {
            console.error(err)
        }
    }

    const deleteGenre = async (id) => {
        try {
            const response = await fetch(`https://record-collection-api.herokuapp.com/genres/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response;
            const filteredGenres = genres.filter(genre => genres.id !== data.id);
            setGenres(filteredGenres);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchGenres();
    }, [genres])

    return(
        <div className="Index">
            <h1>Genres</h1>
                <div className="indexlist">
                    {
                        genres.map((genre, index) => {
                            return(
                                <div className="oneindex"
                                key={index}
                                >
                                        <Link to={`/genres/${genre.id}`}>
                                            <h1 className="test">{genre.name}</h1>
                                        </Link>

                                        <button
                                        onClick={() => { deleteGenre(genre.id) }}
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

export default Genres;