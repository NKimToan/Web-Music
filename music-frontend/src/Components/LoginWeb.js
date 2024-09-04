import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getToken } from "../Services/TokenServices/TokenService";
import Login from "../Services/Login/Login";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../Constains";

function LoginWeb({ setAuthenticated }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const Navigate = useNavigate();

    useEffect(() => {
        const accessToken = getToken();
        if (accessToken) {
            Navigate("/");
        }
    }, [Navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await Login(username, password);
            localStorage.setItem(ACCESS_TOKEN, res.access);
            localStorage.setItem(REFRESH_TOKEN, res.refresh);
            Navigate("/");
            setAuthenticated(false);
        } catch (err) {
            setError("Username or password incorrect")
        }
    }

    return (
        <section className="vh-100" style={{ backgroundColor: '#231B2E' }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-10 col-lg-8 col-xl-8 col-xxl-8">
                        <div className="card text-black">
                            <div className="card-body p-md-5" >
                                <div className="row justify-content-center">
                                    <div className="col-md-9 col-lg-12 col-xl-9 col-xxl-8 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng nhập</p>
                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        id="form3Example1c"
                                                        className="form-control"
                                                        name="username"
                                                        placeholder='Nhập Username'
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        maxLength={50}
                                                        required />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        id="form3Example4c"
                                                        className="form-control"
                                                        name="password"
                                                        placeholder='Nhập password'
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            {error && <p style={{ color: 'red' }}>{error}</p>}
                                            <div className="d-flex justify-content-center mb-2">
                                                <button type="submit" data-mdb-button-init data-mdb-ripple-init
                                                    className="btn btn-primary btn-lg">Đăng nhập</button>
                                            </div>
                                            <div className="d-flex justify-content-center ">
                                                <div className="me-2">
                                                    <p className="text-center">Bạn chưa có tài khoản?</p>
                                                </div>
                                                <div className="sm-2">
                                                    <NavLink to='/register'>Đăng ký</NavLink>
                                                </div>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}
export default LoginWeb;