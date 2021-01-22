import React, {useState, useEffect} from 'react'
import '../../Pages/Show.css';


const SingleGenre = (props) => {
    const [singleGenre, setSingleGenre] = useState ({});
    const fetchSingleGenre = async () => {
        try {
            console.log(props)
            const response = await fetch(`http://record-collection-api.herokuapp.com/genres/${props.match.params.id}`)
            const data = await response.json();
            setSingleGenre(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchSingleGenre();
    }, []);
    console.log(singleGenre);

    return(
        <div className="Show">
        
             <h1>{singleGenre.name}</h1>
            { singleGenre.artists
                ? singleGenre.artists.map((artist) => {
                    return (
                        <p>Artist: {artist.name}</p>
                    )
                })
                : <h1>Loading...</h1>
            }
            { singleGenre.albums
                ? singleGenre.albums.map((album) => {
                    return (
                        <p>Album: {album.name}</p>
                    )
                })
                : <h1>Loading...</h1>
            }
            { singleGenre.songs
                ? singleGenre.songs.map((song) => {
                    return (
                        <p>Songs: {song.name}</p>
                    )
                })
                : <h1>Loading...</h1>
            }
            
        </div>
    )
}

export default SingleGenre;