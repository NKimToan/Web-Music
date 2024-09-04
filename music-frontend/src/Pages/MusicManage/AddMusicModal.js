import React from "react";
import { Modal, Button } from 'react-bootstrap';
import { getToken } from "../../Services/TokenServices/TokenService";
import PostMusic from "../../Services/Music/PostMusic";

function AddMusicModal({ setIsUpdated, ...props }) {
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const accessToken = getToken();
            const name = e.target.name.value;
            const singer = e.target.singer.value;
            const music_file = e.target.music.files[0];
            const image_file = e.target.image.files[0];
            const topic_id = e.target.topic.value;

            const formData = new FormData();
            formData.append('name', name);
            formData.append('singer', singer);
            formData.append('music', music_file);
            formData.append('image', image_file);
            formData.append('topic_id', topic_id);
            PostMusic(accessToken, formData)
                .then((result) => {
                    e.target.reset();
                    props.onHide(true);
                    setIsUpdated(true);

                })
                .catch((error) => {
                    console.error('Add music error:', error);
                })
        } catch (error) {
            console.log("Error checking login status: ", error);
        }
    }
    return (
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <h2>Thêm bài hát mới</h2>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <label></label>
                            <input type="text" className="form-control" name="name" required placeholder="Nhập tên bài hát" maxLength={50} />
                        </div>
                        <div className="form-group">
                            <label></label>
                            <input type="text" className="form-control" name="singer" required placeholder="Nhập tên ca sĩ" maxLength={50} />
                        </div>
                        <div className="form-group">
                            <label></label>
                            <input type="file" className="form-control" name="music" required placeholder="Thêm bài hát" />
                        </div>
                        <div className="form-group">
                            <label></label>
                            <input type="file" className="form-control" name="image" required placeholder="Thêm hình ảnh" />
                        </div>
                        <div className="form-group">
                            <label></label>
                            <select className="form-control" name="topic" required>
                                <option value="">---Chọn chủ đề cho bài hát---</option>
                                {props.topics.map((topic, id) => (
                                    <option key={id} value={topic.id}>{topic.name}</option>
                                ))}
                            </select>
                        </div>
                        <p></p>
                        <Button variant="primary" type="submit" onClick={props.onHide}>
                            Tạo
                        </Button>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" type="submit" onClick={props.onHide}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}
export default AddMusicModal;