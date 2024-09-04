import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetMusics from "../Services/Music/GetMusics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import GetTopic from "../Services/Topic/GetTopic";

function TopicDetailt({ musicId, setMusicId, isPlaying, setIsPlaying }) {
    const [musics, setMusics] = useState([]);
    const { id } = useParams()
    const [nameTopic, setNameTopic] = useState("");
    document.title = `${nameTopic}`;

    useEffect(() => {
        GetTopic(id)
            .then(data => {
                setNameTopic(data.name);
            })
            .catch(error => console.log(error));
        GetMusics()
            .then(data => {
                setMusics(data);
            })
            .catch(error => console.log(error));
    }, []);
    return (
        <div className="container mt-4">
            <div className="d-flex text-secondary mt-3">
                <div className="col-4 col-md-5 ms-1">
                    <h6 className="text-uppercase text-light">Bài hát</h6>
                </div>
                <div className="col-2 col-md-5 text-end">
                    <h6 className="text-uppercase text-light me-2">Ca sĩ</h6>
                </div>
                <div className="col-2 text-end">
                    <h6 className="text-uppercase text-light">Thể loại</h6>
                </div>
            </div>
            {musics.map((music) => (
                music.topic.id.toString() === id &&
                <div
                    key={music.id}
                    onClick={() => { setMusicId(music.id); setIsPlaying(true) }} className={` ${music.id === musicId ? "playing song-list py-2 " : "song-list py-2"}`}>
                    <div className="row align-items-center">
                        <div className="col-auto pe-0">
                            <span className="text-secondary fs-5 ms-1">♪</span>
                        </div>
                        <div className="col-auto px-2">
                            <img src={`${music.image}`} alt="Ảnh nhạc" className="song-image rounded ms-2" />
                            <span className="play-icon rounded">
                                {(isPlaying === true && music.id === musicId) ?
                                    <FontAwesomeIcon icon={faPause} />
                                    :
                                    <FontAwesomeIcon icon={faPlay} />
                                }
                            </span>
                        </div>
                        <div className={` ${music.id === musicId ? "col music-name music-name-playing " : "col music-name"}`}>
                            <p className="mb-0 fw-bold ms-1">{music.name}</p>
                        </div>
                        <div className="col-4 col-md-5 text-end text-secondary">
                            <p className="mb-0">{music.singer}</p>
                        </div>
                        <div className="col-2 text-end text-secondary">
                            <p className="mb-0">{music.topic.name}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div >
    )
}

export default TopicDetailt;