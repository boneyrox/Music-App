import React from "react";

const LibrarySong = ({
  audioRef,
  setSongs,
  song,
  songs,
  setCurrentSong,
  isPlaying,
}) => {
  function songSelectHandler() {
    // console.log(song);
    // console.log(song.id);
    song.active = true;
    const newSong = songs.map((eachSong) => {
      // console.log(eachSong.id);
      if (eachSong.id === song.id) {
        return {
          ...eachSong,
          active: true,
        };
      } else {
        return {
          ...eachSong,
          active: false,
        };
      }
    });
    setSongs(newSong);
    setCurrentSong(song);
    audioRef.current.play();
  }
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt="cover img" />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
