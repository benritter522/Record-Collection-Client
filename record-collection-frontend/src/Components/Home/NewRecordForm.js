import { useRef, useState, useEffect } from 'react'

const NewRecordForm = (props) => {
    const [genres, setGenres] = useState({});
    const [artists, setArtists] = useState({});
    const [albums, setAlbums] = useState({});
    const [songs, setSongs] = useState({});

    const [genreID, setGenreID] = useState(0);
    const [artistID, setArtistID] = useState(0);
    const [albumID, setAlbumID] = useState(0);
    const [songsID, setSongsID] = useState(0);


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

    arrModels.forEach(model => {
        fetchModels(model.name, model.func);
    });

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
            setGenreID(data.id);
            console.log("new genre data", data);
            console.log("new genre ID", data.id);
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
            setArtistID(data.id);
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
            setAlbumID(data.id);
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
            setSongsID(data.id);
        } catch(err) {
            console.error(err);
        }
    }

    const createRecord = (event) => {
        event.preventDefault();

        createGenre();
        createArtist();
        createAlbum();
        createSongs();

        event.currentTarget.reset();

        // console.log("genres", genres);
        // console.log("artists", artists);
        // console.log("albums", albums);
        // console.log("songs", songs);

    }

    // useEffect(() => {

    // },[])
    
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