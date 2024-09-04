import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function Registry(username, password, email, first_name, last_name) {
    return (axios.post(`${domainName}/api/user/register/`, {
        username, password, email, first_name, last_name
    }).then(res => res.data)
        .catch(error => console.log(error)))
}

export default Registry;