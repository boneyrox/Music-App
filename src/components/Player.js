import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  setSongs,
  currentSong,
  setCurrentSong,
  songs,
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongInfo,
  songInfo,
}) => {
  const [playPause, setPlayPause] = useState(faPlay);
  useEffect(() => {
    const newSong = songs.map((eachSong) => {
      // console.log(eachSong.id);
      if (eachSong.id === currentSong.id) {
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
  }, [currentSong]);

  // const forwardRef = useRef(null);
  //pause and play function
  function playSongHandler() {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
      setPlayPause(faPause);
    } else {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
      setPlayPause(faPlay);
    }
  }

  //Current time and duration function

  //formatting Time
  function getTime(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  function dragHandler(e) {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  }

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => {
      return song.id === currentSong.id;
    });
    console.log(currentIndex);
    // currentIndex = currentIndex % songs.length;
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
      } else {
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      }
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          onChange={dragHandler}
          min={0}
          value={songInfo.currentTime}
          max={songInfo.duration || 0}
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={playPause}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
