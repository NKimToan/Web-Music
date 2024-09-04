import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function GetTopic(topicId) {
    return (
        axios.get(`${domainName}/api/topic/view/${topicId}/`)
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}
export default GetTopic;