import React, { useState, useEffect } from "react";
import './Card.css';

function DeezerCard() {
    const [track, setTrack] = useState(null);

    const fetchTrackData = () => {
        const apiUrl = 'https://backend.vukmaric.rs/api/deezer/get_track.php';
        console.log("updating card status...");

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
        // Fetch data initially when the component mounts
        fetchTrackData();

        // Set up an interval to fetch data every 30 seconds
        const intervalId = setInterval(fetchTrackData, 30000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <a href={track ? track.link : 'https://www.deezer.com/'} target="_blank" rel="noreferrer" className="deezer-now-playing-card">
            <img src={track ? track.album.cover_big : "https://static-00.iconduck.com/assets.00/deezer-icon-512x512-2p8epo3y.png"} alt="thumbnail" className={track ? "thumbnail" : "thumbnail not"}></img>
            {track ? (
                <div className="card-info-container">
                    <p>Currently Listening</p>
                    <p>{`${track.artist.name}-${track.title}`}</p>
                </div>
            ) : (
                <div className="card-info-container not">
                    <p>Not</p>
                    <p>Currently Listening</p>
                </div>
            )}
            <img src="https://static-00.iconduck.com/assets.00/deezer-icon-512x512-2p8epo3y.png" alt="logo" className={track ? "deezer-logo" : "deezer-logo hidden"}></img>
        </a>
    )
}

export default DeezerCard;
