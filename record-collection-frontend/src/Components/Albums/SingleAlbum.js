import React, {useState, useEffect} from 'react'
import Album from './Albums'

const SingleAlbum = (props) => {
    const [singleAlbum, setSingleAlbum] = useState ({});

    const fetchSingleAlbum = async () => {
        try{
            const response = await fetch(`http://record-collection-api.herokuapp.com/albums/${props.match.params.id}`)
            const data = await response.json();
            setSingleAlbum(data);
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
        <div>

            <h1>Albums</h1>


            {singleAlbum
                ? (
                    <div>
                        <h1>{singleAlbum.name}</h1>
                        
                        <h1>{singleAlbum.name}</h1>
                        { singleAlbum.genres
                            ? singleAlbum.genres.map((genre, index) => {
                                return (
                                    <p key={index}>{genre.name}</p>
                                )
                            })
                            : <h1>Loading...</h1>
                        }

                        { singleAlbum.songs
                            ? singleAlbum.songs.map((song, index) => {
                                return (
                                    <p key={index}>{song.name}</p>
                                )
                            })
                            : <h1>Loading...</h1>
                        }
                    </div>
                )
                : <h1>"Loading..."</h1>
            }
            

        </div>
    )
}
// Delete & Edit
export default SingleAlbum;