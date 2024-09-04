import React, { useEffect, useState } from "react";
import GetTopics from "../Services/Topic/GetTopics";
import { Link } from "react-router-dom";

function Topic({ setItemSelected }) {

    const [topics, setTopics] = useState([]);
    document.title = "Chủ đề";

    useEffect(() => {
        GetTopics()
            .then(data => {
                setTopics(data)
            })
            .catch(error => console.log(error))

    }, [])
    return (
        <>
            <div className="nav nav-pills mb-3 d-flex justify-content-center">
                <img src="https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-purple-minimalist-music-note-banner-background-image_210612.jpg" alt="" style={{ width: "87%", borderRadius: "5px" }} />
            </div>
            <div className="nav nav-pills mb-3 fw-bold fs-5 d-flex justify-content-center" style={{ color: "#9B4DE0" }}>
                <div className="w-90" style={{ width: "87%" }}>
                    <span>
                        CHỦ ĐỀ
                    </span>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="row" style={{ width: "89%" }}>
                    {topics.map((topic) => (
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-4" key={topic.id}>
                            <div className="card" style={{ backgroundImage: "linear-gradient(to right, #9146EA, #602CBC, #202365)" }}>
                                <Link to={`/topic/${topic.id}`} className="text-decoration-none">
                                    <div className="card-body d-flex justify-content-center align-items-center" style={{ height: "15vh" }}>
                                        <h2 className="text-light">{topic.name}</h2>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ >
    )
}
export default Topic;