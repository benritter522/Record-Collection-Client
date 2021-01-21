import React, {useState, useEffect} from 'react'

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
        <div>
            <h1>{singleArtist.name}</h1>
            { singleArtist.genres
                ? singleArtist.genres.map((genre) => {
                    return (
                        <p>{genre.name}</p>
                    )
                })
                : <h1>Loading...</h1>
            }
            { singleArtist.songs
                ? singleArtist.songs.map((song) => {
                    return (
                        <p>{song.name}</p>
                    )
                })
                : <h1>Loading...</h1>
            }
            { singleArtist.albums
                ? singleArtist.albums.map((album) => {
                    return (
                        <p>{album.name}</p>
                    )
                })
                : <h1>Loading...</h1>
            }
        </div>
    )
}

export default SingleArtist;