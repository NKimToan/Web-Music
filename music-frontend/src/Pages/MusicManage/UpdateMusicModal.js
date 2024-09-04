import React from "react";
import { Modal, Button } from 'react-bootstrap';
import { getToken } from "../../Services/TokenServices/TokenService";
import PutMusic from "../../Services/Music/PutMusic";

function UpdateMusicModal({ setIsUpdated, musics, musicId, ...props }) {
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

            PutMusic(props.music, accessToken, formData)
                .then((result) => {
                    e.target.reset();
                    props.onHide(true);
                    setIsUpdated(true);
                })
                .catch((error) => {
                    console.error('Update category error:', error);
                })
        } catch (error) {
            console.log("Updated error: ", error);
        }
    }

    return (
        <div className="container">
            {musicId ?
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <h2>Cập nhật bài hát</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            {musics.map((music, id) => (
                                music.id === props.music ?
                                    <div key={music.id}>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="text" className="form-control" name="name" required placeholder="Nhập tên bài hát" defaultValue={music.name} maxLength={50} />
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="text" className="form-control" name="singer" required placeholder="Nhập tên ca sĩ" defaultValue={music.singer} maxLength={50} />
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="file" className="form-control" name="music" required placeholder='Cập link audio' />
                                            <p>File đang được chọn: {music.music}</p>
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="file" className="form-control" name="image" required placeholder='Cập nhật hình ảnh' />
                                            <p>File đang được chọn: {music.image}</p>
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <select className="form-control" name="topic" required>
                                                <option value={music.topic.id}>{music.topic.name}</option>
                                                {props.topics.map((topic, id) => (
                                                    topic.name !== music.topic.name ?
                                                        <option key={id} value={topic.id}>{topic.name}</option> : ""
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    :
                                    <div key={music.id}></div>
                            ))}
                            <p></p>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={props.onHide}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                :
                <div></div>
            }
        </div >
    );
}
export default UpdateMusicModal;