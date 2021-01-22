import React, {useState, useEffect} from 'react';
import '../../Pages/Show.css';
import Media from 'react-bootstrap/Media';

const SingleArtist = (props) => {
    const [singleArtist, setSingleArtist] = useState ({});

    const fetchSingleArtist = async () => {
        try{
            const response = await fetch(`http://record-collection-api.herokuapp.com/artists/${props.match.params.id}`)
            console.log(response)
            const data = await response.json();
            setSingleArtist(data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSingleArtist();
    }, []);
    console.log(singleArtist)

    // let itemsToRender;
    // if (singleArtist.genres) {
    //         itemsToRender = 
    // } else {
    //     itemsToRender = "Loading..."
    // }
    return(
        <div className="Show">
            <h1 className="showtitle">{singleArtist.name}</h1>
            <div className="showlist">
                { singleArtist.genres
                    ? singleArtist.genres.map((genre) => {
                        return (
                            <p className="oneshow">Genre: {genre.name}</p>
                        )
                    })
                    : <h1>Loading...</h1>
                }
                { singleArtist.songs
                    ? singleArtist.songs.map((song) => {
                        return (
                            <p className="oneshow">Songs: {song.name}</p>
                        )
                    })
                    : <h1>Loading...</h1>
                }
                { singleArtist.albums
                    ? singleArtist.albums.map((album) => {
                        return (
                            <p className="oneshow">Albums: {album.name}</p>
                        )
                    })
                    : <h1>Loading...</h1>
                }
            </div>
        </div>
    )
}

export default SingleArtist;