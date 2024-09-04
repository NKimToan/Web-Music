import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function PutTopic(topicId, accessToken, name) {
    return (axios.put(`${domainName}/api/topic/update/${topicId}/`, {
        name
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }).then(res => res.data)
        .catch(error => console.log(error)))
}

export default PutTopic;