import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getToken } from "../Services/TokenServices/TokenService";
import UpdateUser from "../Services/UserServices/UpdateUser";

function Setup({ userLogin, ...props }) {
    const navigate = useNavigate();
    const handleSetUpAccount = (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const password1 = e.target.password1.value;
        if (password === password1) {

            const email = e.target.email.value;
            const first_name = e.target.firstname.value;
            const last_name = e.target.lastname.value;
            const accessToken = getToken();
            console.log("email = ", email);
            console.log("firstname = ", first_name);
            console.log("lastname = ", last_name);

            UpdateUser(userLogin.id, accessToken, userLogin.username, password, email, first_name, last_name)
                .then(res => {
                    console.log("res = ", res);
                    alert("Update account successfull")
                    navigate("");
                })
                .catch(error => {
                    console.log("Error update customer");
                    console.log(error);
                })
        }
    }
    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <h2>Thiết lập tài khoản</h2>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSetUpAccount}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" required defaultValue={userLogin ? userLogin.username : ""} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" required placeholder="Nhập mật khẩu mới" />
                    </div>
                    <div className="form-group">
                        <label>Confirm password</label>
                        <input type="password" className="form-control" name="password1" required placeholder="Nhập lại mật khẩu mới" />
                    </div>
                    <div className="form-group d-none">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" required defaultValue={userLogin ? userLogin.email : ""} />
                    </div>
                    <div className="form-group d-none">
                        <label>Firstname</label>
                        <input type="text" className="form-control" name="firstname" required defaultValue={userLogin ? userLogin.first_name : ""} />
                    </div>
                    <div className="form-group d-none">
                        <label>Lastname</label>
                        <input type="text" className="form-control" name="lastname" required defaultValue={userLogin ? userLogin.last_name : ""} />
                    </div>
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
    )
}

export default Setup;