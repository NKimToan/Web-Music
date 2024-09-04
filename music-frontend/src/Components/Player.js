import React, { useEffect, useState } from "react";
import "../CSS/Player.css";
import GetMusic from "../Services/Music/GetMusic"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faMicrophone, faPause, faPlay, faRandom, faRedoAlt, faStepBackward, faStepForward, faVolumeUp, faWindowMaximize } from "@fortawesome/free-solid-svg-icons";

function Player({ musicId, setMusicId, isPlaying, setIsPlaying, audioRef, lengthMusics }) {
    const [music, setMusic] = useState(null);
    const [duration, setDuration] = useState("00:00");
    const [musicTime, setMusicTime] = useState(0);
    const [progress, setProgress] = useState(0);
    // const [timeline, setTimeline] = useState(0);
    const [isLooping, setIsLooping] = useState(false);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        GetMusic(musicId)
            .then(data => {
                setMusic(data);
            })
            .catch(error => console.log(error));
    }, [musicId])

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.play().catch(error => console.log(error));
            } else {
                audio.pause();
            }
        }
    }, [isPlaying, music, audioRef]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.loop = isLooping;
        }
    }, [isLooping, audioRef]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume;
        }
    }, [volume, audioRef]);

    const handleLoadedMetadata = (e) => {
        const audio = e.target;
        const totalSeconds = Math.floor(audio.duration);
        setMusicTime(totalSeconds);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setDuration(
            (minutes < 10 ? "0" : "") + minutes + ":" +
            (seconds < 10 ? "0" : "") + seconds
        );
    };


    const handleTimeUpdate = (e) => {
        const audioElement = audioRef.current;
        const currentTime = Math.floor(audioElement.currentTime);
        setProgress(currentTime);

        // if (audioElement.duration) {
        //     const progressPercent = Math.floor((audioElement.currentTime / audioElement.duration) * 100);
        //     setProgress(progressPercent);
        // }
    };

    const handleProgressChange = (e) => {
        const audio = audioRef.current;
        const newValue = Number(e.target.value);
        console.log("progress =", progress)
        console.log(audio)
        console.log("audio duration =", audio.duration)
        console.log("audio time = ", audio.currentTime)
        if (audio) {
            audio.currentTime = Math.floor((audio.duration / 100) * newValue);
            console.log("Kết quả phép tính =", (audio.duration / 100) * newValue)
            console.log(audio.currentTime)
            setProgress(newValue)
            // const seekTime = (audio.duration / 100) * Number(e.target.value);
            // audio.currentTime = seekTime;
        }
    };

    const handleOnEnded = (e) => {
        if (!isLooping) {
            setIsPlaying(true);
            if (musicId !== lengthMusics) {
                setMusicId(musicId + 1);
            } else {
                Math.random(1, lengthMusics);
            }
        }
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    };

    const handleRepeat = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.loop = !audio.loop;
            setIsLooping(audio.loop)
        }
    }

    const turnPrevMusic = () => {
        setIsPlaying(true);
        if (musicId !== 1) {
            setMusicId(musicId - 1);
        } else {
            setMusicId(Math.floor(Math.random() * lengthMusics) + 1)
        }
    }

    const turnNextMusic = () => {
        setIsPlaying(true);
        if (musicId !== lengthMusics) {
            setMusicId(musicId + 1);
        } else {
            setMusicId(1);
        }
    }

    const handleRandom = () => {
        setMusicId(Math.floor(Math.random() * lengthMusics) + 1);
        setIsPlaying(true)
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    };

    return (
        <div className="container-fluid d-flex justify-content-around col-xl-12 col-lg-12 col-md-12 col-sm-4 col-4 " style={{ padding: "12px" }}>
            <div className="player">
                <div className="thumb">
                    <img
                        src={`${music?.image}`}
                        alt="Chưa có bài hát được chọn"
                        style={{ width: "4em", height: "4em", borderRadius: "5px" }} />
                </div>
                <audio
                    id="audio"
                    src={music ? music.music : ""}
                    ref={audioRef}
                    onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleOnEnded}
                    loop={isLooping}
                    style={{ display: "none" }}
                ></audio>
                <div className="body ms-2">
                    <p className="title mb-0 text-light">
                        <strong>
                            {music?.name}
                        </strong>
                    </p>
                    <p className="singer mb-0">{music?.singer}</p>
                </div>
            </div>
            <div className="song text-light">
                <div className="d-flex align-items-center mb-1 control" >
                    <FontAwesomeIcon
                        icon={faRandom}
                        className="mx-2 random"
                        size="xl"
                        onClick={handleRandom}
                    />
                    <FontAwesomeIcon
                        icon={faStepBackward}
                        className="mx-4 left"
                        size="xl"
                        onClick={turnPrevMusic}
                    />
                    <div className="toggle-play" onClick={togglePlayPause}>
                        {(isPlaying === true && progress !== musicTime) ?
                            <FontAwesomeIcon icon={faPause} size="lg" />
                            :
                            <FontAwesomeIcon icon={faPlay} size="lg" />
                        }
                    </div>
                    <FontAwesomeIcon
                        icon={faStepForward}
                        className="mx-4 right"
                        size="xl"
                        onClick={turnNextMusic}
                    />
                    <FontAwesomeIcon
                        icon={faRedoAlt}
                        className={` ${isLooping ? "mx-2 repeat repeat-isLooping" : "mx-2 repeat"}`}
                        size="xl"
                        onClick={handleRepeat}
                    />
                </div>
                <div className="d-flex align-items-center">
                    <span className="me-2">{progress < 60 ? `${"00:" + (progress < 10 ? `${"0" + progress}` : progress)}` : `${"0" + Math.trunc(progress / 60) + ":" + (progress % 60 < 10 ? `${"0" + progress % 60}` : progress % 60)}`}</span>
                    {/* <span className="me-2">{timeline < 60 ? `${"00:" + (timeline < 10 ? `${"0" + timeline}` : timeline)}` : `${"0" + Math.trunc(timeline / 60) + ":" + (timeline % 60 < 10 ? `${"0" + timeline % 60}` : timeline % 60)}`}</span> */}
                    <input
                        type="range"
                        className="progress"
                        value={progress}
                        step={1}
                        min={0}
                        max={musicTime}
                        // max={100}
                        onChange={handleProgressChange}
                    // onMouseUp={handleMouseUp}
                    />
                    <span className="ms-2">{duration}</span>
                </div>
            </div>
            <div className="more text-light">
                <FontAwesomeIcon
                    icon={faMicrophone}
                    className="mx-1 micro p-2"
                    size="sm"
                    title="Xem lời bài hát"
                />
                <FontAwesomeIcon
                    icon={faWindowMaximize}
                    className="mx-1 window p-2"
                    size="sm"
                    title="Chế độ cửa sổ"
                />
                <FontAwesomeIcon
                    icon={faVolumeUp}
                    className="mx-1 volume p-2"
                    size="sm"
                />
                <input
                    type="range"
                    className="volume-range"
                    value={volume}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={handleVolumeChange} />
                <div className="col-line mx-3"></div>
                <FontAwesomeIcon
                    icon={faListUl}
                    className="list-music p-2 "
                    size="lg"
                    title="Danh sách phát"
                />
            </div>
        </div>
    );
}
export default Player;