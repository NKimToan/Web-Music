import React from "react";
import "../CSS/Library.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
function Library() {
    document.title = "Thư viện";

    return (
        <>
            <ul className="d-flex align-items-center nav nav-pills mb-1">
                <li className="nav-item">
                    <div className="text-light fw-bold" style={{ fontSize: "2em" }}>PLAYLIST</div>
                </li>
                <li className="nav-item">
                    <div className="col-line ms-4"></div>
                </li>
                <li className="nav-item">
                    <div className=" ms-4" style={{ color: "#9B4DE0" }}>TẤT CẢ</div>
                </li>
                <li className="nav-item">
                    <div className="text-light ms-4">CỦA TÔi</div>
                </li>
            </ul>
            <div className="row-line"></div>
            <div className="d-flex">
                <div className="row">
                    <div className="playlist col-xl-2 col-lg-4 col-md-6 col-sm-6 mt-4 d-flex justify-content-center align-items-center " style={{ backgroundColor: "transparent", width: "15em", height: "20em" }}>
                        <div className=" card" style={{ backgroundColor: "transparent" }}>
                            {/* <img src="https://png.pngtree.com/template/20210823/ourmid/pngtree-music-album-cover-modern-style-color-sns-image_578891.jpg" alt="" className="card-img-top" /> */}
                            <div className="card-body d-flex justify-content-center">
                                <div>
                                    <div className="circle-plus mb-2 d-flex justify-content-center align-items-center">
                                        <FontAwesomeIcon icon={faPlus} fontSize={35} color="#fff" />
                                    </div>
                                    <h5 className='card-title text-light text-center'>Tạo playlist mới</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </ >

    )
}

export default Library;