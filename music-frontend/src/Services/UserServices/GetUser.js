import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function GetUser(accessToken) {
    return (
        axios.get(`${domainName}/api/token/view/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            }
        })
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}
export default GetUser;