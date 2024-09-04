import React from "react";
import { Modal, Button } from 'react-bootstrap';
import { getToken } from "../../Services/TokenServices/TokenService";
import PostTopic from "../../Services/Topic/PostTopic";

function AddTopicModal({ setIsUpdated, ...props }) {
    const handleSubmit = async (e) => {
        try {

            e.preventDefault();
            const accessToken = getToken();
            const name = e.target.name.value;

            PostTopic(accessToken, name)
                .then((result) => {
                    props.onHide(true);
                    setIsUpdated(true);
                })
                .catch((error) => {
                    console.error('Add product error:', error);
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
                    <h2>Thêm chủ đề</h2>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <label></label>
                            <input type="text" className="form-control" name="name" required placeholder="Nhập tên chủ đề" maxLength={50} />
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
export default AddTopicModal;