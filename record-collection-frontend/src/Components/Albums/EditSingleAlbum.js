import {useRef} from 'react'


export default (props) => {
    const updateAlbumRef = useRef(null);
    const updateArtistRef = useRef(null);
    const updateSongsRef = useRef(null);
    const updateGenresRef = useRef(null);

    const updateRecord = async (event) => {
        event.preventDefault();
        const album = updateAlbumRef.current.value;
        const artist = updateArtistRef.current.value;
        const songs = updateSongsRef.current.value;
        const genres = updateGenresRef.current.value;

        const body = JSON.stringify({
            album, artist, songs, genres
        });
        event.currentTarget.reset();
        try{
            console.log(props)
            const response = await fetch (`http://record-collection-api.herokuapp.com/albums/${props.singleAlbum.id}`,
            {method: "PUT", 
            headers: {'Content-Type': 'application/json'},
            body:body,
        });
        const data =await response.json();
        props.setRecord(data)
        } catch(error){
            console.log(error)
        }
    }

    return (
        <form onSubmit={updateRecord}>
            Album: <input type="text" ref={updateAlbumRef}/>
            Artist: <input type="text" ref={updateArtistRef}/>
            Song: <input type="text" ref={updateSongsRef}/>
            Genre: <input type="text" ref={updateGenresRef}/>
            <input type="submit" value="Submit Edit"/>
        </form>
    )
}

