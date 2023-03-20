import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import axios from '../../axios'
import {imageUrl ,API_KEY} from '../../constants/constants'

import './RowPost.css'
function RowPost(props) {
    const [movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState("")
    useEffect(() => {
        axios.get(props.url).then(response=>{
            console.log(response.data);
            setMovies(response.data.results)
        })
    }, [])

    const opts = {
        height: '340',
        width: '100%    ',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    const handlemovie = (id) =>{
        axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{

            if(response.data.results.length !==0){
                setUrlId(response.data.results[0])
            }
        })
    }
  return (
    <div className='row'>
        <br/>
            <h2>{props.title}</h2>
            <div className="posters">
                {movies.map((obj)=>

                    <img onClick={()=> handlemovie(obj.id)} className={props.isSmall ? 'smallposter' :'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />
                )}
            
            </div>
            { urlId && <Youtube opts={opts} videoId={urlId.key}/> }  
    </div>
  )
}

export default RowPost