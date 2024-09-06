import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../CSS/Navigation.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faCompactDisc, faShapes, faStar, faPlus, faHistory, faHeart, faRecordVinyl, faMars } from "@fortawesome/free-solid-svg-icons";
function Navigation() {

    const [itemSelected, setItemSelected] = useState();

    return (
        <>
            <Link
                to=""
                style={{ textDecoration: "none" }}
                onClick={() => setItemSelected("")}
                className="mt-0">
                <h2 className="text-center pt-4 pb-4 mb-0 header-title" style={{ color: "#4ea0fe" }}>Web Music</h2>
            </Link>
            <div className="side-bar-devide mt-0"></div>
            <div className="navigation-topic">
                <ListGroup
                    variant="flush"
                    style={{ backgroundColor: "#9b4de0" }}>
                    <Link to="/library" style={{ textDecoration: "none" }}>
                        <ListGroup.Item
                            action
                            className="border-0 fs-5 p-3 ps-5"
                            style={{
                                backgroundColor: itemSelected === "library" ? '#393243' : '#231B2E',
                                color: "#fff",
                                width: itemSelected === "library" ? '98%' : '100%'
                            }}
                            onClick={() => setItemSelected("library")}>
                            <FontAwesomeIcon icon={faMusic} size="1x" color="#008DC6" />
                            <span className="ms-3">Thư viện</span>
                        </ListGroup.Item>
                    </Link>
                    <Link to="" style={{ textDecoration: "none" }}>
                        <ListGroup.Item
                            action
                            className="border-0 fs-5 p-3 ps-5"
                            style={{
                                backgroundColor: itemSelected === "/" ? '#393243' : '#231B2E',
                                color: "#fff",
                                width: itemSelected === "/" ? '98%' : '100%'
                            }}
                            onClick={() => setItemSelected("/")}>
                            <FontAwesomeIcon icon={faCompactDisc} size="1x" color="#42983B" />
                            <span className="ms-3">Khám phá</span>
                        </ListGroup.Item>
                    </Link>
                    <Link to="/topic" style={{ textDecoration: "none" }}>
                        <ListGroup.Item
                            action
                            className="border-0 text-start fs-5 p-3 ps-5"
                            style={{
                                backgroundColor: itemSelected === "topic" ? '#393243' : '#231B2E',
                                color: "#fff",
                                width: itemSelected === "topic" ? '98%' : '100%'
                            }}
                            onClick={() => setItemSelected("topic")}>
                            <FontAwesomeIcon icon={faShapes} size="1x" color="#DC6F1D" />
                            <span className="ms-3">Chủ đề & thể loại</span>
                        </ListGroup.Item>
                    </Link>
                    <Link to="/rank" style={{ textDecoration: "none" }}>
                        <ListGroup.Item
                            action
                            className="border-0 text-start fs-5 p-3 ps-5"
                            style={{
                                backgroundColor: itemSelected === "rank" ? '#393243' : '#231B2E',
                                color: "#fff",
                                width: itemSelected === "rank" ? '98%' : '100%'
                            }}
                            onClick={() => setItemSelected("rank")}>
                            <FontAwesomeIcon icon={faStar} size="1x" color="#D62768" />
                            <span className="ms-3">BXH</span>
                        </ListGroup.Item>
                    </Link>
                </ListGroup>
                <div className="side-bar-devide"></div>
                <ListGroup
                    variant="flush"
                    style={{ backgroundColor: "#9b4de0" }}>
                    <Link to="/near-listen" style={{ textDecoration: "none" }}>
                        <ListGroup.Item
                            action
                            className="border-0 text-start fs-5 p-3 ps-5"
                            style={{
                                backgroundColor: itemSelected === "near-listen" ? '#393243' : '#231B2E',
                                color: "#fff",
                                width: itemSelected === "near-listen" ? '98%' : '100%'
                            }}
                            onClick={() => setItemSelected("near-listen")}>
                            <FontAwesomeIcon icon={faHistory} size="1x" color="#8139FF" />
                            <span className="ms-3">Nghe gần đây</span>
                        </ListGroup.Item>
                    </Link>
                    <Link to="/favourite" style={{ textDecoration: "none" }}>
                        <ListGroup.Item
                            action
                            className="border-0 text-start fs-5 p-3 ps-5"
                            style={{
                                backgroundColor: itemSelected === "favourite" ? '#393243' : '#231B2E',
                                color: "#fff",
                                width: itemSelected === "favourite" ? '98%' : '100%'
                            }}
                            onClick={() => setItemSelected("favourite")}>
                            <FontAwesomeIcon icon={faHeart} size="1x" color="#12C6FF" />
                            <span className="ms-3">Bài hát yêu thích</span>
                        </ListGroup.Item>
                    </Link>
                    <Link to="/album" style={{ textDecoration: "none" }}>
                        <ListGroup.Item
                            action
                            className="border-0 text-start fs-5 p-3 ps-5"
                            style={{
                                backgroundColor: itemSelected === "album" ? '#393243' : '#231B2E',
                                color: "#fff",
                                width: itemSelected === "album" ? '98%' : '100%'
                            }}
                            onClick={() => setItemSelected("album")}>
                            <FontAwesomeIcon icon={faRecordVinyl} size="1x" color="#ff47ac" />
                            <span className="ms-3">Album</span>
                        </ListGroup.Item>
                    </Link>
                    <Link to="/playlist" style={{ textDecoration: "none" }}>
                        <ListGroup.Item
                            action
                            className="border-0 text-start fs-5 p-3 ps-5"
                            style={{
                                backgroundColor: itemSelected === "playlist" ? '#393243' : '#231B2E',
                                color: "#fff",
                                width: itemSelected === "playlist" ? '98%' : '100%'
                            }}
                            onClick={() => setItemSelected("playlist")}>
                            <FontAwesomeIcon icon={faMars} size="1x" color="#FA702D" />
                            <span className="ms-3">Playlist</span>
                        </ListGroup.Item>
                    </Link>
                </ListGroup>
            </div >
            <div className="side-bar-devide"></div>
            <ListGroup
                variant="flush"
                style={{ backgroundColor: "#9b4de0" }}>
                <Link to="/create-playlist" style={{ textDecoration: "none" }}>
                    <ListGroup.Item
                        action
                        className="border-0 text-start fs-5 p-3 ps-5 pt-0"
                        style={{
                            backgroundColor: '#231B2E',
                            color: "#fff",
                        }}>
                        <FontAwesomeIcon icon={faPlus} size="1x" />
                        <span className="ms-3">Tạo playlist</span>
                    </ListGroup.Item>
                </Link>
            </ListGroup>
        </>

    );
}

export default Navigation;