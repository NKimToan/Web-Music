import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function RefreshToken(refresh) {
    return (axios.post(`${domainName}/api/token/refresh/`, {
        refresh
    },)
        .then(res => res)
        .catch(error => error))
}

export default RefreshToken;