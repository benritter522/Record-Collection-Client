import React, {useState, useEffect} from 'react'
import Album from './Albums'

const SingleAlbum = (props) => {
    const [singleAlbum, setSingleAlbum] = useState ({});


    const fetchSingleAlbum = async () => {
        try{
            const response = await fetch(`http://record-collection-api.herokuapp.com/collections/${props.match.params.id}`)
            const data = await response;
            setSingleAlbum(data);
        } catch(error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchSingleAlbum();
    }, []);

    return(
        <div>
            <p>HELLO WORLD</p>
        </div>
    )
}
// Delete & Edit
export default SingleAlbum;