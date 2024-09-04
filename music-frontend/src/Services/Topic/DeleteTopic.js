import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function DeleteTopic(topicId, accessToken) {
    return (axios.delete(`${domainName}/api/topic/delete/${topicId}/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }).then(res => res.data)
        .catch(error => console.log(error)))
}

export default DeleteTopic;