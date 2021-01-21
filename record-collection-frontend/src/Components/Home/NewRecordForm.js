import { useRef } from 'react'

const NewRecordForm = (props) => {
    const genreInput = useRef(null);
    const artistInput = useRef(null);
    const albumInput = useRef(null);
    const songsInput = useRef(null);
    const imgInput = useRef(null);

    const createRecord = async (event, props) => {
        event.preventDefault();
        const genre = genreInput.current.value;
        const artist = artistInput.current.value;
        const album = albumInput.current.value;
        const songs = songsInput.current.value;
        const img = imgInput.current.value;

        const body = JSON.stringify({
            genre, artist, album, songs, img
        });
        
        event.currentTarget.reset();
        try {
            const response = await fetch('https://record-collection-api.herokuapp.com/collections', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: body
            })
            const data = await response;
            console.log("response in new recordform",response)
            props.updateRecords([...props.albums, data])
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={createRecord}>
            Genre: <input type="text" ref={genreInput} />
            Artist: <input type="text" ref={artistInput} />
            Album: <input type="text" ref={albumInput} />
            Songs: <input type="text" ref={songsInput} />
            Img: <input type="text" ref={imgInput} />
            <input type="submit" value="Post Record!"/>
        </form>
    )
}

export default NewRecordForm;