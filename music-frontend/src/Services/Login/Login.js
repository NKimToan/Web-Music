import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function Login(username, password) {
    return (axios.post(`${domainName}/api/token/`, {
        username, password
    }).then(res => res.data)
        .catch(error => console.log(error)))
}

export default Login;