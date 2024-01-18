import React from 'react';

function SpotifyPlayer({ playlistId }) {
    // <SpotifyPlayer playlistId="0U6RJkZ9aofC9g9dR72hlz"/> // Como usar o componente
    const src = `https://open.spotify.com/embed/playlist/${playlistId}`;
    return (
        <iframe
            src={src}
            width="300"
            height="400"
            frameBorder="0"
            allowTransparency="true"
            allow="encrypted-media"
        />
    );
}

export default SpotifyPlayer;