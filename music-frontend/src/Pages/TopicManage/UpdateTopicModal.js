import React from "react";
import { Modal, Button } from 'react-bootstrap';
import PutTopic from "../../Services/Topic/PutTopic";
import { getToken } from "../../Services/TokenServices/TokenService";

function UpdateTopicModal({ setIsUpdated, topics, topicId, ...props }) {
    const handleSubmit = async (e) => {
        try {

            e.preventDefault();
            const accessToken = getToken();
            const name = e.target.name.value;

            PutTopic(props.topic, accessToken, name)
                .then((result) => {
                    e.target.reset();
                    props.onHide(true);
                    setIsUpdated(true);
                })
                .catch((error) => {
                    console.error('Update topic error:', error);
                })
        } catch (error) {
            console.log("Updated error: ", error);
        }
    }

    return (
        <div className="container">
            {topicId ?
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header>
                        <h2>Cập nhật chủ đề</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            {topics.map((topic, id) => (
                                topic.id === props.topic ?
                                    <div key={topic.id}>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="text" className="form-control" name="id" required placeholder="Id chủ đề" defaultValue={topic.id} readOnly />
                                        </div>
                                        <div className="form-group">
                                            <label></label>
                                            <input type="text" className="form-control" name="name" required placeholder="Nhập tên chủ đề" defaultValue={topic.name} />
                                        </div>
                                    </div>
                                    :
                                    <div key={topic.id}></div>
                            ))}
                            <p></p>
                            <Button variant="primary" type="submit" onClick={props.onHide}>
                                Cập nhật
                            </Button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" type="submit" onClick={props.onHide}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
                :
                <div></div>
            }
        </div>
    )
}

export default UpdateTopicModal;