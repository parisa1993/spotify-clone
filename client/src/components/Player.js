import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, track }) {
  const [play, setPlay] = useState(false);
  useEffect(() => setPlay(true), [track?.uri]);
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={track ? [track.uri] : []}
    />
  );
}
