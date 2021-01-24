import React, {useState, useEffect} from 'react'
import Album from './Albums';
import '../../Pages/Show.css';
import EditSingleAlbum from './EditSingleAlbum'

const SingleAlbum = (props) => {
    const [singleAlbum, setSingleAlbum] = useState ({});
    const [singleArtist, setArtist] = useState ({});
    const [singleGenre, setGenre] = useState ({});

    const fetchSingleAlbum = async () => {
        try{
            const response = await fetch(`http://record-collection-api.herokuapp.com/albums/${props.match.params.id}`)
            const data = await response.json();
            setSingleAlbum(data);
            setArtist(data.artists[0]);
            setGenre(data.genres[0]);
            console.log(data);
        } catch(error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchSingleAlbum();
    }, []);
    console.log(singleAlbum)

    

    return(
        <div className="Show">
            {singleAlbum
                ? (
                    <div className="showalbum">
                        <h1 className="showtitle">{singleAlbum.name}</h1>
                        {/* { singleAlbum.artists
                            ? singleAlbum.artists.map((artist, index) => {
                                return (
                                    <p key={index}>Artist: {artist.name}</p>
                                )
                            })
                            : <h1>Loading...</h1>
                        }

                        { singleAlbum.genres
                            ? singleAlbum.genres.map((genre, index) => {
                                return (
                                    <p key={index}>Genre: {genre.name}</p>
                                )
                            })
                            : <h1>Loading...</h1>
                        } */}
                        <h2>
                            {singleArtist.name}
                        </h2>
                        <h2>
                            {singleGenre.name}
                        </h2>
                        { singleAlbum.songs
                            ? singleAlbum.songs.map((song, index) => {
                                return (
                                    <p key={index}> Songs: {song.name}</p>
                                )
                            })
                            : <h1>Loading...</h1>
                        }
                    </div>
                )
                : <h1>"Loading..."</h1>
            }
            <div className="showalbum">
                <h2>Edit Album Contents:</h2>
                <EditSingleAlbum singleAlbum={singleAlbum} setSingleAlbum={setSingleAlbum}/>
            </div>

        </div>
    )
}
// Delete & Edit
export default SingleAlbum;