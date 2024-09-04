import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function PostTopic(accessToken, name) {
    return (axios.post(`${domainName}/api/topic/`, {
        name
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }).then(res => res.data)
        .catch(error => console.log(error)))
}

export default PostTopic;