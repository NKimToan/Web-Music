import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Registry from "../Services/Registry/RegistryServices";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [error, setError] = useState("");

    document.title = "Registry";
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (password !== password1) {
                setError("Password don't match");
                navigate("/register");
            }
            else {
                let response = await Registry(username, password, email, first_name, last_name);
                console.log("response =", response)
                navigate("/login");
            }
        } catch (err) {
            console.error('Login failed', err);
            setError("An error has occurred");
        }

    }
    return (
        <section className="mt-4" style={{ backgroundColor: '#231B2E' }}>
            <div className="container ">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-10 col-lg-8 col-xl-8 col-xxl-8">
                        <div className="card text-black">
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-9 col-lg-12 col-xl-9 col-xxl-8 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng ký</p>
                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
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
                                                        className="form-control"
                                                        name="password"
                                                        placeholder='Nhập password'
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        placeholder='Nhập lại password'
                                                        value={password1}
                                                        onChange={(e) => setPassword1(e.target.value)}
                                                        required
                                                    />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        name="email"
                                                        placeholder="Email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="first_name"
                                                        placeholder="Firstname"
                                                        value={first_name}
                                                        onChange={(e) => setFirst_name(e.target.value)}
                                                        maxLength={20}
                                                        required
                                                    />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="last_name"
                                                        placeholder="Lastname"
                                                        value={last_name}
                                                        onChange={(e) => setLast_name(e.target.value)}
                                                        maxLength={30}
                                                        required
                                                    />
                                                    <label className="form-label"></label>
                                                </div>
                                            </div>
                                            {error && <p style={{ color: 'red' }}>{error}</p>}
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 me-2">
                                                <button type="submit" data-mdb-button-init data-mdb-ripple-init
                                                    className="btn btn-primary btn-lg">Đăng ký</button>
                                            </div>
                                            <p className="text-center h6 fw-bold mb-5 mx-1 mx-md-4 mt-4">Bạn đã có tài khoản?
                                                <Link to="/login" className="ms-2">Đăng nhập</Link>
                                            </p>
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
export default Register;