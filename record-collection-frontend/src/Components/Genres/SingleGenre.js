import React, {useState, useEffect} from 'react'


const SingleGenre = (props) => {
    const [singleGenre, setSingleGenre] = useState ({});
    const fetchSingleGenre = async () => {
        try {
            console.log(props)
            const response = await fetch(`http://record-collection-api.herokuapp.com/genres/${props.match.params.id}`)
            const data = await response;
            setSingleGenre(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchSingleGenre();
    }, []);

    return(
        <div>
            
        </div>
    )
}

export default SingleGenre;