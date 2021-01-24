import { useRef, useState, useEffect } from 'react'

const NewRecordForm = (props) => {
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);

    // const [genreID, setGenreID] = useState(0);
    // const [artistID, setArtistID] = useState(0);
    // const [albumID, setAlbumID] = useState(0);
    // const [songsID, setSongsID] = useState(0);

    const genreInput = useRef(null);
    const artistInput = useRef(null);
    const albumInput = useRef(null);
    const songsInput = useRef(null);
    const imgInput = useRef(null);

    const arrModels = [
        {   
            name: "genres",
            func: setGenres
        },
        {   
            name: "artists",
            func: setArtists
        },
        {   
            name: "albums",
            func: setAlbums
        },
        {   
            name: "songs",
            func: setSongs
        }
    ]

    const fetchModels = async (models, setModels) => {
        try {
            const response = await fetch(`https://record-collection-api.herokuapp.com/${models}`);
            const data = await response.json();
            setModels(data);
        } catch(error) {
            console.error(error)
        }
    }

    const createGenre = async () => {
        const genre = { name: genreInput.current.value };
        const body = JSON.stringify({ genre });
        try {
            const response = await fetch(`https://record-collection-api.herokuapp.com/genres`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: body
            })
            const data = await response.json();
            setGenres([...genres, data]);
            console.log("making genre");

            return(data.id);

        } catch(err) {
            console.error(err);
        }
    }

    const createArtist = async () => {
        const artist = { name: artistInput.current.value };
        const body = JSON.stringify({ artist });
        try {
            const response = await fetch(`https://record-collection-api.herokuapp.com/artists`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: body
            })
            const data = await response.json();
            setArtists([...artists, data]);
            console.log("making artist");
            return(data.id);
        } catch(err) {
            console.error(err);
        }
    }

    const createAlbum = async () => {
        const album = { name: albumInput.current.value };
        const body = JSON.stringify({ album });
        try {
            const response = await fetch(`https://record-collection-api.herokuapp.com/albums`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: body
            })
            const data = await response.json();
            setAlbums([...albums, data])
            console.log("making album");

            return(data.id);
        } catch(err) {
            console.error(err);
        }
    }

    const createSongs = async () => {
        const song = { name: songsInput.current.value };
        const body = JSON.stringify({ song });
        try {
            const response = await fetch(`https://record-collection-api.herokuapp.com/songs`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: body
            })
            const data = await response.json();
            setSongs([...songs, data])
            console.log("making songs");

            return(data.id);
        } catch(err) {
            console.error(err);
        }
    }

    const createRecord = async (event) => {
        event.preventDefault();

        const genreID = await createGenre();
        console.log("genre ids: ", genreID);

        const artistID = await createArtist();
        console.log("artist ids: ", artistID);

        const albumID = await createAlbum();
        console.log("album ids: ", albumID);

        const songsID = await createSongs();
        console.log("songs ids: ", songsID);


        // event.currentTarget.reset();

        // console.log("genre ID", genreID);
        // console.log("artist ID", artistID);
        // console.log("album ID", albumID);
        // console.log("song ID", songsID);

        //
        //  NEED TO FIND A WAY TO FORCE ALL STATE VARIABLES TO UPDATE IN THE LOCAL SCOPE IMMEDIATELY AFTER SETTING THE VALUES
        //
        const body = JSON.stringify({ 
            genre_id: await genreID, 
            artist_id: await artistID, 
            album_id: await albumID, 
            song_id: await songsID 
        });

        console.log("body", body)

        try {
            const response = await fetch('https://record-collection-api.herokuapp.com/collections', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: body
            })
            const data = await response.json();
            props.updateRecords([...props.records, data])
            console.log(data)
        } catch(err) {
            console.error(err);
        }
    }

    
    useEffect(() => {
        arrModels.forEach(model => {
            fetchModels(model.name, model.func);
        });
    },[genres, artists, albums, songs])
    
    // const createRecord = async (event) => {
        
    //     createModelInstance('albums');

    //     event.preventDefault();
    //     // const genre = { name: genreInput.current.value };
    //     // const artist = { name: artistInput.current.value };
    //     // const album = { name: albumInput.current.value,
    //     //                 image: imgInput.current.value
    //     // };
    //     // const song = songsInput.current.value;
    //     // // const img = imgInput.current.value;

    //     // const body = JSON.stringify({
    //     //     genre, artist, album, song
    //     //     // , img
    //     // });
        
    //     event.currentTarget.reset();
    //     try {
    //         const response = await fetch('https://record-collection-api.herokuapp.com/collections', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: body
    //         })
    //         const data = await response;
    //         // props.updateRecords([...props.records, data])
    //     } catch(err) {
    //         console.error(err);
    //     }
    // }


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














    // const createModelInstance = async (modelName) => {

        
    //     try {
    //         const response = await fetch(`https://record-collection-api.herokuapp.com/${modelName}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: body
    //         })
    //         const data = await response;
    //         props.updateRecords([...props.modelName, data])
    //     } catch(err) {
    //         console.error(err);
    //     }
    // }