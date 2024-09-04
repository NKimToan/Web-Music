import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function GetTopics() {
    return (
        axios.get(`${domainName}/api/topic/views/`)
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}
export default GetTopics;