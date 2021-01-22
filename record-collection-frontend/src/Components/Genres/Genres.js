import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../Pages/Index.css';
import Card from 'react-bootstrap/Card'

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
        <div className="Genres">
            <h1>Genres</h1>
            <Card>
                <Card.Body>
                    {
                        genres.map((genre, index) => {
                            return(
                                <div className="genrelist"
                                key={index}
                                >
                                        <Link to={`/genres/${genre.id}`}>
                                            <li className="test">{genre.name}</li>
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
                </Card.Body>
            </Card>
        </div>
    )
}

export default Genres;