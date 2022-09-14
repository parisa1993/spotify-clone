import React from "react";

export default function Tracks({track, chooseTrack}) {
  function handlePlay() {
    chooseTrack(track);
  }
  return (
    <div
      className="track"
      onClick={handlePlay}
    >
      <img src={track.albumUrl} alt="cover" style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
}
