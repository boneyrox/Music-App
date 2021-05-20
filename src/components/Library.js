import React from "react";
import LibrarySong from "./LibrarySong";

export default function Library({
  audioRef,
  setSongs,
  songs,
  isPlaying ,
  setCurrentSong,
}) {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song, index) => {
          return (
            <LibrarySong
              setSongs={setSongs}
              audioRef={audioRef}
              song={song}
              songs={songs}
              setCurrentSong={setCurrentSong}
              key={song.id}
              isPlaying ={isPlaying }
            />
          );
        })}
      </div>
    </div>
  );
}
