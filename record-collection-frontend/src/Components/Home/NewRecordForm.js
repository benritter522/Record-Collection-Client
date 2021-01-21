import { useRef } from 'react'

const NewRecordForm = (props) => {
    const genreInput = useRef(null);
    const artistInput = useRef(null);
    const albumInput = useRef(null);
    const songsInput = useRef(null);
    const imgInput = useRef(null);



    const createModelInstance = (model) => {
        try {
            const response = await fetch(`https://record-collection-api.herokuapp.com/${model}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: body
            })
            const data = await response;
            console.log("body" , body)
            console.log("data in new recordform" , data)
            console.log("props.records", props.records)
            props.updateRecords([...props.records, data])
        } catch(err) {
            console.error(err);
        }
    }

    createModelInstance('albums');

    const createRecord = async (event) => {

        event.preventDefault();
        const genre = { name: genreInput.current.value };
        const artist = { name: artistInput.current.value };
        const album = { name: albumInput.current.value,
                        image: imgInput.current.value
        };
        const song = songsInput.current.value;
        // const img = imgInput.current.value;

        const body = JSON.stringify({
            genre, artist, album, song
            // , img
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
            console.log("body" , body)
            console.log("data in new recordform" , data)
            console.log("props.records", props.records)
            props.updateRecords([...props.records, data])
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