import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function UpdateUser(user_id, accessToken, username, password, email, first_name, last_name) {
    return (axios.put(`${domainName}/api/user/${user_id}/`, {
        username,
        password,
        email,
        first_name,
        last_name
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }).then(res => res.data)
        .catch(error => console.log(error)))
}

export default UpdateUser;