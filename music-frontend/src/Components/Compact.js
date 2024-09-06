import React, { useEffect, useState } from "react";
import GetMusics from "../Services/Music/GetMusics";
import "../CSS/Compact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
function Compact({ musicId, setMusicId, isPlaying, setIsPlaying, setLengthMusics }) {

    document.title = "Khám phá";
    const [musics, setMusics] = useState([]);
    const [allMusics, setAllMusics] = useState([]);
    const [country, setCountry] = useState("all");

    useEffect(() => {
        if (country === "all") {
            GetMusics()
                .then(data => {
                    setMusics(data);
                    setAllMusics(data);
                })
                .catch(error => console.log(error));
        } else if (country === "UK") {
            GetMusics()
                .then(data => {
                    setMusics(data.filter((d) => d.topic.name === "Nhạc UK"))
                })
                .catch(error => console.log(error));
        } else if (country === "VietNam") {
            GetMusics()
                .then(data => {
                    setMusics(data.filter((d) => d.topic.name !== "Nhạc UK" && d.topic.name !== "Nhạc Trung"))
                })
                .catch(error => console.log(error));
        } else if (country === "Chinese") {
            GetMusics()
                .then(data => {
                    setMusics(data.filter((d) => d.topic.name === "Nhạc Trung"))
                })
                .catch(error => console.log(error));
        }
        setLengthMusics(allMusics[allMusics.length - 1]?.id);
        // setLengthMusics(musics[musics.length - 1]?.id);

    }, [musicId, country])

    return (
        <>
            <ul className="nav nav-pills mb-3">
                <li className="nav-item">
                    <div className="fw-bold" style={{ color: "#9B4DE0" }}>BÀI HÁT</div>
                </li>
                <li className="nav-item">
                    <div className="fw-bold text-light ms-4">ALBUM</div>
                </li>
            </ul>

            <ul className="nav nav-pills mb-3">
                <li
                    className="nav-item me-2 pt-1 pb-1 ps-2 pe-2 fw-bold text-light"
                    style={{ borderBlockStyle: "solid", borderRadius: "1em", cursor: "pointer", backgroundColor: country === "all" ? "#9B4DE0" : "" }}
                    onClick={() => setCountry("all")}
                >
                    <div>TẤT CẢ</div>
                </li>
                <li
                    className="nav-item me-2 pt-1 pb-1 ps-2 pe-2 fw-bold text-light"
                    style={{ borderBlockStyle: "solid", borderRadius: "1em", cursor: "pointer", backgroundColor: country === "VietNam" ? "#9B4DE0" : "" }}
                    onClick={() => setCountry("VietNam")}
                >
                    <div>VIỆT NAM</div>
                </li>
                <li
                    className="nav-item me-2 pt-1 pb-1 ps-2 pe-2 fw-bold text-light"
                    style={{ borderBlockStyle: "solid", borderRadius: "1em", cursor: "pointer", backgroundColor: country === "UK" ? "#9B4DE0" : "" }}
                    onClick={() => setCountry("UK")}
                >
                    <div>ÂU MỸ</div>
                </li>
                <li
                    className="nav-item me-2 pt-1 pb-1 ps-2 pe-2 fw-bold text-light"
                    style={{ borderBlockStyle: "solid", borderRadius: "1em", cursor: "pointer", backgroundColor: country === "Chinese" ? "#9B4DE0" : "" }}
                    onClick={() => setCountry("Chinese")}
                >
                    <div>TRUNG</div>
                </li>
            </ul>
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
                <div key={music.id} onClick={() => { setMusicId(music.id); setIsPlaying(true) }} className={` ${music.id === musicId ? "playing song-list py-2 " : "song-list py-2"}`}>
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
                        <div className="col-4 col-md-5 text-end music-singer">
                            <p className="mb-0">{music.singer}</p>
                        </div>
                        <div className="col-2 text-end music-topic-name">
                            <p className="mb-0">{music.topic.name}</p>
                        </div>
                    </div>
                </div>
            ))}
        </ >
    )
}
export default Compact;