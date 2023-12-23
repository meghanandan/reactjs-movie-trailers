import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';

const MoviesTrailer = ({ title }) => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);
  const [showError, setShowError] = useState(false);


  const handlePlayTrailer = () => {
    if(searchQuery != ''){
      movieTrailer(searchQuery || title || '')
      .then((url) => {
        if(url != null){
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
          setShowError(false)
          setShowTrailer(true)
        }else{
          setShowError(true)
          setShowTrailer(false)
        }        
      })
      .catch((error) => {
        alert('Error fetching trailer. Please try again later.');
      });
    }else{
      alert('Enter Movie Trailer Name')
    }
  };

  return (
    <React.Fragment>
      <div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <div className="container my-4 pt-4">
        <h1 className='text-center text-white fs-3'>Search for Movie Trailers</h1>
        <div className='input-group shadow'>
          <input
            type="text"
            placeholder="Search for a movie" className='form-control'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handlePlayTrailer} className="btn btn-primary">Play Trailer</button>
        </div>
        {showError ? 
            <div class="alert alert-danger p-2 my-2" role="alert">
              No Trailers Found
            </div> 
            : ""
        }
        {showTrailer ? 
        <div className='card my-2 shadow'>
          <div className='card-body p-1'>
            <React.Fragment>
              {trailerUrl && (
                <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailerUrl}`}
                controls
                width="100%"
                />
                )}
              </React.Fragment>
          </div>
        </div>
        : ""
      }
      </div>
    </React.Fragment>
  );
};

export default MoviesTrailer;