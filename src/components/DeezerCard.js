import React, { useState, useEffect } from "react";
import './DeezerCard.css';

function DeezerCard() {
    const [track, setTrack] = useState(null);


    //Gets data from a backend that has last played track from deezer
    const fetchTrackData = () => {
        const apiUrl = 'https://vukmaric.com/backend/api/deezer/get_track.php';

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.data !== null) {
                    setTrack(data.data);
                } else {
                    setTrack(null);
                }
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    useEffect(() => {
        fetchTrackData();

        const intervalId = setInterval(fetchTrackData, 30000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <a href={track ? track.link : 'https://www.deezer.com/en/profile/876198011'} target="_blank" rel="noreferrer" className="deezer-now-playing-card">
            <img src={track ? track.album.cover_big : "https://static-00.iconduck.com/assets.00/deezer-icon-512x512-2p8epo3y.png"} alt="thumbnail" className={track ? "thumbnail" : "thumbnail not"}></img>
            {track ? (
                <div className="card-info-container">
                    <h3>Currently Listening</h3>
                    <p>{`${track.artist.name}-${track.title}`}</p>
                </div>
            ) : (
                <div className="card-info-container not">
                    <h3>Not Listening</h3>
                </div>
            )}
            <img src="https://static-00.iconduck.com/assets.00/deezer-icon-512x512-2p8epo3y.png" alt="logo" className={track ? "deezer-logo" : "deezer-logo hidden"}></img>
        </a>
    )
}

export default DeezerCard;
